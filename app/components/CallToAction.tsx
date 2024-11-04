import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const CallToAction = () => (
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