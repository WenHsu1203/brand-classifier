from defines import GetCredentials, MakeApiCall

def getAccountInfo(params, ig_username):
  """ Get info on a users account

  API Endpoint:
    https://graph.facebook.com/{graph-api-version}/{ig-user-id}?fields=
      business_discovery.username({ig-username}){username,website,name,ig_id,id,
        profile_picture_url,biography,follows_count,followers_count,media_count, media}&access_token={access-token}
  Return:
    object: data from the endpoint
  """
  endpointParams = dict() 
  endpointParams['fields'] = 'business_discovery.username(' + ig_username + ')' + '\
      {username,website,name,ig_id,id,profile_picture_url,biography,follows_count,\
      followers_count,media_count, media{id,caption,media_type,media_url,thumbnail_url, \
      comments_count, like_count}}'
  endpointParams['access_token'] = params['access_token']
  
  url = params['endpoint_base'] + params['instagram_account_id']
  
  return MakeApiCall(url, endpointParams, params['debug'])

