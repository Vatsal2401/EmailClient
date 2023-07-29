function makeUpdateUserAccessToken({updateToken,Joi,isUserExist}){
    return async function updateUserAccessToken({userid,access_token,access_token_expiry_date}){
      const result= await updateToken({id:userid,access_token,access_token_expiry_date})
      return result;
    }
 }

module.exports=makeUpdateUserAccessToken;