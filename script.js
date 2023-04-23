function getLightingTimes() {
    // store ZIP code and API parameters
    var zipCode = document.getElementById("zip").value;
    var url = "https://www.hebcal.com/shabbat?cfg=json&zip=" + zipCode + "&M=on";