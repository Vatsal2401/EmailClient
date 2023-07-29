
const { Kafka } = require('kafkajs')
const {folderUseCase}=require("../use-cases");
const {folderDb}=require("../data-access-cockroach")

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})
const value={
  user:"6becd34b-d404-4c12-98b1-642729fce102",
  access_token:"ya29.a0Ael9sCMEfIuJxY3eZVscGVM700rCbYcHD7UXlwVi_bqjLLNJHPz_NGbc6L8f1cXauIXs4rii2Xr1p6axIpJCEuHAA4pCh37lNOyl9N3dvaGpGmwG5vSJQOTIE_P5LL5QKO3rCX4h8j_fhK88KV5w42JlcohBaCgYKAYoSARESFQF4udJhAdNMTF3Z5HPN0T7Y2LmXFQ0163"
}
async function getAndUpdateLable(value){
  try {
    // console.log(value1.access_token);
    const lables    =  await folderUseCase.getUserLables({AccessToken:value.access_token})
    console.log(lables);
   for (let i = 0; i < lables.length; i++) {
      const userfolder = {
        providerId  :lables[0].id,
        userId:value.user,
        name:lables[i].name
    }
    console.log(userfolder);
      // const isUserFolder    =  await folderDb.isUserFolderExists({userfolder})
      const isUserFolder=await folderUseCase.isUserFolderExists({userfolder})
      const folderdata={
        name:lables[i].name,
        userId:value.user,
        providerId: lables[i].id
    }
    // console.log(folderdata);
    console.log("in handler ",isUserFolder)
    if(isUserFolder.rows[0]){
       const result = await folderUseCase.updateFolderAction({folderdata})
     } 
     else{
       const result = await folderUseCase.createFolderAction({folderdata})
     }
  
     
 }
  } catch (error) {
    console.log(error);
    // if (error.response&&error.status==401&&error.statusText=="Unauthorized") {

    //   getAndUpdateLable(value)
    // }
    // console.log(error.response.status);
    // console.log(error.response.statusText);
    // if(error.response.status==401 && error.response.statusText=="Unauthorized"){

    // }
  }

}
async function kafkaProducerRun(message,producer){
  await producer.connect()
  await producer.send({
    topic: 'FolderCreated',
    messages: [
      { 
          value:message 
      },
    ],
  })
}
// getAndUpdateLable(value)
const consumer = kafka.consumer({ groupId: 'test-group1' })
const producer =kafka.producer()
const run = async () => {
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'userCreated', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value=JSON.parse(message.value.toString())
        await getAndUpdateLable(value)
        const message=JSON.stringify({message:"Folder Created",user:value.user})
        await kafkaProducerRun(message,producer)
      },
    })
  }
  
  run().catch(console.error)