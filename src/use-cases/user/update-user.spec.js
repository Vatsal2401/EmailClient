const {Given, When, Then, After} = require('@cucumber/cucumber');
const sinon = require('sinon');
const expect = require('chai').expect;
const Joi = require('joi');
const makeUpdateUserById=require("./updateUser")
const sandbox = sinon.createSandbox();

const usersDb = {
  updateUserById: () => {
  },
  isUserExist:()=>{
  }
};

const isUserExistsStub = sandbox.stub(usersDb, 'isUserExist');
isUserExistsStub.callsFake((args) => {

  expect(args).deep.equal({
    userId: this.userId
  });
  if( this.userId==50)
        return [];
  return [
    {
        userid: 1,
        name: 'aaaaaaaaa',
        email: 'aaaaaaa@gmail.com',
        password: 'aaaaaaaaaa12345'
    }]
  ;
});
const updateUserByIdStub = sandbox.stub(usersDb, 'updateUserById');
updateUserByIdStub.callsFake((args) => {
  const id=this.userId
  const userdata={
    name:this.name
  }
  expect(args).deep.equal({
    userdata,
    id: id
  });
  return 'update user successfully';
});



After(() => {
  this.name    =undefined
  this.userId  =undefined;
  this.result  = undefined;
  this.error   = undefined;
  this.userResult = undefined;
  sandbox.resetHistory();
});

Given('User details name:{string} userId: {string} to update user', async  (name,userId) => {
      console.log(userId);
      this.name=name||undefined
      this.userId = userId || undefined;
    }
);
Given('Third Enter userid: {int} and updated username: {string} for update a user',
(userid,name) => {
    this.name=name||undefined
    this.userId = userid || undefined;
},
);
Given('Second Enter userid: {int} and updated username: {int} for updating a user',
    (userid,uname) => {
        this.userId=userid || undefined;
        this.name=uname || undefined;
    },
);
When('Try to update user', async () => {
if(this.userId){
    this.userId=parseInt(this.userId)
}
 const updateUserById= makeUpdateUserById({
    updateUser:usersDb.updateUserById,
    Joi,
    isUserEmailExist:usersDb.isUserExist 
 })
  try {
    const userdata={
        name:this.name
      }
    this.result = await updateUserById({userdata,id:this.userId});
    console.log(this.result);
  } catch (e) {
    console.log(e);
    this.error = {
      name: e.name,
      message: e.message,
    };
  }
});

Then("It will throw error: {string} with message: {string} while updating user", (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  });
  
Then('update user successfully message:{string}', (details) => {
  expect(this.result).equal(details);
});

