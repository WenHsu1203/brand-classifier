import { getCredentials, makeApiCall } from './defines';

async function test() {
    const creds = getCredentials();
    
    // Example API call to get Instagram account info
    const endpointParams = {
        access_token: creds.access_token,
        fields: 'id,username'
    };
    
    const url = creds.endpoint_base + creds.instagram_account_id;
    
    try {
        const response = await makeApiCall(url, endpointParams, 'yes');
        if (response.json_data.error) {
            throw new Error(response.json_data.error.message);
        }
        console.log('API call successful!');
    } catch (error) {
        console.error('Error:', error);
    }
}

test();
