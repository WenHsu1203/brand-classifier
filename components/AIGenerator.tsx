"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InstagramScraper } from "@/app/api/scrape-instagram/instagram_scraper"

interface AIGeneratorProps {
  onDataReceived: ({ type, data, username }: { 
    type: string, 
    data: any, 
    username?: string 
  }) => void
}

export function AIGenerator({ onDataReceived }: AIGeneratorProps) {
  return (
    <Card className="border-none shadow-lg bg-gradient-to-r from-purple-100 to-orange-100">
      <CardHeader>
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500 text-center">
          保養品牌策略 AI 產生器
        </CardTitle>
        <p className="text-lg text-gray-700 text-center">請輸入您的 Instagram 帳號</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <InstagramScraper
            onDataReceived={onDataReceived}
          />
        </div>
      </CardContent>
    </Card>
  )
} 