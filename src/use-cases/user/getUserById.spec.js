const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const makeGetUserById=require("./getUserById")
const sandbox = sinon.createSandbox();

const usersDb = {
  getUserById: () => {
  },
  isUserExist:()=>{
  }
};

// const isUserExistsStub = sandbox.stub(usersDb, 'isUserExist');
// isUserExistsStub.callsFake((args) => {
//   expect(args).deep.equal({
//     userId: this.userId
//   });
//   return this.userResult;
// });
const getUserByIdStub = sandbox.stub(usersDb, 'getUserById');
getUserByIdStub.callsFake((args) => {
  const id=this.userId
  expect(args).deep.equal({
    id: id
  });
  return 'get user successfully';
});



After(() => {
  this.userId  =undefined;
  this.result = undefined;
  this.error = undefined;
  this.userResult = undefined;
  sandbox.resetHistory();
});

Given('User details userId: {int} to get user', async  (userId) => {
      console.log(userId);
      this.userId = userId || undefined;
    }
);
When('Try to get user', async () => {

 const getUserById= makeGetUserById({
    getUserById:usersDb.getUserById,
//   isUserExist:usersDb.isUserExist
 })
  try {
    
    this.result = await getUserById({id:this.userId});
    console.log(this.result);
  } catch (e) {
    console.log(e);
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

// Then("It will throw error: {string} with message: {string} while getting user", (error, message) => {

//     expect(this.error).deep.equal({
//       name: error,
//       message,
//     });
//   });
  
Then('get user successfully message:{string}', (details) => {
  expect(this.result).equal(details);
});

