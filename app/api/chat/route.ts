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

function formatKnowledgeBase(): string {
  let formatted = `주제: ${knowledgeBase.topic}\n`;
  formatted += `설명: ${knowledgeBase.description}\n\n`;
  formatted += "=== 제공된 정보 ===\n\n";

  knowledgeBase.data.forEach((item, index) => {
    formatted += `${index + 1}. ${item.category}\n`;
    formatted += `${item.content}\n\n`;
  });

  return formatted;
}

function createSystemPrompt(): string {
  const knowledgeContent = formatKnowledgeBase();

  return `
    당신은 프론트엔드 개발자의 포트폴리오 챗봇(AI 어시스턴트)입니다.
    아래의 [지식 베이스]를 기반으로 사용자의 질문에 답변하세요.

    === [지식 베이스] ===
    ${JSON.stringify(knowledgeBase, null, 2)}
    =====================

    [답변 규칙]
    1. **Context Awareness (맥락 인식):** - 사용자가 "거기", "그 프로젝트", "그 학교"와 같이 대명사를 사용하면, **이전 대화 내역(messages)**을 분석하여 무엇을 지칭하는지 파악한 뒤 답변하세요.
    
    2. **Flexible Bridging (유연한 연결):**
       - 사용자의 질문이 포트폴리오에 직접적으로 명시되지 않았더라도(예: 학교 위치, 사용 기술의 일반적인 장단점 등), 
       - 대화 흐름상 작성자의 배경이나 기술 스택과 연관된다면 **당신의 일반 지식을 활용해 간단히 답변하고, 다시 포트폴리오 내용으로 자연스럽게 연결**하세요.
       - 예시: "숭실대학교는 서울 동작구에 있습니다. 작성자는 그곳에서 컴퓨터공학을 전공하며 웹 개발 기초를 다졌습니다."

    3. **Tone & Manner:**
       - 친절하고 전문적인 '해요체'를 사용하세요.
       - 모르는 내용은 솔직하게 "제 포트폴리오 정보에는 없는 내용입니다."라고 말하되, 관련된 다른 프로젝트를 추천해주세요.
       
    4. **Filtering:**
       - 날씨, 주식, 정치 등 포트폴리오와 전혀 무관한 주제에 대해서만 정중히 거절하세요.
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
