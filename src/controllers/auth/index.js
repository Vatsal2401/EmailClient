const {userUseCase}=require("../../use-cases");
const makeAuthController=require("./auth");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "808194795787-6lprltch4s88os6a47l2ik0qlgjk4lgl.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3006/api/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// const Joi = require('joi');
const authController=makeAuthController({userUseCase,client,jwt});
module.exports=authController;