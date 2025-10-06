Feature: DemoQA Form Submission

  Scenario Outline: Successful form submission with valid data
    Given user is on the form page
    When user enters first name "<firstName>" and last name "<lastName>"
    And user selects gender "<gender>"
    And user enters date of birth "<dob>"
    And user enters email "<email>"
    And user enters mobile number "<mobile>"
    And user selects subject "<subject>"
    And user chooses hobby "<hobby>"
    And user uploads picture "<picture>"
    And user enters address "<address>"
    And user selects state "<state>" and city "<city>"
    When user clicks submit
    Then confirmation with title "Thanks for submitting the form" should appear
    Then submitted data should match:
      | Student Name | <firstName> <lastName> |
      | Student Email| <email> |
      | Gender | <gender> |
      | Mobile | <mobile> |
      | Date of Birth | <dob> |
      | Subjects | <subject> |
      | Hobbies | <hobby> |
      | Picture | <picture> |
      | Address | <address> |
      | State and City | <state> <city> |

    Examples:
      | firstName | lastName  | gender | dob           | email             | mobile     | subject | hobby    | picture   | address           | state | city    |
      | Raj123    | varada123 | Male   | 17 June 1988  | rjrj1@gmail.ca    | 1230560890 | Maths   | Reading  | photo.jpg | 51 shadmapl crt   | NCR   | Delhi   |
      | Vineela   | Namagiri  | Female | 05 May 1995   | vinella@test.com  | 9876543210 | English | Music    | photo.jpg | 10 Park Ave       | NCR   | Noida   |
      | Harshiv   | Daksha    | Male   | 12 July 1990  | harshiv@test.com  | 5551112233 | Physics | Sports   | photo.jpg | 22 Lake Street    | NCR   | Gurgaon |
