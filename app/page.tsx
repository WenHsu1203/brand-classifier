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
import { getCredentials } from "./api/scrape-instagram/defines"
import { getAccountInfo } from "./api/scrape-instagram/business_discovery"
import generateChatGPTResponse from "./api/scrape-instagram/chatgpt"
import { brandDesignPrompt, brandPrompt, brandVoicePrompt, calculateRevenueEstimation, coreValuePrompt, productLinePrompt, socialMediaPrompt, stylePrompt, targetPrompt } from "./api/scrape-instagram/anaylyze_ig_account"




const ColorSwatch = ({ color, name }: { color: string; name: string }) => (
  <div className="flex flex-col items-center">
    <div
      className="w-8 h-8 rounded-full shadow-md"
      style={{ backgroundColor: color }}
    ></div>
    <span className="mt-1 text-xs font-medium">{name}</span>
  </div>
)

const MoodBoardImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
    <Image
      src={src}
      alt={alt}
      layout="fill"
      objectFit="cover"
      className="transition-transform duration-300 hover:scale-110"
    />
  </div>
)

const ThreadsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 192 192" fill="currentColor">
    <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" />
  </svg>
)

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#E1306C">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
)

const StepCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <Card className="flex flex-col items-center text-center p-6 h-full">
    <Icon className="w-12 h-12 text-purple-500 mb-4" />
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Card>
)

const InstagramScraper = ({ onDataReceived, onComplete }: {
  onDataReceived: (data: any) => void,
  onComplete: () => void
}) => {
  const [account, setAccount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Strip @ symbol if it exists
      const cleanUsername = account.startsWith('@') ? account.substring(1) : account;
      const creds = getCredentials();
      const account_info = await getAccountInfo(creds, cleanUsername);
      if (account_info.json_data.error) {
        throw new Error('輸入錯誤, 或是未開放為商業帳號')
      }
      // Transform the data to match InstagramData interface
      const transformedData = {
        followers: account_info.json_data.business_discovery.followers_count,
        bio: account_info.json_data.business_discovery.biography,
        posts: account_info.json_data.business_discovery.media.data
          .slice(0, 9)
          .map((post: { media_type: string; thumbnail_url: any; media_url: any; caption: any; like_count: any; comments_count: any; }) => ({
            image_url: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
            caption: post.caption || '',
            likes_and_comments: post.like_count + post.comments_count
          }))
      };

      // Define the prompt groups
      const analysisPrompts = [
        { key: '個人風格分析', prompt: stylePrompt },
        { key: '目標受眾洞察', prompt: targetPrompt }
      ];

      const positioningPrompts = [
        { key: '品牌定位', prompt: brandPrompt }
      ];

      const strategyPrompts = [
        { key: '產品策略', prompt: productLinePrompt },
        { key: '品牌核心理念', prompt: coreValuePrompt },
        { key: '行銷規劃', prompt: socialMediaPrompt },
        { key: '品牌形象風格', prompt: brandDesignPrompt },
        { key: '品牌聲音', prompt: brandVoicePrompt }
      ];

      // Create a counter to track completed requests
      let completedAnalysis = 0;
      const totalAnalysis = analysisPrompts.length;

      // Process analysis prompts
      analysisPrompts.forEach(({ key, prompt }) => {
        generateChatGPTResponse(prompt, transformedData, 'gpt-4o-mini')
          .then(res => {
            const analysisResult = { [key]: res[key as keyof typeof res] };
            onDataReceived({ 
              type: 'analysis',
              data: analysisResult 
            });
            
            // Increment counter and check if all analysis is complete
            completedAnalysis++;
            if (completedAnalysis === totalAnalysis) {
              onComplete();
              setIsLoading(false); // Only set loading to false when analysis is complete
            }
          })
          .catch(error => {
            console.error(`Error generating ${key}:`, error);
            // Increment counter even on error to prevent blocking
            completedAnalysis++;
            if (completedAnalysis === totalAnalysis) {
              onComplete();
              setIsLoading(false); // Also handle loading state on error
            }
          });
      });

      // Process other prompts without affecting loading state
      positioningPrompts.forEach(({ key, prompt }) => {
        generateChatGPTResponse(prompt, transformedData, 'gpt-4o-mini')
          .then(res => {
            onDataReceived({ 
              type: 'positioning',
              data: { [key]: res[key as keyof typeof res] } 
            });
          })
          .catch(error => {
            console.error(`Error generating ${key}:`, error);
          });
      });

      strategyPrompts.forEach(({ key, prompt }) => {
        generateChatGPTResponse(prompt, transformedData, 'gpt-4o-mini')
          .then(res => {
            onDataReceived({ 
              type: 'strategy',
              data: { [key]: res[key as keyof typeof res] }
            });
          })
          .catch(error => {
            console.error(`Error generating ${key}:`, error);
          });
      });

      // Calculate revenue estimation immediately
      const revenueEstimation = calculateRevenueEstimation(transformedData.followers, transformedData.posts);
      onDataReceived({ 
        type: 'revenue',
        data: { 收益預估: revenueEstimation } 
      });

    } catch (error) {
      console.error('Error:', error);
      setError('輸入錯誤, 或是未開放為商業帳號');
      setIsLoading(false); // Set loading to false on error
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full mx-auto px-4"> {/* Added px-4 for padding */}
      <form onSubmit={handleScrape} className="w-full flex justify-center"> {/* Added flex and justify-center */}
        <div className="flex flex-col sm:flex-row gap-4 items-center"> {/* Added max-w-xl to container */}
          <Input
            className="w-[300px] border-2 border-purple-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg py-6"
            placeholder="@iamqhsin"
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <Button
            className="w-[120px] bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-semibold whitespace-nowrap px-8 py-6"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-flex items-center justify-center w-full">
                分析中
                <span className="inline-flex w-12 justify-start ml-1">
                  <span className="animate-[bounce_1s_infinite_0ms]">.</span>
                  <span className="animate-[bounce_1s_infinite_200ms]">.</span>
                  <span className="animate-[bounce_1s_infinite_400ms]">.</span>
                </span>
              </span>
            ) : '分析'}
          </Button>
        </div>
      </form>
      {
        error && (
          <p className="text-sm text-red-500 font-medium">
            ❌ {error}
          </p>
        )
      }
      {isLoading && (
        <p className="text-sm bg-gradient-to-r from-purple-500 to-orange-500 bg-clip-text text-transparent font-medium mt-2">
          正在用 AI 分析中, 請稍後...
        </p>
      )}
      <p className="text-sm text-orange-500 font-medium text-center"> {/* Added text-center */}
        ⚠️ 僅開放商業帳號使用（轉成商業帳號就可以玩了唷 😊）
      </p>
    </div >
  )
}

