function makeCreateUserAction({ createUser, Joi, isUserEmailExist, Kafka }) {
   async function kafkaRun(value,producer){
        await producer.connect()
        await producer.send({
          topic: 'userCreated',
          messages: [
            { 
                value:value 
            },
          ],
        })
    }
  return async function createUserAction({ userdata,databaseName }) {
    // Create the client with the broker list
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["localhost:9092"]
    });
    const producer = kafka.producer()
    // const { error } = await validateUser(userdata);
    // if (error) {
    //   throw new Error(error.message);
    // }
    const email = userdata.email;
    // const isEmail = await isUserEmailExist({ email,databaseName });
    // if (isEmail[0]) {
    //   throw Error("User with the same email is already exists");
    // }
    const result = await createUser({ userdata,databaseName });
    console.log("sjdnfkj",result);
    const value=JSON.stringify({user:result.rows[0].id,databaseName:"db1"})
    await kafkaRun(value,producer)
    //     await producer.connect()
    //     await producer.send({
    //       topic: 'folder',
    //       messages: [
    //         { 
    //             value: result.insertId.toString(),
    //             // userId:
    //         },
    //       ],
    //     })
    // }
    return result;

  };
  async function validateUser(userdata) {
    const schema = Joi.object({
      id:Joi.string().uuid(),
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      // access_token: ,
      // refresh_token 
    });
    return schema.validate(userdata);
  }
}

module.exports = makeCreateUserAction;
