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
        try {
            const data = await fetchData(getLink(location));
            const specificData = getSpecificData(data);
            //console.log(specificData);
            displayData(specificData);
        } catch(err) {
            return;
        }
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
    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.textContent = '';

    if (typeof data !== 'object') {
        const error = document.createElement('h1');
        error.textContent = 'Place does not exist. Please try again!';
        dataDisplay.append(error);
    } else {
        const dataSubHeader = document.createElement('div');
        dataSubHeader.id = 'dataSubHeader';
        const dataMain = document.createElement('div');
        dataMain.id = 'dataMain';

        for (const [key, value] of Object.entries(data)) {
            //console.log(`key: ${key}, value: ${value}`);

            const formattedKey = addSpacesAndCapitalizeFirstLetter(key);
            const formattedValue = addSpacesAndCapitalizeFirstLetter(value);
            
            const dataDiv = document.createElement('div');
            dataDiv.classList.add('dataDiv');
            const categoryName = document.createElement('p');
            const categoryValue = document.createElement('h2');

            if (key === 'dateTime') {

            }

            if (key === 'address') {
                const location = document.createElement('h1');
                location.textContent = formattedValue;
                dataDisplay.appendChild(location);
            } else if (key === 'dateTime' || key === 'description' || key === 'conditions') {
                const subHeaderContent = document.createElement('p');

                if (key === 'dateTime' || key === 'description') {
                    subHeaderContent.textContent = formattedValue;
                } else if (key === 'conditions') {
                    subHeaderContent.textContent = `${formattedKey}: ${formattedValue}`;
                }
                dataSubHeader.append(subHeaderContent);
            } else {
                if (formattedValue === null || formattedValue === undefined) {
                    continue;
                } else {
                    if (key === 'uvIndex') {
                        categoryName.textContent = 'UV Index';
                        categoryValue.textContent = `${formattedValue}\u002F10`;
                    } else {
                        categoryName.textContent = formattedKey;
                        if (key === 'currentTemperature' || key === 'feelsLike') {
                            categoryValue.textContent = `${formattedValue}\u00B0F`;
                        } else if (key === 'humidity' || key === 'precipitationProbability') {
                            categoryValue.textContent = `${formattedValue}\u0025`;
                        } else if (key === 'precipitation') {
                            categoryValue.textContent = `${formattedValue} in`;
                        } else {
                            categoryValue.textContent = formattedValue;
                        }
                    }
                }
                dataDiv.append(categoryName, categoryValue);
                dataMain.appendChild(dataDiv);
            }
            dataDisplay.append(dataSubHeader, dataMain);
        }
    }
}