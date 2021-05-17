const API_ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json';

const resultNode = document.getElementById('result');
const currentPrice = document.getElementById('current-price');

console.log(result);

function calculatePrice() {
  const input = document.getElementById('value-input');
  const price = parseFloat(currentPrice.innerHTML);

  console.log(`${input.value} divided by ${currentPrice.innerHTML}`);
  //divide by what user entered
  let result = parseFloat(input.value) / price;
  console.log(result);
  //output to dom
  resultNode.innerHTML = `${input.value} ${
    input.value == 1 ? 'Euro gives' : 'Euros give'
  } you ${result} BTC`;
}

function getPrice() {
  //get current price
  fetch(API_ENDPOINT)
    .then((blob) => blob.json())
    .then((data) => {
      result = data.bpi.EUR.rate;
      currentPrice.innerHTML = result.replace(',', '').slice(0, -2);
      console.log('price updated');
    });
}

getPrice();
