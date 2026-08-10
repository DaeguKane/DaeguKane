import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI Client (Server side)
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API Route: AI Spec Analysis Endpoint
  app.post("/api/analyze", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: "GEMINI_API_KEY가 설정되지 않았습니다. AI Studio 환경변수 또는 Secrets를 확인해주세요.",
        });
      }

      const {
        name,
        universityCategory,
        major,
        gpa,
        languageScore,
        certificates,
        experiencePeriod,
        targetIndustry,
        targetJob,
        coverLetterAndExperience,
      } = req.body;

      if (!gpa && !coverLetterAndExperience) {
        return res.status(400).json({
          error: "스펙 데이터 또는 자소서/경험 내용 중 최소 하나 이상을 입력해주세요.",
        });
      }

      const userSpecsPrompt = `
[지원자 스펙 데이터]
- 이름: ${name || "익명 지원자"}
- 출신대학 카테고리/전공: ${universityCategory || "미지정"} / ${major || "미지정"}
- 학점 (GPA): ${gpa || "미입력"}
- 어학 성적: ${languageScore || "미입력 (어학 점수 없음)"}
- 보유 자격증: ${Array.isArray(certificates) ? certificates.join(", ") : certificates || "없음"}
- 직무 관련 경험 기간: ${experiencePeriod || "미입력"}
- 희망 산업 / 희망 직무: ${targetIndustry || "전체 산업"} / ${targetJob || "전체 직무"}

[정성적 자소서 및 경험 내용]
${coverLetterAndExperience || "작성된 자소서 내용 없음."}
      `;

      const systemInstruction = `
Role: 너는 10년 차 대기업 및 글로벌 기업 전문 채용 컨설턴트이자 헤드헌터이다. (삼성 라이온즈 스타일의 파워풀하고 날카로운 스포츠 스카우팅 리포트 분석가 페르소나)
Task: 사용자가 제출한 정량적 스펙(학점, 어학, 자격증, 전공)과 정성적 데이터(자소서, 경험 요약)를 바탕으로 엄격하고 객관적이며 현실적인 취업 경쟁력 분석 리포트를 작성하라.

Tone & Style:
- 객관적이고 프로페셔널하지만, 취준생에게 실질적인 도움과 동기부여를 주는 건설적인 어조를 유지할 것.
- 막연한 칭찬이나 단순 위로는 지양하고, 실제 대기업/중견기업/외국계 취업 시장 기준을 토대로 현실적인 티어(e.g., A-, Gold 1, All-Star 등) 및 상대 백분위를 제시할 것.
- 제출된 데이터에 기반하여 답변하되, 자소서나 경험이 유효하지 않거나 부족하다면 부족한 부분을 명확히 지적할 것.
- status 항목(gpa, language, experience, certificate)은 반드시 '부족', '적정', '우수' 중 하나로 지정할 것.
- 모든 결과는 지정된 JSON 스키마 구조로 응답하라.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: userSpecsPrompt,
        config: {
          systemInstruction,
          temperature: 0.2, // Low temperature for consistent realistic evaluation
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overall_summary: {
                type: Type.OBJECT,
                properties: {
                  tier: { type: Type.STRING, description: "예: A- (상위 20%), Gold 1 (상위 15%), ALL-STAR 등" },
                  one_line_eval: { type: Type.STRING, description: "10년차 헤드헌터 관점의 날카롭고 명쾌한 한 줄 총평" },
                  top_strengths: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "핵심 강점 2~3가지",
                  },
                  top_weaknesses: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "핵심 약점 2~3가지",
                  },
                },
                required: ["tier", "one_line_eval", "top_strengths", "top_weaknesses"],
              },
              recommended_jobs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    rank: { type: Type.INTEGER },
                    industry: { type: Type.STRING },
                    job_title: { type: Type.STRING },
                    match_score: { type: Type.INTEGER, description: "0~100 사이 매칭 퍼센트" },
                    reason: { type: Type.STRING, description: "추천 사유 및 스펙 근거" },
                  },
                  required: ["rank", "industry", "job_title", "match_score", "reason"],
                },
              },
              competitiveness_breakdown: {
                type: Type.OBJECT,
                properties: {
                  gpa: {
                    type: Type.OBJECT,
                    properties: {
                      status: { type: Type.STRING, description: "'부족', '적정', '우수' 중 선택" },
                      comment: { type: Type.STRING },
                    },
                    required: ["status", "comment"],
                  },
                  language: {
                    type: Type.OBJECT,
                    properties: {
                      status: { type: Type.STRING, description: "'부족', '적정', '우수' 중 선택" },
                      comment: { type: Type.STRING },
                    },
                    required: ["status", "comment"],
                  },
                  experience: {
                    type: Type.OBJECT,
                    properties: {
                      status: { type: Type.STRING, description: "'부족', '적정', '우수' 중 선택" },
                      comment: { type: Type.STRING },
                    },
                    required: ["status", "comment"],
                  },
                  certificate: {
                    type: Type.OBJECT,
                    properties: {
                      status: { type: Type.STRING, description: "'부족', '적정', '우수' 중 선택" },
                      comment: { type: Type.STRING },
                    },
                    required: ["status", "comment"],
                  },
                },
                required: ["gpa", "language", "experience", "certificate"],
              },
              action_plan: {
                type: Type.OBJECT,
                properties: {
                  short_term: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "1개월 내 실행 가능한 단기 과제 목록",
                  },
                  long_term: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3개월 내 실행 가능한 중장기 과제 목록",
                  },
                },
                required: ["short_term", "long_term"],
              },
              storytelling_guide: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  before_after: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        before: { type: Type.STRING },
                        after: { type: Type.STRING },
                        key_point: { type: Type.STRING },
                      },
                      required: ["before", "after", "key_point"],
                    },
                  },
                  headhunter_secret: { type: Type.STRING },
                },
                required: ["title", "before_after", "headhunter_secret"],
              },
              swot_analysis: {
                type: Type.OBJECT,
                properties: {
                  strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                  weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
                  opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  threats: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["strengths", "weaknesses", "opportunities", "threats"],
              },
            },
            required: [
              "overall_summary",
              "recommended_jobs",
              "competitiveness_breakdown",
              "action_plan",
              "storytelling_guide",
              "swot_analysis",
            ],
          },
        },
      });

      const responseText = response.text || "{}";
      const parsedData = JSON.parse(responseText);

      return res.json(parsedData);
    } catch (err: any) {
      console.error("Gemini Analysis Error:", err);
      return res.status(500).json({
        error: "AI 스펙 분석 처리 중 오류가 발생했습니다.",
        details: err?.message || String(err),
      });
    }
  });

  // API Route: File text extraction helper for .txt files
  app.post("/api/extract-text", (req, res) => {
    try {
      const { fileContent, fileName } = req.body;
      if (!fileContent) {
        return res.status(400).json({ error: "파일 내용이 비어있습니다." });
      }
      return res.json({ text: fileContent, fileName });
    } catch (err: any) {
      return res.status(500).json({ error: "파일 처리 실패" });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "SpecLens FitCareer AI" });
  });

  // Vite middleware in dev / express static in prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SpecLens Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
