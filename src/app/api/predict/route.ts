import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { keyword, content } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { 
        role: "system", 
        content: "You are a Google Search Quality Rater. Evaluate content based on E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)." 
      },
      { 
        role: "user", 
        content: `Target Keyword: ${keyword}\n\nDraft Content: ${content}\n\nProvide a 'Nexus Probability Score' (0-100%) for ranking in the Top 10 and list 3 specific improvements.` 
      }
    ],
  });

  return NextResponse.json({ prediction: response.choices[0].message.content });
}