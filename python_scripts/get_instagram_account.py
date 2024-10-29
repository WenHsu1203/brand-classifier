from defines import GetCredentials, MakeApiCall

def getInstagramAccount(params):
  """ Get info on an instagram account

  API Endpoint:
    https://graph.facebook.com/{graph-api-version}/{page-id}?access_token={access-token}&f
    ields=instagram_business_account
  Return:
    object: data from the endpoint
  
  """
  endpointParams = dict()
  endpointParams['access_token'] = params['access_token']
  endpointParams['fields'] = 'instagram_business_account'
  
  url = params['endpoint_base'] + params['page_id']
  
  return MakeApiCall(url, endpointParams, params['debug'])

params = GetCredentials()
params['debug'] = 'no'

response = getInstagramAccount(params)

print("Page ID: " + response['json_data']['id'])
print("Instagram Account ID: " + response['json_data']['instagram_business_account']['id']) 