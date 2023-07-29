const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateFolderById=require("./updateFolder")
const sandbox = sinon.createSandbox();

const foldersDb = {
  updateFolderById: () => {
  },
  isFolderExist:()=>{
  }
};

const isFolderExistsStub = sandbox.stub(foldersDb, 'isFolderExist');
isFolderExistsStub.callsFake((args) => {

  expect(args).deep.equal({
    folderId: this.folderId
  });
  if( this.folderId==50)
        return [];
  return [
    {
        folderid: 1,
        name: 'aaaaaaaaa',
        userId: 'aaaaaaa@gmail.com',
        providerId: 'aaaaaaaaaa12345'
    }]
  ;
});
const updateFolderByIdStub = sandbox.stub(foldersDb, 'updateFolderById');
updateFolderByIdStub.callsFake((args) => {
  const folderId=this.folderId
  const folderdata={
    name:this.name
  }
  expect(args).deep.equal({
    folderdata,
    folderId
  });
  return 'update folder successfully';
});



After(() => {
  this.name    =undefined
  this.folderId  =undefined;
  this.result  = undefined;
  this.error   = undefined;
//   this.userResult = undefined;
  sandbox.resetHistory();
});

Given('Folder details name:{string} folderId: {string} to update folder', async  (name,folderId) => {
      this.name=name||undefined
      this.folderId = folderId || undefined;
    }
);
Given('Third Enter folderid: {int} and updated foldername: {string} for update a folder',
(folderid,name) => {
    this.name=name||undefined
    this.folderId = folderid || undefined;
},
);
Given('Second Enter folderid: {int} and updated foldername: {int} for updating a folder',
(folderid,name) => {
    this.name=name||undefined
    this.folderId = folderid || undefined;
},
);
When('Try to update folder', async () => {
if(this.folderId){
    this.folderId=parseInt(this.folderId)
}
 const updateFolderById= makeUpdateFolderById({
    updateFolder:foldersDb.updateFolderById,
    Joi,
    isFolderExists:foldersDb.isFolderExist
    // isUserEmailExist:usersDb.isUserExist 
 })
  try {
    const folderdata={
        name:this.name
      }
    this.result = await updateFolderById({folderdata,folderId:this.folderId});
    console.log(this.result);
  } catch (e) {
    console.log(e);
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then("It will throw error: {string} with message: {string} while updating folder", (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  });
  
Then('update folder successfully message:{string}', (details) => {
  expect(this.result).equal(details);
});

