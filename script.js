function getCoordinates() {
    const cityName = document.getElementById('city').value;
    console.log(cityName);
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&language=en&format=json`;

    fetch(geocodingUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const { latitude, longitude } = data.results[0];
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          return getWeather(latitude, longitude);
        } else {
          throw new Error("City not found");
        }
      })
      .then(temperature => {        
        document.getElementById("fetched_temperature").innerHTML = `${temperature}°C`;
      })
      .catch(error => {
        console.error("Error:", error.message);
        document.getElementById("fetched_temperature").innerHTML = "Error: " + error.message;
      });
}

function getWeather(latitude, longitude) {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    return fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        if (data.current_weather) {
          const temperature = data.current_weather.temperature;
          return temperature;
        } else {
          throw new Error("Weather data not available");
        }
      })
      .catch(error => {
        console.error("Weather API Error:", error.message);
        throw error;
      });
}
