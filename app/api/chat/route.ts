import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import knowledgeBase from "@/src/entities/chatbot/model/knowledge-base.json";

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
2. 관련성이 있다면 일반적인 지식을 보조적으로 활용할 수 있습니다.
3. 정보에 없는 내용을 물어보면 "죄송하지만, 제공된 정보에서는 해당 내용을 찾을 수 없습니다. 다른 질문이 있으시면 말씀해 주세요."라고 안내합니다.
4. 완전히 관련 없는 질문에는 "죄송하지만, 저는 포트폴리오 정보에 관한 질문에만 답변할 수 있습니다."라고 응답합니다.
5. 친절하고 자연스러운 한국어로 답변합니다.
6. 답변은 간결하고 명확하게 작성합니다.`;
}
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    if (!message)
      return NextResponse.json({ error: "메시지 누락" }, { status: 400 });

    if (isOffTopic(message)) {
      return NextResponse.json({
        response:
          "죄송하지만, 저는 포트폴리오와 개발 역량에 관한 질문에만 답변할 수 있습니다. 궁금하신 프로젝트나 기술 스택에 대해 물어봐 주세요! 😊",
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
          console.warn(`${modelName} 한도 초과, 다음 모델로 시도합니다.`);
          continue;
        }
        console.error(`Error with ${modelName}:`, error);
        throw error;
      }
    }

    return NextResponse.json(
      { error: "모든 AI 모델의 일일 한도가 초과되었습니다." },
      { status: 429 }
    );
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "응답 생성 실패" }, { status: 500 });
  }
}
