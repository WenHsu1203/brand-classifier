import { getAccountInfo } from './business_discovery';
import generateChatGPTResponse from './chatgpt';
import { getCredentials } from './defines';


// Export the interfaces
export interface StrategyItem {
    [key: string]: string; // For flexible additional fields
}

export interface RevenueEstimation {
    互動量計算: {
        總互動數: {
            公式: string;
            計算結果: number;
        };
        平均每篇互動率: {
            公式: string;
            計算結果: number;
        };
    };
    銷售量預估分析: {
        每月潛在銷售量計算: {
            公式: string;
            計算結果: number;
        };
        平均客單價: {
            假設平均客單價: number;
        };
    };
    潛在每月收益: {
        收益預估: {
            公式: string;
            計算結果: number;
        };
    };
}

export interface BrandAnalysis {
    個人風格分析: StrategyItem[];
    品牌定位: StrategyItem[];
    目標受眾洞察: StrategyItem[];
    產品策略: StrategyItem[];
    品牌核心理念: StrategyItem[];
    行銷規劃: StrategyItem[];
    品牌形象風格: StrategyItem[];
    品牌聲音: StrategyItem[];
    收益預估: RevenueEstimation[];
}

const stylePrompt = `
請根據此網紅的 Instagram 照片與文章內容、followers count、bio、like+comment 的總和, 分析此IG帳號的風格與定位,
若網紅的風格明確屬於某國家風格，請標明該國家的風格（如：歐美、韓國、日系）。回覆JSON格式:
{
  "個人風格分析": [
    {
      "風格特徵": "描述該風格的主要特徵。",
      "風格影響": "分析此風格適合建立怎麼樣的品牌形象。",
      "潛在價值": "闡述該風格如何吸引特定消費者的注意。"
    },
    ...
  ]
}
請確保三個個人風格分析，每個包括標題與20-30字的內容。
`;

const targetPrompt = `
分析此IG帳號的風格與定位，回覆JSON格式：:
{
  "目標受眾洞察": [
    {
      "消費者輪廓": "分析受眾的年齡層、性別、興趣、生活型態。",
      "消費者行為": "結合行銷心理學進行深入分析。",
      "產品需求": "評估品牌潛在的保養美妝需求。"
    },
    ...
  ]
}
請確保三個目標受眾洞察，每個包括標題與20-30字的內容。
`;

const brandPrompt = `
分析此IG帳號的品牌定位，回覆JSON格式：:
{
  "品牌定位": [
    {
      "市場定位": "描述品牌的市場定位（如高端、平價、時尚潮流、大眾）。",
      "差異化優勢": "提出品牌在市場中的差異化策略。",
      "競爭優勢": "分析品牌如何在同類產品中脫穎而出。"
    },
    ...
  ],
}
請確保三個品牌定位，每個包括標題與20-30字的內容。
`

const coreValuePrompt = `
分析此IG帳號的品牌核心理念，回覆JSON格式：:
{
  "品牌核心理念": [
    {
      "品牌故事": "建議品牌的故事核心，並說明如何與消費者建立情感聯繫。",
      "核心價值觀": "提供品牌最重要的價值觀。",
      "情感共鳴": "解釋這些故事和價值觀如何與受眾產生共鳴。"
    },
    ...
  ],
}
請確保三個品牌核心理念，每個包括標題與20-30字的內容。
`

const productLinePrompt = `
分析此IG帳號的產品策略，回覆JSON格式：:
{
  "產品策略": [
    {
      "主打產品類型": "建議可以推出的主打產品類型。"
      "產品特色": "根據目標受眾需求，提出具體的產品差異化建議。",
      "產品包裝": "設計具有辨識度的包裝，傳遞品牌形象並增加吸引力。"
    },
    ...
  ],
}
請確保三個產品策略，每個包括標題與20-30字的內容。
`


