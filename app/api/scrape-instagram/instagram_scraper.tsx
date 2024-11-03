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
    brandVoicePrompt,
    defaultRevenueData,
    defaultStrategyData,
    defaultPositioningData,
    defaultAnalysisData
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
                    data: defaultAnalysisData
                };
                onDataReceived(analysisData);

                // Send positioning data
                const positioningData = {
                    type: 'positioning',
                    data: defaultPositioningData
                };
                onDataReceived(positioningData);

                // Send strategy data
                const strategyData = {
                    type: 'strategy',
                    data: defaultStrategyData
                };
                onDataReceived(strategyData);

                // Send revenue estimation
                const revenueData = {
                    type: 'revenue',
                    data: defaultRevenueData
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

                // Fire-and-forget logging to Google Sheets
                fetch('/api/log-to-sheets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: cleanUsername,
                        followers: transformedData.followers,
                        timestamp: new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })
                    })
                }).catch(sheetError => {
                    console.error('Failed to log to Google Sheets:', sheetError);
                    // Error is caught but won't block the main flow
                });
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