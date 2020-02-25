// main function to work with the table
async function forecast_today() {
    if (count_cities < 10) {
      /* city variable gets the user input, and the string is processed so it starts in upercase 
      (for correct API calls, could be done on the server)*/
      var city = document.getElementById("myInput").value.toLowerCase();
      city = city.charAt(0).toUpperCase() + city.slice(1);
      // verifies if the city already exists
      if (!entries.includes(city)) {
        // uses fetch(), to retrieve weather info from server
        let response = await fetch(`forecast/daily/${city}`);
        let data = await response.json();
        // values to send in the post to write on the server log file
        var data_post = {}
        // just need to verify one entry of the response to know if theres data (melhorar)
        if (!isNaN(data["sunriseTime"])) {
          // caso seja adicionado o valor, escondo a mensagem inicial e mostro tabela e o grafico de barras
          var alert = document.getElementById("alertMessage").style.display = "none";
          var table = document.getElementById("tableWithData").style.display = "";
          // values from json
          var city_f = data["city"];
          var sunrise = UnixToTimestamp(data["sunriseTime"]);
          var sunset = UnixToTimestamp(data["sunsetTime"]);
          var temp_min = FahrenheitToCelcius(data["temperatureMin"]);
          var temp_max = FahrenheitToCelcius(data["temperatureMax"]);
          var temp_med = (parseInt(temp_min) + parseInt(temp_max)) / 2;
          var lat = data["latitude"];
          var lon = data["longitude"];
          // creates table entrie
          data_post = { city, city_f, sunrise, sunset, temp_min, temp_max, lat, lon }
          createTableEntrie(data_post);
          // adds data to graph, label and value and updates, and colors that are equal to the average temperature
          chart.data.labels.push(city);
          chart.data.datasets.forEach((dataset) => {
            dataset.data.push(temp_med);
          });
          chart.update();
          // stores the city names displayed in the table
          entries.push(city);
          count_cities++;
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data_post),
          };
          // sends the info used to createTableEntrie()
          const response_post = await fetch('api', options);
          const json_post = await response_post.json();
        }
        else {
          window.alert("Locality does not exist in the dataset!");
        }
      } else {
        window.alert("Locality already exists!");
      }
    }
    else {
      window.alert("Maximum number of localities!");
    }
  }

  // adds a row to the html table
  function createTableEntrie(data_post) {
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = data_post.city_f;
    cell2.innerHTML = data_post.sunrise;
    cell3.innerHTML = data_post.sunset;
    cell4.innerHTML = data_post.temp_min;
    cell5.innerHTML = data_post.temp_max;
    //count_cities passes the city info to the model, and onclick it executes the func that with the latitude e longitude builds the graph, and current count for colour track
    cell6.innerHTML = `<button type="button" class="btn btn-primary" data-toggle="modal" data-id='${data_post.city_f}' 
    data-whatever="${data_post.city_f}" data-target="#exampleModal" onclick="buildCityChart(${data_post.lat}, ${data_post.lon}, ${count_cities})"
    data-toggle="tooltip" data-placement="right" title="Press to view the 48h forecast to ${data_post.city_f}">
    <i class="fa fa-eye"></i></button>`;
  }