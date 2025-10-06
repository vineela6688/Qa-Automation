import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals';
import FormPage from '../pageobjects/QA Demo/FormPage.js'
import path from 'path';



Given(/^user is on the form page$/, async function () {
    await browser.url('https://demoqa.com/automation-practice-form');
    await browser.pause(1000);
});

When(/^user enters first name "([^"]*)" and last name "([^"]*)"$/, async function (firstName, lastName) {
    await FormPage.firstNameInput.setValue(firstName.trim());
    await FormPage.lastNameInput.setValue(lastName.trim());
});

When(/^user selects gender "([^"]*)"$/, async function (gender) {
    await FormPage.selectGender(gender);
});

When(/^user enters date of birth "([^"]*)"$/, async function (dob) {
    const [day, month, year] = dob.split(" ");
    await FormPage.setDateOfBirth(day, month, year);
});

When(/^user enters email "([^"]*)"$/, async function (email) {
    await FormPage.emailInput.setValue(email.trim());
});


When(/^user enters mobile number "([^"]*)"$/, async function (mobile) {
    await FormPage.mobileInput.waitForDisplayed();
    await FormPage.mobileInput.setValue(mobile.trim());
});


When(/^user selects subject "([^"]*)"$/, async function (subject) {
    await FormPage.setSubject(subject);
});

When(/^user chooses hobby "([^"]*)"$/, async function (hobby) {
    await FormPage.selectHobby(hobby);
});


When(/^user uploads picture "([^"]*)"$/, async function (fileName) {
    // Use the full Windows path
    const filePath = `C:/Users/varad/Pictures/${fileName}`;
    const remotePath = await browser.uploadFile(filePath);
    await FormPage.uploadInput.setValue(remotePath);
});


When(/^user enters address "([^"]*)"$/, async function (address) {
    await FormPage.setAddress(address);
});


When(/^user selects state "([^"]*)" and city "([^"]*)"$/, async function (state, city) {
    await FormPage.setStateAndCity(state, city);
});

When(/^user clicks submit$/, async function () {
    await FormPage.submitForm();
});

Then(/^confirmation with title "([^"]*)" should appear$/, async function (expectedTitle) {
    const text = await FormPage.getConfirmationText();
    if (text !== expectedTitle) {
        throw new Error(`Form not submitted successfully. Expected: "${expectedTitle}", Found: "${text}"`);
    }
});


function normalize(text) {
    return text.replace(/[,]/g, '').trim(); // remove commas and extra spaces
}

Then('submitted data should match:', async function (dataTable) {
    const data = dataTable.rowsHash();
    for (const [key, expected] of Object.entries(data)) {
        const received = await FormPage.getSubmittedData(key);
        if (received !== expected) {
            throw new Error(`Mismatch for "${key}": expected "${expected}", got "${received}"`);
        }
    }
});






 


