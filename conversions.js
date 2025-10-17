export function addSpacesAndCapitalizeFirstLetter(input) {
    if (typeof input === 'string') {
        const formattedString = input
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/^./, function(str){ return str.toUpperCase(); })
        return formattedString;
    } else {
        return input;
    }
}

export function convertMilitaryTimeToStandardTime(givenTime) {
    const givenTimeNoSeconds = givenTime.slice(0, -3);
    const [hoursStr, minutesStr] = givenTimeNoSeconds.split(':');
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    let ampm = 'AM';

    // Determine AM/PM and convert hours
    if (hours >= 12) {
        ampm = 'PM';
        if (hours > 12) {
        hours -= 12;
        }
    } else if (hours === 0) {
        hours = 12; // 00:xx is 12 AM
    }

    // Format minutes to always have two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
}

export function showLocalDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true // For 12-hour format with AM/PM
    };
    const formattedDateTime = now.toLocaleString(undefined, options); // 'undefined' uses default locale

    document.getElementById("localDateTime").textContent = formattedDateTime;
}

