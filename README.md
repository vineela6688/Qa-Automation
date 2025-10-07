# 🧪 DemoQA Form Submission – Cucumber Automation

## 📋 Overview
This project automates the **form submission** process on the [DemoQA practice form](https://demoqa.com/automation-practice-form) using **WebdriverIO**, **Cucumber (BDD)**, and **Allure Reports**.

It demonstrates a complete **end-to-end test** for submitting a form with various input fields, file upload, and validation of submitted data.

---

## 🚀 Tech Stack
- **Node.js**
- **WebdriverIO (v8)**
- **Cucumber.js**
- **Allure Reporter**
- **JavaScript (ES6)**

---

## 🧱 Project Structure
Vin_Automation_Cucumber/
├── features/
│ ├── form_submission.feature
│ ├── step-definitions/
│ │ └── form.steps.js
│ └── pageobjects/
│ └── QA Demo/
│ └── FormPage.js
├── wdio.conf.js
├── package.json
├── allure-results/
└── allure-report/


---

## 🧩 Feature Description

### **Feature:** DemoQA Form Submission
This feature verifies that a user can successfully fill out and submit the DemoQA form, and that the confirmation modal displays the correct submitted data.

### **Scenario Outline:** Successful form submission with valid data
Each example row represents a different user with unique data combinations.

#### **Test Steps:**
1. Navigate to the form page  
2. Enter first name and last name  
3. Select gender  
4. Enter date of birth  
5. Fill in email and mobile number  
6. Select subject(s)  
7. Choose hobby  
8. Upload a picture  
9. Fill address  
10. Select state and city  
11. Submit the form  
12. Verify:
   - Confirmation modal appears  
   - All submitted data matches what was entered  

#### **Example Test Data:**

| firstName | lastName  | gender | dob           | email             | mobile     | subject | hobby    | picture   | address           | state | city    |
|------------|-----------|--------|----------------|-------------------|------------|----------|----------|------------|-------------------|--------|---------|
| Raj123    | varada123 | Male   | 17 June 1988  | rjrj1@gmail.ca    | 1230560890 | Maths   | Reading  | photo.jpg | 51 shadmapl crt   | NCR   | Delhi   |
| Vineela   | Namagiri  | Female | 05 May 1995   | vinella@test.com  | 9876543210 | English | Music    | photo.jpg | 10 Park Ave       | NCR   | Noida   |
| Harshiv   | Daksha    | Male   | 12 July 1990  | harshiv@test.com  | 5551112233 | Physics | Sports   | photo.jpg | 22 Lake Street    | NCR   | Gurgaon |

---

## ⚙️ Setup Instructions

 1️⃣ Clone the repository
```bash
git clone https://github.com/vineela6688/Qa-Automation.git
cd Qa-Automation

2️⃣ Navigate to the project directory
cd Qa-Automation

3️⃣ Install all dependencies
Make sure Node.js (v16 or above) and npm are installed, then run:
npm install
This command installs all required libraries (WebdriverIO, Cucumber, Allure, etc.) listed in package.json.

4️⃣ Verify the directory structure

Ensure your folder contains:
features/
wdio.conf.js
package.json

5️⃣ Run the test suite
To execute all test scenarios:
npx wdio run wdio.conf.js
WebdriverIO will launch Chrome, run the tests, and save results inside the allure-results/ folder.

6️⃣ Generate and view Allure report
After test execution, generate a detailed report:
npx allure generate allure-results -o allure-report   
allure serve allure-results 
The report will automatically open in your browser.

🧰 Optional Tools Setup
🔸 Install Allure Commandline (if not already installed)
Windows:
npm install -g allure-commandline --save-dev 
Mac/Linux:
brew install allure

🔸 Common Git Commands
Command	Description
git status	Check modified/untracked files
git add .	Stage all changes
git commit -m "Your commit message"	Commit changes
git push origin master	Push to GitHub
git pull origin master	Pull latest code

📊 Expected Output

✅ Browser opens DemoQA form
✅ Fills out fields using example data
✅ Clicks submit
✅ Modal appears with title “Thanks for submitting the form”
✅ All displayed values match the input data

💡 Notes

Place your test image photo.jpg in the project root directory.
Pop-ups and ads are automatically hidden to prevent script interruption.
If you encounter date mismatch issues, check spacing in your test data.

🤝 Contributing

Contributions are welcome!
If you’d like to improve test cases or add new features:

Fork this repository

Create a new branch (git checkout -b feature-branch)

Commit your changes

Push to your branch

Open a Pull Request

👩‍💻 Author

Vineela Namagiri
📧 vineela.namagiri@gmail.com

💻 https://github.com/vineela6688
