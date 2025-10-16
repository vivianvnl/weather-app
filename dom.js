import { getLink, fetchData, getSpecificData } from './weatherData.js';

export function inputLocation() {
    const form = document.querySelector('form');
    const submitBtn = document.querySelector('button');

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const locationInput = document.getElementById('locationInput').value;
        //console.log(locationInput);
        getLocationData(locationInput);
        form.reset();
    });

    async function getLocationData(location) {
        const data = await fetchData(getLink(location));
        const specificData = getSpecificData(data);
        //console.log(specificData);
        displayData(specificData);
    }
}

function addSpacesAndCapitalizeFirstLetter(input) {
    if (typeof input === 'string') {
        const formattedString = input
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, function(str){ return str.toUpperCase(); })
        return formattedString;
    } else {
        return input;
    }
}

export function displayData(data) {
    //console.log(Object.entries(data));
    const body = document.querySelector('body');

    for (const [key, value] of Object.entries(data)) {
        //console.log(`key: ${key}, value: ${value}`);

        const formattedKey = addSpacesAndCapitalizeFirstLetter(key);
        const formattedValue = addSpacesAndCapitalizeFirstLetter(value);
        const property = document.createElement('p');

        if (key === 'address' || key === 'dateTime' || key === 'description') {
            property.textContent = formattedValue;
        } else if (key === 'uvIndex') {
            property.textContent = `UV Index: ${formattedValue}`;
        } else {
            property.textContent = `${formattedKey}: ${formattedValue}`;
        }

        body.appendChild(property);
    }
}