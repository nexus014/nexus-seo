import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { keyword, intent } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { 
          role: "system", 
          content: "You are an elite SEO Content Architect. Your goal is to draft high-ranking articles in Markdown format." 
        },
        { 
          role: "user", 
          content: `Write a comprehensive SEO article outline and introduction for the keyword: "${keyword}". 
          The user intent is: ${intent}. 
          Include: 
          1. A click-worthy Title (H1)
          2. Three H2 subheadings
          3. A 200-word introduction.
          4. A 'Nexus Score' (Predictive ranking difficulty from 1-100).` 
        }
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ content: response.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "AI Generation failed" }, { status: 500 });
  }
}