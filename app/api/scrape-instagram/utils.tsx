

export function calculateRevenueEstimation(followers: number, posts: any[]) {
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
