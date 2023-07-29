Feature: update User By Id.

  Scenario Outline: Try to update user with invalid details, then it will throw error.
    Given User details name:'<name>' userId: '<userId>' to update user
    When Try to update user
    Then It will throw error: '<error>' with message: '<message>' while updating user
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user
  Examples:
      | userId |name          | error           | message                 |
      |        | vatsal     | Error             | \"id\" is required  |
      | 23     |           | Error           | \"name\" is required    |
      |abc     |  vatsal   | Error              | \"id\" must be a number|
      |50      | vatsal    | Error              |  user does not Exists|

 Scenario Outline: Invalid uname input then throw error.
    Given Second Enter userid: <userid> and updated username: <uname> for updating a user
    When Try to update user
    Then It will throw error: '<error>' with message: '<message>' while updating user

    Examples:
        |   userid   |    uname     | error       | message                       |
        # Invalid scenarios
        |   32       |  12345       | Error       |\"name\" must be a string    |


Scenario Outline: Try to update user with valid inputs, then it will success.
    Given Third Enter userid: <userId> and updated username: '<name>' for update a user
    When Try to update user
    Then update user successfully message:"<message>"

    Examples:
      |     userId | name         |message|
      |      1     |  vatsal  | update user successfully | 