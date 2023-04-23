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

            //results div
            var results = document.getElementById("results");
      
            // Clear prev results from div
            results.innerHTML = "";
      
            // loop through start times, add to results div
            Times.forEach(function(time) {
              var date = new Date(time.date);
              var formatDate = date.toLocaleDateString();
              var formatTime = time.title;
              results.innerHTML += "<p>" + formatDate + ": " + formatTime + "</p>";
            });
          })
          .catch(function(error) {
            console.error(error);
          });
      }