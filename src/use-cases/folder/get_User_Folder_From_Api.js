function getFoldersFromApi({googleGmailAPIs,axios}){
    return async function getFoldersFromApiAction({AccessToken,email}){
        try {
            // return await getAllFolder({databaseName})
            const response = await axios.get('https://www.googleapis.com/gmail/v1/users/me/labels', {
                headers: {
                  Authorization: `Bearer ${AccessToken}`
                }
              });
              const labels = response.data.labels;
              console.log(labels);
              return labels;  
        } catch (error) {
            throw error
        }
    }
 }
module.exports=getFoldersFromApi;