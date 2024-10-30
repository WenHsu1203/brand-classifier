import { getAccountInfo } from './business_discovery';
import { getCredentials } from './defines';

async function test() {
    const creds = getCredentials();
    const igUsername = 'heyitsmindyy';
    
    try {
        const response = await getAccountInfo(creds, igUsername);
        if (response.json_data.error) {
            throw new Error(response.json_data.error.message);
        }
        
        // Pretty print the results
        console.log('\n=== Instagram Account Info for @heyitsmindyy ===');
        const businessDiscovery = response.json_data.business_discovery;
        if (businessDiscovery) {
            console.log(`Username: ${businessDiscovery.username}`);
            console.log(`Name: ${businessDiscovery.name}`);
            console.log(`Followers: ${businessDiscovery.followers_count}`);
            console.log(`Following: ${businessDiscovery.follows_count}`);
            console.log(`Media Count: ${businessDiscovery.media_count}`);
            console.log(`Bio: ${businessDiscovery.biography}`);
            
            // Print recent media if available
            if (businessDiscovery.media && businessDiscovery.media.data) {
                console.log('\nRecent Media:');
                businessDiscovery.media.data.forEach((post: any, index: number) => {
                    console.log(`\nPost ${index + 1}:`);
                    console.log(`Type: ${post.media_type}`);
                    console.log(`Likes: ${post.like_count}`);
                    console.log(`Comments: ${post.comments_count}`);
                    console.log(`Caption: ${post.caption?.substring(0, 100)}...`);
                });
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

test();