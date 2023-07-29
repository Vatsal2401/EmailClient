const { Kafka } = require('kafkajs')
const {folderUseCase}=require("../use-cases");
const createFolder=folderUseCase.createFolderAction;
const kafka = new Kafka({
  clientId: 'my-app1',
  brokers: ['localhost:9092']
})
const DefaultFolders=[{
    name: "INBOX",
    priority:3
    // providerId: 1,
  },
  {
    name: "SENT",
    priority: 2,
  },
  {
    name: "ARCHIVED",
    // providerId: 3,
  },
  {
    name: "OUTBOX",
    // providerId: 4,
  },
  {
    name: "TRASH",
    // providerId: 5,
  }]
async function createFolderFun(value,folderobj){ 
  console.log(value);
  const databaseName="db1"
    console.log("called");
    try {
        const folderdata={
             name:folderobj.name,
            //  providerId:folderobj.providerId,
             userId:JSON.parse(value).user
        }
        console.log(folderdata);
        const result=await createFolder({folderdata,databaseName})
    } catch (error) {
         console.log({ error: error });
    }
}
const consumer = kafka.consumer({ groupId: 'test-group' })
const run = async () => {
    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'userCreated', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        DefaultFolders.forEach(async(obj)=> await createFolderFun(message.value.toString(),obj)); 
        // for (const folder of DefaultFolders) {
        //   await createFolderFun(message.value.toString(),folder)
        // }
        
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