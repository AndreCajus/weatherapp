window.onload = () => {
    //...
};
// to store fetched() cities;
var entries = [];
// to allow a maximum of 10 cities;
var count_cities = 0;
// charts
var ctx = document.getElementById('myChart').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
// init object Chart out, so it can be destroyed when the function is called
var myLineChart;
/* since the program allows a maximum of 10 cities I manually create the RGB insted of generating 
      (i have random function but since maximum is 10 I rather choose the colors)*/
var graph_colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
    'rgba(255, 30, 64, 0.2)', 'rgba(255, 30, 132, 0.2)',
    'rgba(102, 204, 0, 0.2)', 'rgba(204, 204, 0, 0.2)',];
// this chart is global, it gives feedback on the average localities temperatures
var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        datasets: [{
            label: 'Average Temperature (ºC)',
            backgroundColor: graph_colors,
            borderColor: [
                'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                'rgba(255, 30, 64, 1)', 'rgba(255, 30, 132, 1)',
                'rgba(102, 204, 0, 1)', 'rgba(204, 204, 0, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        tooltips: {
            mode: 'single',
            callbacks: {
                label: function (tooltipItems) {
                    return 'Average temperature: ' + tooltipItems.yLabel + 'ºC';
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    //reverse order, to the table insertion order
                    reverse: true
                }
            }]
        }
    }
});