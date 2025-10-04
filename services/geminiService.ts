
import { GoogleGenAI } from "@google/genai";
import type { AnalyticsData, GroundingSource } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseJsonFromMarkdown = (markdown: string): AnalyticsData | null => {
  const match = markdown.match(/```json\n([\s\S]*?)\n```/);
  if (!match || !match[1]) {
    console.error("Could not find JSON code block in the response.");
    return null;
  }
  try {
    return JSON.parse(match[1]);
  } catch (error) {
    console.error("Failed to parse JSON:", error);
    return null;
  }
};

export const fetchAnalyticsData = async (domain: string): Promise<{ analyticsData: AnalyticsData, sources: GroundingSource[] } | null> => {
  const prompt = `
    Analyze the website "${domain}" as a world-class web analytics service like SimilarWeb or Ahrefs.
    Provide a detailed report on its traffic, user engagement, and market position.
    
    The output MUST be a single JSON object inside a markdown code block (\`\`\`json ... \`\`\`).
    
    The JSON object must have the following structure and keys:
    {
      "domainInfo": {
        "name": "The domain name",
        "description": "A brief, one-sentence summary of what the website is about."
      },
      "traffic": {
        "monthlyVisits": "Estimated monthly visits as a string (e.g., '1.2M', '500K').",
        "bounceRate": "Bounce rate as a percentage string (e.g., '45.2%').",
        "pagesPerVisit": "Average pages per visit as a number (e.g., 3.5).",
        "avgVisitDuration": "Average visit duration as a string (e.g., '00:03:45')."
      },
      "geography": [
        { "country": "Country Name", "percentage": 25.5 },
        { "country": "Country Name", "percentage": 18.2 }
      ],
      "trafficSources": {
        "direct": "Percentage of direct traffic (number).",
        "search": "Percentage of search traffic (number).",
        "social": "Percentage of social media traffic (number).",
        "referral": "Percentage of referral traffic (number).",
        "paid": "Percentage of paid traffic (number)."
      },
      "competitors": [
        "competitor1.com",
        "competitor2.com",
        "competitor3.com"
      ]
    }

    Ensure all numerical percentage values are numbers, not strings. The data should be realistic and based on up-to-date information.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  // FIX: The `text` property on the `GenerateContentResponse` is a getter property, not a function. It should be accessed directly.
  const analyticsData = parseJsonFromMarkdown(response.text);
  const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingSource[] || [];

  if (!analyticsData) {
    throw new Error('Could not parse analytics data from Gemini response.');
  }

  return { analyticsData, sources };
};
