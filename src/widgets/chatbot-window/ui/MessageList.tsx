import { ChatMessage, Message } from "@/src/entities";
import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useEffect,
} from "react";

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

const TOP_GAP = 16; // 질문을 상단 조절
const SCROLL_BREAK_THRESHOLD = 24; // 수동 스크롤 오토팔로우 해제

export const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const autoFollowRef = useRef(true);

  // 마지막 유저 메시지
  const anchorIndex = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].type === "user") return i;
    }
    return -1;
  }, [messages]);

  const recalcSpacerAndMaybeScroll = useCallback(
    (shouldScroll: boolean) => {
      const container = scrollRef.current;
      const content = contentRef.current;
      const anchor = anchorRef.current;
      const spacer = spacerRef.current;

      if (!container || !content || !anchor || !spacer) return;
      if (anchorIndex < 0) return;

      const containerRect = container.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();

      // 앵커의 스크롤 좌표계 상단 위치
      const anchorTopInScroll =
        anchorRect.top - containerRect.top + container.scrollTop;

      // 현재 메시지 컨텐츠 높이 (스페이서 제외)
      const contentH = content.getBoundingClientRect().height;
      const containerH = container.clientHeight;

      // 앵커를 상단에 둘 수 있으려면:
      // (콘텐츠 높이 + 스페이서) >= (앵커의 top + 컨테이너 높이)
      // -> 스페이서 >= anchorTop + containerH - contentH
      const neededSpacer = Math.max(
        0,
        anchorTopInScroll + containerH - contentH
      );
      spacer.style.height = `${neededSpacer}px`;

      if (shouldScroll) {
        container.scrollTop = Math.max(0, anchorTopInScroll - TOP_GAP);
      }
    },
    [anchorIndex]
  );

  // 새 유저 메시지가 들어오면: 오토팔로우 켜고, 앵커를 위로 올리기
  useLayoutEffect(() => {
    const last = messages[messages.length - 1];
    if (!last) return;

    if (last.type === "user") {
      autoFollowRef.current = true;
      // 레이아웃 확정 후 계산/스크롤

      requestAnimationFrame(() => recalcSpacerAndMaybeScroll(true));
    }
  }, [messages, recalcSpacerAndMaybeScroll]);

  // 봇 타이핑(스트리밍)으로 content 높이가 계속 변하므로 ResizeObserver로 추적
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const ro = new ResizeObserver(() => {
      recalcSpacerAndMaybeScroll(autoFollowRef.current);
    });

    ro.observe(content);
    return () => ro.disconnect();
  }, [recalcSpacerAndMaybeScroll]);

  // 창 크기 바뀌면 스페이서 재계산
  useEffect(() => {
    const onResize = () => recalcSpacerAndMaybeScroll(autoFollowRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [recalcSpacerAndMaybeScroll]);

  // 유저가 수동 스크롤하면 오토팔로우를 끔
  const handleScroll = () => {
    if (!autoFollowRef.current) return;

    const container = scrollRef.current;
    const anchor = anchorRef.current;
    if (!container || !anchor) return;

    const containerRect = container.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    const anchorTopInViewport = anchorRect.top - containerRect.top;

    if (Math.abs(anchorTopInViewport - TOP_GAP) > SCROLL_BREAK_THRESHOLD) {
      autoFollowRef.current = false;
    }
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-6 py-6 whitespace-pre-wrap"
    >
      <div ref={contentRef} className="space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} ref={idx === anchorIndex ? anchorRef : undefined}>
            <ChatMessage message={msg} />
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-5 py-5 rounded-3xl">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <span
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div ref={spacerRef} aria-hidden style={{ height: 0 }} />
    </div>
  );
};
