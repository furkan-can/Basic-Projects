const api_key = "2e393b6a6fcb178fc2e49098";
const url = `https://v6.exchangerate-api.com/v6/${api_key}`;

const currency1 = document.getElementById("currency-one");
const currency2 = document.getElementById("currency-two");
const list1 = document.getElementById("list-one");
const list2 = document.getElementById("list-two");

const amountElement = document.getElementById("amount");
const btnCalculate = document.getElementById("calculate");
const resultElement = document.getElementById("result");




fetch(url + "/codes")
    .then(response => response.json())
    .then(data => {
        const items = data.supported_codes;

        let options;
        for (let item of items) {
            options += `<option value=${item[0]}>${item[1]}</option>`;
        }
        list1.innerHTML = options;
        list2.innerHTML = options;
    });

btnCalculate.addEventListener("click", async () => {
    const fromCurrency = currency1.value;
    const toCurrency = currency2.value;
    const amount = amountElement.value;

    const resultAmount = await fetch(url + "/latest/" + fromCurrency)
        .then(response => response.json())
        .then(data => {
            return (data.conversion_rates[toCurrency] * amount).toFixed(3);
        });

    let result = `
    <div class="card border-primary">
        <div class="card-body text-center" style="font-size: 30px;">
        ${amount} ${fromCurrency} = ${resultAmount} ${toCurrency}
        </div>
    </div>`;

    resultElement.innerHTML = result;

});

