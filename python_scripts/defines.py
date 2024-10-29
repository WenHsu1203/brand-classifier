import requests
import json

def GetCredentials():
  creds = dict()
  creds['access_token'] = 'EAAH4i5UuJHABO9sGZBNbjxq0WZBlo5TM5kZAgxkxnJOZBBCixxX601WEZB2O5tkZCkZCodtvwKCoA5kqCiZBwQ5j6zNVcow7eUZCtP39ZCTk0mOkKMkKojawYXmPkGQZA7Nt7qMHAQjOmb6QuOD444WY23OayxmytsUo2mCyDrnWtIMa9HhA6rK5vsoDceNFHmy8ZC6vbM3k8zRA'
  creds['client_id'] = '554753363682416'
  creds['client_secret'] = '7c0c6b49379dfafd2ba0a37808f42de0'
  creds['graph_domain'] = 'https://graph.facebook.com/'
  creds['graph_version'] = 'v17.0'
  creds['endpoint_base'] = creds['graph_domain'] + creds['graph_version'] + '/'
  creds['debug'] = 'no'
  creds['page_id'] = '470094569513331'
  creds['instagram_account_id'] = '17841401251947902'
  
  return creds

def MakeApiCall(url, endpointParams, debug = 'no'):
  data = requests.get(url, endpointParams)
  
  response = dict()
  response['url'] = url
  response['endpoint_params'] = endpointParams
  response['endpoint_params_pretty'] = json.dumps(endpointParams, indent=4)
  response['json_data'] = json.loads(data.content)
  response['json_data_pretty'] = json.dumps(response['json_data'], indent=4)
  
  if debug == 'yes':
    displayApiCallData(response)
    
  return response

def displayApiCallData(response):
  print('\nURL: ' + response['url'])
  print('\nEndpoint Params: ' + response['endpoint_params_pretty'])
  print('\nJSON Data: ' + response['json_data_pretty'])