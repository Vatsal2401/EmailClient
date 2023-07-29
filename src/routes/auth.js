const express =require("express")
const router =express.Router();
const {authController}=require("../controllers")
router.get("/callback",authController.googleAuthCallback );
router.get("/",authController.googleAuthLogin );
  module.exports=router