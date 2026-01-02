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
  return `당신은 제공된 정보에 기반하여 답변하는 전문 어시스턴트입니다.

${knowledgeContent}

[답변 규칙]
1. 위 정보와 직접 관련된 질문에만 답변합니다.
2. 정보에 없는 내용을 물어보면 "죄송하지만, 해당 정보는 제 지식 베이스에 없습니다."라고 안내합니다.
3. 친절하고 간결한 한국어로 답변합니다.`;
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
