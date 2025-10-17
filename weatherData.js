import { displayData } from './dom.js'

export function getLink(location) {
    const linkBase = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
    const locationURI = encodeURIComponent(location);
    const endOfLink = '?key=GEYL5HV7S2VFDCXSME4MTDTLK';

    const link = linkBase + locationURI + endOfLink;

    //console.log(link);
    return link;
}

export async function fetchData(link) {
    try {
        const response = await fetch(link);
        const weatherData = await response.json();

        //console.log(weatherData);
        return weatherData;
    } catch(err) {
        const errString = err.toString();
        console.log(errString);
        displayData(errString);
    }
}

export function getSpecificData(allData) {
    const weatherData = allData;
    const currentWeatherData = weatherData.currentConditions;
    //console.log(currentWeatherData);
    
    const specificData = {
        address: weatherData.resolvedAddress,
        dateTime: currentWeatherData.datetime,
        description: weatherData.description,
        conditions: currentWeatherData.conditions,
        currentTemperature: currentWeatherData.temp,
        feelsLike: currentWeatherData.feelslike,
        humidity: currentWeatherData.humidity,
        precipitation: currentWeatherData.precip,
        precipitationProbability: currentWeatherData.precipprob,
        uvIndex: currentWeatherData.uvindex,
    };

    //console.log(specificData);
    return specificData;
}