Feature: Create New User.

  Scenario Outline: Try to create new user with invalid details, then it will throw error.
    Given User details name: "<name>", email: "<email>", and password: "<password>" to create new user
    When Try to create new user
    Then It will throw error: "<error>" with message: "<message>" while creating new user
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

   Examples:
      | name         | email               | password | error           | message                                                |
      |              |                     |          | Error           | '"name" is required'                                   |
      | Vatsal Patel |                     |          | Error           | '"email" is required'                                  |
      | Vatsal Patel | vatsal              |          | Error           | '"email" must be a valid email'                        |                                
      | Vatsal Patel | vatsal@rapidops.com |          | Error           | '"password" is required'                               |
      | Vatsal Patel | vatsal@rapidops.com | 1234     | Error           | '"password" length must be at least 8 characters long' |
 
  Scenario Outline: Try to create new user with already registered email, then it will throw error.
    Given User details name: "<name>", email: "<email>", and password: "<password>" to create new user
    And Already existed user details: "<userDetailsByEmail>" with same email
    When Try to create new user
    Then It will throw error: "<error>" with message: "<message>" while creating new user
  #   And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
  #   And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
  #   And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
  #   And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name       | email            | password   | userDetailsByEmail | error          | message                                      |
      | Vatsal Patel | vatsal@rapidops.com| 1234567890 | '{"id":"10"}'      | Error | 'User with the same email is already exists' |

  
  Scenario Outline: Try to create new user with valid inputs, then it will throw error.
    Given User details name: "<name>", email: "<email>", and password: "<password>" to create new user
    # And Encrypted password of provided password is: "<encryptedPassword>"
    When Try to create new user
    Then It will create new user with details: "<newUserDetails>"
    # And GetUsersDetailByEmail function will call <getUsersDetailByEmailFunctionCallCount> time while creating new user
    # And getUsersDetailByMobile function will call <getUsersDetailByMobileFunctionCallCount> time while creating new user
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new user
    # And createUser function will call <createUserFunctionCallCount> time while creating new user

    Examples:
      | name         | email              | password   | newUserDetails | 
      | Vatsal Patel | vatsal@rapidops.com| 1234567890 | '{"id": 1}'    | 