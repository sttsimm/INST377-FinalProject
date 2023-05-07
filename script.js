function getLightingTimes() {
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


      //pass Times var to this function
        displayLightingTimes(Times);
      })
      .catch(function (error) {
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

  // Adding event listener to button, once button is clicked the getLightingTimes function is called
  document.getElementById("get-times").addEventListener("click", function () {
    getLightingTimes();
  });

  // Adding event listener to form to prevent default behavior on submit
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    });

         
      