var cryptoUrl = "https://api.coinlore.net/api/tickers/";

$(".cryptoBtn").click(function(){
    //define variable of crypto search input
    var crypto = $("#cryptoInput").val().trim();

    // fetch crypto data
    fetch(cryptoUrl).then(function(response){
        if(response.ok){
        response.json().then(function(cryptoInfo){
            console.log(cryptoInfo);
            // // returns array index featuring searchvalue
            // var filteredInfo = cryptoInfo.filter(function(data){
            //     return data.symbol = crypto;
            // })
        })
    }
});
    
})




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

