const { Kafka } = require('kafkajs')
const {folderUseCase,emailUseCase,kafkaUseCase}=require("../use-cases");
const kafka = new Kafka({
  clientId: 'my-app1',
  brokers: ['localhost:9092']
})


const consumer = kafka.consumer({ groupId: 'test-group' })
const run = async () => {
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'fetchEmailDetail', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        
        const message=JSON.parse(message.value.toString())
        const nextPageToken    = message.nextPageToken
        const responses        = await emailUseCase.messagesusingBatch({accessToken:value.access_token,messageIds:message.messageIds})
        for (const message of responses) {
           const result        = await emailUseCase.createEmail({message})
          }
        const folderdata={
            userId:
            nextPageToken,
            sync_status:nextPageToken?"fetching":"fetched"
        }
        await folderUseCase.updateTokenAndSyncStatus({folderdata})
        const produce_message=JSON.stringify({message:"",user:message.user})
        await kafkaUseCase.runProducer({message:produce_message,topic:"FolderCreated"})
        // console.log({
        //   partition,
        //   offset: message.offset,
        //   value: message.value.toString(),
        // //   userId:message.userId.toString()
        // })
      },
    })
  }
  
  run().catch(console.error)