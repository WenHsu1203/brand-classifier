from defines import GetCredentials, MakeApiCall

def GetUserMedia(params, instagram_account_id, limit=15):
  """ Get users Media

  API Endpoint:
    https://graph.facebook.com/{graph-api-version}/{ig-user-id}/media?fields={fields}&access_token={access-token}&limit={limit}
  
  Returns:
      object: data from the endpoint
  """
  
  endpointParams = dict()
  endpointParams['fields'] = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username'
  endpointParams['access_token'] = params['access_token']
  endpointParams['limit'] = limit
  
  url = params['endpoint_base'] + instagram_account_id + '/media'
  print(url)
  
  return MakeApiCall(url, endpointParams, params['debug'])
