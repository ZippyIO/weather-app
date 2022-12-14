async function fetchWeather() {
    const response = await fetch(
        'http://api.openweathermap.org/data/2.5/weather?q=Canberra&units=metric&APPID=83f923f483f0f7b5a12a247924195c6f',
        { mode: 'cors' },
    );

    const data = await response.json();

    processWeatherData(data);
}
fetchWeather();

function processWeatherData(json) {
    const data = {
        temperature: {
            current: json.main.temp,
            min: json.main.temp_main,
            max: json.main.temp_max,
            feelsLike: json.main.feels_like,
        },
        humidity: json.main.humidity,
        pressure: json.main.pressure,
        wind: {
            speed: json.wind.speed,
            direction: json.wind.deg,
        },
    };
    console.log(data);
}
