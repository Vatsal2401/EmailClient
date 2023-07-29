const userUseCase  =require("./user")
const folderUseCase=require("./folder")
const emailUseCase =require("./email")
const kafkaUseCase  =require("./kafka")
const attachmentUseCase=require("./attachment")
module.exports=Object.freeze({
      userUseCase ,
      folderUseCase,
      emailUseCase,
      kafkaUseCase,
      attachmentUseCase,
})
