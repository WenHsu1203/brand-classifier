"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, FileText, FileCheck } from "lucide-react"

// Move the StepCard component to this file
interface StepCardProps {
  icon: React.ElementType
  title: string
  description: string
}

const StepCard = ({ icon: Icon, title, description }: StepCardProps) => (
  <Card className="flex flex-col items-center text-center p-6 h-full">
    <Icon className="w-12 h-12 text-purple-500 mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Card>
)

export function StepsSection() {
  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
      <CardHeader>
        <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
          使用步驟
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700">
            AI 品牌顧問結合專業策略與粉絲回饋，為您打造專屬的品牌策略報告書，確保打造出的品牌也會是粉絲所愛所需！
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <StepCard
            icon={Search}
            title="步驟 1: 輸入 Instagram 用戶名"
            description="在頁面頂部的輸入框中輸入您的 Instagram 用戶名，然後點擊「分析」按鈕。"
          />
          <StepCard
            icon={FileText}
            title="步驟 2: 生成初步品牌策略報告"
            description="系統會分析您的 Instagram 內容並生成初步的品牌策略報告。"
          />
          <StepCard
            icon={FileCheck}
            title="步驟 3: 優化 ＆ 執行品牌策略"
            description="點擊「聯絡我們」，助您優化，並讓品牌策略可以落地執行。"
          />
        </div>
      </CardContent>
    </Card>
  )
}