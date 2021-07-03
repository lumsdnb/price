const API_ENDPOINT = 'https://api.coindesk.com/v1/bpi/currentprice.json';

const resultNode = document.getElementById('result');
const currentPrice = document.getElementById('current-price');

console.log(result);

function calculatePrice(e) {
  const radioOne = document.getElementById('option_one');
  const radioTwo = document.getElementById('option_two');
  const input = document.getElementById('value-input');
  const price = parseFloat(currentPrice.innerHTML);

  console.log(`${input.value} divided by ${currentPrice.innerHTML}`);

  if (!isNaN(input.value)) {
    //if from fiat to btc
    if (radioOne.checked === true) {
      console.log('divide from fiat to btc');
      //divide by what user entered
      let result =
        Math.round((parseFloat(input.value) / price) * 10000000000) /
        10000000000;
      console.log(result);
      //output to dom
      resultNode.classList.add('card-bg');
      resultNode.innerHTML = `${input.value} ${
        input.value == 1 ? 'Euro gives' : 'Euros give'
      } you <strong>${result} BTC </strong> or <strong>${
        result * 10000000000
      } sats</strong>`;
    }
  }
  if (radioTwo.checked === true) {
    //if from btc to fiat
    let result = Math.round(parseFloat(input.value) * price * 100) / 100;
    console.log(result);
    //output to dom
    resultNode.classList.add('card-bg');
    resultNode.innerHTML = `<strong>${input.value} ${
      input.value == 1 ? 'BTC </strong> gives' : 'BTC </strong> give'
    } you ${result} EUR`;
  }
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
