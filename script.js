'use strict';

//Real time token
//const token = "pk_86cdeba3d79748f89f8f90da8449dc66";

//Sandbox token
const token = "Tpk_6831e5821c884d9cac62b4d6935ff3ca";


//Real time stock
//const searchURL = 'https://cloud.iexapis.com/stable/stock/';

//Sandbox testing
const searchURL = 'https://sandbox.iexapis.com/stable/stock/';

function displayResults(responseJson) {
  $('#results-list').empty();
  $('#results').removeClass('hidden');
};


function parseData(responseJson) {
  const xlabel = [];
  const ylabel = [];
  for(let i = 0; i < responseJson.length; i++) {
    xlabel.push(responseJson[i].label);
    ylabel.push(responseJson[i].close);
  }


  var ctx = document.getElementById('myChart').getContext('2d');
  ctx.canvas.width = 1500;
  ctx.canvas.height = 600;
  window.chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: xlabel,
          datasets: [{
              label: 'Price in $',
              borderColor: "#66FCF1",
              data: ylabel
          }]
      },

      // Configuration options go here
      options: {}
  });

}


function getStockMovement(stockName, timePeriod) {
  let target = document.getElementById("time");
  target.style.visibility = "visible";
  const url = searchURL + stockName + "/chart/" + timePeriod + "?token=" + token;

  console.log(url);
  console.log(stockName);

  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log(response, "1st");
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayResults(responseJson);
      console.log(responseJson,"2nd");
      //console.log(responseJson[1].label);
      //console.log(responseJson.length);
      parseData(responseJson);
    })
    .catch(err => {
      console.log(err,"3rd");
      $('#js-error-message').text(`Stock does not exist! ${err.message}`);
    });
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stockName = $('#js-search-term').val();
    let timePeriod = "1m";
    getStockMovement(stockName, timePeriod);
  });
  $('#time1').click(event => {
    window.chart.destroy();
    const stockName = $('#js-search-term').val();
    getStockMovement(stockName, "5d");
  });
  $('#time2').click(event => {
    window.chart.destroy();
    const stockName = $('#js-search-term').val();
    getStockMovement(stockName, "1m");
  });
  $('#time3').click(event => {
    window.chart.destroy();
    const stockName = $('#js-search-term').val();
    getStockMovement(stockName, "6m");
  });
  $('#time4').click(event => {
    const stockName = $('#js-search-term').val();
    window.chart.destroy();
    getStockMovement(stockName, "1y");
  });

}

$(watchForm);