const socialMediaPrompt = `
分析此IG帳號的行銷規劃，回覆JSON格式：:
{
  "行銷規劃": [
    {
      "預熱期": "提供具體且創意的行銷規劃產品的上市做預熱，建議要用什麼方式引起消費者的注意。",
      "正式上市期": "產品正式上市的一週至三週內，如何最大化曝光並讓消費者成功轉單。",
      "上市後期": "如何經營與消費者的售後關係，並讓消費者願意再次回購。"
    },
    ...
  ],
}
請確保產出三個行銷規劃，每個包括標題與20-30字的內容。
`

const brandDesignPrompt = `
分析此IG帳號的品牌形象風格，回覆JSON格式：:
{
  "品牌形象風格": [
    {
      "視覺設計建議": "根據帳號風格，提出適合的品牌視覺設計建議。",
      "設計元素": "描述具體的設計元素（如色彩、字體）及其影響。",
      "品牌識別": "強調視覺風格如何提升品牌識別度。"
      "參考品牌": "請列出相似形象風格的保養美妝品牌提供參考。"
    },
    ...
  ],
}
請確保三個品牌形象風格，每個包括標題與20-30字的內容。
`

const brandVoicePrompt = `
分析此IG帳號的品牌聲音，回覆JSON格式：:
{
  "品牌聲音": [
    {
        "溝通語氣": "建議品牌在撰寫文案、與消費者溝通石所表達情感的方式、語氣。",
        "溝通風格": "建議品牌如何選擇用詞、句式和表達方式。例如，有些品牌會使用簡短、直接的句子，有些則偏好細膩的描述。",
        "情感聯繫": "說明品牌聲音如何增強品牌與消費者的情感聯繫。"
    },
    ...
  ],
}
請確保三個品牌聲音，每個包括標題與20-30字的內容。
`

const revenuePrompt = `
分析此IG帳號的收益預估，請根據其日常 Instagram 貼文的互動率(engagement)進行分析他如果開始販售的話的報酬預估，回覆JSON格式：:
{
  "收益預估":[ {
    "互動量計算": {
    "總互動數": {
      "公式": "總喜歡數 + 總評論數",
      "計算結果": 計算結果
    },
    "平均每篇互動率": {
      "公式": "總互動數 ÷ 貼文數 ÷ 追蹤者數量",
      "計算結果": 計算結果
    }
  },
  "銷售量預估分析": {
    "每月潛在銷售量計算": {
      "公式": "總互動數 ÷ 貼文數 × 假設下單率 0.05",
      "計算結果": 計算結果
    },
    "平均客單價": {
      "假設平均客單價": 1200
    }
  },
  "潛在每月收益": {
    "收益預估": {
      "公式": "每月潛在銷售量 × 平均客單價",
      "計算結果": 計算結果,
      }
    }
  }]
}
`

