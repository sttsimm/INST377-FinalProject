function mainEvent() {
    // store ZIP code and API parameters
    var zipCode = document.getElementById("zip").value;
    var url = "https://www.hebcal.com/shabbat?cfg=json&zip=" + zipCode + "&M=on";
        // request
        fetch(url)
        .then(function(response) {
          return response.json();
        })

        .then(function(data) {
            // Filtering response data to extract Shabbat start times
            var Times = data.items.filter(function(item) {
              return item.category === "candles";
            });

           // store times data into localStorage
           localStorage.setItem("lightingTimes", JSON.stringify(Times));


           //pass Times var to this function
           displayLightingTimes(Times);
           var weatherUrl = "https://api.weatherbit.io/v2.0/forecast/daily?postal_code=" + zipCode + "&key=2bf6e17633fe42f6a7261fc42e85a75a&days=8&units=I";

           fetch(weatherUrl)
           .then(function(response) {
             return response.json();
           })
           .then(function(data) {
            // Filter response data to get weather for following Saturday
            var weather = data.data.filter(function(day) {
              return new Date(day.valid_date).getDay() === 6;
            })[0];
                // Display weather data for following Saturday
              var weatherSection = document.getElementById("weather");
              weatherSection.innerHTML = "";
              weatherSection.innerHTML += "<p><b>Weather for following Saturday:</b></p>";
              weatherSection.innerHTML += "<p>High: " + weather.high_temp + "°F</p>"; //changed c to f
              weatherSection.innerHTML += "<p>Low: " + weather.low_temp + "°F</p>";
              weatherSection.innerHTML += "<p>Chance of precipitation: " + weather.pop + "%</p>";

            })
            .catch(function(error) {
              console.error(error);
            });
          })
          .catch(function(error) {
            console.error(error);
          });
        }

    

    function displayLightingTimes(Times) {
      //results div
    var results = document.getElementById("results");
  
    // Clear prev results from div
    results.innerHTML = "";
  
    // loop through start times, add to results div
    Times.forEach(function (time) {
      var date = new Date(time.date);
      var formatDate = date.toLocaleDateString();
      var formatTime = time.title;
      results.innerHTML += "<p>" + formatDate + ": " + formatTime + "</p>";
    });

    }

  // load data from localStorage if available
  if (localStorage.getItem("lightingTimes")) {
    var Times = JSON.parse(localStorage.getItem("lightingTimes"));
    displayLightingTimes(Times);
  }

  // Adding event listener to button, once button is clicked the getLightingTimes function is called
  document.getElementById("get-times").addEventListener("click", function () {
    mainEvent();
  });

  // Adding event listener to form to prevent default behavior on submit
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    });

    // event listener for refreshing button
    document.getElementById("refresh-btn").addEventListener("click", function() {
      localStorage.removeItem("lightingTimes");
      mainEvent();
    });

         
      