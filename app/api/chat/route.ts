import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import knowledgeBase from "@/src/entities/chatbot/model/knowledge-base.json";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(4, "1 m"),
  analytics: true,
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");
const MODELS = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];

const OFF_TOPIC_KEYWORDS = [
  "날씨",
  "주식",
  "코인",
  "로또",
  "운세",
  "음식",
  "맛집",
  "뉴스",
  "정치",
  "연예",
  "게임추천",
  "오늘 뭐해",
  "심심해",
  "비와",
];

function isOffTopic(message: string): boolean {
  const cleanMessage = message.replace(/\s+/g, "").toLowerCase();
  return OFF_TOPIC_KEYWORDS.some((keyword) => cleanMessage.includes(keyword));
}

// function formatKnowledgeBase(): string {
//   let formatted = `주제: ${knowledgeBase.topic}\n`;
//   formatted += `설명: ${knowledgeBase.description}\n\n`;
//   formatted += "=== 제공된 정보 ===\n\n";

//   knowledgeBase.data.forEach((item, index) => {
//     formatted += `${index + 1}. ${item.category}\n`;
//     formatted += `${item.content}\n\n`;
//   });

//   return formatted;
// }

function createSystemPrompt(): string {
  return `
    당신은 프론트엔드 개발자의 포트폴리오 챗봇입니다.
    당신의 존재 목적은 오직 **[지식 베이스]에 있는 작성자의 역량과 경험을 어필하는 것**입니다.
    
    === [지식 베이스] ===
    ${JSON.stringify(knowledgeBase, null, 2)}
    =====================

    [답변 원칙]
    1. **Strict Anchoring (포트폴리오 중심주의):** - 사용자의 질문이 일반적인 지식(예: "Next.js가 뭐야?", "SSR이 뭐야?")을 묻더라도, 사전적인 정의만 나열하지 마세요.
       - 반드시 **"작성자가 이 기술을 어떤 프로젝트에서 어떻게 활용했는지"**를 중심으로 답변해야 합니다.
       - 작성자의 경험과 연결되지 않는 일반 상식 질문은 답변하지 마세요.

    2. **Context Awareness (맥락 추론):**
       - "거기서 힘들었던 점은?", "그 프로젝트는?" 같은 대명사는 이전 대화 내역을 통해 추론하여 답변하세요.

    3. **Smart Refusal (똑똑한 거절):**
       - 사용자의 질문이 포트폴리오와 **논리적 연결고리**를 찾을 수 없다면 정중히 거절하세요.
       - 예: "작성자의 출신 학교 위치" (O -> 학교 생활로 연결 가능하므로 답변)
       - 예: "서울 맛집 추천" (X -> 포트폴리오와 무관하므로 거절)
       - 예: "리액트 튜토리얼 알려줘" (△ -> "작성자는 리액트를 이렇게 썼습니다"로 방어, 튜토리얼 작성은 거절)

    4. **Tone & Manner:**
       - 면접관에게 설명하듯 신뢰감 있는 '해요체'를 사용하세요.
       - 불필요한 미사여구를 빼고 핵심(작성자의 기여도, 성과) 위주로 말하세요.
  `;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        {
          response:
            "너무 짧은 시간에 많은 질문을 하셨네요! 잠시 후 다시 시도해 주세요. 😊",
          success: true,
        },
        { status: 429 }
      );
    }

    const { message } = await request.json();
    if (!message)
      return NextResponse.json({ error: "메시지 누락" }, { status: 400 });

    if (isOffTopic(message)) {
      return NextResponse.json({
        response:
          "죄송하지만, 저는 포트폴리오 관련 질문에만 답변할 수 있습니다. 😊",
        success: true,
        usedModel: "static-filter",
      });
    }

    const systemInstruction = createSystemPrompt();

    for (const modelName of MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: systemInstruction,
        });
        const result = await model.generateContent(message);
        const text = result.response.text();

        return NextResponse.json({
          response: text,
          success: true,
          usedModel: modelName,
        });
      } catch (error: any) {
        if (error.status === 429) {
          console.warn(`${modelName} 한도 초과, 다음 모델 시도...`);
          continue;
        }
        throw error;
      }
    }

    return NextResponse.json(
      { error: "모든 AI 모델의 한도가 초과되었습니다." },
      { status: 429 }
    );
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "응답 생성 실패" }, { status: 500 });
  }
}
