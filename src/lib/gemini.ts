/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

let genAI: GoogleGenAI | null = null;

if (apiKey) {
  genAI = new GoogleGenAI({ apiKey });
}

export const getGuardianResponse = async (prompt: string, currentCode: string, task: string) => {
  if (!genAI) {
    return "Gemini API Key is not configured. Please check your environment variables.";
  }

  const model = "gemini-3-flash-preview";
  const systemInstruction = `You are "FlutterGuardian", a friendly and helpful AI mentor for beginning Flutter developers.
Your goal is to guide the user through building their mobile apps.
Current state:
- Task: ${task}
- Code: 
\`\`\`dart
${currentCode}
\`\`\`

Rules:
1. Be concise and encouraging.
2. If they ask for help, explain the Flutter concept simply (using analogies).
3. Offer code snippets ONLY when necessary.
4. Encourage them to try editing the code themselves.
5. Use markdown for better formatting.
6. Tone: Warm, expert, but approachable.`;

  try {
    const response = await genAI.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops, I had a bit of trouble thinking there. Could you try again?";
  }
};
