"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download, Target, User, Bot, Zap, ShoppingBag, Megaphone, TrendingUp, Sparkles } from "lucide-react"
import html2canvas from "html2canvas"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import React from "react"


interface Section {
  title: string;
  content: string;
}

interface StrategyCardProps {
  title: string;
  icon: React.ReactNode;
  sections: Section[];
}

export function StrategyCard({ title, icon, sections }: StrategyCardProps) {
  return (
    <Card className="bg-white h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="p-1.5 sm:p-2 flex-shrink-0 border-b">
        <CardTitle className="text-xs sm:text-sm text-center flex items-center justify-center gap-1">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1.5 sm:p-2 space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs flex-grow overflow-auto">
        {sections.map((section, index) => (
          <div key={index} className="hover:bg-gray-50 p-1 rounded-sm transition-colors duration-200">
            <h3 className="font-bold mb-0.5 sm:mb-1 text-purple-700">{section.title}</h3>
            <p className="text-gray-600 leading-tight">{section.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

interface EstimateCardProps {
  revenueData: any
}

export function EstimateCard({ revenueData }: EstimateCardProps) {
  const monthlyRevenue = revenueData?.['收益預估']?.[0]?.['潛在每月收益']?.['收益預估']?.['計算結果'] || 0
  const formattedRevenue = Math.round(Number(monthlyRevenue) / 10000)

  return (
    <Card className="bg-gradient-to-br from-purple-600 to-pink-500 text-white h-full flex flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform rotate-45 translate-y-full"></div>
      <CardContent className="p-1.5 sm:p-2 text-center z-10 flex flex-col items-center justify-center h-full">
        <h2 className="text-xs sm:text-sm font-bold mb-0.5 sm:mb-1">估計你自創產品</h2>
        <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2">每月可以增加</h3>
        <div className="bg-white bg-opacity-20 rounded-lg p-1.5 sm:p-2 mb-0.5 sm:mb-1">
          <p className="text-2xl sm:text-3xl font-extrabold">{formattedRevenue}萬元</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
          <p className="text-xs sm:text-sm font-bold">收益</p>
        </div>
      </CardContent>
    </Card>
  )
}

interface StrategySummaryProps {
  analysisData: any
  positioningData: any
  strategyData: any
  revenueData: any
}

// Define the card configurations
const STRATEGY_CARDS = {
  personalStyle: {
    title: '個人風格分析',
    icon: <User className="h-3 w-3 text-purple-500" />,
    dataKey: '個人風格分析',
    source: 'analysisData',
    fields: ['風格特徵', '風格影響', '潛在價值']
  },
  brandPositioning: {
    title: '品牌定位',
    icon: <ShoppingBag className="h-3 w-3 text-purple-500" />,
    dataKey: '品牌定位',
    source: 'positioningData',
    fields: ['市場定位', '差異化優勢', '競爭優勢']
  },
  brandImage: {
    title: '品牌形象風格',
    icon: <Zap className="h-3 w-3 text-purple-500" />,
    dataKey: '品牌形象風格',
    source: 'strategyData',
    fields: ['視覺設計建議', '設計元素', '品牌識別', '參考品牌']
  }
} as const

export function StrategySummary({
  analysisData,
  positioningData,
  strategyData,
  revenueData
}: StrategySummaryProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  const createSections = (config: typeof STRATEGY_CARDS[keyof typeof STRATEGY_CARDS]) => {
    const sourceData = {
      analysisData,
      positioningData,
      strategyData
    }[config.source]?.[config.dataKey]?.[0]

    return config.fields.map(field => ({
      title: field,
      content: sourceData?.[field] || ''
    }))
  }

  const downloadAsImage = async () => {
    if (gridRef.current) {
      const canvas = await html2canvas(gridRef.current)
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = "strategy-grid-9-16.png"
      link.click()
    }
  }

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
          <Sparkles className="w-6 h-6" />
          分享你的策略
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-2 sm:p-4 w-full max-w-4xl mx-auto">
          <div
            ref={gridRef}
            className="space-y-3 sm:space-y-4 bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 rounded-xl shadow-md"
            style={{ minHeight: 'min-content' }}
          >
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
              <h1 className="text-lg sm:text-xl font-bold">AI 品牌顧問</h1>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-grow">
              {Object.entries(STRATEGY_CARDS).map(([key, config]) => (
                <StrategyCard
                  key={key}
                  title={config.title}
                  icon={config.icon}
                  sections={createSections(config)}
                />
              ))}
              <EstimateCard revenueData={revenueData} />
            </div>

            <div className="pt-2 sm:pt-4 space-y-2 text-center border-t border-purple-100">
              <p className="text-sm sm:text-base text-purple-600 font-semibold px-4">
                基於你的粉絲互動和風格，你的產品預測有高度成功機會！
              </p>
              <p className="text-xs text-gray-400 font-medium">
                own-grow.com
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6 sm:mt-8">
            <Button
              onClick={async () => {
                if (gridRef.current) {
                  try {
                    const style = document.createElement('style');
                    document.head.appendChild(style);
                    style.sheet?.insertRule('img { display: inline-block !important; }', 0);
                    const canvas = await html2canvas(gridRef.current, {
                      scale: 2,
                      backgroundColor: null,
                      useCORS: true,
                      logging: false
                    })
                    const image = canvas.toDataURL("image/png")

                    if (navigator.share) {
                      try {
                        // Try file sharing first
                        const blob = await (await fetch(image)).blob()
                        const file = new File([blob], 'strategy-summary.png', { type: 'image/png' })
                        
                        await navigator.share({
                          title: 'AI 品牌顧問策略分析',
                          text: '查看我的品牌策略分析結果！',
                          files: [file]
                        })
                      } catch (error) {
                        console.error('Sharing failed:', error)
                        // Fallback to download if sharing fails
                        const link = document.createElement("a")
                        link.href = image
                        link.download = "strategy-summary.png"
                        link.click()
                      }
                    } else {
                      const link = document.createElement("a")
                      link.href = image
                      link.download = "strategy-summary.png"
                      link.click()
                    }
                  } catch (error) {
                    console.error('Error sharing:', error)
                  }
                }
              }}
              className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 gap-2 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
            >
              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              分享策略圖表
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}