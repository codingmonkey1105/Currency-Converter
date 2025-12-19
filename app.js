base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropDown select");
const btn = document.getElementById("convert");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currency_code in countryList){
        newOptions = document.createElement("option");
        newOptions.value = currency_code;
        newOptions.innerText = currency_code;
        select.append(newOptions);
        if(select.name == "From" && currency_code == "USD"){
            newOptions.selected = true;
        }
        if(select.name == "To" && currency_code == "INR"){
            newOptions.selected = true;
        }
        select.addEventListener("change", e => {
            updateFlade(e.target);
        });
    }
}

const updateFlade = (element) => {
    let currCode = element.value;
    let currecyCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${currecyCode}/flat/64.png`;
    let imgTag = element.parentElement.querySelector("img");
    imgTag.src = newSrc;
}

const calcExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if(amtValue === "" || isNaN(amtValue)){
        amtValue = 1;
        amount.value = "1";
    }
    const url = `${base_url}${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalAmt = (amtValue * rate).toFixed(2);
    msg.innerText = `${amtValue} ${fromCurrency.value} = ${finalAmt} ${toCurrency.value}`;  
    // console.log(finalAmt);
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    calcExchangeRate();
})