class FormPage {
    // --- Input Fields ---
    get firstNameInput() { return $('#firstName'); } // First Name input field
    get lastNameInput() { return $('#lastName'); }   // Last Name input field
    get emailInput() { return $('#userEmail'); }     // Email input field
    get mobileInput() { return $('#userNumber'); }   // Mobile Number input field
    get dobInput() { return $('#dateOfBirthInput'); } // Date of Birth input
    get subjectInput() { return $('#subjectsInput'); } // Subjects input field
    get uploadInput() { return $('#uploadPicture'); } // File upload input
    get addressInput() { return $('#currentAddress-label'); } // Address label (not input)
    get stateDropdown() { return $('#state'); } // State dropdown
    get cityDropdown() { return $('#city'); }   // City dropdown
    get submitBtn() { return $('#submit'); }    // Submit button
    get modalTitle() { return $("//div[@id='example-modal-sizes-title-lg']"); } // Confirmation modal title

    // --- Gender Selection ---
    async selectGender(gender) {
        // Remove Google ads iframe if present to avoid overlap
        await browser.execute(() => {
            const ad = document.querySelector('iframe[id^="google_ads_iframe"]');
            if (ad) ad.remove();
        });

        // Locate gender label based on text and click it
        const genderElement = await $(`//label[text()="${gender}"]`);
        await genderElement.scrollIntoView();
        await browser.execute("arguments[0].click();", genderElement);
    }

    // --- Date of Birth Selection ---
    async setDateOfBirth(day, month, year) {
        await this.dobInput.waitForClickable();
        await this.dobInput.click();

        // Select year from dropdown
        const yearSelect = await $('.react-datepicker__year-select');
        await yearSelect.waitForDisplayed();
        await yearSelect.selectByVisibleText(year);

        // Select month from dropdown
        const monthSelect = await $('.react-datepicker__month-select');
        await monthSelect.waitForDisplayed();
        await monthSelect.selectByVisibleText(month);

        // Click the correct day (formatted with leading zero)
        const formattedDay = day.toString().padStart(2, '0');
        const dayElement = await $(`.react-datepicker__day--0${formattedDay}:not(.react-datepicker__day--outside-month)`);
        await dayElement.waitForClickable();
        await dayElement.click();
    }

    // --- Subject Selection ---
    async setSubject(subject) {
        await this.subjectInput.setValue(subject); // Type subject
        await browser.keys('Enter'); // Press Enter to select
    }

    // --- Hobby Selection ---
    async selectHobby(hobby) {
        const hobbyElement = await $(`//label[text()="${hobby}"]`);
        await hobbyElement.scrollIntoView();
        await browser.execute("arguments[0].click();", hobbyElement);
    }

    // --- File Upload ---
    async uploadFile(filePath) {
        const remotePath = await browser.uploadFile(filePath); // Upload file to browser session
        await this.uploadInput.setValue(remotePath); // Set file path in input
    }

    // --- Address Input ---
    async setAddress(address) {
        await browser.execute((value) => {
            // Remove ads if present
            const ad = document.querySelector('iframe[id^="google_ads_iframe"]');
            if (ad) ad.style.display = 'none';

            // Locate and set the address field
            const el = document.querySelector('#currentAddress');
            if (el) {
                el.scrollIntoView();
                el.focus();
                el.value = value;
            }
        }, address);
    }

    // --- Remove ads and floating elements (used for dropdowns/modals) ---
    async removeAds() {
        await browser.execute(() => {
            const ads = document.querySelectorAll(
                'iframe[id^="google_ads_iframe"], #fixedban, .Advertisement-Container, .ads'
            );
            ads.forEach(ad => ad.remove());
        });
    }

    // --- State and City Selection ---
    async setStateAndCity(state, city) {
        await this.removeAds(); // Remove ads first

        // Hide sticky headers or overlays that can block clicks
        await browser.execute(() => {
            const overlays = document.querySelectorAll('th, .sticky-header, .overlay');
            overlays.forEach(el => el.style.display = 'none');
        });

        // --- State ---
        const stateDropdown = await this.stateDropdown;
        await stateDropdown.scrollIntoView({ block: 'center' });
        await stateDropdown.waitForClickable({ timeout: 10000 });

        try { await stateDropdown.click(); } 
        catch { await browser.execute(el => el.click(), stateDropdown); }

        const stateOption = await $(`//div[contains(@id,"react-select") and text()="${state}"]`);
        await stateOption.waitForDisplayed({ timeout: 10000 });
        await stateOption.scrollIntoView({ block: 'center' });
        await stateOption.click();

        // --- City ---
        const cityDropdown = await this.cityDropdown;
        await cityDropdown.scrollIntoView({ block: 'center' });
        await cityDropdown.waitForClickable({ timeout: 10000 });

        try { await cityDropdown.click(); } 
        catch { await browser.execute(el => el.click(), cityDropdown); }

        const cityOption = await $(`//div[contains(@id,"react-select") and text()="${city}"]`);
        await cityOption.waitForDisplayed({ timeout: 10000 });
        await cityOption.scrollIntoView({ block: 'center' });
        await cityOption.click();
    }

    // --- Form Submission ---
    async submitForm() {
        await this.submitBtn.scrollIntoView();
        await this.submitBtn.click();
        console.log("Submitting form...");
    }

    // --- Confirmation Modal ---
    async getConfirmationText() {
        // Remove ads that may overlap modal
        await browser.execute(() => {
            const ads = document.querySelectorAll('#fixedban, .Advertisement-Container, .ads');
            ads.forEach(ad => ad.remove());
        });

        // Wait for modal to appear
        await browser.waitUntil(
            async () => await this.modalTitle.isDisplayed(),
            {
                timeout: 15000,
                timeoutMsg: "Confirmation modal not visible after 15s"
            }
        );

        // Scroll into view and return text
        await this.modalTitle.scrollIntoView();
        return await this.modalTitle.getText();
    }

    // --- Retrieve Submitted Data from Table ---
    async getSubmittedData(label) {
        const cell = await $(`//td[text()="${label}"]/following-sibling::td`);
        await cell.waitForDisplayed({ timeout: 5000 });
        let text = await cell.getText();
        text = text.replace(/,/g, '').replace(/\s+/g, ' ').trim();

        // Format Date of Birth if applicable
        if (label.toLowerCase().includes('date of birth')) {
            text = text.replace(/(\d{1,2}\s\w+)(\d{4})/, '$1 $2');
        }
        return text;
    }
}

module.exports = new FormPage();
