const API_ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json';

const btcInput = document.getElementById('btc-input');
const satoshiInput = document.getElementById('satoshi-input');
const euroInput = document.getElementById('euro-input');
const currentPrice = document.getElementById('current-price');

let btcToEur = 0;
let btcToSatoshi = 100000000; // 1 BTC = 100,000,000 Satoshis

function getPrice() {
  fetch(API_ENDPOINT)
    .then((blob) => blob.json())
    .then((data) => {
      btcToEur = data.bpi.EUR.rate_float;
      currentPrice.innerText = btcToEur.toFixed(2);
      currentPrice.innerHTML = btcToEur.toFixed(2);

      // Update the input fields based on the initial values
      updateFields();
    });
}

function updateFields() {
  const btcValue = parseFloat(btcInput.value);
  const satoshiValue = btcValue * btcToSatoshi;
  const eurValue = btcValue * btcToEur;

  satoshiInput.value = satoshiValue.toFixed(0); // Satoshi has no decimal places
  euroInput.value = eurValue.toFixed(2); // EUR is usually shown to 2 decimal places
}

function updateFromSatoshi() {
  const satoshiValue = parseFloat(satoshiInput.value);
  const btcValue = satoshiValue / btcToSatoshi;
  const eurValue = btcValue * btcToEur;

  btcInput.value = btcValue.toFixed(8); // BTC is usually shown to 8 decimal places
  euroInput.value = eurValue.toFixed(2);
}

function updateFromEur() {
  const eurValue = parseFloat(euroInput.value);
  const btcValue = eurValue / btcToEur;
  const satoshiValue = btcValue * btcToSatoshi;

  btcInput.value = btcValue.toFixed(8);
  satoshiInput.value = satoshiValue.toFixed(0);
}

btcInput.addEventListener('input', updateFields);
satoshiInput.addEventListener('input', updateFromSatoshi);
euroInput.addEventListener('input', updateFromEur);

getPrice();
