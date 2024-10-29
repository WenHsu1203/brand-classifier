from defines import GetCredentials, MakeApiCall
import time

def getUserPages(params):
    """Get facebook pages for a user
    
    API Endpoint:
        https://graph.facebook.com/{graph-api-version}/me/accounts?access_token={access-token}
    Return:
        object: data from the endpoint
    """
    endpointParams = dict()
    endpointParams['access_token'] = params['access_token']
    
    url = params['endpoint_base'] + 'me/accounts'
    
    return MakeApiCall(url, endpointParams, params['debug'])


params = GetCredentials()
params['debug'] = 'no'

user_pages = getUserPages(params)
for page in user_pages['json_data']['data']:
    print(f"Page Name: {page['name']}")
    print(f"Page ID: {page['id']}") # Use the page id here to get the instagram account
    print(f"Page Cate: {page['access_token']}")
    print("---")