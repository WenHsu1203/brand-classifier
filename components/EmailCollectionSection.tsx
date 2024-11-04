"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const EmailCollectionSection = ({
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
            <div className="flex flex-col sm:flex-row gap-2 justify-center w-full">
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full sm:w-[300px] border-2 border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base sm:text-lg py-4 sm:py-6"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-semibold"
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