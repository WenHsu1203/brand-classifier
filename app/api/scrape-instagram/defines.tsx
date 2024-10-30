interface Credentials {
  access_token: string;
  client_id: string;
  client_secret: string;
  graph_domain: string;
  graph_version: string;
  endpoint_base: string;
  debug: string;
  page_id: string;
  instagram_account_id: string;
}

interface ApiResponse {
  url: string;
  endpoint_params: Record<string, any>;
  endpoint_params_pretty: string;
  json_data: any;
  json_data_pretty: string;
}

export const getCredentials = (): Credentials => {
  const creds: Credentials = {
    access_token: 'EAAH4i5UuJHABO9sGZBNbjxq0WZBlo5TM5kZAgxkxnJOZBBCixxX601WEZB2O5tkZCkZCodtvwKCoA5kqCiZBwQ5j6zNVcow7eUZCtP39ZCTk0mOkKMkKojawYXmPkGQZA7Nt7qMHAQjOmb6QuOD444WY23OayxmytsUo2mCyDrnWtIMa9HhA6rK5vsoDceNFHmy8ZC6vbM3k8zRA',
    client_id: '554753363682416',
    client_secret: '7c0c6b49379dfafd2ba0a37808f42de0',
    graph_domain: 'https://graph.facebook.com/',
    graph_version: 'v17.0',
    endpoint_base: '',
    debug: 'no',
    page_id: '470094569513331',
    instagram_account_id: '17841401251947902'
  };
  
  creds.endpoint_base = creds.graph_domain + creds.graph_version + '/';
  
  return creds;
};

export const makeApiCall = async (
  url: string, 
  endpointParams: Record<string, any>, 
  debug: string = 'no'
): Promise<ApiResponse> => {
  const response = await fetch(`${url}?${new URLSearchParams(endpointParams)}`);
  const jsonData = await response.json();
  
  const apiResponse: ApiResponse = {
    url,
    endpoint_params: endpointParams,
    endpoint_params_pretty: JSON.stringify(endpointParams, null, 4),
    json_data: jsonData,
    json_data_pretty: JSON.stringify(jsonData, null, 4)
  };
  
  if (debug === 'yes') {
    displayApiCallData(apiResponse);
  }
  
  return apiResponse;
};

export const displayApiCallData = (response: ApiResponse): void => {
  console.log('\nURL: ' + response.url);
  console.log('\nEndpoint Params: ' + response.endpoint_params_pretty);
  console.log('\nJSON Data: ' + response.json_data_pretty);
};
