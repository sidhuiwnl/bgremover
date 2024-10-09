'use client'

import { useState } from 'react'
import { Tweet, useTweet } from 'react-tweet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { analyzeSentiment } from '@/lib/gemini';



export default function Home() {
  const [tweetId, setTweetId] = useState("")
  const { data: tweet, isLoading } = useTweet(tweetId);
  const [result, setResult] = useState<string | null>(null);
  const [classifying, setClassifying] = useState(false);

  const classify = async () => {
    if (!tweet) return;
    setClassifying(true);

    try {
      
      const result = await analyzeSentiment(tweet.text);
      setResult(result.sentiment)
    } catch (error) {
      console.error("Classification error:", error);
      
    } finally {
      setClassifying(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-7xl font-bold mb-2 text-center bg-clip-text  tracking-tighter ">
          Tweet Feedback Analyzer
        </h1>
        <h2 className="text-xl mb-8 text-center text-gray-300 tracking-tight">
          Analyze the sentiment of any tweet
        </h2>

        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-extrabold text-white">Enter Tweet ID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <Input 
                type="text"
                className="flex-grow bg-gray-700 border-gray-600 text-white"
                placeholder="Enter Tweet ID"
                value={tweetId}
                onChange={(e) => setTweetId(e.target.value)}
              />
              <Button 
                onClick={classify}
                disabled={!tweet || classifying}
                className=" text-white"
              >
                {classifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Analyze"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-extrabold text-white">Tweet Preview</CardTitle>
            </CardHeader>
            <CardContent className=''>
              <div className="max-w-screen max-h-[300px]  bg-white rounded-lg object-contain">
                <Tweet id={tweetId} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-extrabold text-white">Analysis Result</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-700 p-4 rounded-lg overflow-auto h-[500px] text-lg font-bold text-white">
                {!result ? 'Enter a tweet ID and click Analyze' : 
                 `Sentiment Response : ${result}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}