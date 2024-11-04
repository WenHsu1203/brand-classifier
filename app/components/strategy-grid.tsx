// Copy the entire component code you provided into this file "use client"

import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Target, User, TrendingUp, Bot, Zap, ShoppingBag, Megaphone } from "lucide-react"
import html2canvas from "html2canvas"

interface Section {
  title: string;
  content: string;
}

interface StrategyCardProps {
  title: string;
  icon: React.ReactNode;
  sections: Section[];
}

function StrategyCard({ title, icon, sections }: StrategyCardProps) {
  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader className="p-2 flex-shrink-0">
        <CardTitle className="text-sm text-center flex items-center justify-center gap-1">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 space-y-2 text-xs flex-grow overflow-auto">
        {sections.map((section, index) => (
          <div key={index}>
            <h3 className="font-bold mb-1">{section.title}</h3>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function EstimateCard() {
  return (
    <Card className="bg-gradient-to-br from-purple-600 to-pink-500 text-white h-full flex flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform rotate-45 translate-y-full"></div>
      <CardContent className="p-2 text-center z-10 flex flex-col items-center justify-center h-full">
        <h2 className="text-sm font-bold mb-1">估計你自創產品</h2>
        <h3 className="text-sm font-semibold mb-2">每月可以增加</h3>
        <div className="bg-white bg-opacity-20 rounded-lg p-2 mb-1">
          <p className="text-3xl font-extrabold">38萬元</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <TrendingUp className="h-4 w-4" />
          <p className="text-sm font-bold">收益</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Component() {
  const gridRef = useRef<HTMLDivElement>(null)

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
    <div className="p-4 max-w-md mx-auto">
      <div ref={gridRef} className="space-y-4 bg-gray-100 p-4 rounded-lg" style={{ aspectRatio: '9/16' }}>
        <div className="flex items-center justify-center gap-2 text-purple-600">
          <Bot className="h-6 w-6" />
          <h1 className="text-xl font-bold">AI 自創品牌顧問</h1>
        </div>
        
        <div className="grid grid-cols-2 gap-2 flex-grow">
          <StrategyCard 
            title="目標受眾洞察" 
            icon={<User className="h-3 w-3 text-purple-500" />}
            sections={[
              {
                title: "消費者輪廓",
                content: "主要受眾為20至35歲女性，對健康生活與美容保養有興趣，追求高品質與天然成分。"
              },
              {
                title: "消費者行為",
                content: "這些消費者喜愛追蹤社群媒體中的美容博主及護膚建議，並願意為高品質產品支付額外費用。"
              },
              {
                title: "產品需求",
                content: "潛在需求集中在天然成分的護膚產品、針對敏感肌膚的解決方案，以及針對忙碌都市生活的便捷產品。"
              }
            ]}
          />
          <StrategyCard 
            title="品牌定位策略" 
            icon={<Target className="h-3 w-3 text-purple-500" />}
            sections={[
              {
                title: "市場定位",
                content: "定位為高端護膚品牌，專注於年輕女性市場，強調產品的質感與效果。"
              },
              {
                title: "品牌特色",
                content: "結合科技創新與天然成分，打造專業可信賴的品牌形象，提供個性化護膚方案。"
              },
              {
                title: "核心價值",
                content: "注重產品效果與使用體驗，強調專業性與創新性，建立品牌差異化優勢。"
              }
            ]}
          />
          <StrategyCard 
            title="產品策略" 
            icon={<ShoppingBag className="h-3 w-3 text-purple-500" />}
            sections={[
              {
                title: "產品線規劃",
                content: "開發基礎護理、特殊護理和進階抗衰老三大產品線，滿足不同層次需求。"
              },
              {
                title: "產品特點",
                content: "採用高效活性成分，強調產品安全性和功效性，提供完整的護膚解決方案。"
              },
              {
                title: "包裝設計",
                content: "簡約時尚的包裝設計，突出產品特色，強調環保理念和使用便利性。"
              }
            ]}
          />
          <EstimateCard />
          <StrategyCard 
            title="營銷策略" 
            icon={<Megaphone className="h-3 w-3 text-purple-500" />}
            sections={[
              {
                title: "推廣方式",
                content: "運用社群媒體進行內容營銷，通過專業知識分享建立品牌公信力。"
              },
              {
                title: "銷售渠道",
                content: "主打線上官方商城，搭配精選美妝通路，提供全方位購物體驗。"
              },
              {
                title: "客戶服務",
                content: "提供專業的線上肌膚諮詢服務，建立長期客戶關係。"
              }
            ]}
          />
          <StrategyCard 
            title="發展策略" 
            icon={<Zap className="h-3 w-3 text-purple-500" />}
            sections={[
              {
                title: "短期目標",
                content: "建立品牌知名度，培養核心用戶群，實現產品線的市場滲透。"
              },
              {
                title: "中期規劃",
                content: "擴大產品類別，開發新的目標市場，提升品牌影響力。"
              },
              {
                title: "長期願景",
                content: "打造全方位的美容生活品牌，建立穩固的市場地位。"
              }
            ]}
          />
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-purple-600 font-medium">
            基於你的粉絲互動和風格，你的產品預測有高度成功機會！
          </p>
          <p className="text-xs text-gray-500">own-grow.com</p>
        </div>
      </div>
      
      <Button 
        onClick={downloadAsImage}
        className="w-full mt-4 gap-2"
      >
        <Download className="h-4 w-4" />
        下載策略圖表
      </Button>
    </div>
  )
}