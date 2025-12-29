import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import axios from 'axios';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    // 1. Fetch the Website HTML
    const { data: html } = await axios.get(url, { 
      headers: { 'User-Agent': 'NexusSEO-Bot/1.0' } 
    });
    const $ = cheerio.load(html);

    // 2. Extract SEO Metadata
    const auditData = {
      title: $('title').text() || 'Missing',
      description: $('meta[name="description"]').attr('content') || 'Missing',
      h1: $('h1').first().text() || 'Missing',
      ogImage: $('meta[property="og:image"]').attr('content') || 'Missing',
    };

    // 3. AI Optimization Logic
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Faster and cheaper for audits
      messages: [
        { role: "system", content: "You are an expert SEO auditor." },
        { role: "user", content: `Review this metadata and provide a 'Better' Title and Description for SEO: ${JSON.stringify(auditData)}` }
      ]
    });

    return NextResponse.json({
      success: true,
      current: auditData,
      suggestion: aiResponse.choices[0].message.content
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to crawl site" }, { status: 500 });
  }
}