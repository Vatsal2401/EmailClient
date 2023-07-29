Feature: Get All Folder.


 Scenario: View all folders
    Given I am logged in to my email account
    When I navigate to the Folders section of the email client
    Then I should see a list of all folders in my mailbox
    And each folder in the list should have a name and contain emails

  Examples:
      | UserId      | result           | message                 |
      |             | Error           | '"userId" is required'  |
              