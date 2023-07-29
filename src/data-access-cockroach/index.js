const config=require("../config")
const makeUserDb=require("./user.db")
const makeFolderDb=require("./folder.db")
const makeEmailDb=require("./email.db")
const makeEmailAttachmentDb=require("./attachment.db")
const makeEmailRecipientDb=require("./emailRecipient.db")
const { Client } = require('pg')
 
const client = new Client({
  host: 'localhost',
  port: 26257,
  database: 'db1',
  user: 'vatsal',
  password: 'cockroach',
  ssl: {
    rejectUnauthorized: false,
  },
})
 client.connect()

 
// const res = await client.query('SELECT $1::text as message', ['Hello world!'])
// console.log(res.rows[0].message) // Hello world!
// await client.end()
const emailRecipientDb = makeEmailRecipientDb({cockroach:client})
const userDb           = makeUserDb({cockroach:client})
const folderDb         = makeFolderDb({cockroach:client})
const emailDb          = makeEmailDb({cockroach:client})
const attachmentDb     = makeEmailAttachmentDb({cockroach:client})
module.exports=Object.freeze({
    userDb,folderDb,emailDb,attachmentDb,emailRecipientDb
})
