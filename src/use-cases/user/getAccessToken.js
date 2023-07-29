// const axios = require('axios');

// // Set up the OAuth 2.0 client ID and client secret
// const clientId = 'YOUR_CLIENT_ID';
// const clientSecret = 'YOUR_CLIENT_SECRET';

// // Set up the refresh token
// const refreshToken = 'YOUR_REFRESH_TOKEN';

// // Request a new access token using the refresh token
// axios.post('https://oauth2.googleapis.com/token', {
//   grant_type: 'refresh_token',
//   client_id: clientId,
//   client_secret: clientSecret,
//   refresh_token: refreshToken
// }).then(response => {
//   const accessToken = response.data.access_token;
//   // Use the access token in subsequent requests
// }).catch(error => {
//   console.error(error);
// });


function getAccessTokenUsingClient({googleGmailAPIs,client}){
    return async function getAccessTokenFun({refreshToken}){
     try {
      console.log(client);
      await client.setCredentials({ refresh_token: refreshToken });
    //  console.log(result);
      console.log(client);
      const { tokens } = await client.refreshToken(refreshToken);
      console.log("fghjb",tokens);
      if (tokens) {
        return tokens
      }
     } catch (error) {
      console.log("g"+error);
     }
     
      // throw new Error("Error in getting access token ");
    }  
 }
module.exports=getAccessTokenUsingClient;