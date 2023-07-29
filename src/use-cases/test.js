const emailUseCase =require("./email")
const attachmentUseCase=require("./attachment")
const parseMessage = require('gmail-api-parse-message');

const xlsx = require('xlsx');
// console.log(result);
async function getmessageDetail(){
   
     // const result=await emailUseCase.getMessagesList({userId:"8746b4b2-9870-41e5-a0a7-3252442a7ddd",labelId:"INBOX",Batchsize:"1"})
     const userId="8746b4b2-9870-41e5-a0a7-3252442a7ddd";
     const result         =  await emailUseCase.getMessageDetail({userId,messageId:"18792fa297ab7656"})
     const email          =  parseMessage(result.data);
     const snippet     = email.snippet  ? email.snippet  : "" ;
     const thread_id   = email.threadId ? email.threadId : "" ;
     const createdAt   = parseInt(email.internalDate) ? parseInt(email.internalDate) : '';
     const is_read     = email.labelIds.find(label => label === 'UNREAD') ? false : true;
     const is_trashed  = email.labelIds.find(label => label === 'TRACE')  ? true : false;
     const is_archive  = email.labelIds.find(label => label === 'INBOX')  ? false : (!is_read ? false : (is_trashed ? false : true));
     const scheduled_at= email.labelIds.find(label => label === 'UNSEND' & label === 'DRAFT') ? true : false;
     const body_html   = email.textHtml  ? email.textHtml  : "" ;
     const body_text   = email.textPlain ? email.textPlain : "" ;
     const message_id  = email.headers['message-id']  ?  email.headers['message-id']  : "";
     const subject     = email.headers['subject']     ?  email.headers['subject']     : '';
     const in_reply_to = email.headers['in-reply-to'] ?  email.headers['in-reply-to'] : "";
    
    const emailResult    =  await emailUseCase.createEmail({snippet,body_html,body_text,in_reply_to,is_archive,is_read,is_trashed,message_id,scheduled_at,subject,thread_id,user_id:userId,})
   console.log(emailResult);
    // const recipients=[];
    //  const to={
    //     email, email_id:emailResult.id, enum_recipient_type:"to"
    //  }
    // console.log(email.attachments[2].attachmentId);
    for (let i = 0; i < email.attachments.length; i++) {
        const attachmentBuffer      =  await attachmentUseCase.getAttachement({userId:"8746b4b2-9870-41e5-a0a7-3252442a7ddd",messageId:"1877f45955515141",attachmentId:email.attachments[i].attachmentId})
        const storedAttachment      =  await attachmentUseCase.storeAttachement({attachmentBuffer,filename:email.attachments[i].filename})
        // if(storedAttachment){
        const createAttachment      =  await attachmentUseCase.createAttachment({email_id:emailResult.rows[0].id,filename:email.attachments[i].filename,path:`http://localhost:3006/static/${email.attachments[i].filename}`,size:email.attachments[i].size,type:email.attachments[i].mimeType})
        // }
    }  

}

getmessageDetail()