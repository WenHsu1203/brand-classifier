from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time
import requests
from bs4 import BeautifulSoup
import re
import json
import os
from urllib.parse import urlparse
import csv

# Add this function to load the JSON config
def load_config():
    try:
        with open('config.json', 'r') as config_file:
            return json.load(config_file)
    except FileNotFoundError:
        print("Error: config.json file not found.")
        return {}
    except json.JSONDecodeError:
        print("Error: config.json file is not valid JSON.")
        return {}

# Load the configuration
config = load_config()
print("Loaded config:", config)

driver = webdriver.Chrome()
driver.get("https://www.instagram.com")

username = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='username']")))
password = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='password']")))

print("Username:", config.get('instagram_username'))
print("Password:", config.get('instagram_password'))
username.clear()
username.send_keys(config.get('instagram_username'))
password.clear()
password.send_keys(config.get('instagram_password'))

button = WebDriverWait(driver, 2).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']")))
button.click()

# Add a wait for the login process
time.sleep(2)  # Wait for 2 seconds

# Check if login was successful
try:
    # Look for an element that's only present after successful login
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//a[contains(@href, '/direct/inbox/')]")))
    print("Login successful!")
except TimeoutException:
    print("Login failed. Please check your credentials.")

search_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "svg[aria-label='Search']")))
search_button.click()

searchbox = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//input[@placeholder='Search']")))
searchbox.clear()

keyword = "@iamqhsin"
searchbox.send_keys(keyword)
if keyword.startswith("@"):
    keyword = keyword[1:]

# Wait for search results to load
time.sleep(2)
first_result = driver.find_element(By.XPATH, f'//span[text()="{keyword}"]')
first_result.click()

# TODO: Get the bio/name/followers count

# After navigating to the user's profile
print(f"Navigated to profile: {driver.current_url}")

# Initialize variables
initial_height = driver.execute_script("return document.body.scrollHeight")
soups = []
post_count = 0
max_posts = 15
scroll_attempts = 0
max_scroll_attempts = 5

while post_count < max_posts and scroll_attempts < max_scroll_attempts:
    # Scroll down
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(5)  # Wait for new content to load
    
    # Get the page source and parse it
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    
    # Find all post elements (try different selectors)
    post_urls = []
    elements = soup.find_all('a', class_="x1i10hfl xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x972fbf xcfux6l x1qhh985 xm0m39n x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _a6hd")
    post_urls.extend(element['href'] for element in elements if element.get('href', '').startswith(("/p", "/reel/")))
    print(f"Found {len(post_urls)} posts on this scroll")
    
    # Process new posts
    for post_url in post_urls:
        if post_url not in soups:
            soups.append(post_url)
            post_count += 1
            print(f"Collected post {post_count}")
            
            if post_count >= max_posts:
                break
    
    # Check if we've reached the end of the page
    current_height = driver.execute_script("return document.body.scrollHeight")
    if current_height == initial_height:
        scroll_attempts += 1
        print(f"No new content loaded. Attempt {scroll_attempts} of {max_scroll_attempts}")
    else:
        scroll_attempts = 0
    initial_height = current_height

print(f"Total posts collected: {post_count}")

if post_count == 0:
    print("No posts were found. Possible reasons:")
    print("1. The account might be private")
    print("2. The account might not have any posts")
    print("3. Instagram's page structure might have changed")
    print("4. There might be an issue with loading the content")
    
    # Print the current page source for debugging
    print("\nCurrent page source:")
    print(driver.page_source[:1000])  # Print first 1000 characters

# Process the collected posts
for i, post in enumerate(soups[:15], 1):
    # Extract information from each post
    # This is a placeholder - you'll need to adjust based on the actual structure
    print(f"Post {i}: {post}")  # Print the post URL
    
query_params = "__a=1&__d=dis"
json_list = []
for url in soups:
    try:
        current_url = driver.current_url
        modified_url = "https://www.instagram.com/" + url + "?" + query_params
        driver.get(modified_url)
        time.sleep(1)
        
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//pre")))
        pre_tag = driver.find_element(By.XPATH, "//pre")
        
        json_script = pre_tag.text
        json_parsed = json.loads(json_script)
        json_list.append(json_parsed)
    except Exception as e:
        print(f"Error processing post {url}: {e}")

print("Number of json lists: " + str(len(json_list)))
all_urls = []
all_captions = []
all_likes = []


for json_data in json_list:
    item_list = json_data.get('items', [])
    for item in item_list:
        caption = item['caption']['text']
        all_captions.append(caption)
        likes = item['like_count']
        all_likes.append(likes)
        image_url = item.get('image_versions2', {}).get('candidates', [{}])[0].get('url')
        if image_url:
            all_urls.append(image_url)


print("URLs:")
for i, url in enumerate(all_urls, 1):
    print(f"{i}. {url}")

print("\nCaptions:")
for i, caption in enumerate(all_captions, 1):
    print(f"{i}. {caption[:100]}{'...' if len(caption) > 100 else ''}")
# Keep the browser open
print("\nLikes:")
for i, likes in enumerate(all_likes, 1):
    print(f"{i}. {likes}")
    
input("Press Enter to close the browser...")


# Close the browser
driver.quit()
