import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { keyword } = await req.json();

  // 1. Fetch Real-time SERP Data via SerpAPI
  const serpResponse = await fetch(
    `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&api_key=${process.env.SERP_API_KEY}`
  );
  const serpData = await serpResponse.json();

  // 2. AI Analysis: Predict Ranking Difficulty & Clusters
  const aiCompletion = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      { role: "system", content: "You are an elite SEO strategist." },
      { role: "user", content: `Analyze this keyword: "${keyword}". Suggest 5 related long-tail keywords and a "Nexus Score" (1-100) based on intent.` }
    ]
  });

  const analysis = aiCompletion.choices[0].message.content;

  return NextResponse.json({
    original: keyword,
    stats: {
      results_count: serpData.search_information?.total_results,
      top_ads: serpData.ads?.length || 0
    },
    ai_insight: analysis,
    serp: serpData.organic_results.slice(0, 5) // Top 5 competitors
  });
}