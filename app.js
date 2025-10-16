const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns = document.querySelectorAll(".drop-down select"); // Select all <select> elements

const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currCode;
        newOption.innerText = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption); 
    }
    select.addEventListener('change', (e) => {
        updateFlag(e.target);
    })
}



const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;


}

btn.addEventListener('click', async (e) => {
    e.preventDefault();
    let amount = document.querySelector("form input");
    // console.log(amount.value);
    if(amount.value < 1 || amount.value == ""){
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    
    let finalAmount = amount.value * rate;
    document.querySelector(".msg").innerText = `${amount.value} ${fromCurr.value.toUpperCase()} = ${finalAmount.toFixed(2)} ${toCurr.value.toUpperCase()}`
})
