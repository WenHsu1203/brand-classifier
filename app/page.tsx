"use client"

import { useState, useEffect, useRef, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Instagram, Youtube, Facebook, Share2, Upload, Search, FileText, Share, Upload as UploadIcon, FileCheck, Menu, ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { InstagramScraper } from "./api/scrape-instagram/instagram_scraper"


const StepCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <Card className="flex flex-col items-center text-center p-6 h-full">
    <Icon className="w-12 h-12 text-purple-500 mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Card>
)

// Helper function to assign icons based on section title
const getIconForSection = (title: string): string => {
  const iconMap = {
    "個人風格分析": "👤",
    "品牌定位": "🎯",
    "目標受眾洞察": "👥",
    "產品策略": "🧴",
    "品牌核心理念": "📖",
    "行銷規劃": "📱",
    "品牌形象風格": "🎨",
    "品牌聲音": "🗣️",
  } as const;
  return iconMap[title as keyof typeof iconMap] || "✨"; // Default icon if not found
}

export default function BrandStrategyDashboard() {
  const [analysisData, setAnalysisData] = useState({});
  const [positioningData, setPositioningData] = useState({});
  const [strategyData, setStrategyData] = useState({});
  const [revenueData, setRevenueData] = useState(null);
  const strategyRef = useRef<HTMLDivElement>(null)
  const nextStepsRef = useRef<HTMLDivElement>(null)
  const aiGeneratorRef = useRef<HTMLDivElement>(null)

  // scroll to strategy section once the analysis data is received.
  useEffect(() => {
    if (Object.keys(analysisData).length > 0) {
      const scrollTimer = setTimeout(() => {
        strategyRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 50);

      return () => clearTimeout(scrollTimer);
    }
  }, [analysisData]);

  const handleDataReceived = ({ type, data }: { type: string, data: any }) => {
    switch (type) {
      case 'analysis':
        setAnalysisData(prev => ({ ...prev, ...data }));
        break;
      case 'positioning':
        setPositioningData(prev => ({ ...prev, ...data }));
        break;
      case 'strategy':
        setStrategyData(prev => ({ ...prev, ...data }));
        break;
      case 'revenue':
        setRevenueData(data);
        break;
    }
  };

  const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <a
                href="https://www.own-grow.com/home-tw?utm_source=aitool&utm_medium=logo&utm_campaign=1101"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Image
                  src="https://drive.google.com/uc?export=view&id=1X9XNqxrkSKDB1aAmR3WhLrjPai7bxNso"
                  alt="Own & Grow Logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="http://bit.ly/48tGR1b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                聯絡我們
              </a>
              <Button
                className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white"
                onClick={() => {
                  aiGeneratorRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                  })
                }}
              >
                開始使用
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-8 w-8" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-6 px-4 bg-white border-t border-gray-100">
              <nav className="flex flex-col items-center space-y-6">
                <a
                  href="http://bit.ly/48tGR1b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-gray-800 hover:text-purple-600 transition-colors text-center"
                >
                  聯絡我們
                </a>
                <button
                  className="w-full py-4 px-6 text-xl text-center text-white rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 transition-all duration-300"
                  onClick={() => {
                    aiGeneratorRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center'
                    });
                    setIsMobileMenuOpen(false);
                  }}
                >
                  開始使用
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
    )
  }

  const Hero = () => (
    <><h1 className="text-4xl md:text-6xl font-bold mb-6">
      <span className="text-purple-600">品牌大師</span> - 終極 AI 品牌生成器
      <br className="hidden md:block" />
      適用於{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
        Instagram
      </span>
    </h1><p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8">
        還沒有自己的品牌？別擔心！品牌大師幫你從零開始，AI 一鍵搞定品牌策略。輕鬆上手，創建屬於自己的護膚品牌，不僅能展現你的風格，還有機會轉粉絲為收益！
      </p>
    </>
  );

  const CallToAction = () => (
    <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
          品牌發展下一步
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center text-center">
        <p className="text-lg mb-6 text-gray-600">
          有興創建自己的品牌嗎？立即預約 15 分鐘免費諮詢！目前僅限粉絲數超過 3 萬的帳號預約
        </p>
        <div className="flex justify-center">
          <Button
            className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-semibold"
            onClick={() => window.open('http://bit.ly/48tGR1b', '_blank')}
          >
            聯絡我們
          </Button>
        </div>
      </CardContent>
    </Card>
  );


  return (

    <div className="container mx-auto p-4 space-y-8 bg-white min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-32 pb-16 px-4"
      >
        <Hero />
      </motion.div>
      {/* Original Card Component */}
      <motion.div
        ref={aiGeneratorRef}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-32"
      >
        <Card className="border-none shadow-lg bg-gradient-to-r from-purple-100 to-orange-100">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500 text-center">
              護膚品牌策略 AI 產生器
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <InstagramScraper
                onDataReceived={handleDataReceived}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Steps description section */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
              使用步驟
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700">
                這款產品結合專業策略與粉絲反饋，為您打造專屬的品牌手冊，確保品牌是粉絲所愛且需要的產品。
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
                title="步驟 3: 生成最終品牌策略"
                description="點擊「聯絡我們」，我們將根據您的策略生成最終的品牌策略。"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Only show the strategy section if we have scraped data */}
      {Object.keys(analysisData).length > 0 && (
        <div ref={strategyRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StrategySection
              title="分析"
              data={analysisData}
              step="第一步：分析"
            />
          </motion.div>
        </div>
      )}

      {Object.keys(analysisData).length > 0 &&
        Object.keys(positioningData).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StrategySection
              title="定位"
              data={positioningData}
              step="第二步：定位"
            />
          </motion.div>
        )}

      {Object.keys(analysisData).length > 0 &&
        Object.keys(positioningData).length > 0 &&
        Object.keys(strategyData).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StrategySection
              title="發想"
              data={strategyData}
              step="第三步：發想"
            />
          </motion.div>
        )}
      {/* Fourth section */}
      {Object.keys(analysisData).length > 0 &&
        Object.keys(positioningData).length > 0 &&
        Object.keys(strategyData).length > 0 &&
        revenueData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <RevenueEstimationSection revenueData={revenueData} />
          </motion.div>
        )}
      {/* Call for action section */}
      <motion.div
        ref={nextStepsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CallToAction />
      </motion.div>
    </div>
  )
}

