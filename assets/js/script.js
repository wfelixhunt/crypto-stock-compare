var cryptoUrl = "https://api.coinlore.net/api/tickers/";
var stockModal = document.getElementById("myStockModal");
var cryptoModal = document.getElementById("myCryptoModal");
var stockModalContent = document.getElementsByClassName("stock-modal-content");
var cryptoModalContent = document.getElementsByClassName("crypto-modal-content");
var cryptoArr = JSON.parse(localStorage.getItem("crypto")) || [];
var stockArr = JSON.parse(localStorage.getItem("stock")) || []

$(".crypto-btn").click(function () {
  //define variable of crypto search input
  var crypto = $("#crypto-input").val().trim();
    $("#crypto-input").val("");
    
  cryptoSearch(crypto);
});

$("#crypto-input").keypress(function (event) {
  if (event.which === 13) { 
    $(".crypto-btn").click();
  }
});

function cryptoSearch (crypto) {
  // fetch crypto data
  fetch(cryptoUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (cryptoInfo) {
        // loop thru cryptoInfo.data to find the entry matching the user input
        for (var i = 0; i < cryptoInfo.data.length; i++) {
          // if the currently indexed entry matches the user input, declare the desired data as a variable
          if (cryptoInfo.data[i].symbol === crypto || cryptoInfo.data[i].name === crypto || cryptoInfo.data[i].symbol === crypto.toUpperCase() || cryptoInfo.data[i].name.toLowerCase() === crypto) {
            var target = cryptoInfo.data[i];
          }
        }
        // declare variable for current price
        var price = target.price_usd;
        var changeHour = target.percent_change_1h;
        var changeWeek = target.percent_change_7d;

        // clears modal before appending new data
        $(cryptoModalContent).html("")

        // prepends data readout to modal div
        $(cryptoModalContent).prepend(
          `<h2>Change In Past Hour: ${changeHour}%</h2>`
        );
        $(cryptoModalContent).prepend(
          `<h2>Change In Past Week: ${changeWeek}%</h2>`
        );

        // Clears container div before appending new search
        $(".crypto-data").html(" ");

        //appends data from search
        $(".crypto-data").append(
          `<div class="search-return">
              <h1 class="search-symbol">
                ${target.symbol}<i class="chart bar icon"></i>
              </h1>
              <h2 class="amount">Current Price: $${price}</h2>
              <button class='ui inverted button more-info-btn'> More Info </button>
            </div>`
        );

        // If the searched symbol does not appear already in storage, save button and push to local storage 
        if (!cryptoArr.includes(target.symbol)) {
          cryptoArr.unshift(target.symbol);
          localStorage.setItem("crypto", JSON.stringify(cryptoArr).toUpperCase())
          $(".crypto-searches").append(
            `<button class='saved-btn ui inverted button'>
                ${target.symbol}
              </button>`
          );
        }
      });
    }
  });
};

// stock search button is clicked
$(".stock-btn").click(function () {
  var stock = $("#stock-input").val().trim().toUpperCase();
  $("#stock-input").val("");
  stockSearch(stock);
});

$("#stock-input").keypress(function (event) {
  if (event.which === 13) { 
    $(".stock-btn").click();
  }
});

function stockSearch (stock) {
  var alphaUrl =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
    stock +
    "&apikey=CTVQQ6247M8QOVM6";
  // Fetch stock data
  fetch(alphaUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (stockInfo) {
        var obj = stockInfo["Time Series (Daily)"];
        //convert returned object to array to find latest entry
        var arr = Object.entries(obj);
        // variable for closing price of most recent business day
        var dailyHigh = arr[0][1]["2. high"];
        var dailyLow = arr[0][1]["3. low"];
        var close = arr[0][1]["4. close"];

        // clears modal before appending new data
        $(stockModalContent).html("");

        // prepends data readout to modal div
        $(stockModalContent).append(`<h2>Daily High: $${dailyHigh}</h2>`);
        $(stockModalContent).append(`<h2>Daily Low: $${dailyLow}</h2>`);

        // Clears container div before appending new search
        $(".stock-data").html(" ");

        // appends data from search
        $(".stock-data").append(
          `<div class="search-return">
            <h1 class="search-symbol">
              ${stock}<i class="chart bar icon"></i>
            </h1>
            <h2 class="amount">Closing Price: $${close}</h2>
            <button class='ui inverted button more-info-btn'> More Info </button>
          </div>`
        );
        // If the searched symbol does not appear already in storage, save button and push to local storage 
        if (!stockArr.includes(stock)) {
          stockArr.unshift(stock);
          localStorage.setItem("stock", JSON.stringify(stockArr).toUpperCase())
          $(".stock-searches").append(
            `<button class='saved-btn ui inverted button'>
              ${stock}
            </button>`
          );
        };
      });
    }
  });
};

renderBtns(cryptoArr);

function renderBtns() {
  for (var i = 0; i < cryptoArr.length; i++) {
    $(".crypto-searches").append(
      `<button class='saved-btn ui inverted button'>
        ${cryptoArr[i]}
      </button>`
    );
  }
};

renderStockBtns();

function renderStockBtns() {
  for (var i = 0; i < stockArr.length; i++) {
    $(".stock-searches").append(
      `<button class='saved-btn ui inverted button'>
        ${stockArr[i]}
      </button>`
    );
  };
};

$(".stock-searches").on("click", "button", function (event) {
  var stock = $(event.target).html().trim();
  stockSearch(stock);
});

$(".crypto-searches").on("click", "button", function (event) {
  var crypto = $(event.target).html().trim();
  cryptoSearch(crypto);
});

$(".stock-data").on("click", "button", function (event) {
  $(".modal-stock-div").modal("show");
});

$(".crypto-data").on("click", "button", function (event) {
  $(".modal-crypto-div").modal("show");
});