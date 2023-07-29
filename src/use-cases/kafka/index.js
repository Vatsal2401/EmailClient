const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
  });
const producer = kafka.producer()
producer.connect()
const runKafkaProducer = require("./runProducer")
const runProducer      = runKafkaProducer({producer})

module.exports=Object.freeze({
    runProducer
})