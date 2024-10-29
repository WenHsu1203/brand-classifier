from defines import GetCredentials, MakeApiCall
import datetime

def debugAccessToken(params):
  """Get info on an access token
  
  API Endpoint:
    https://graph.facebook.com/
    debug_token?input_token={input-token}&access_token={valid-access-token}
  Return:
    object: data from the endpoint
  """ 
  endpointParams = dict()
  endpointParams['input_token'] = params['access_token']
  endpointParams['access_token'] = params['access_token']
  
  url = params['graph_domain'] + '/debug_token'
  
  return MakeApiCall(url, endpointParams, params['debug'])


params = GetCredentials()
params['debug'] = 'yes'
response = debugAccessToken(params)

print("\nData Access Expires at: " + datetime.datetime.fromtimestamp(response['json_data']['data']['expires_at']).strftime('%Y-%m-%d %H:%M:%S'))
