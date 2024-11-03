"use client"

import { useState, useEffect, useRef, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Instagram, Youtube, Facebook, Share2, Upload, Search, FileText, Share, Upload as UploadIcon, FileCheck, Menu, ChevronUp, ChevronDown, Sparkles } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { InstagramScraper } from "./api/scrape-instagram/instagram_scraper"
import { Label } from "@/components/ui/label"


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
  const [cleanUsername, setCleanUsername] = useState<string>('');
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

  const handleDataReceived = ({ type, data, username }: { type: string, data: any, username?: string }) => {
    switch (type) {
      case 'analysis':
        setAnalysisData(prev => ({ ...prev, ...data }));
        if (username) setCleanUsername(username);
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
              保養品牌策略 AI 產生器
            </CardTitle>
            <p className="text-lg text-gray-700 text-center">請輸入您的 Instagram 帳號</p>
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
      </motion.div>

      {/* Only show the strategy section if we have scraped data */}
      {Object.keys(analysisData).length > 0 && (
        <div ref={strategyRef}>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500 mb-6">
                  屬於您的護膚品牌策略
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  基於對您最近9篇Instagram帖子的AI分析，我們為您量身定制了個性化的護膚品牌策略。以下是您的品牌策略概覽，包括品牌定位、目標受眾分析、產品線建議等。這個策略將幫助您輕鬆構想和發展您的個人護膚品牌。請為每個部分選擇您喜歡的選項，並分享給您的粉絲進行投票。
                </p>
              </div>

              <div>
                <StrategySection
                  title="分析"
                  data={analysisData}
                  step="第一步：分析"
                />
              </div>
            </div>
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
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <RevenueEstimationSection revenueData={revenueData} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <EmailCollectionSection
                analysisData={analysisData}
                positioningData={positioningData}
                strategyData={strategyData}
                revenueData={revenueData}
                username={cleanUsername}
              />
            </motion.div>
          </>
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
                  <p className="text-sm text-gray-600">計算平均每篇內容的互動率，評估內容吸引力。</p>
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
                  <p className="text-sm text-gray-600">估算每月可能的銷售量，假設 5% 的互動化率。</p>
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

// Add this new component
const EmailCollectionSection = ({
  analysisData,
  positioningData,
  strategyData,
  revenueData,
  username
}: {
  analysisData: any,
  positioningData: any,
  strategyData: any,
  revenueData: any,
  username: string
}) => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Implement API endpoint to handle email submission
      const response = await fetch('/api/send-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          analysisData,
          positioningData,
          strategyData,
          revenueData,
          username
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
          取得完整分析報告
        </CardTitle>
        <CardDescription>
          <p className="text-lg text-gray-600 leading-relaxed flex justify-center">
            請留下您的電子郵件，我們將把完整的分析報告寄送給您
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 flex flex-col items-center">
            <div className="flex gap-2 justify-center">
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-[300px] border-2 border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg py-6"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[120px] bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-semibold whitespace-nowrap px-8 py-6"
              >
                {isSubmitting ? '傳送中...' : '傳送報告'}
              </Button>
            </div>
          </div>
          {submitStatus === 'success' && (
            <p className="text-green-600 text-sm flex justify-center">信件已寄出, 如輸錯信箱將無法收到報告</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-sm flex justify-center">傳送失敗，請稍後再試</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
