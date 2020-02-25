// builds a chart for each modal call, with the lat lon stored in the btn call
async function buildCityChart(lat, lon, city_id) {
  let response = await fetch(`forecast/hourly/${lat}/${lon}`);
  let data = await response.json();
  // to store json hour values and temperatures
  var timeArr = [];
  var temperatureArr = [];
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      timeArr.push(UnixToTimestamp(data[key].time, 'h'));
      temperatureArr.push(FahrenheitToCelcius(data[key].temperature));
    }
  }
  // if it already exists, destroys it, so it doenst overlap the others
  if (myLineChart != undefined) {
    myLineChart.destroy();
  }
  myLineChart = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: timeArr,
      datasets: [{
        label: '48 hours forecast (temperature/hour)',
        data: temperatureArr,
        borderWidth: 1
      }]
    },
    options: {
      tooltips: {
        mode: 'single',
        callbacks: {
          title: function (tooltipItems) {
            return tooltipItems[0].xLabel + ' hours';
          },
          label: function (tooltipItem) {
            return 'Temperature: ' + tooltipItem.yLabel + 'ºC';
          }
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Temperature (ºC)'
          },
          ticks: {
            beginAtZero: true
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time (H)'
          },
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  // so it gets the color depending on the locality
  myLineChart.data.datasets[0].backgroundColor = graph_colors[city_id];
  myLineChart.update();
}