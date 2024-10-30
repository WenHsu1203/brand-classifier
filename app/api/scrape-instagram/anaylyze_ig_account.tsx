import { getAccountInfo } from './business_discovery';
import generateChatGPTResponse from './chatgpt';
import { getCredentials } from './defines';

interface AnalysisItem {
    title: string;
    content: string;
}

export interface BrandAnalysis {
    個人風格分析: AnalysisItem[];
    品牌定位分析: AnalysisItem[];
    目標受眾洞察: AnalysisItem[];
    產品線建議: AnalysisItem[];
    品牌故事與價值觀: AnalysisItem[];
    社交媒體營銷策略: AnalysisItem[];
    品牌設計與視覺風格: AnalysisItem[];
    品牌聲音與溝通口號: AnalysisItem[];
    收益預估: string;
}

const prompt = `請根據此網紅的 Instagram 照片與文章內容、followers count、bio、like+comment 的總和，為其制定一份品牌策略報告。
                此報告的受眾是該網紅，報告內容應協助他理解如何創立個人保養品牌。
                若網紅的風格明確屬於某國家風格，請標明該國家的風格（如：歐美、韓國、日系）。

                請嚴格按照以下 TypeScript 介面格式輸出 JSON：

                interface BrandAnalysis {
                    個人風格分析: Array<{title: string, content: string}>;
                    品牌定位分析: Array<{title: string, content: string}>;
                    目標受眾洞察: Array<{title: string, content: string}>;
                    產品線建議: Array<{title: string, content: string}>;
                    品牌故事與價值觀: Array<{title: string, content: string}>;
                    社交媒體營銷策略: Array<{title: string, content: string}>;
                    品牌設計與視覺風格: Array<{title: string, content: string}>;
                    品牌聲音與溝通口號: Array<{title: string, content: string}>;
                    收益預估: string;
                }

                要求：
                1. 每個陣列項目必須包含恰好三個元素
                2. 每個元素必須包含 title 和 content 兩個屬性
                3. content 內容應為 40-50 字的具體描述
                4. 收益預估必須根據互動率(engagement)分析，預估開始販售後的報酬

                請確保輸出的 JSON 格式完全符合上述介面定義，不要添加任何額外的屬性或格式。`;


