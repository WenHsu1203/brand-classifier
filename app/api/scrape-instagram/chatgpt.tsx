import { BrandAnalysis } from './anaylyze_ig_account';

// Cache interface
interface CacheEntry {
    timestamp: number;
    data: BrandAnalysis;
}

// Cache configuration
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const cache = new Map<string, CacheEntry>();

// Add model type for type safety
type OpenAIModel = 'gpt-4o-mini' | 'gpt-4o';

// Generate a cache key based on prompt and Instagram data
function generateCacheKey(
    prompt: string,
    instagramData: {
        followers: number;
        bio: string;
        posts: Array<{
            likes_and_comments: number;
            caption: string;
            image_url: string;
        }>;
    },
    model: OpenAIModel
): string {
    const dataFingerprint = {
        followers: instagramData.followers,
        bio: instagramData.bio,
        postsCount: instagramData.posts.length,
        totalEngagement: instagramData.posts.reduce((sum, post) => sum + post.likes_and_comments, 0),
    };
    return `${model}_${prompt}_${JSON.stringify(dataFingerprint)}`;
}

// Check if cache entry is valid
function isCacheValid(entry: CacheEntry): boolean {
    const now = Date.now();
    return now - entry.timestamp < CACHE_DURATION;
}

async function generateChatGPTResponse(
    prompt: string,
    instagramData: {
        followers: number;
        bio: string;
        posts: Array<{
            likes_and_comments: number;
            caption: string;
            image_url: string;
        }>;
    },
    model: OpenAIModel = 'gpt-4o-mini'
): Promise<BrandAnalysis> {
    try {
        // Generate cache key
        const cacheKey = generateCacheKey(prompt, instagramData, model);

        // Check cache
        const cachedEntry = cache.get(cacheKey);
        if (cachedEntry && isCacheValid(cachedEntry)) {
            console.log('Using cached response');
            return cachedEntry.data;
        }

        console.log(`Making new API call with model: ${model}`);
        const apiStartTime = performance.now();

        // Base messages array
        const messages = [
            {
                role: 'system',
                content: 'You are a helpful assistant that always responds in JSON format.'
            },
            {
                role: 'user',
                content: `Analyzing Instagram account with ${instagramData.followers} followers. Bio: ${instagramData.bio}`
            },
            ...instagramData.posts.map((post) => ({
                role: 'user',
                content: `This post has ${post.likes_and_comments} likes and comments. Caption: ${post.caption}. Image URL: ${post.image_url}`
            })),
            {
                role: 'user',
                content: prompt,
            }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model,
                messages,
                temperature: 0.7,
                max_tokens: 10000,
                response_format: { type: "json_object" },
            }), 
        });

        const data = await response.json();
        const apiEndTime = performance.now();
        console.log(`OpenAI API call with ${model} took ${((apiEndTime - apiStartTime) / 1000).toFixed(2)} seconds`);

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
        }

        if (!data.choices || !data.choices.length || !data.choices[0].message) {
            throw new Error('Invalid response format from OpenAI API');
        }

        // Parse and cache the response
        const analysisContent = JSON.parse(data.choices[0].message.content);
        cache.set(cacheKey, {
            timestamp: Date.now(),
            data: analysisContent
        });

        return analysisContent as BrandAnalysis;

    } catch (error) {
        console.error('Error generating ChatGPT response:', error);
        throw error;
    }
}

// Optional: Clean up expired cache entries periodically
function cleanupCache() {
    // Convert cache entries to array before iterating
    Array.from(cache.entries()).forEach(([key, entry]) => {
        if (!isCacheValid(entry)) {
            cache.delete(key);
        }
    });
}

// Run cleanup every hour
setInterval(cleanupCache, 60 * 60 * 1000);

export default generateChatGPTResponse; 