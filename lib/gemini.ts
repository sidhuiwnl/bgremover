'use server'

import { model } from "./modal";



export async function analyzeSentiment(tweetBody: string) {
  const prompt = `You are an advanced AI model trained for sentiment analysis of tweets. Please analyze the following tweet and provide its sentiment as "Positive", "Negative", or "Neutral", along with a detailed explanation: "${tweetBody}"`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    if (responseText.includes("Positive")) {
      return {
        sentiment: "Positive",
      };
    } else if (responseText.includes("Negative")) {
      return {
        sentiment: "Positive",
      };
    } else {
      return {
        sentiment: "Neutral",
      };
    }
  } catch (error) {
    return { sentiment: "Error", explanation: error };
  }
}


