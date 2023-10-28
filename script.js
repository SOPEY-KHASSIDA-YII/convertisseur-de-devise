

const convert = document.getElementById('convert');
function convertion() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const result = document.getElementById('result');

    if (isNaN(amount)) {
        alert('Veuillez entrer un montant valide.');
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById('result').textContent = `${amount} ${fromCurrency}`;
        return;
    }


    let url = `http://data.fixer.io/api/latest?access_key=a3817cbd4a223733621d573a21324eea`;
    // let url = `https://v6.exchangerate-api.com/v6/d646ebeb3b6925d372ec53f3/latest/USD`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const exchangeRate = data.rates[toCurrency];
            if (exchangeRate) {
                const coveredAmount = (amount * exchangeRate).toFixed(2);
                result.innerHTML = `${amount} ${fromCurrency} = ${coveredAmount} ${toCurrency}`;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des taux de change :', error);
        });



}
convert.addEventListener("click", e => {
    convertion();
});


const exchangeIcon = document.querySelector(".icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
    toCurrency.value = tempCode; // passing temporary currency code to TO currency code
    loadFlag(fromCurrency); // calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency);
})
exchangeIcon.addEventListener("click", () => {
    convertion();
})


