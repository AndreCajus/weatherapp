// converts unix to timestamp
function UnixToTimestamp(unix_timestamp, selector) {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    if (selector == 'h')
        return hours;
    return hours + ':' + minutes.substr(-2);
}

// converts faresheit to celcius
function FahrenheitToCelcius(fahrenheit) {
    var fTemp = fahrenheit;
    var fToCel = (fTemp - 32) * 5 / 9;
    return fToCel.toFixed(1);
}

//random RGB if needed
function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}