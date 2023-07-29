Feature: Delete a folder

    Scenario Outline: Invalid or empty inputs then throw error for deleting folder.
    Given Enter folderid: '<folderid>' to delete a folder
    When Try to delete a folder
    Then Throw error: "<error>" with message: "<message>" while deleting a folder
    

    Examples:
        | folderid     | error       | message                    |
       
        |            | Error       | \"folderId\" is required         |
        | abc        | Error       | \"folderId\" must be a number      |
        | 50         | Error       | Folder does not Exists    |



    Scenario Outline: Valid inputs then delete the folder.
    Given Enter folderid: '<folderid>' to delete a folder
    When Try to delete a folder
    Then Show message: "<message>"
    

    Examples:
        | folderid     | message                     |
        # Valid scenarios
        | 35           | Deleted the folder succesfully          |