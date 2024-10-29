import os
from openai import OpenAI
from openai import APIError, RateLimitError, AuthenticationError
import sys
import json

def get_api_key():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("No API key found. Please set the OPENAI_API_KEY environment variable.")
    return api_key

def create_openai_client(api_key):
    return OpenAI(api_key=api_key)

def analyze_social_media_content(prompt, image_urls, captions, like_comments, followers_count, bio, model="gpt-4o-mini"):
    
    content = [{"type": "text", "text": prompt}]
    
    api_key = get_api_key()
    client = create_openai_client(api_key)
    # Add image URLs and captions to the content
    for i, (url, caption, lc) in enumerate(zip(image_urls, captions, like_comments)):
        content.append({
            "type": "image_url",
            "image_url": {"url": url}
        })
        content.append({
            "type": "text",
            "text": f"Post {i+1} Caption: {caption}\nLikes + Comments: {lc}"
        })
    
    # Add followers count and bio
    content.append({
        "type": "text",
        "text": f"Followers Count: {followers_count}\nBio: {bio}"
    })
    
    messages = [
        {"role": "user", "content": content}
    ]
    
    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            max_tokens=2000,  # Increased token limit for a more comprehensive response
            response_format={"type": "json_object"}  # Request JSON response
        )
        result = response.choices[0].message.content
    except RateLimitError:
        result = "API quota exceeded. Please check your OpenAI plan and billing details."
    except AuthenticationError:
        result = "Authentication error. Please check your API key."
    except APIError as e:
        result = f"OpenAI API error: {str(e)}"
    except Exception as e:
        result = f"An unexpected error occurred: {str(e)}"

    return result
