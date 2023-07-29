function storeAttachementInDisk({axios,getUserAccessToken,Joi,fs,path}){
    return async function storeAttachement({attachmentType,attachmentBuffer,filename}){
        const attachmentString =JSON.parse(attachmentBuffer.data.toString('utf-8'));
        const decode= Buffer.from(attachmentString.data, 'base64');
        let publicPath = path.join(__dirname,"../../../public");
        fs.writeFile(`${publicPath}/${filename}`, decode, 'binary', (err) => {
        if (err) throw err;
        // console.log('Attachment saved to', filePath);
      });
          return true;
    }
    function validateUser({id}){
        const schema=Joi.object({
            id:Joi.string().uuid()
        })
        return schema.validate({id})
    }
 }
module.exports=storeAttachementInDisk;