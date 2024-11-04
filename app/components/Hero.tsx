import { CardContent } from "@/components/ui/card"
import { Sparkles, Instagram } from "lucide-react"

export const Hero = () => (
  <div className="max-w-4xl mx-auto px-4 py-2 bg-white">
    <CardContent className="pt-6 px-6 pb-0">
      <div className="flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8 text-purple-600 mr-2" />
        <h2 className="text-xl font-semibold text-purple-700">AI 品牌顧問</h2>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-orange-500 to-purple-600">
        幫你從0打造自己的保養品牌
      </h1>
      <div className="flex items-center justify-center mb-4">
        <Instagram className="w-6 h-6 text-orange-500 mr-2" />
        <span className="text-lg font-medium text-gray-700">適用於 Instagram</span>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto text-center mb-0">
        想創立品牌，卻不知道怎麼開始？別擔心！交給 AI 品牌顧問！透過分析你的 Instagram 內容生成 8 大面向品牌策略報告書，不僅展現你的風格，還幫你流量變現！
      </p>
    </CardContent>
  </div>
);