export async function InstagramAnalysis(igUsername: string): Promise<BrandAnalysis> {
    const startTime = performance.now();

    // Strip @ symbol if it exists
    const cleanUsername = igUsername.startsWith('@') ? igUsername.substring(1) : igUsername;
    const creds = getCredentials();
    try {
        const response = await getAccountInfo(creds, cleanUsername);
        if (response.json_data.error) {
            throw new Error(response.json_data.error.message);
        }

        // Transform the data to match InstagramData interface
        const transformedData = {
            followers: response.json_data.business_discovery.followers_count,
            bio: response.json_data.business_discovery.biography,
            posts: response.json_data.business_discovery.media.data
                .slice(0, 9)
                .map((post: { media_type: string; thumbnail_url: any; media_url: any; caption: any; like_count: any; comments_count: any; }) => ({
                    image_url: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
                    caption: post.caption || '',
                    likes: post.like_count,
                    comments: post.comments_count
                }))
        };

        //     // Example prompt - you can modify this
        //     // Generate ChatGPT response
        const analysis = await generateChatGPTResponse(prompt, {
            followers: transformedData.followers,
            bio: transformedData.bio,
            posts: transformedData.posts.map((post: { image_url: any; likes: any; comments: any; }) => ({
                ...post,
                image_url: post.image_url || '',
                likes: post.likes || 0,
                comments: post.comments || 0
            }))
        });

        const endTime = performance.now();
        console.log(`Instagram analysis took ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
        return analysis as unknown as BrandAnalysis;

    } catch (error) {
        const endTime = performance.now();
        console.error(`Instagram analysis failed after ${((endTime - startTime) / 1000).toFixed(2)} seconds:`, error);
        throw error;
    }
};

export function returnMindyAccount(): BrandAnalysis {
    return {
        個人風格分析: [
            {
                title: "韓國風格",
                content: "該網紅的風格明顯受到韓國時尚影響，以自然妝感和清新造型為主，強調簡約和舒適。"
            },
            {
                title: "自然美感",
                content: "她的穿搭和妝容散發出自然美，常搭配柔和的色調，展現日常生活中的清新氣息，適合年輕女性做為參考。"
            },
            {
                title: "休閒風格",
                content: "她的風格也融合了休閒元素，展現隨性及舒適的特質，易於吸引尋求輕鬆風格的粉絲。"
            }
        ],
        品牌定位分析: [
            {
                title: "清新自然系",
                content: "品牌應聚焦於提供清新自然的產品，迎合追求低調美感的消費者。"
            },
            {
                title: "針對年輕女性",
                content: "以年輕女性為主要客群，設計符合她們日常需求的保養品，強調質感與效果。"
            },
            {
                title: "環保及自然配方",
                content: "考慮使用環保和自然成分，以回應消費者對產品成分的關切，增加品牌的可信度。"
            }
        ],
        目標受眾洞察: [
            {
                title: "年輕學生族群",
                content: "主要面向年輕學生群體，這群人對學業及生活中的自然美有著廣泛追求。"
            },
            {
                title: "對韓流文化感興趣者",
                content: "吸引對韓流時尚和文化有興趣的受眾，借助她的形象吸引這部分粉絲。"
            },
            {
                title: "生活化消費者",
                content: "目標應包括注重生活品質的消費者，尋找實用且美觀的保養產品。"
            }
        ],
        產品線建議: [
            {
                title: "清爽保濕系列",
                content: "推出針對乾燥肌膚的保濕系列，結合天然成分，增添清新感受。"
            },
            {
                title: "抗痘護理產品",
                content: "針對年輕人的皮膚問題推出抗痘產品，結合成分有效針對青春痘以及皮膚不均的情況。"
            },
            {
                title: "多功能產品",
                content: "設計可以瞬間改善肌膚狀態的多功能產品，使消費者在快節奏的生活中也能輕鬆享用。"
            }
        ],
        品牌故事與價值觀: [
            {
                title: "真實的分享",
                content: "品牌背後可強調真實美的價值觀，與客戶分享肌膚歷程，引發情感共鳴。"
            },
            {
                title: "追求簡單自然",
                content: "主張生活中不需過度裝飾，只需用心呵護肌膚，讓真實面貌展現。"
            },
            {
                title: "環保意識",
                content: "秉持環保理念，提升產品自然及環境友好型，吸引當前消費者關注。"
            }
        ],
        社交媒體營銷策略: [
            {
                title: "建立品牌社群",
                content: "運用Instagram等平台建立與粉絲的互動社群，分享使用心得與護膚技巧。"
            },
            {
                title: "KOL夥伴合作",
                content: "尋找類似品牌理念的KOL進行合作推廣，增強品牌可見度。"
            },
            {
                title: "活動與挑戰",
                content: "創建各種有趣的社交媒體活動，鼓勵粉絲參與，增加品牌曝光與討論度。"
            }
        ],
        品牌設計與視覺風格: [
            {
                title: "簡約清晰的包裝",
                content: "品牌包裝應採用簡約設計，使用柔和色調，傳遞清新舒適的感受。"
            },
            {
                title: "視覺統一性",
                content: "確保所有宣傳資料及線上商城的視覺風格一致，提升品牌識別度。"
            },
            {
                title: "展現使用效果",
                content: "利用使用前後的對比圖，展示產品效果，增加消費者信任。"
            }
        ],
        品牌聲音與溝通口號: [
            {
                title: "自然優雅，真實之美",
                content: "品牌可選用「自然優雅，真實之美」作為溝通口號，強調產品理念。"
            },
            {
                title: "簡單保養，真實效果",
                content: "這個口號強調了產品的效果，適合擬定於廣告及推廣資料中。"
            },
            {
                title: "心靈與肌膚的對話",
                content: "塑造情感共鳴，強調自我關懷與肌膚護理的關聯。"
            }
        ],
        收益預估: "根據該網紅每篇帖文的平均互動率約為9.84%，如果她的產品可以吸引5%的粉絲購買，預計每月可得到650,000台幣的收益。"
    };
}




