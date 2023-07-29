const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const makeCreateUser = require('./createUser');

const sandbox = sinon.createSandbox();

const usersDb = {
  isUserEmailExist: () => {
  },
  createUser: () => {
  },
};

const isUserEmailExistsStub = sandbox.stub(usersDb, 'isUserEmailExist');
isUserEmailExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    email: this.email,
  });
  return [this.userDetailsByEmail];
});

// const getUsersDetailByMobileStub = sandbox.stub(usersDb, 'getUsersDetailByMobile');
// getUsersDetailByMobileStub.callsFake((args) => {
//   expect(args).deep.equal({
//     attributes: ['id'],
//     mobile: this.mobile,
//   });

//   return this.userDetailsByMobile;
// });

// const encryptPasswordStub = sandbox.stub(functionsToMock, 'encryptPassword');
// encryptPasswordStub.callsFake((args) => {
//   expect(args).deep.equal({
//     password: this.password,
//   });

//   return this.encryptedPassword;
// });

const createUserStub = sandbox.stub(usersDb, 'createUser');
createUserStub.callsFake((args) => {
  const userdata={
    name: this.name,
    email: this.email,
    password: this.password,
  }
  expect(args).deep.equal({userdata});
  return {id: 1};
});

After(() => {
  this.name = undefined;
  this.email = undefined;
  this.password = undefined;
  this.userDetailsByEmail = undefined;
  this.result = undefined;
  this.error = undefined;

  sandbox.resetHistory();
});

Given('User details name: {string}, email: {string}, and password: {string} to create new user',
    (name, email, password) => {
      this.name = name || undefined;
      this.email = email || undefined;
      this.password = password || undefined;
    }
);

Given('Already existed user details: "{string}" with same email', (userDetailsByEmail) => {
  // console.log(this.userDetailsByEmail);
  this.userDetailsByEmail = JSON.parse(userDetailsByEmail);
  
});

// Given('Already existed user details: "{string}" with same mobile', (userDetailsByMobile) => {
//   this.userDetailsByMobile = JSON.parse(userDetailsByMobile);
// });

// Given('Encrypted password of provided password is: {string}', (encryptedPassword) => {
//   this.encryptedPassword = encryptedPassword;
// });

When('Try to create new user', async () => {
  const createUser = makeCreateUser({
    Joi,
    createUser: usersDb.createUser,
    isUserEmailExist:usersDb.isUserEmailExist
  });

  try {
    const userdata={
      name: this.name,
      email: this.email,
      password: this.password,
    }
    this.result = await createUser({userdata});
    // console.log(this.result);
  } catch (e) {
    // console.log(e);
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then('It will throw error: {string} with message: "{string}" while creating new user', (error, message) => {

  expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will create new user with details: "{string}"', (newUserDetails) => {
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
