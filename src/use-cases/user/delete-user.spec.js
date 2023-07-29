const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const makeDeleteUser=require("./deleteUser")

const sandbox = sinon.createSandbox();

const usersDb = {
  deleteUser: () => {
  },
  isUserExist:()=>{
  }
};

const isUserExistsStub = sandbox.stub(usersDb, 'isUserExist');
isUserExistsStub.callsFake((args) => {
  expect(args).deep.equal({
    userId: this.userId
  });
  return this.userResult;
});
const deleteUserStub = sandbox.stub(usersDb, 'deleteUser');
deleteUserStub.callsFake((args) => {
  const id=this.userId
  expect(args).deep.equal({
    id: id
  });
  return 'delete user successfully';
});



After(() => {
  this.userId  =undefined;
  this.result = undefined;
  this.error = undefined;
  this.userResult = undefined;
  sandbox.resetHistory();
});

Given('User details userId: {int} to delete user', async  (userId) => {
      console.log(userId);
      this.userId = userId || undefined;
    }
);
Given('user id doesnt exist result:{int}', (result) => {
    this.userResult = result; 
  });
When('Try to delete user', async () => {

 const deleteUser= makeDeleteUser({
  deleteUser:usersDb.deleteUser,
  isUserExist:usersDb.isUserExist
 })
  try {
    
    this.result = await deleteUser({id:this.userId});
    console.log(this.result);
  } catch (e) {
    console.log(e);
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then("It will throw error: {string} with message: {string} while deleting user", (error, message) => {

  expect(this.error).deep.equal({
    name: error,
    message,
  });
});

Then('It will delete user with details: {string}', (details) => {
  expect(this.result).equal(details);
});

