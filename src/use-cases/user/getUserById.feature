Feature: get User By Id.

#   Scenario Outline: Try to delete user with invalid details, then it will throw error.
#     Given User details userId: '<userId>' to get user
#     When Try to get user
#     Then It will throw error: "<error>" with message: "<message>" while getting user
#     # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
#     # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
#     # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
#     # And createUser function will call <createUserFunctionCallCount> time while creating new user
#   Examples:
#       | UserId      | error           | message                 |
#       |             | Error           | '"userId" is required'  |
#       | 234         | Error           | '"userId" is not valid  |
#       |abc          | Error           | '"userId" must be number|

Scenario Outline: Try to get user with valid inputs, then it will success.
    Given User details userId: <userId> to get user
    When Try to get user
    Then get user successfully message:<message>

    Examples:
      |     userId |message|
      | 1 |'get user successfully' | 