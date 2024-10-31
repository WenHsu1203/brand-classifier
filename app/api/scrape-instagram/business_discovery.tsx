import { getCredentials, makeApiCall } from './defines';

interface AccountInfoParams {
  access_token: string;
  endpoint_base: string;
  instagram_account_id: string;
  debug: string;
}

export const getAccountInfo = async (params: AccountInfoParams, igUsername: string) => {
  /* Get info on a users account
   *
   * API Endpoint:
   *   https://graph.facebook.com/{graph-api-version}/{ig-user-id}?fields=
   *     business_discovery.username({ig-username}){username,website,name,ig_id,id,
   *     profile_picture_url,biography,follows_count,followers_count,media_count,media}
   */
  
  const endpointParams: Record<string, string> = {
    fields: `business_discovery.username(${igUsername}){biography,followers_count,media{caption,media_type,media_url,thumbnail_url,comments_count,like_count}}`,
    access_token: params.access_token
  };

  const url = params.endpoint_base + params.instagram_account_id;
  
  return makeApiCall(url, endpointParams, params.debug);
}; 