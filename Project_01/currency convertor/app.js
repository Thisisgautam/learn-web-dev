const url = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")
// console.log(dropdowns)

// for (let code in countryList) {
//     console.log(code);
// }
for (let select of dropdowns) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "EUR") {
            newoption.selected = "selected";
        } else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption)
    }
    select.addEventListener("change", (evt) => {
        upflag(evt.target)
    })
}
const upflag = (ele) => {
    // console.log(ele)
    currcode = ele.value;
    // console.log(currcode)
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    ele.parentElement.querySelector("img").src = newsrc;
}

const btn = document.querySelector("form button");
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountval = amount.value;
    if (amountval == "" || amountval < 1) {
        amountval = 1;
        amount.value = "1";
    }
    // console.log(amountval)
    const u = `${url}/${fromcurr.value.toLowerCase()}.json`
    let response = await fetch(u);
    let data = await response.json()
    let rate = data[fromcurr.value.toLowerCase()]
    let r2 = rate[tocurr.value.toLowerCase()]
    // console.log(r2)
    let finalamt = amountval * r2;
    msg.innerText = `${amountval}${fromcurr.value} = ${finalamt}${tocurr.value}`

})