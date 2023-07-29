function getMessagesList({ axios ,getUserAccessToken}) {
  return async function getEmails({ userId, labelId, nextPageToken,Batchsize }) {
    let url;
    if (nextPageToken) {
      const pageToken = nextPageToken;
      url = `https://www.googleapis.com/gmail/v1/users/me/messages?pageToken=${pageToken}`;
    } else {
      url = "https://www.googleapis.com/gmail/v1/users/me/messages";
    }
    const params = {
      q: `label:${labelId} newer_than:1d`,
      maxResults: Batchsize,
    };
    // const 
    const accessToken=await getUserAccessToken({userId})
    console.log(accessToken);
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    // Send the API request using Axios
    const response = await axios.get(url, { params, headers });
    // Parse the response to extract the message IDs
    const messages = response.data;
    return messages;
  };
  function validateUser({ id }) {
    const schema = Joi.object({
      id: Joi.string().uuid(),
    });
    return schema.validate({ id });
  }
}
module.exports = getMessagesList;
