const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const makeCreateFolder = require('./createFolder');

const sandbox = sinon.createSandbox();

const usersDb = {
  isUserFolderExist: () => {
  },
  createFolder: () => {
  },
};

const isUserFolderExistsStub = sandbox.stub(usersDb, 'isUserFolderExist');
isUserFolderExistsStub.callsFake((args) => {
  const userfolder={
    name: this.name,
    userId: this.userId,
    
  }
  expect(args).deep.equal({
    userfolder
  });
  return [this.userFolderDetails];
});

const createFolderStub = sandbox.stub(usersDb, 'createFolder');
createFolderStub.callsFake((args) => {
  const folderdata={
    name: this.name,
    userId: this.userId,
    providerId: this.providerId,
  }
  expect(args).deep.equal({folderdata});
  return {id: 1};
});

After(() => {
  this.folderName = undefined;
  this.userId = undefined;
  this.providerId = undefined;
  this.userFolderDetails=undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given('Folder details name: {string}, userid: {string}, and providerid: {string} to create new folder',
    (name, userid, providerId) => {
      this.name = name || undefined;
      this.userId = userid || undefined;
      this.providerId = providerId || undefined;
    }
);

Given('Already existed folder details: "{string}" with same user', (userFolderDetails) => {
  // console.log(this.userDetailsByEmail);
  this.userFolderDetails = JSON.parse(userFolderDetails);
  
});

When('Try to create new folder', async () => {
  const createFolder = makeCreateFolder({
    Joi,
    createFolder: usersDb.createFolder,
    isUserFolderExist:usersDb.isUserFolderExist
  });

  try {
    const folderdata={
      name: this.name,
      userId: this.userId,
      providerId: this.providerId,
    }
    this.result = await createFolder({folderdata});
    // console.log(this.result);
  } catch (e) {
    console.log(e);
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});
Then('It will throw error: {string} with message: {string} while creating new folder', (error, message) => {
  expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will create new folder with details: "{string}"', (newUserDetails) => {
  expect(this.result).deep.equal(JSON.parse(newUserDetails));
});

// Then('GetUsersDetailByEmail function will call {int} time while creating new user',
//     (getUsersDetailByEmailFunctionCallCount) => {
//       sinon.assert.callCount(getUsersDetailByEmailStub, getUsersDetailByEmailFunctionCallCount);
//     },
// );

// Then('getUsersDetailByMobile function will call {int} time while creating new user',
//     (getUsersDetailByMobileFunctionCallCount) => {
//       sinon.assert.callCount(getUsersDetailByMobileStub, getUsersDetailByMobileFunctionCallCount);
//     },
// );

// Then('encryptPassword function will call {int} time while creating new user',
//     (encryptPasswordFunctionCallCount) => {
//       sinon.assert.callCount(encryptPasswordStub, encryptPasswordFunctionCallCount);
//     },
// );

// Then('createUser function will call {int} time while creating new user',
//     (createUserFunctionCallCount) => {
//       sinon.assert.callCount(createUserStub, createUserFunctionCallCount);
//     },
// );
