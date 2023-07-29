const {folderDb} = require("../../data-access-cockroach")
const Joi        = require('joi');
const axios      = require('axios');
const makeCreateFolderAction   = require("./createFolder")
const makeDeleteFolderAction   = require("./deleteFolder")
const makeGetAllFolderAction   = require("./getAllFolder")
const makeGetFolderByIdAction  = require("./getFolderById")
const makeUpdateFolderAction   = require("./updateFolder")
const makeUpdateTokenAndSyncStatus= require("./updateTokenAndSyncStatus")
const makeIsUserFolderExists   = require("./isUserFolderExists")
const makeGetUserlableAction   = require("./get_User_Folder_From_Api")
const  getUserLables           = makeGetUserlableAction({axios})
const  createFolderAction      = makeCreateFolderAction({createFolder:folderDb.createFolderEntry,Joi,isUserFolderExist:folderDb.isUserFolderExists});
const  deleteFolderAction      = makeDeleteFolderAction({deleteFolder:folderDb.deleteFolderEntry,Joi,isFolderExist:folderDb.getFolderById});
const  getAllFolderAction      = makeGetAllFolderAction({getAllFolder:folderDb.getAllFolders,Joi,isFolderExist:folderDb.getFolderById});
const  getFolderByIdAction     = makeGetFolderByIdAction({getFolderById:folderDb.getFolderById,Joi});
const  updateFolderAction      = makeUpdateFolderAction({updateFolder:folderDb.updateFolderEntry,Joi,isFolderExist:folderDb.getFolderById});
const  isUserFolderExists      = makeIsUserFolderExists({isUserFolderExist:folderDb.isUserFolderExists})
const  updateTokenAndSyncStatus=makeUpdateTokenAndSyncStatus({updateFolder:folderDb.updateNextPageTokenAndSyncStatus,isFolderExists:folderDb.isUserFolderExists,Joi})
const folderUseCase=Object.freeze({
    createFolderAction,
    deleteFolderAction,
    updateFolderAction,
    getAllFolderAction,
    getFolderByIdAction,
    isUserFolderExists,
    getUserLables,
    updateTokenAndSyncStatus
})
module.exports=folderUseCase;