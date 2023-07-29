const {userDb}=require("../../data-access-cockroach")
const Joi = require('joi');
const { Kafka } = require('kafkajs')
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = "808194795787-6lprltch4s88os6a47l2ik0qlgjk4lgl.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3006/api/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const makeCreateUserAction  = require("./createUser")
const makeDeleteUserAction  = require("./deleteUser")
const makeGetAllUserAction  = require("./getAllUser")
const makeGetUserByIdAction = require("./getUserById")
const makeUpdateUserAction  = require("./updateUser")
const makeIsUserEmailExists = require("./isUserEmailExists")
const makeIsUserExists=require("./isUserExists")
const getAccessTokenUsingClient=require("./getAccessToken");
const getUserAccessTokenAction=require("./getUserAccessToken")
const makeUpdateUserAccessToken=require("./update_Access_Token")
// Joi.number().min().r

const  updateAccessToken= makeUpdateUserAccessToken({updateToken:userDb.updateUserAccessToken,isUserExist:userDb.isUserExist,Joi})
const  getAccessToken   = getAccessTokenUsingClient({client})
const  getUserAccessToken= getUserAccessTokenAction({getAccessTokenByUserId:userDb.getAccessTokenByUserId,Joi})
const  createUserAction = makeCreateUserAction({createUser:userDb.createUserEntry,Joi,isUserEmailExist:userDb.isUserEmailExist,Kafka});
const  deleteUserAction = makeDeleteUserAction({deleteUser:userDb.deleteUserEntry,isUserExist:userDb.isUserExist,Joi});
const  getAllUserAction = makeGetAllUserAction({getAllUser:userDb.getAllUsers});
const  getUserByIdAction= makeGetUserByIdAction({getUserById:userDb.getUserById,Joi});
const  updateUserAction = makeUpdateUserAction({updateUser:userDb.updateUserEntry,isUserExist:userDb.isUserExist,Joi});
const  isUserEmailExist = makeIsUserEmailExists({isUserEmailExist:userDb.isUserEmailExist})
const  isUserExist=makeIsUserExists({isUserExist:userDb.isUserExist})
const userUseCase=Object.freeze({
    createUserAction,
    deleteUserAction,
    updateUserAction,
    getAllUserAction,
    getUserByIdAction,
    isUserEmailExist,
    isUserExist,
    getAccessToken,
    getUserAccessToken,
    updateAccessToken
})
module.exports=userUseCase;