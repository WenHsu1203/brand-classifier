export const generateEmailTemplate = (data: any) => {
    // Helper function to safely map data
    const safeMap = (array: any[] | undefined, mapper: (item: any, index: number) => string) => {
        if (!array || !Array.isArray(array)) return '';
        return array.map(mapper).join('');
    };

    // Helper function to get icon for section
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
        return iconMap[title as keyof typeof iconMap] || "✨";
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        .container { max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; }
        .header { color: #333; text-align: center; background: linear-gradient(to right, #9333ea, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .section { margin: 20px 0; padding: 20px; border-radius: 8px; background: linear-gradient(to bottom right, rgba(237,233,254,0.5), rgba(255,237,213,0.5)); }
        .card { background: white; border-radius: 8px; padding: 15px; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
        .content { color: #374151; }
        .label { font-weight: bold; color: #4B5563; }
        .value { color: #6B7280; }
        .step { color: #4B5563; font-size: 1.2em; margin-bottom: 1rem; font-weight: bold; }
        .footer { text-align: center; margin-top: 2rem; color: #6B7280; }
        .analysis-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }
        .strategy-card {
          background: white;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .strategy-title {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 15px;
          color: #4B5563;
        }
        .strategy-item {
          margin-bottom: 15px;
        }
        .strategy-label {
          font-weight: bold;
          color: #4B5563;
          margin-bottom: 5px;
        }
        .strategy-value {
          color: #6B7280;
        }
        .three-column-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }
        .strategy-number {
          font-weight: bold;
          color: #333;
          margin-bottom: 12px;
          font-size: 1.5rem;
          padding: 4px 0;
          border-bottom: 2px solid #eee;
        }
        .revenue-metrics {
          padding: 20px;
        }
        .revenue-item {
          margin-bottom: 24px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        .revenue-section {
          font-size: 1.1rem;
          font-weight: bold;
          color: #2c5282;
          margin-bottom: 16px;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 8px;
        }
        .revenue-subitem {
          margin: 12px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .revenue-label {
          font-size: 0.9rem;
          color: #4a5568;
        }
        .revenue-value {
          font-size: 1rem;
          font-weight: 600;
          color: #2d3748;
        }
        .intro-message {
          text-align: center;
          margin: 20px 0;
          padding: 20px;
          color: #374151;
          line-height: 1.6;
        }
        .next-steps {
          margin: 15px 0;
          padding: 15px;
          background: #f3f4f6;
          border-radius: 8px;
        }
        .next-steps ul {
          list-style-type: none;
          padding-left: 0;
        }
        .next-steps li {
          margin: 10px 0;
          padding-left: 25px;
          position: relative;
        }
        .next-steps li:before {
          content: "•";
          position: absolute;
          left: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div style="color: #000000; padding: 20px 0 40px 0; line-height: 1.6;">
          <p style="font-size: 1.1rem; margin-bottom: 20px;">感謝您使用 <a href="https://www.own-grow.com/home-tw?utm_source=email&utm_medium=embed&utm_campaign=aitool_edm_v1" style="color: #9333ea; text-decoration: none;">Own&Grow</a> 的 AI 品牌顧問！您的專屬品牌策略報告請見下方，報告中我們協助您分析了個人風格與目標受眾、做好品牌定位、再到發想您可以常識的品牌策略，相信能幫助您更清晰地規劃品牌發展。</p>
          <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 15px;">如果有興趣進一步打造產品：</p>
          <ul style="list-style-type: disc; padding-left: 25px; margin: 0;">
            <li style="margin-bottom: 12px;">回覆此信，我們提供限額免費品牌創建諮詢</li>
            <li style="margin-bottom: 12px;">3步驟、2星期打造屬於你的產品</li>
            <li style="margin-bottom: 12px;">此外，這份報告也能成為您與粉絲互動的話題，分享你的策略、收集反饋以精準打造品牌！</li>
          </ul>
        </div>
        
        <h1 style="color: #666666; text-align: center; margin: 40px 0 20px 0; font-size: 2rem; font-weight: bold;">您的品牌策略分析報告</h1>
        
        <!-- Analysis Section -->
        <div class="section">
          <div class="step">第一步：分析</div>
          ${Object.entries(data?.analysisData || {}).map(([title, items]) => `
            <div class="card">
              <div class="title">
                ${getIconForSection(title)} ${title}
              </div>
              <div class="three-column-grid">
                ${safeMap(items as any[], (item: any, index: number) => `
                  <div class="strategy-card">
                    <div class="strategy-number">策略${index + 1}</div>
                    ${Object.entries(item).map(([key, value]) => `
                      <div class="strategy-item">
                        <div class="strategy-label">${key}:</div>
                        <div class="strategy-value">${value}</div>
                      </div>
                    `).join('')}
                  </div>
                `)}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Positioning Section -->
        <div class="section">
          <div class="step">第二步：定位</div>
          ${Object.entries(data?.positioningData || {}).map(([title, items]) => `
            <div class="card">
              <div class="title">
                ${getIconForSection(title)} ${title}
              </div>
              <div class="three-column-grid">
                ${safeMap(items as any[], (item: any, index: number) => `
                  <div class="strategy-card">
                    <div class="strategy-number">策略${index + 1}</div>
                    ${Object.entries(item).map(([key, value]) => `
                      <div class="strategy-item">
                        <div class="strategy-label">${key}:</div>
                        <div class="strategy-value">${value}</div>
                      </div>
                    `).join('')}
                  </div>
                `)}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Strategy Section -->
        <div class="section">
          <div class="step">第三步：發想</div>
          ${Object.entries(data?.strategyData || {}).map(([title, items]) => `
            <div class="card">
              <div class="title">
                ${getIconForSection(title)} ${title}
              </div>
              <div class="three-column-grid">
                ${safeMap(items as any[], (item: any, index: number) => `
                  <div class="strategy-card">
                    <div class="strategy-number">策略${index + 1}</div>
                    ${Object.entries(item).map(([key, value]) => `
                      <div class="strategy-item">
                        <div class="strategy-label">${key}:</div>
                        <div class="strategy-value">${value}</div>
                      </div>
                    `).join('')}
                  </div>
                `)}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Revenue Section -->
        <div class="section">
          <div class="step">第四步：收益預估</div>
          <div class="card">
            <div class="title">
              💰 收益預估
            </div>
            <div class="revenue-metrics">
              ${safeMap(data?.revenueData?.收益預估, (item: any) => {
        const formatValue = (value: number, isPercentage = false) => {
            if (isPercentage) {
                return (value * 100).toFixed(1) + '%';
            }
            return value.toLocaleString();
        };

        const metrics = [
            {
                key: '互動量計算',
                subItems: [
                    { label: '總互動數', value: formatValue(item['互動量計算']['總互動數']['計算結果']) },
                    { label: '平均每篇互動率', value: formatValue(item['互動量計算']['平均每篇互動率']['計算結果'], true) }
                ]
            },
            {
                key: '銷售量預估分析',
                subItems: [
                    { label: '每月潛在銷售量計算', value: formatValue(item['銷售量預估分析']['每月潛在銷售量計算']['計算結果']) },
                    { label: '平均客單價', value: formatValue(item['銷售量預估分析']['平均客單價']['假設平均客單價'] || item['銷售量預估分析']['平均客單價']['計算結果']) }
                ]
            },
            {
                key: '潛在每月收益',
                subItems: [
                    { label: '收益預估', value: formatValue(item['潛在每月收益']['收益預估']['計算結果']) }
                ]
            }
        ];

        return `
                  <div class="content">
                    ${metrics.map(({ key, subItems }) => `
                      <div class="revenue-item">
                        <div class="revenue-section">${key}</div>
                        ${subItems.map(({ label, value }) => `
                          <div class="revenue-subitem">
                            <span class="revenue-label">${label}:</span>
                            <span class="revenue-value">${value}</span>
                          </div>
                        `).join('')}
                      </div>
                    `).join('')}
                  </div>
                `;
    })}
            </div>
          </div>
        </div>

        <div class="footer">
          <p>期待與您合作，一起實現您的品牌夢想！</p>
          <div style="margin-top: 20px; text-align: left;">
            <p style="margin: 0;">Luna Chen</p>
            <p style="margin: 0; color: #666666;">Founder of Own&Grow</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}; 