const  axios      = require('axios');
const Joi         = require('joi')

const {emailRecipientDb}    = require('../../data-access-cockroach')
const  makeCreateEmailRecipient= require('./createRecipient')
const  createEmailRecipient = makeCreateEmailRecipient({axios,createEmailRecipientEntry:emailRecipientDb.createEmailRecipientEntry,Joi})
const attachmentUseCase=Object.freeze({
    createEmailRecipient
})

module.exports=attachmentUseCase;