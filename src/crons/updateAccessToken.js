const {userUseCase} =require("../use-cases")
const CronJob = require('cron').CronJob;
const job = new CronJob(
    '30 * * * * ',updateAccessTokenCallback,
);
// Use this if the 4th param is default value(false)
// job.start()
async function updateAccessTokenCallback(){
    
    const result                  =  await userUseCase.getAllUserAction({})
    const now=Date.now();
    const currentCronJobTimestamp =  Date.now();
    const laterCronJobTimestamp   = currentCronJobTimestamp+(30*60*1000)
    // console.log(now);
    
    // const expiresAt  =  new Date(result.rows[0].access_token_expiry_date).getTime();
    // console.log("current_time",now);
   
    console.log("expiry time",result.rows[0].access_token_expiry_date);
    const date = new Date(parseInt(result.rows[0].access_token_expiry_date));
    const formattedDateExpiryTime = date.toLocaleString();
    console.log(formattedDateExpiryTime);
        if (currentCronJobTimestamp>result.rows[0].access_token_expiry_date || result.rows[0].access_token_expiry_date < laterCronJobTimestamp) 
        {
           
    const Tokens     =  await userUseCase.getAccessToken({refreshToken:result.rows[0].refresh_token})
    const results    =  await userUseCase.updateAccessToken({userid:result.rows[0].id,access_token:Tokens.access_token,access_token_expiry_date:Tokens.expiry_date})
         }
         else{
            console.log("not updated");
         }
    // const result=await userUseCase
    //  console.log(result.rows[0].refresh_token);
    // console.log(newAccessToken);
}
updateAccessTokenCallback();
// console.log(result);
const timestamp = 1680704390608; // replace with your own timestamp

const date = new Date(timestamp);
const formattedDate = date.toLocaleString();

console.log(formattedDate); // output: "1/2/2023, 10:46:30 AM" (depending on your local time zone)