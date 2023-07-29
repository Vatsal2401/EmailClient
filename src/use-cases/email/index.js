const  axios      = require('axios');
const Joi         = require('joi')
const {emailDb,userDb}   = require('../../data-access-cockroach')
const  getEmailByMessageId  = require("./getEmailByMessageId")
const  getMessageListByLabel= require("./getMessageList")
const  makeCreateEmail      = require("./createEmail")
const  makeBatchRequest     = require('./getMessagesUsingBatchRequest')
const  makeGetMessageDetail = require('./getMessageDetail')
const  makeGetAttachementUsingAPI= require('../attachment/getAttachment')
const  getAttachement       = makeGetAttachementUsingAPI({axios,getUserAccessToken:userDb.getAccessTokenByUserId,Joi})
const  getEmailByMid        = getEmailByMessageId({axios})
const  getMessagesList      = getMessageListByLabel({axios,getUserAccessToken:userDb.getAccessTokenByUserId,Joi})
const  createEmail          = makeCreateEmail({createEmail:emailDb.createEmailEntry})
const  getMessageDetail     = makeGetMessageDetail({axios,getUserAccessToken:userDb.getAccessTokenByUserId})
const  messagesusingBatch   = makeBatchRequest({axios})
const emailUseCase=Object.freeze({
    getEmailByMid,
    getMessagesList,
    createEmail,
    messagesusingBatch,
    getMessageDetail,
    getAttachement
})

module.exports=emailUseCase;