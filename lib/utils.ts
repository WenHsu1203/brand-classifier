import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to assign icons based on section title
export const getIconForSection = (title: string): string => {
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
  return iconMap[title as keyof typeof iconMap] || "✨"; // Default icon if not found
}