// Add this component at the bottom of your file
function StepSummary({ step, title, result, formula, children }: { step: number, title: string, result: string, formula: string, children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <Button
        variant="ghost"
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold text-xs">
            {step}
          </div>
          <span className="font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{result}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </Button>
      {isExpanded && (
        <div className="p-4 border-t bg-gray-50/50">
          {children}
        </div>
      )}
    </div>
  )
}

// Add this new component
const StrategySection = ({
  title,
  data,
  step
}: {
  title: string;
  data: Record<string, any>;
  step: string;
}) => (
  <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
    <CardHeader>
      <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
        {step}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(data).map(([sectionTitle, options], index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card className={`cursor-pointer transition-all duration-300 h-full`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-2xl mr-2">{getIconForSection(sectionTitle)}</span>
                    {sectionTitle}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="option-1" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    {(options as any[]).map((_, optionIndex) => (
                      <TabsTrigger
                        key={optionIndex}
                        value={`option-${optionIndex + 1}`}
                      >
                        策略 {optionIndex + 1}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {(options as any[]).map((option, optionIndex) => (
                    <TabsContent
                      key={optionIndex}
                      value={`option-${optionIndex + 1}`}
                      className="mt-4"
                    >
                      <div className="space-y-2">
                        {Object.entries(option).map(([key, value]) => {
                          if (key === 'strategy') return null;
                          return (
                            <div key={key} className="mb-4">
                              <h4 className="font-semibold text-base text-gray-800">
                                {key}:
                              </h4>
                              <p className="text-sm text-gray-600">
                                {String(value)}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Add this new component
const RevenueEstimationSection = ({ revenueData }: { revenueData: any }) => (
  <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
    <CardHeader>
      <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
        第四步：收益預估
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-none shadow-lg bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <CardTitle className="text-xl font-semibold">收益預估</CardTitle>
              </div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
                {"NTD " + Number(revenueData['收益預估'][0]['潛在每月收益']['收益預估']['計算結果']).toLocaleString('en-US') || 'NTD 0'}
              </div>
            </div>
            <CardDescription>每月潛在收益</CardDescription>
            {Number(revenueData['收益預估'][0]['互動量計算']['總互動數']['計算結果']) === 0 && (
              <p className="text-sm text-red-500 mt-1">
                若隱藏讚數與留言數，將無法分析互動
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <StepSummary
                step={1}
                title="互動量計算"
                result={Number(revenueData['收益預估'][0]['互動量計算']['總互動數']['計算結果']).toLocaleString('en-US')}
                formula="總喜歡數 + 總評論數"
              >
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">計算所有貼文的總互動量，評估內容的整體影響力。</p>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">計算公式:</span>
                      <span>{"總喜歡數 + 總評論數"}</span>
                    </div>
                  </div>
                </div>
              </StepSummary>

              <StepSummary
                step={2}
                title="平均每篇互動率"
                result={Number(revenueData['收益預估'][0]['互動量計算']['平均每篇互動率']['計算結果']).toLocaleString('en-US')}
                formula="總互動數 ÷ 9 ÷ 追蹤者數量"
              >
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">計算平均每篇內容的互動率，評估內容的吸引力。</p>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">計算公式:</span>
                      <span>{"總互動數 ÷ 貼文數 ÷ 追蹤者數量"}</span>
                    </div>
                  </div>
                </div>
              </StepSummary>

              <StepSummary
                step={3}
                title="每月潛在銷售量"
                result={Number(revenueData['收益預估'][0]['銷售量預估分析']['每月潛在銷售量計算']['計算結果']).toLocaleString('en-US')}
                formula="平均每篇貼文互動數 × 假設互動率 5%"
              >
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">估算每月可能的銷售量，假設 5% 的互動轉化率。</p>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">計算公式:</span>
                      <span>{"平均每篇貼文互動數 × 假設下單率 5%"}</span>
                    </div>
                  </div>
                </div>
              </StepSummary>

              <StepSummary
                step={4}
                title="平均客單價"
                result={Number(revenueData['收益預估'][0]['銷售量預估分析']['平均客單價']['假設平均客單價']).toLocaleString('en-US')}
                formula=""
              >
                <p className="text-sm text-gray-600">假設的平均每筆交易金額，基於市場調研及產品定位。</p>
              </StepSummary>

              <StepSummary
                step={5}
                title="潛在每月收益"
                result={"NTD " + Number(revenueData['收益預估'][0]['潛在每月收益']['收益預估']['計算結果']).toLocaleString('en-US')}
                formula="每月潛在銷售量 × 平均客單價"
              >
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">最終的每月預估收益，基於潛在售量和平均客單價。</p>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">計算公式:</span>
                      <span>{"每月潛在銷售量 × 平均客單價"}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {"此收益預估基於當前互動數據及假設的轉換率，幫助理解潛在的市場收益"}
                    </div>
                  </div>
                </div>
              </StepSummary>
            </div>
          </CardContent>
        </Card>
      </div>
    </CardContent>
  </Card>
);
