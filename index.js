async function getWeatherData() {
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=GEYL5HV7S2VFDCXSME4MTDTLK');
    const weatherData = await response.json();
    console.log(weatherData.currentConditions);
    return weatherData;
  }
  getWeatherData();

function getSpecificData() {
    const weatherData = getWeatherData();
    const specificData = {
        currentTemperature: weatherData.currentConditions
    };
}