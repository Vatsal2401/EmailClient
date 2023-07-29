const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');

const makedeleteFolder = require('./deleteFolder');

const sandbox = sinon.createSandbox();

After(() => {
    this.folderId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });
const foldersDb = {
    deleteDbFolder: function(){},
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
        folderId: 1,
        name: 'aaaaaaaaa',
        userId: 'aaaaaaa@gmail.com',
        providerId: 'aaaaaaaaaa12345'
    }]
  ;
});
const deleteFolderStub = sandbox.stub(foldersDb,'deleteDbFolder');

deleteFolderStub.callsFake(({folderId}) => {
    return "Deleted the folder succesfully"
});



Given('Enter folderid: {string} to delete a folder',
    (folderid) => {
        this.folderId=(folderid) || undefined;
    },
);


When('Try to delete a folder', async ()=>{
    if(this.folderId){
        this.folderId=parseInt(this.folderId);
    }
    const deleteFolder = makedeleteFolder({
        deleteFolder:foldersDb.deleteDbFolder,
        Joi,
        isFolderExists:foldersDb.isFolderExist
    });
    try 
    {
        this.result = await deleteFolder({
            folderId: this.folderId
          });
    } 
    catch (e) {
        this.error = {
          name: e.name,
          message: e.message,
        };
    }
});


Then('Throw error: {string} with message: {string} while deleting a folder', (error, message) => {
    expect(this.error).deep.equal({
        name: error,
        message,
    });
});


Then('Show message: {string}', (message) => {
    expect(this.result).deep.equal(message);
});