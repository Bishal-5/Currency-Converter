let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"; 
let select = document.querySelectorAll(".option select"); 
let button = document.querySelector("button"); 
let fromCurrency = document.querySelector(".from select"); 
let toCurrency = document.querySelector(".to select"); 
let result = document.querySelector(".result p"); 
for (let dropDown of select){
    for (code in countryList){
        let newOpt = document.createElement("option"); 
        newOpt.innerText = code; 
        if(dropDown.name === "from" && code === "USD"){
            newOpt.selected = "selected"; 
        }else if(dropDown.name === "to" && code === "INR"){
            newOpt.selected = "selected"; 
        }
        dropDown.append(newOpt);
    }
    dropDown.addEventListener("change", (evt)=>{ 
        updateFlag(evt.target); 
    })
}
function updateFlag(updateCode){ 
    let currencyCode = updateCode.value;
    let countryCode = countryList[currencyCode];
    let updateImg = `https://flagsapi.com/${countryCode}/flat/64.png`; 
    let newImg = updateCode.parentElement.querySelector("img");
    newImg.src = updateImg;
}
button.addEventListener("click", async(evt)=>{ 
    evt.preventDefault(); 
    let amount = document.querySelector(".amount input"); 
    let amountVal = amount.value; 
    if (amountVal == "" || amountVal<1){
        amount.value="Invalid Amount"; 
    }
    let URL = `${url}/${fromCurrency.value.toLowerCase()}/${toCurrency.value.toLowerCase()}.json`; 
    let response = await fetch(URL);
    response = await response.json();
    response = response[toCurrency.value.toLowerCase()]; 
    let finalResponse = amountVal * response;
    result.innerText = `${amountVal} ${fromCurrency.value} = ${finalResponse} ${toCurrency.value}`;
})