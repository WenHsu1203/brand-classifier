import { BrandAnalysis } from './anaylyze_ig_account';

// Add this near the top of the file, after imports
if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

interface InstagramPost {
    image_url: string;
    caption: string;
    likes: number;
    comments: number;
}

interface InstagramData {
    followers: number;
    bio: string;
    posts: InstagramPost[];
}

async function generateChatGPTResponse(
    prompt: string,
    instagramData: InstagramData
): Promise<BrandAnalysis> {
    try {
        // Add debug logging
        console.log('API Key exists:', !!process.env.OPENAI_API_KEY);

        // Remove or simplify the contextMessage since we're providing the data in messages
        const fullPrompt = prompt; // Just use the original prompt

        // Make API call to ChatGPT (you'll need to implement this based on your API setup)
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // or your preferred model
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant that always responds in JSON format.'
                    },
                    {
                        role: 'user',
                        content: `Analyzing Instagram account with ${instagramData.followers} followers. Bio: ${instagramData.bio}`
                    },
                    ...instagramData.posts.map(post => ({
                        role: 'user',
                        content: [
                            {
                                type: "image_url",
                                image_url: {
                                    url: post.image_url,
                                    detail: "low"  // Can be "low", "high", or "auto"
                                }
                            },
                            {
                                type: "text",
                                text: `This post has ${post.likes} likes and ${post.comments} comments. Caption: ${post.caption}`
                            }
                        ]
                    })),
                    {
                        role: 'user',
                        content: fullPrompt,
                    },
                ],
                temperature: 0.7,
                max_tokens: 2000,
                response_format: { type: "json_object" },
            }),
        });

        const data = await response.json();

        // Add error handling for API response
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${data.error?.message || 'Unknown error'}`);
        }

        // Check if we have a valid response with choices
        if (!data.choices || !data.choices.length || !data.choices[0].message) {
            throw new Error('Invalid response format from OpenAI API');
        }

        // Parse the JSON string into an object
        const analysisContent = JSON.parse(data.choices[0].message.content);

        // Return the parsed content as BrandAnalysis
        return analysisContent as BrandAnalysis;

    } catch (error) {
        console.error('Error generating ChatGPT response:', error);
        throw error;
    }
}

export default generateChatGPTResponse; 