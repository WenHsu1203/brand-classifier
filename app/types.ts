interface RevenueEstimation {
  互動量計算: {
    formula: string;
    result: string;
  };
  平均每篇互動率: {
    formula: string;
    result: string;
  };
  銷售量預估分析: {
    formula: string;
    result: string;
  };
  平均客單價: {
    value: string;
  };
  潛在每月收益: {
    formula: string;
    result: string;
    description: string;
  };
}

interface BrandAnalysis {
  // ... other existing types ...
  收益預估: RevenueEstimation[];
} 