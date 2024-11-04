"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getIconForSection } from "@/lib/utils"
import { StepSummary } from "./StepSummary"

export const StrategyHeader = () => (
  <div>
    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500 mb-6">
      屬於您的護膚品牌策略
    </h1>
    <p className="text-lg text-gray-600 leading-relaxed">
      基於對您最近9篇Instagram帖子的AI分析，我們為您量身定制了個性化的護膚品牌策略。以下是您的品牌策略概覽，包括品牌定位、目標受眾分析、產品線建議等。這個策略將幫助您輕鬆構想和發展您的個人護膚品牌。請為每個部分選擇您喜歡的選項，並分享給您的粉絲進行投票。
    </p>
  </div>
)

export const StrategySection = ({
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
            <Card className={`cursor-pointer transition-all duration-300 h-full strategy-card`}>
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
export const RevenueEstimationSection = ({ revenueData }: { revenueData: any }) => (
  <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
    <CardHeader>
      <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
        第四步：收益預估
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-none shadow-lg bg-white revenue-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                <CardTitle className="text-xl font-semibold">收益預估</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
                  {"NTD " + Number(revenueData['收益預估'][0]['潛在每月收益']['收益預估']['計算結果']).toLocaleString('en-US') || 'NTD 0'}
                </div>
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