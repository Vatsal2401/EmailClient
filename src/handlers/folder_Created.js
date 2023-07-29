const Batchsize=50;
const { Kafka } = require('kafkajs')
const {emailUseCase,folderUseCase,userUseCase,kafkaUseCase}=require("../use-cases");
const {userDb}=require("../data-access-cockroach")
const kafka = new Kafka({
  clientId: 'my-app1',
  brokers: ['localhost:9092']
})
const value={
  user:"6becd34b-d404-4c12-98b1-642729fce102",
  access_token:"ya29.a0Ael9sCP_TWG-WEgHq1OZL5hYjFP7RWAhvvKNHEjRKJ0NQzIGX3qxOEfo7LC8tri-sr6rl8t01sU1dQgoe0EexwuGIb-CcoljK9a3bKux-y4zMsVdj8fXQHr7iCNAEZVr2xn4HErDXscH_V8_BWBjbvkPJiL8oKxhaCgYKAWISARESFQF4udJhKhUynXUJJoOccVRtGVyduw0167"
}
async function getEmailList(value){
  //  const accessToken= await userUseCase.getUserAccessToken({userId:value.user})
   const labels   = await folderUseCase.getAllFolderAction({userId:value.user})
   console.log(labels.rows);
   //for loop 
   for (const label of labels.rows) {
    if(label.provider_id){
       console.log("getting message list");
       const messages = await emailUseCase.getMessagesList({accessToken:value.access_token,labelId:label.provider_id,Batchsize})
       console.log(label.provider_id,messages.nextPageToken);
      //  create pagination 
      //  created pagination topic publish messages and userid 
      //  listen handler for this created pagination and do batching of 50 message  recursively and make api call after getting response entry email in database
    }
      
   }
  //  //for loop 
  //  console.log(messages);
  //  const  result   = await emailUseCase.getEmailByMid({accessToken:value.access_token,messageId:messages[0].id})
  //  console.log(result.data);
  //  if(result.data.payload.mimeType)
//    const result =await emailUseCase.
}
getEmailList(value)
// async function fetchAllMessages(value,labelId) {
//   // let allMessages = [];

//   // let pageToken = null;
//   do {
//        const messageIds = await emailUseCase.getMessagesList({accessToken:value.access_token,labelId,nextPageToken})
//        const nextPageToken= messageIds.nextPageToken
//        const responses  = await emailUseCase.messagesusingBatch({accessToken:value.access_token,messageIds})
//      for (const message of responses) {
//         const result = await emailUseCase.createEmail({message})
//      }
//     // allMessages = allMessages.concat(messageDetails);

//     pageToken = nextPageToken;
//   } while (pageToken);

//   return allMessages;
// }
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
const consumer = kafka.consumer({ groupId: 'test-group' })
const producer = kafka.producer()
const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'FolderCreated', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
               const value=JSON.parse(message.value.toString())
              //  const messageList  =  await getEmailList(value)
               const priorityFolder        = await folderUseCase.getFolderByPriority({})
               const messages              = await emailUseCase.getMessagesList({userId:value.user,labelId:priorityFolder.provider_id,nextPageToken:priorityFolder.nextPageToken})
               const produce_message       = JSON.stringify({user:value.user,messageList:messages})
               await kafkaUseCase.runProducer({topic:"fetchEmailDetail",message:produce_message})
    },
  })
}
  
  run().catch(console.error)