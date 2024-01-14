/* This is original api for currency convert: https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json */
let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"; /* This is cut url, for add 'toCurrency' & 'fromCurrency' */
let select = document.querySelectorAll(".option select"); /* Access dropdown menu option <select> with the class ".option" */
let button = document.querySelector("button"); /* Access the 'Convert' button with <button> */
let fromCurrency = document.querySelector(".from select"); /* Access <select> with the class ".from" */
let toCurrency = document.querySelector(".to select"); /* Access <select> with the class ".to" */
let result = document.querySelector(".result p"); /* Access the 'o/p result' <p> with the class ".result" */
/* Add all currencyCode in dropDown menu, 'currencyList' are provided in other JS file */
/* Nested loops iterate over each <select> to the variable 'dropDown' & each new variable 'code in the 'countryList' */
for (let dropDown of select){ /*Iterate dropdown options to 'dropdown' & 'select' variable */
    for (code in countryList){ /* Iterate all countryCode to "code" & "currencyList" ("currencyList" is created other JS file previously) */
        let newOpt = document.createElement("option"); /* Create a new element "option" to the "newOpt" variable */
        newOpt.innerText = code; /* change newOpt.innerText to all sleect countryCode using "code"  */
        if(dropDown.name === "from" && code === "USD"){ /* If "dropDown.name" is "from" & countryCode ("code") is "USD" */
            newOpt.selected = "selected"; /* Then "newOpt.selected" is "selected" as USD */
        }else if(dropDown.name === "to" && code === "INR"){ /* If "dropDown.name" is "to" & countryCode ("code") is "INR" */
            newOpt.selected = "selected"; /* Then "newOpt.selected" is "selected" as INR */
        }
        dropDown.append(newOpt); //Add all currencyList ("newOpt") to the end of "dropDown" menu (previously dropDown was blank) in inside the element */
    }
    /* Add event listner, if user change/select any currencyCode form dropDown menu */
    /* Add event listener to each dropdown, triggering the 'updateFlag' function when the dropdown value changes */
    dropDown.addEventListener("change", (evt)=>{ /* If user select a countryCode, we create a function 'evt' */
        updateFlag(evt.target); /* Then pass the value of 'evt.target' to 'updateFlag' function (which countryCode is selected by user) */
    })
}
/* Function to change the flag with using the currencyCode */
function updateFlag(updateCode){ /* 'updateCode' is a parameter, where the argument is 'evt.target' */
    /* Extracts the selected currency code and uses it to look up the corresponding country code in the countryList. */
    let currencyCode = updateCode.value; /* Store the actual currency code */
    let countryCode = countryList[currencyCode]; /* Find the country code using currency code in the countryList */
    let updateImg = `https://flagsapi.com/${countryCode}/flat/64.png`; /* Update the flag based on country code, '${countryCode}' is variable, where country code are updating, which is changable */
    /* Here 'updateCode' is <select> with class '.option' & parent element is <img> */
    let newImg = updateCode.parentElement.querySelector("img"); /* Access the flag image */
    newImg.src = updateImg; /* Then change 'flag image src' with using 'updateImg' */
}
/* When user click 'convert' button */
button.addEventListener("click", async(evt)=>{ /* When user click on 'convert', we create a function 'evt' using 'async' */
    evt.preventDefault(); /* 'preventDefault()' is use for not refresh the page or page not working automatically */
    let amount = document.querySelector(".amount input"); /* Access the input display from <input> with class '.amount' */
    let amountVal = amount.value; /* Store the 'amount.value' for simplify the input value */
    if (amountVal == "" || amountVal<1){ /* If i/p value is 0 or less-than 1 */
        amount.value="Invalid Amount"; /* Then change display value as 'Invalid Amount' */
    }
    /* Change 'fromCurrency' value & 'toCurrency' value form user select option on dropDown menu, from api 'url' (cut url), to fetch the currency */
    /* Change the 'url' based on 'fromCurrency.value' & 'toCurrency.value'. This value is in 'UpperCase' but the api is fetch with 'LowerCase'. So we convert the value to 'LowerCase' */
    let URL = `${url}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`; /* Change the api url */
    /* '${fromCurrency.value.toLowerCase()}' & '${toCurrency.value.toLowerCase()}' is change based on user select which 'currencyCode' */
    let response = await fetch(URL); /* Now Fetch the api 'url' with 'await' */
    response = await response.json(); /* Convert the fetching api 'url' result to the 'json method' ('object' format) for simplify the value */
    /* This line is used to extract the 'exchange rate' for the 'toCurrency' from the 'API response' */
    response = response[toCurrency.value.toLowerCase()]; /* Retrieves the selected "toCurrency" from the dropdown, converts it to 'lowercase' to get country currency value */
    let finalResponse = amountVal * response; /* Now calculate the final value */
    result.innerText = `${amountVal} ${fromCurrency.value} = ${finalResponse} ${toCurrency.value}`; /* Upadte the value of final result */
})