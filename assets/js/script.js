var cryptoUrl = "https://api.coinlore.net/api/tickers/";

$(".cryptoBtn").click(function(){
    //define variable of crypto search input
    var crypto = $("#cryptoInput").val().trim();
    // fetch crypto data
    fetch(cryptoUrl).then(function(response){
        if(response.ok){
        response.json().then(function(cryptoInfo){
            // loop thru cryptoInfo.data to find the entry matching the user input
            for(var i = 0; i < cryptoInfo.data.length; i++){
                // if the currently indexed entry matches the user input, declare the desired data as a variable
                if(cryptoInfo.data[i].symbol === crypto){
                    var target = cryptoInfo.data[i];
                }
            };
            // declare variable for current price
            console.log(target);
            var price = target.price_usd
            console.log(price);
        })
    }
    });    
});


// stock search button is clicked
$(".stockBtn").click(function(){
    var stock = $("#stockInput").val().trim();
    var alphaUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + stock + "&apikey=CTVQQ6247M8QOVM6";
    // Fetch stock data
    fetch(alphaUrl).then(function(response){
        if(response.ok){
            response.json().then(function(stockInfo){
            var obj = stockInfo["Time Series (Daily)"];
            //convert returned object to array to find latest entry
            var arr = Object.entries(obj)
            // variable for closing price of most recent business day
            var close = arr[0][1]["4. close"];
            console.log(close);
        })
    }
});
});

