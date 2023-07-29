const { Given, When, Then, After, Before } = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const makegetFolder = require('./getFolderById');

const sandbox = sinon.createSandbox();

After(() => {
    this.folderId = undefined;
    this.result = undefined;
    this.error = undefined;
  
    sandbox.resetHistory();
  });


const folderDb = {
    getDbFolder: function(){}
};

const getFolderStub = sandbox.stub(folderDb,'getDbFolder');

getFolderStub.callsFake(({folderId}) => {
    if(!folderId || folderId==50){
        throw new Error("No such folder is there, you are trying to get...");
    }
    return "succesfull";
});



Given('Enter folderid: {string} to get a folder',
    (folderid) => {
        this.folderId=(folderid) || undefined;
    },
);

When('Try to get a folder', async ()=>{
    if(this.folderId){
            this.folderId=parseInt(this.folderId);
        }
    const getFolder = makegetFolder({
        Joi,
        getFolderById: folderDb.getDbFolder,
    });
    try 
    {
        this.result = await getFolder({
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


Then('Throw error: {string} with message: {string} while getting a folder', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
});
Then('Got the folder: {string}', (message) => {
    expect(this.result).deep.equal(message);
});