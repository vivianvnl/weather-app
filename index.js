const form = document.querySelector('form');
const submitBtn = document.querySelector('button');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const locationInput = document.getElementById('locationInput').value;
    console.log(locationInput);
    getLink(locationInput);
    form.reset();
});

function getLink(location) {
    const linkBase = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const locationURI = encodeURIComponent(location);
    const endOfLink = '?key=GEYL5HV7S2VFDCXSME4MTDTLK';
    
    const link = linkBase + locationURI + endOfLink;

    //console.log(link);
    getWeatherData(link);
}

async function getWeatherData(link) {
    const response = await fetch(link);
    const weatherData = await response.json();

    console.log(weatherData);
    getSpecificData(weatherData);
}

function getSpecificData(allData) {
    const weatherData = allData;
    const currentWeatherData = weatherData.currentConditions;
    console.log(currentWeatherData);
    
    const specificData = {
        address: weatherData.resolvedAddress,
        dateTime: currentWeatherData.datetime,
        conditions: currentWeatherData.conditions,
        description: weatherData.description,
        currentTemperature: currentWeatherData.temp,
        feelsLike: currentWeatherData.feelslike,
        humidity: currentWeatherData.humidity,
        precipitation: currentWeatherData.precip,
        precipitationProbability: currentWeatherData.precipprob,
        uvIndex: currentWeatherData.uvindex,
    };

    console.log(specificData);
}

//getWeatherData();