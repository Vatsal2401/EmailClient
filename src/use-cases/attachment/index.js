const  axios      = require('axios');
const Joi         = require('joi')
const fs          =require('fs')
const path        = require("path")
// fs.writeFile
const {userDb,attachmentDb}    = require('../../data-access-cockroach')
const  makeGetAttachementUsingAPI= require('../attachment/getAttachment')
const  makeCreateAttachment      = require("./createAttachment")
const  storeAttachementInDisk    = require("./storeAttachment")
const  getAttachement            = makeGetAttachementUsingAPI({axios,getUserAccessToken:userDb.getAccessTokenByUserId,Joi})
const  storeAttachement = storeAttachementInDisk({axios,getUserAccessToken:userDb.getAccessTokenByUserId,Joi,fs,path})
const  createAttachment = makeCreateAttachment({axios,createEmailAttachmentEntry:attachmentDb.createEmailAttachmentEntry,Joi})
const attachmentUseCase=Object.freeze({
    getAttachement,
    createAttachment,
    storeAttachement
})

module.exports=attachmentUseCase;