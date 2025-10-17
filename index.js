//import { getWeatherData } from './weatherData.js';
import { inputLocation } from './dom.js';
import { showLocalDateTime } from './conversions.js';

inputLocation();

showLocalDateTime();
setInterval(showLocalDateTime, 1000);