// Define the type for a single section
type BrandStrategySection = {
  title: string;
  options: { title: string; content: string; }[];
  icon: string;
};

export default function BrandStrategyDashboard() {
  const [analysisData, setAnalysisData] = useState({});
  const [positioningData, setPositioningData] = useState({});
  const [strategyData, setStrategyData] = useState({});
  const [revenueData, setRevenueData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedPillar, setSelectedPillar] = useState("")
  const [scrapedData, setScrapedData] = useState(null)
  const [brandStrategySections, setBrandStrategySections] = useState<BrandStrategySection[]>([]);
  const strategyRef = useRef<HTMLDivElement>(null)
  const nextStepsRef = useRef<HTMLDivElement>(null)
  const aiGeneratorRef = useRef<HTMLDivElement>(null)

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

  // Add this near the top of the BrandStrategyDashboard component, before the return statement
  const Header = () => {
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



  // const colorPalette = [
  //   { color: "#F9E5D8", name: "柔和米色" },
  //   { color: "#F7CAC9", name: "淡粉色" },
  //   { color: "#B5D6E0", name: "淺藍色" },
  //   { color: "#C9A8A9", name: "玫瑰褐色" },
  //   { color: "#E5E0DC", name: "灰白色" },
  //   { color: "#FFFFFF", name: "純白" },
  // ]

  // const moodBoardImages = [
  //   { src: "https://drive.google.com/uc?export=view&id=1pt0wYdmROVu66XgrznNKdag7E4pHtWpR", alt: "奢華護膚品" },
  //   { src: "https://drive.google.com/uc?export=view&id=1FA_YOT-nvUV7ZmwvX_U9t7kKWNAMaJLH", alt: "時尚模特" },
  //   { src: "https://drive.google.com/uc?export=view&id=1B7TU9a9JIew2YV0EsMTrz24-0jNFQiq3", alt: "簡約包裝" },
  // { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brand%20strategy%2011-V5wXbJnpsMb8tdf5DXs0lIkvWoFMpQ.jpg", alt: "護膚程序" },
  // { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brand%20strategy%2013-LS9lGjMgLfNuX8MFyqlLT5sSs3mbKk.jpg", alt: "自然元素" },
  // { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brand%20strategy%2005-JK1FiBsNrkiUMP9ENH8sW5tzNEQZZ0.jpg", alt: "NEARBY 產品" },
  // { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brand%20strategy%2002-v8xrsN0gzP2jHcNhEGR8xHRKG7cGjm.jpg", alt: "手部特寫" },
  // { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brand%20strategy%2007-71YmiySohoeUKp2ObACTygMgIOvo17.jpg", alt: "ONDO 品牌" },
  // { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brand%20strategy%2001-aFTMwM5Q7PWj1QTlaxVqNXzMknbNdU.jpg", alt: "krsan 產品" },
  // ]

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0]
  //   if (file) {
  //     const reader = new FileReader()
  //     reader.onload = (e) => {
  //       const result = e.target?.result
  //       if (typeof result === 'string') {
  //         setUploadedImage(result)
  //       }
  //     }
  //     reader.readAsDataURL(file)
  //   }
  // }
  const handleScrapedData = (data: Record<string, unknown>) => {
    setScrapedData(data as unknown as SetStateAction<typeof scrapedData>);

    const transformedData: BrandStrategySection[] = Object.entries(data)
      .filter(([key]) => key !== "收益預估")
      .map(([title, options]) => ({
        title,
        options: Array.isArray(options) ? options : [],
        icon: getIconForSection(title)
      }));

    setBrandStrategySections(transformedData);
  }

  // Helper function to assign icons based on section title
  const getIconForSection = (title: string): string => {
    const iconMap = {
      "個人風格分析": "👤",
      "品牌定位": "🎯",
      "目標受眾洞察": "👥",
      "產品線建議": "🧴",
      "品牌核心理念": "📖",
      "行銷規劃": "📱",
      "品牌形象風格": "🎨",
      "品牌聲音": "🗣️",
    } as const;
    return iconMap[title as keyof typeof iconMap] || "✨"; // Default icon if not found
  }

  const handleAnalysisComplete = () => {}

  useEffect(() => {
    if (scrapedData) {
      const transformedData = Object.entries(scrapedData)
        .filter(([key]) => key !== "收益預估")
        .map(([title, options]) => ({
          title,
          options: Array.isArray(options) ? options : [],
          icon: getIconForSection(title)
        }));
      setBrandStrategySections(transformedData);
    }
  }, [scrapedData]);

  useEffect(() => {
    if (Object.keys(analysisData).length > 0) {
      strategyRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [analysisData]); // Dependency on analysisData

  return (

    <div className="container mx-auto p-4 space-y-8 bg-white min-h-screen">
      <Header />
      {/* Add Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center pt-32 pb-16 px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-purple-600">品牌大師</span>  - 終極 AI 品牌生成器
          <br className="hidden md:block" />
          適用於{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
            Instagram
          </span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          還沒有自己的品牌？別擔心！品牌大師幫你從零開始，AI 一鍵搞定品牌策略。輕鬆上手，創建屬於自己的護膚品牌，不僅能展現你的風格，還有機會轉粉絲為收益！
        </p>
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
                onComplete={handleAnalysisComplete}
              />
              {/* <div className="space-y-2 w-full">
                <p className="text-sm text-center font-medium text-gray-600">分享您的品牌願景</p>
                <div className="flex justify-center space-x-4">
                  {[Instagram, ThreadsIcon, TikTokIcon, Facebook, Youtube].map((Icon, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" size="icon" className="rounded-full border-2 border-orange-300 hover:border-purple-500 hover:bg-purple-50">
                        <Icon className="h-5 w-5 text-orange-500 hover:text-purple-500" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
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
              {/* <StepCard
                icon={Share}
                title="步驟 3: 分享選項並收集粉絲反饋"
                description="瀏覽牌策略的不同選，使用「分享」按鈕將選項分享到 Instagram 故事中，讓粉絲參與投票，並收集他們的反饋。"
              />
              <StepCard
                icon={UploadIcon}
                title="步驟 4: 上傳投票結果"
                description="在「上傳投票結果」部分，選擇品牌策略的相關部分並上傳投票結果的截圖。"
              /> */}
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
        <motion.div
          ref={strategyRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 space-y-8"
        >
          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
            <CardHeader>
              <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
                屬於您的護膚品牌策略
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-6 text-gray-600">
                基於對您最9篇Instagram帖子的AI分析，我們為您量身定制了個性化的護膚品牌策略。以下是您的品牌策略概覽，包括品牌定位、目標受眾分析、產品線建議等。這個策略將幫助您輕鬆構想和發展您的個人護膚品牌。請為每個部分選擇您喜歡的選項，並分享給您的粉絲進行投票。
              </p>
              {/* First section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-purple-600 mb-4">第一步：分析</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(analysisData).map(([title, options], index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCard(null)}
                    >
                      <Card className={`cursor-pointer transition-all duration-300 h-full ${selectedCard === index ? 'ring-2 ring-purple-500' : 'hover:shadow-md'}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-semibold flex items-center justify-between">
                            <span className="flex items-center">
                              <span className="text-2xl mr-2">{getIconForSection(title)}</span>
                              {title}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Tabs defaultValue="option-1" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              {(options as any[]).map((option, optionIndex) => (
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
                                          {value as string}
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
              </div>
              {/* Second section */}
              {Object.keys(positioningData).length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-purple-600 mb-4">第二步：定位</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(positioningData).map(([title, options], index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCard(null)}
                      >
                        <Card className={`cursor-pointer transition-all duration-300 h-full ${selectedCard === index ? 'ring-2 ring-purple-500' : 'hover:shadow-md'}`}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold flex items-center justify-between">
                              <span className="flex items-center">
                                <span className="text-2xl mr-2">{getIconForSection(title)}</span>
                                {title}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Tabs defaultValue="option-1" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                {(options as any[]).map((_, optionIndex: number) => (
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
                </div>
              )}
              {/* Third section */}
              {Object.keys(strategyData).length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-purple-600 mb-4">第三步：發想</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(strategyData).map(([title, options], index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCard(null)}
                      >
                        <Card className={`cursor-pointer transition-all duration-300 h-full ${selectedCard === index ? 'ring-2 ring-purple-500' : 'hover:shadow-md'}`}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-semibold flex items-center justify-between">
                              <span className="flex items-center">
                                <span className="text-2xl mr-2">{getIconForSection(title)}</span>
                                {title}
                              </span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Tabs defaultValue="option-1" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                {(options as any[]).map((_, optionIndex: number) => (
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
                                            {key}
                                          </h4>
                                          <p className="text-sm text-gray-600">
                                            {value as string}
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
                </div>
              )}
              {/* Fourth section */}
              {revenueData && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-purple-600 mb-4">第四步：收益預估</h2>
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
                              <p className="text-sm text-gray-600">最終的每月預估收益，基於潛在��售量和平均客單價。</p>
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
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* <motion.div
        ref={nextStepsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
              品牌發展下一步
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-6 text-gray-600">
              根據您的投票結果，我們將為您生成最終的品牌策略。完成後，您可以使用我們的Own & Grow服務，輕鬆從策略過渡到產品創建、包裝設計和Shopify店鋪。
            </p>
            <div className="flex justify-center">
              <Button
                className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-semibold"
                onClick={() => window.open('https://www.own-grow.com/', '_blank')}
              >
                生成最終品牌策略
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div> */}
      <motion.div
        ref={nextStepsRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
      </motion.div>
    </div>
  )
  {/* <Card className="border-none shadow-lg bg-white overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-orange-500">
            <CardTitle className="text-2xl font-bold text-white">品牌視覺設計</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">品牌色彩方案</h3>
              <div className="flex justify-center space-x-4">
                {colorPalette.map((color, index) => (
                  <ColorSwatch key={index} color={color.color} name={color.name} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">品牌視覺風格板</h3>
              <div className="grid grid-cols-3 gap-4">
                {moodBoardImages.map((image, index) => (
                  <MoodBoardImage key={index} src={image.src} alt={image.alt} />
                ))}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">品牌設計理念</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>視覺設計融合：奢華感與親和力的完美結合</li>
                <li>目標形象：打造年輕、富有活力且充滿個性的品牌形象</li>
                <li>色彩方案：以柔和的中性色調為主，輔以淡雅的粉彩</li>
                <li>設計風格：簡約現代的布局與精緻的細節處理</li>
                <li>品牌特質：彰顯專業性與創新精神</li>
                <li>目標消費者：吸引追求高品質生活的年輕消費者</li>
                <li>品牌價值傳達：重視個人護理和自我表達</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="border-none shadow-lg bg-gradient-to-br from-purple-50 to-orange-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-500">
              上傳投票結果
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-6 text-gray-600">
              請上傳您在Instagram上進行的投票結果截圖。我們將根據這些結果為您重新生成最終的品牌策略。
            </p>
            <div className="flex flex-col items-center space-y-4">
              <Select onValueChange={setSelectedPillar}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="選擇品牌策略部分" />
                </SelectTrigger>
                <SelectContent>
                  {brandStrategySections.map((section, index) => (
                    <SelectItem key={index} value={section.title}>{section.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  {uploadedImage ? (
                    <img src={uploadedImage} alt="Uploaded voting results" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-1 text-sm text-gray-600">點擊上傳投票結果截圖</p>
                    </div>
                  )}
                </div>
              </label>
              <Button className="bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 text-white font-semibold">
                提交投票結果
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      > */}

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