const prompt = `
請根據此網紅的 Instagram 照片與文章內容、followers count、bio、like+comment 的總和，為其制定一份品牌策略報告，針對第1到8項目提供三個有深度的策略方向幫助他去發想他的方向。此報告的受眾是該網紅，報告內容應協助他理解如何創立個人保養品牌。若網紅的風格明確屬於某國家風格，請標明該國家的風格（如：歐美、韓國、日系）。
在收益預估部分，請根據其日常 Instagram 貼文的互動率(engagement)進行分析他如果開始販售的話的報酬預估。請以如下格式輸出：
{
  "個人風格分析": [
    {
      "風格特徵": "描述該風格的主要特徵。",
      "風格影響": "分析此風格適合建立怎麼樣的品牌形象。",
      "潛在價值": "闡述該風格如何吸引特定消費者的注意。"
    },
    ...
  ],
 "目標受眾洞察": [
    {
      "消費者輪廓": "分析受眾的年齡層、性別、興趣、生活型態。",
      "消費者行為": "結合行銷心理學進行深入分析。",
      "產品需求": "評估品牌潛在的保養美妝需求。"
    },
    ...
  ],
  "品牌定位": [
    {
      "市場定位": "描述品牌的市場定位（如高端、平價）。",
      "差異化優勢": "提出品牌在市場中的差異化策略。",
      "競爭優勢": "分析品牌如何在同類產品中脫穎而出。"
    },
    ...
  ],
  "產品線建議": [
    {
      "產品建議": "根據目標受眾需求，提出具體的產品建議。",
      "核心需求": "建議可以推出的產品類型。",
      "市場趨勢": "強調符合市場趨勢的產品創新建議。"
    },
    ...
  ],
  "品牌核心理念": [
    {
      "品牌故事": "建議品牌的故事核心，並說明如何與消費者建立情感聯繫。",
      "核心價值觀": "提供品牌最重要的價值觀。",
      "情感共鳴": "解釋這些故事和價值觀如何與受眾產生共鳴。"
    },
    ...
  ],
  "社交媒體營銷策略": [
    {
      "營銷策略": "提供具體的社交媒體策略以增加品牌曝光。",
      "KOL合作": "建議如何通過合作KOL來提升品牌影響力。",
      "轉化策略": "分析如何有效將粉絲轉化為顧客。"
    },
    ...
  ],
  "品牌設計與視覺風格": [
    {
      "視覺設計建議": "根據帳號風格，提出適合的品牌視覺設計建議。",
      "設計元素": "描述具體的設計元素（如色彩、字體）及其影響。",
      "品牌識別": "強調視覺風格如何提升品牌識別度。"
    },
    ...
   ],
  "品牌聲音與溝通口號": [
    {
        "品牌聲音": "提供適合品牌的聲音和溝通方式建議。",
        "溝通口號": "建議簡短且具影響力的品牌口號。",
        "情感聯繫": "說明品牌聲音如何增強品牌與消費者的情感聯繫。"
    },
    ...
  ],
  "收益預估":[ {
  "互動量計算": {
    "總互動數": {
      "公式": "總喜歡數 + 總評論數",
      "計算結果": 計算結果
    },
    "平均每篇互動率": {
      "公式": "總互動數 ÷ 9 ÷ 追蹤者數量",
      "計算結果": 計算結果
    }
  },
  "銷售量預估分析": {
    "每月潛在銷售量計算": {
      "公式": "總互動數 ÷ 9 × 假設下單率 20%",
      "計算結果": 計算結果
    },
    "平均客單價": {
      "假設平均客單價": 1200
    }
  },
  "潛在每月收益": {
    "收益預估": {
      "公式": "每月潛在銷售量 × 平均客單價",
      "計算結果": 計算結果,
    }
  }
}]
}
請確保每個項目（除了收益預估）都有三個具體建議，每個建議包括標題與40-50字的內容。`;


