Feature: Create New Folder.

  Scenario Outline: Try to create new folder with invalid details, then it will throw error.
    Given Folder details name: '<foldername>', userid: '<folderuserid>', and providerid: '<providerId>' to create new folder
    When Try to create new folder
    Then It will throw error: '<error>' with message: '<message>' while creating new folder

   Examples:
      | foldername    | folderuserid         | providerId | error           | message                                     |
      |               |      1               |            | Error           | \"name\" is required                        |
      | ImportantMail |                      |            | Error           | \"userId\" is required                      |
      |               |                      |            | Error           | \"name\" is required                        |                                

 
  Scenario Outline: Try to create new folder with already user has folder, then it will throw error.
    Given Folder details name: '<foldername>', userid: '<folderuserid>', and providerid: '<providerId>' to create new folder
    And Already existed folder details: "<userFolderDetails>" with same user
    When Try to create new folder
    Then It will throw error: '<error>' with message: '<message>' while creating new folder
    # And GetFoldersDetailByEmail function will call <getFoldersDetailByEmailFunctionCallCount> time while creating new folder
    # And getFoldersDetailByMobile function will call <getFoldersDetailByMobileFunctionCallCount> time while creating new folder
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new folder
    # And createFolder function will call <createFolderFunctionCallCount> time while creating new folder

    # Examples:
    #   | name         | email               | password   | folderDetailsByEmail | error          | message                                      |
    #   | Vatsal Patel | vatsal@rapidops.com| 1234567890 | '{"id":"10"}'      | Error | 'Folder with the same email is already exists' |

   Examples:
      | foldername                 | folderuserid         | providerId | userFolderDetails |error           | message                                     |
      |     ImportantMail          |      1               |            |'{"id":"10"}'    | Error          | User has already this folder                       |
     

  Scenario Outline: Try to create new folder with valid inputs, then it will created successfully.
    Given Folder details name: '<foldername>', userid: '<folderuserid>', and providerid: '<providerId>' to create new folder
    When Try to create new folder
    Then It will create new folder with details: "<newFolderDetails>"
    # And GetFoldersDetailByEmail function will call <getFoldersDetailByEmailFunctionCallCount> time while creating new folder
    # And getFoldersDetailByMobile function will call <getFoldersDetailByMobileFunctionCallCount> time while creating new folder
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new folder
    # And createFolder function will call <createFolderFunctionCallCount> time while creating new folder

    # Examples:
    #   | name         | email              | password   | newFolderDetails | 
    #   | Vatsal Patel | vatsal@rapidops.com| 1234567890 | '{"id": 1}'    | 
      Examples:
      | foldername                 | folderuserid         | providerId | newFolderDetails |error           | message                                     |
      |     ImportantMail          |      1               |            |'{"id": 1}'     | Error          | User has already this folder                       |
     