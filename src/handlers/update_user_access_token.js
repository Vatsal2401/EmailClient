const { Kafka } = require('kafkajs')
const {userUseCase}=require("../use-cases");
const {userDb}=require("../data-access-cockroach")
const kafka = new Kafka({
  clientId: 'my-app1',
  brokers: ['localhost:9092']
})
async function updateAccessToken(){
    
    // const result                  =  await userUseCase.getAllUserAction({})
    const currentCronJobTimestamp =  Date.now();
    const laterCronJobTimestamp   = currentCronJobTimestamp + (30 * 60 * 1000);

    // console.log("expiry time",result.rows[0].access_token_expiry_date);
    // const date = new Date(parseInt(result.rows[0].access_token_expiry_date));
    // const formattedDateExpiryTime = date.toLocaleString();
    // console.log(formattedDateExpiryTime);
    const result       =  await userDb.getAllUserByExpiry({expiringtime:laterCronJobTimestamp})
    for (let i = 0; i < result.rows.length; i++) {
      // const element = array[i];
      const Tokens     =  await userUseCase.getAccessToken({refreshToken:result.rows[i].refresh_token})
      const results    =  await userUseCase.updateAccessToken({userid:result.rows[i].id,access_token:Tokens.access_token,access_token_expiry_date:Tokens.expiry_date})
      
    }      
   
         
}
 updateAccessToken()

const consumer = kafka.consumer({ groupId: 'test-group' })
const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'RenewAccessToken', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
         await updateAccessToken()
    },
  })
}
  
  // run().catch(console.error)