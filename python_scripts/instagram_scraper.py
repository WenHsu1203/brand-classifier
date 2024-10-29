from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import sys
import json

def scrape_instagram(username):
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--disable-extensions")
    options.add_argument("--disable-infobars")
    options.add_argument("--disable-notifications")
    options.add_argument("--blink-settings=imagesEnabled=false")  # Disable image loading

    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.set_page_load_timeout(10)  # Set page load timeout
        driver.get(f"https://www.instagram.com/{username}/")

        # Wait for the profile information to be present
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "header section"))
        )

        # Extract profile information
        header = driver.find_element(By.CSS_SELECTOR, "header section")
        full_name = header.find_element(By.CSS_SELECTOR, "h2").text
        
        stats = header.find_elements(By.CSS_SELECTOR, "ul li")
        posts_count = stats[0].text.split()[0]
        followers_count = stats[1].text.split()[0]
        following_count = stats[2].text.split()[0]

        # Try to get biography
        try:
            biography = driver.find_element(By.CSS_SELECTOR, "header > section > div:nth-child(3)").text
        except:
            biography = ""

        return {
            "username": username,
            "full_name": full_name,
            "biography": biography,
            "posts_count": posts_count,
            "followers_count": followers_count,
            "following_count": following_count
        }

    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}
    finally:
        driver.quit()

def main():
    if len(sys.argv) > 1:
        username = sys.argv[1].lstrip('@')
        result = scrape_instagram(username)
        print(json.dumpsresult))
    else:
        print(json.dumps({"error": "No username provided"}))

if __name__ == "__main__":
    main()
