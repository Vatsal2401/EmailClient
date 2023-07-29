Feature: update Folder By Id.

  Scenario Outline: Try to update folder with invalid details, then it will throw error.
    Given Folder details name:'<name>' folderId: '<folderId>' to update folder
    When Try to update folder
    Then It will throw error: '<error>' with message: '<message>' while updating folder
    # And GetFoldersDetailByEmail function will call <getFoldersDetailByEmailFunctionCallCount> time while creating new folder
    # And getFoldersDetailByMobile function will call <getFoldersDetailByMobileFunctionCallCount> time while creating new folder
    # And encryptPassword function will call <encryptPasswordFunctionCallCount> time while creating new folder
    # And createFolder function will call <createFolderFunctionCallCount> time while creating new folder
  Examples:
      | folderId |name          | error           | message                 |
      |          | myfolder     | Error           | \"id\" is required  |
      | 23       |              | Error           | \"name\" is required    |
      | abc      | myfolder    | Error           | \"id\" must be a number|
      | 50       | myfolder     | Error           |  Folder does not Exists|

 Scenario Outline: Invalid foldername input then throw error.
    Given Second Enter folderid: <folderid> and updated foldername: <foldername> for updating a folder
    When Try to update folder
    Then It will throw error: '<error>' with message: '<message>' while updating folder

    Examples:
        |   folderid   |    foldername     | error       | message                       |
        # Invalid scenarios
        |   32       |  12345       | Error       |\"name\" must be a string    |


Scenario Outline: Try to update folder with valid inputs, then it will success.
    Given Third Enter folderid: <folderId> and updated foldername: '<name>' for update a folder
    When Try to update folder
    Then update folder successfully message:"<message>"

    Examples:
      |     folderId | name         |message|
      |      1       |  vatsal        | update folder successfully | 