const dummyBrandAnalysis: BrandAnalysis = {
    個人風格分析: [
        {
            strategy: "策略方向一",
            風格特徵: "韓系清新風格，強調自然妝容與簡約穿搭",
            風格影響: "建立親和力強且時尚的品牌形象",
            潛在價值: "吸引追求韓系美妝的年輕消費族群"
        },
        {
            strategy: "策略方向二",
            風格特徵: "日常生活風格，展現真實面貌",
            風格影響: "增加品牌真實性與可信度",
            潛在價值: "建立與消費者的情感連結"
        },
        {
            strategy: "策略方向三",
            風格特徵: "健康自然風格，注重肌膚保養",
            風格影響: "強化專業保養品牌形象",
            潛在價值: "吸引注重肌膚保養的消費者"
        }
    ],
    品牌定位: [
        {
            strategy: "策略方向一",
            定位特徵: "專注於解決特定肌膚問題的產品線，如抗痘系列、敏感肌舒緩系列、美白淡斑系列等。",
            定位影響: "強化品牌在特定肌膚護理領域的專業形象",
            潛在價值: "吸引尋求解決特定肌膚問題的消費者"
        },
        {
            strategy: "策略方向二",
            定位特徵: "提供全面肌膚護理的產品線，涵蓋清潔、保濕、抗老化等多個方面。",
            定位影響: "建立全面的肌膚護理品牌形象",
            潛在價值: "吸引追求全面肌膚護理的消費者"
        },
        {
            strategy: "策略方向三",
            定位特徵: "專注於特定膚質的產品線，如油性肌膚、乾性肌膚、混合肌膚等。",
            定位影響: "強化品牌在特定膚質護理領域的專業形象",
            潛在價值: "吸引尋求解決特定膚質問題的消費者"
        }
    ],
    目標受眾洞察: [
        {
            strategy: "策略方向一",
            洞察特徵: "1.主要面向年輕女性，對時尚和美容有較高追求。",
            洞察影響: "1.強化品牌在年輕女性市場的影響力",
            潛在價值: "1.吸引尋求時尚美容產品的消費者"
        },
        {
            strategy: "策略方向二",
            洞察特徵: "2.主要面向年輕女性，對時尚和美容有較高追求。",
            洞察影響: "2.強化品牌���年輕女性市場的影響力",
            潛在價值: "2.吸引尋求時尚美容產品的消費者"
        },
        {
            strategy: "策略方向三",
            洞察特徵: "3.主要面向年輕女性，對時尚和美容有較高追求。",
            洞察影響: "3.強化品牌在年輕女性市場的影響力",
            潛在價值: "3.吸引尋求時尚美容產品的消費者"
        }
    ],
    產品策略: [
        {
            strategy: "策略方向一",
            產品線特徵: "1.推出針對乾燥肌膚的保濕系列，結合天然成分，增添清新感受。",
            產品線影響: "1.強化品牌在肌膚保養領域的形象",
            潛在價值: "1.吸引尋求肌膚保養的消費者"
        },
        {
            strategy: "策略方向二",
            產品線特徵: "2.推出針對乾燥肌膚的保濕系列，結合天然成分，增添清新感受。",
            產品線影響: "2.強化品牌在肌膚保養領域的形象",
            潛在價值: "2.吸引尋求肌膚保養的消費者"
        },
        {
            strategy: "策略方向三",
            產品線特徵: "3.推出針對乾燥肌膚的保濕系列，結合天然成分，增添清新感受。",
            產品線影響: "3.強化品牌在肌膚保養領域的形象",
            潛在價值: "3.吸引尋求肌膚保養的消費者"
        },
    ],
    品牌核心理念: [
        {
            strategy: "策略方向一",
            故事特徵: "1.品牌故事圍繞著對肌膚的熱愛和對自然的追求，講述了品牌如何從一個小工作室發展成為知名品牌的過程。",
            故事影響: "1.強化品牌在肌膚保養領域的形象",
            潛在價值: "1.吸引尋求肌膚保養的消費者"
        },
        {
            strategy: "策略方向二",
            故事特徵: "2.品牌故事圍繞著對肌膚的熱愛和對自然的追求，講述了品牌如何從一個小工作室發展成為知名品牌的過程。",
            故事影響: "2.強化品牌在肌膚保養領域的形象",
            潛在價值: "2.吸引尋求肌膚保養的消費者"
        },
        {
            strategy: "策略方向三",
            故事特徵: "3.品牌故事圍繞著對肌膚的熱愛和對自然的追求，講述了品牌如何從一個小工作室發展成為知名品牌的過程。",
            故事影響: "3.強化品牌在肌膚保養領域的形象",
            潛在價值: "3.吸引尋求肌膚保養的消費者"
        }
    ],
    行銷規劃: [
        {
            strategy: "策略方向一",
            營銷特徵: "1.利用Instagram的直播功能，進行即時互動和產品展示，吸引粉絲參與。",
            營銷影響: "1.強化品牌在社交媒體上的影響力",
            潛在價值: "1.吸引尋求即時互動和產品展示的消費者"
        },
        {
            strategy: "策略方向二",
            營銷特徵: "2.利用Instagram的直播功能，進行即時互動和產品展示，吸引粉絲參與。",
            營銷影響: "2.強化品牌在社交媒體上的影響力",
            潛在價值: "2.吸引尋求即時互動和產品展示的消費者"
        },
        {
            strategy: "策略方向三",
            營銷特徵: "3.利用Instagram的直播功能，進行即時互動和產品展示，吸引粉絲參與。",
            營銷影響: "3.強化品牌在社交媒體上的影響力",
            潛在價值: "3.吸引尋求即時互動和產品展示的消費者"
        }
    ],
    品牌形象風格: [
        {
            strategy: "策略方向一",
            設計特徵: "1.品牌設計以簡約、現代為主，使用現代感強的色彩和簡潔的線條，強調產品的質感和時尚感。",
            設計影響: "1.強化品牌在肌膚保養領域的形象",
            潛在價值: "1.吸引尋求肌膚保養的消費者"
        },
        {
            strategy: "策略方向二",
            設計特徵: "2.品牌設計以簡約、現代為主，使用現代感強的色彩和簡潔的線條，強調產品的質感和時尚感。",
            設計影響: "2.強化品牌在肌膚保養領域的形象",
            潛在價值: "2.吸引尋求肌膚保養的消費者"
        },
        {
            strategy: "策略方向三",
            設計特徵: "3.品牌設計以簡約、現代為主，使用現代感強的色彩和簡潔的線條，強調產品的質感和時尚感。",
            設計影響: "3.強化品牌在肌膚保養領域的形象",
            潛在價值: "3.吸引尋求肌膚保養的消費者"
        }
    ],
    品牌聲音: [
        {
            strategy: "策略方向一",
            聲音特徵: "1.品牌聲音以自然、親切為主，使用簡單易懂的語言，強調產品的質感和效果。",
            聲音影響: "1.強化品牌在肌膚保養領域的形象",
            潛在價值: "1.吸引尋求肌膚保養的消費者"
        },
        {
            strategy: "策略方向二",
            聲音特徵: "2.品牌聲音以自然、親切為主，使用簡單易懂的語言，強調產品的質感和效果。",
            聲音影響: "2.強化品牌在肌膚保養領域的形象",
            潛在價值: "2.吸引尋求肌膚保養的消費者"
        },
        {
            strategy: "策略方向三",
            聲音特徵: "3.品牌聲音以自然、親切為主，使用簡單易懂的語言，強調產品的質感和效果。",
            聲音影響: "3.強化品牌在肌膚保養領域的形象",
            潛在價值: "3.吸引尋求肌膚保養的消費者"
        }
    ],
    收益預估: [{
        互動量計算: {
            總互動數: {
                公式: "7293 + 5207 + 3496 + 9245 + 7521 + 5885 + 2707 + 906 + 3242 = 33,782",
                計算結果: 33782
            },
            平均每篇互動率: {
                公式: "(33782 ÷ 9) ÷ 125282 ≈ 0.03 (3%)",
                計算結果: 0.03
            }
        },
        銷售量預估分析: {
            每月潛在銷售量計算: {
                公式: "(33782 ÷ 9) × 20% ≈ 751",
                計算結果: 751
            },
            平均客單價: {
                假設平均客單價: 1200
            }
        },
        潛在每月收益: {
            收益預估: {
                公式: "每月潛在銷售量 × 平均客單價",
                計算結果: 650400,
            }

        }
    }]
};

