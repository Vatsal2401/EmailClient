Feature: Get All USer.


 Scenario Outline: Try to Get All User.
    Given User details userId: <userId> to delete user
    When Try to get all user
    Then Get All User With Result:
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user
  Examples:
      | UserId      | result           | message                 |
      |             | Error           | '"userId" is required'  |
              