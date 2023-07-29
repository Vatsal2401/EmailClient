Feature: Delete User.

  Scenario Outline: Try to delete user with invalid details, then it will throw error.
    Given User details userId: <userId> to delete user
    When Try to delete user
    Then It will throw error: "<error>" with message: "<message>" while deleting user
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user
  Examples:
      | UserId      | error           | message                 |
      |             | Error           | '"userId" is required'  |
                                    
Scenario Outline: Try to delete user with invalid user, then it will throw error.
    Given User details userId: <userId> to delete user
    And  user id doesnt exist result:<userDetailsByuserId>
    When Try to delete user 
    Then It will throw error: "<error>" with message: "<message>" while deleting user
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user
  Examples:
      | userId          | error       |userDetailsByuserId        | message                 |
      |     234        | Error        |  1                     | User with this Id is doesn't exists  |
                                    
    
  Scenario Outline: Try to delete user with valid inputs, then it will deleted.
    Given User details userId: <userId> to delete user
    #  And  user id  exist result:<deleteUserDetail>
    # And Encrypted password of provided password is: "<encryptedPassword>"
    When Try to delete user
    Then It will delete user with details: <message>
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      |     userId |message|
      | 1 |'delete user successfully' | 