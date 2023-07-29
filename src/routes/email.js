const express = require('express') 
const router = express.Router();
const mysql = require('mysql2/promise');
// const connectionToMysql=require("../MysqlConneciton/connectTomysql");
// const connection=connectionToMysql();
//api for crud on email....


router.post("/createEmail",async(req,res)=>{

}
)

router.get("/getEmail",async(req,res)=>{

})

router.put("/updateEmail/:id",async(req,res)=>{

})

router.delete("/deleteEmail/:id",async(req,res)=>{

})
module.exports=router;