function calculateRevenueEstimation(followers: number, posts: any[]) {
    // Filter out posts with NaN likes_and_comments and calculate total interactions
    const validPosts = posts.filter(post => !isNaN(post.likes_and_comments));
    const totalInteractions = validPosts.reduce((sum, post) => sum + post.likes_and_comments, 0);
    
    // Calculate average interactions per valid post
    const postsCount = validPosts.length;
    
    // Rest of calculations using valid posts only
    const avgInteractionsPerPost = totalInteractions / postsCount;
    const engagementRate = avgInteractionsPerPost / followers;
    const conversionRate = 0.05;
    const potentialMonthlySales = Math.round(avgInteractionsPerPost * conversionRate);
    const averageOrderValue = 1200;
    const monthlyRevenue = potentialMonthlySales * averageOrderValue;

    return [{
        互動量計算: {
            總互動數: {
                公式: "總喜歡數 + 總評論數",
                計算結果: totalInteractions
            },
            平均每篇互動率: {
                公式: "總互動數 ÷ 貼文數 ÷ 追蹤者數量",
                計算結果: engagementRate
            }
        },
        銷售量預估分析: {
            每月潛在銷售量計算: {
                公式: "平均每篇互動數 × 假設下單率 5%",
                計算結果: potentialMonthlySales
            },
            平均客單價: {
                假設平均客單價: averageOrderValue
            }
        },
        潛在每月收益: {
            收益預估: {
                公式: "每月潛在銷售量 × 平均客單價",
                計算結果: monthlyRevenue
            }
        }
    }];
}

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
                    likes_and_comments: post.like_count + post.comments_count
                }))
        };
        console.log(transformedData)
        // Replace the ChatGPT call for revenue estimation with direct calculation
        const revenueEstimation = calculateRevenueEstimation(transformedData.followers, transformedData.posts);
        
        // Run all prompts in parallel
        const {
            個人風格分析,
            品牌定位,
            目標受眾洞察,
            產品策略,
            品牌核心理念,
            行銷規劃,
            品牌形象風格,
            品牌聲音
        } = await Promise.all([
            generateChatGPTResponse(stylePrompt, transformedData, 'gpt-4o-mini')
                .then(res => ({ 個人風格分析: res.個人風格分析 })),
            generateChatGPTResponse(targetPrompt, transformedData, 'gpt-4o-mini')
                .then(res => ({ 目標受眾洞察: res.目標受眾洞察 })),
            generateChatGPTResponse(brandPrompt, transformedData, 'gpt-4o-mini')
                .then(res => ({ 品牌定位: res.品牌定位 })),
            generateChatGPTResponse(productLinePrompt, transformedData, 'gpt-4o-mini')
                .then(res => ({ 產品策略: res.產品策略 })),
            generateChatGPTResponse(coreValuePrompt, transformedData, 'gpt-4o-mini')
                .then(res => ({ 品牌核心理念: res.品牌核心理念 })),
            generateChatGPTResponse(socialMediaPrompt, transformedData, 'gpt-4o-mini')
                .then(res => ({ 行銷規劃: res.行銷規劃 })),
            generateChatGPTResponse(brandDesignPrompt, transformedData, 'gpt-4o-mini')
                .then(res => ({ 品牌形象風格: res.品牌形象風格 })),
            generateChatGPTResponse(brandVoicePrompt, transformedData, 'gpt-4o-mini')
                .then(res => ({ 品牌聲音: res.品牌聲音 }))
        ]).then(results => Object.assign({}, ...results));

        const endTime = performance.now();
        console.log(`Instagram analysis took ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
        return {
            個人風格分析,
            品牌定位,
            目標受眾洞察,
            產品策略,
            品牌核心理念,
            行銷規劃,
            品牌形象風格,
            品牌聲音,
            收益預估: revenueEstimation
        } as BrandAnalysis;

    } catch (error) {
        const endTime = performance.now();
        console.error(`Instagram analysis failed after ${((endTime - startTime) / 1000).toFixed(2)} seconds:`, error);
        throw error;
    }
};

export function returnMindyAccount(): BrandAnalysis {
    return dummyBrandAnalysis;
}





