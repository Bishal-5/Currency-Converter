let url = "https://2024-03-06.currency-api.pages.dev/v1/currencies"; // URL for the currency API

let select = document.querySelectorAll(".option select"); // Select all dropdowns for currency selection
let button = document.querySelector("button"); // Select the button for triggering currency conversion
let fromCurrency = document.querySelector(".from select"); // Select the dropdown for the currency to convert from
let toCurrency = document.querySelector(".to select"); // Select the dropdown for the currency to convert to
let result = document.querySelector(".result p"); // Select the paragraph element to display the conversion result

// Loop through each dropdown for currency selection
for (let dropDown of select) {
    // Loop through each currency code in countryList
    for (code in countryList) {
        let newOpt = document.createElement("option"); // Create a new option element for each currency
        newOpt.innerText = code; // Set the text of the option to the currency code
        // If this is the "from" dropdown and the currency is USD, select it
        if (dropDown.name === "from" && code === "USD") {
            newOpt.selected = "selected"; 
        // If this is the "to" dropdown and the currency is INR, select it
        } else if (dropDown.name === "to" && code === "INR") {
            newOpt.selected = "selected"; 
        }
        // Append the new option to the dropdown
        dropDown.append(newOpt);
    }
    // Add an event listener for changes in the dropdown
    dropDown.addEventListener("change", (evt) => { 
        updateFlag(evt.target); // Update the flag image based on selected currency
    });
}

// Function to update the flag image based on the selected currency
function updateFlag(updateCode) { 
    let currencyCode = updateCode.value; // Get the selected currency code
    let countryCode = countryList[currencyCode]; // Get the corresponding country code
    let updateImg = `https://flagsapi.com/${countryCode}/flat/64.png`; // Create the URL for the flag image
    let newImg = updateCode.parentElement.querySelector("img"); // Select the image element to update
    newImg.src = updateImg; // Update the image source to the new flag URL
}

// Add an event listener for the button click to perform currency conversion
button.addEventListener("click", async (evt) => { 
    evt.preventDefault(); // Prevent the default form submission behavior
    let amount = document.querySelector(".amount input"); // Select the input field for the amount
    let amountVal = amount.value; // Get the value entered by the user
    // Validate the entered amount
    if (amountVal == "" || amountVal < 1) {
        amount.value = "Invalid Amount"; // If invalid, display an error message
    }
    // Construct the URL to fetch the conversion rate for the selected currencies
    let from_currency_lower = fromCurrency.value.toLowerCase(); //Convert 'from currency value' in lower case
    let to_lower_case = toCurrency.value.toLowerCase(); //Convert 'to currency value' in lower case
    let URL = `${url}/${from_currency_lower}.json`; //add from_currency_lower to the url
    let response = await fetch(URL); // Fetch the conversion rate data
    response = await response.json(); // Parse the response as JSON
    response = (response[from_currency_lower][to_lower_case]); //Get the rate from all data (object)
    let finalResponse = amountVal * response; // Calculate the converted amount
    // Display the result in the designated paragraph element
    result.innerText = `${amountVal} ${fromCurrency.value} = ${finalResponse} ${toCurrency.value}`;
});
