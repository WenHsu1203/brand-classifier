import { useState } from 'react';
import { getCredentials } from './defines';
import { getAccountInfo } from './business_discovery';
import generateChatGPTResponse from './chatgpt';
import {
    stylePrompt,
    targetPrompt,
    brandPrompt,
    socialMediaPrompt,
    coreValuePrompt,
    productLinePrompt,
    brandDesignPrompt,
    brandVoicePrompt
} from './prompts';
import { calculateRevenueEstimation } from './utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const creds = getCredentials();

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


interface InstagramScraperProps {
    onDataReceived: (data: { type: string; data: any }) => void;
}

export const InstagramScraper = ({ onDataReceived }: InstagramScraperProps) => {
    const [account, setAccount] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleScrape = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Check for dummy data request
            if (account === '@@') {
                // Send analysis data
                const analysisData = {
                    type: 'analysis',
                    data: {
                        個人風格分析: [
                            {
                                風格特徵: "時尚潮流導向",
                                風格影響: "適合建立高端時尚保養品牌形象",
                                潛在價值: "能吸引追求時尚的年輕消費族群"
                            },
                            {
                                風格特徵: "簡約風格主導",
                                風格影響: "適合建立簡約純淨的保養品牌",
                                潛在價值: "吸引追求純淨自然的消費者"
                            },
                            {
                                風格特徵: "韓系美妝風格",
                                風格影響: "適合建立韓系清新保養品牌",
                                潛在價值: "能吸引喜愛韓系美妝的消費群"
                            }
                        ],
                        目標受眾洞察: [
                            {
                                消費者輪廓: "18-25歲年輕女性，熱愛美妝保養",
                                消費者行為: "經常關注美妝趨勢，願意嘗試新品",
                                產品需求: "追求效果顯著的保養品，重視包裝設計"
                            },
                            {
                                消費者輪廓: "25-35歲都市白領，注重品質",
                                消費者行為: "重視產品成分，願意投資優質保養",
                                產品需求: "尋求高效能、安全可靠的保養產品"
                            },
                            {
                                消費者輪廓: "美妝愛好者，具有一定消費能力",
                                消費者行為: "追蹤美妝達人，喜歡嘗試新品牌",
                                產品需求: "期待創新配方和獨特包裝設計"
                            }
                        ]
                    }
                };
                onDataReceived(analysisData);

                // Send positioning data
                const positioningData = {
                    type: 'positioning',
                    data: {
                        品牌定位: [
                            {
                                市場定位: "高端時尚保養品牌",
                                差異化優勢: "獨特配方結合時尚包裝",
                                競爭優勢: "網紅背書加持，建立品牌信任度"
                            },
                            {
                                市場定位: "精緻生活風格品牌",
                                差異化優勢: "強調生活品味與保養結合",
                                競爭優勢: "打造獨特的品牌生活態度"
                            },
                            {
                                市場定位: "年輕潮流保養品牌",
                                差異化優勢: "創新產品形式與使用體驗",
                                競爭優勢: "緊扣年輕族群需求與喜好"
                            }
                        ]
                    }
                };
                onDataReceived(positioningData);

                // Send strategy data
                const strategyData = {
                    type: 'strategy',
                    data: {
                        產品策略: [
                            {
                                主打產品類型: "精華液系列",
                                產品特色: "針對不同肌膚需求的特效配方",
                                產品包裝: "時尚簡約設計，突顯品牌特色"
                            },
                            {
                                主打產品類型: "面膜系列",
                                產品特色: "創新材質與獨特成分組合",
                                產品包裝: "吸睛的包裝設計，提升架上曝光"
                            },
                            {
                                主打產品類型: "保濕系列",
                                產品特色: "多重保濕技術，適合各種膚質",
                                產品包裝: "環保材質結合時尚設計"
                            }
                        ],
                        品牌核心理念: [
                            {
                                品牌故事: "源自對純淨護膚的追求",
                                核心價值觀: "創新科技結合自然成分",
                                情感共鳴: "喚起消費者對健康美麗的嚮往"
                            },
                            {
                                品牌故事: "專業研發，用心呵護",
                                核心價值觀: "堅持品質，永續發展",
                                情感共鳴: "建立對品牌的信任與依賴"
                            },
                            {
                                品牌故事: "年輕活力，勇於創新",
                                核心價值觀: "追求卓越，持續突破",
                                情感共鳴: "與年輕族群共同成長"
                            }
                        ],
                        行銷規劃: [
                            {
                                預熱期: "透過KOL試用分享建立期待",
                                正式上市期: "線上線下整合行銷活動",
                                上市後期: "建立會員制度維繫顧客關係"
                            },
                            {
                                預熱期: "社群平台話題預熱造勢",
                                正式上市期: "限量優惠活動刺激轉單",
                                上市後期: "口碑行銷擴大市場影響"
                            },
                            {
                                預熱期: "創意內容製造話題討論",
                                正式上市期: "多平台聯動擴大曝光",
                                上市後期: "持續互動維持品牌熱度"
                            }
                        ],
                        品牌形象風格: [
                            {
                                視覺設計建議: "簡約時尚的現代風格",
                                設計元素: "柔和色調搭配金屬質感",
                                品牌識別: "獨特標誌設計提升記憶點",
                                參考品牌: "FANCL、ORBIS等清新品牌"
                            },
                            {
                                視覺設計建議: "高級奢華的精緻風格",
                                設計元素: "典雅包裝搭配燙金設計",
                                品牌識別: "精緻細節展現品牌價值",
                                參考品牌: "SK-II、La Mer等高端品牌"
                            },
                            {
                                視覺設計建議: "年輕活力的潮流風格",
                                設計元素: "鮮明色彩搭配創意圖案",
                                品牌識別: "吸睛設計提升話題性",
                                參考品牌: "GLAMGLOW、Too Cool For School"
                            }
                        ],
                        品牌聲音: [
                            {
                                溝通語氣: "專業而親切的表達方式",
                                溝通風格: "以科技專業用語建立權威",
                                情感聯繫: "分享專業知識建立信任"
                            },
                            {
                                溝通語氣: "溫暖友善的對話方式",
                                溝通風格: "使用生活化詞彙拉近距離",
                                情感聯繫: "分享美麗心得建立共鳴"
                            },
                            {
                                溝通語氣: "活潑開朗的表達方式",
                                溝通風格: "運用流行用語增加親近感",
                                情感聯繫: "創造話題引發互動討論"
                            }
                        ]
                    }
                };
                onDataReceived(strategyData);

                // Send revenue estimation
                const revenueData = {
                    type: 'revenue',
                    data: {
                        收益預估: [{
                            互動量計算: {
                                總互動數: { 計算結果: 1000 },
                                平均每篇互動率: { 計算結果: 0.05 }
                            },
                            銷售量預估分析: {
                                每月潛在銷售量計算: { 計算結果: 50 },
                                平均客單價: { 假設平均客單價: 1000 }
                            },
                            潛在每月收益: {
                                收益預估: { 計算結果: 50000 }
                            }
                        }]
                    }
                };
                onDataReceived(revenueData);

                // Set loading to false after a delay
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);

            } else {
                // Strip @ symbol if it exists
                const cleanUsername = account.startsWith('@') ? account.substring(1) : account;
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
                                setIsLoading(false); // Only set loading to false when analysis is complete
                            }
                        })
                        .catch(error => {
                            console.error(`Error generating ${key}:`, error);
                            // Increment counter even on error to prevent blocking
                            completedAnalysis++;
                            if (completedAnalysis === totalAnalysis) {
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

                // Add Google Sheets logging
                try {
                    await fetch('/api/log-to-sheets', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: cleanUsername,
                            followers: transformedData.followers,
                            timestamp: new Date().toISOString()
                        })
                    });
                } catch (sheetError) {
                    console.error('Failed to log to Google Sheets:', sheetError);
                    // Don't throw error to prevent interrupting main flow
                }
            }
        } catch (error) {
            console.error('Error:', error);
            setError('輸入錯誤, 或是未開放為商業帳號');
            setIsLoading(false); // Set loading to false on error
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 w-full mx-auto px-4">
            <form onSubmit={handleScrape} className="w-full flex justify-center">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
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
            <p className="text-sm text-orange-500 font-medium text-center">
                ⚠️ 僅開放商業帳號使用（轉成商業帳號就可以玩了唷 😊）
            </p>
        </div>
    );
};