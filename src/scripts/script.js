function userForm() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        fetchWeather(form.search.value);
        event.preventDefault();
    });
}
userForm();

async function fetchWeather(location) {
    const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=83f923f483f0f7b5a12a247924195c6f`,
        { mode: 'cors' },
    );

    const data = await response.json();

    processWeatherData(data);
}

function processWeatherData(json) {
    const data = {
        name: json.name,
        temperature: {
            current: json.main.temp,
            feelsLike: json.main.feels_like,
            max: json.main.temp_max,
            min: json.main.temp_min,
        },
        humidity: json.main.humidity,
        pressure: json.main.pressure,
        wind: {
            speed: json.wind.speed,
            direction: json.wind.deg,
        },
    };
    removeWeatherDOM(data);
}

function removeWeatherDOM(data) {
    const weatherDiv = document.querySelector('#weather');
    if (weatherDiv !== null) {
        while (weatherDiv.firstChild) {
            weatherDiv.removeChild(weatherDiv.firstChild);
        }
        weatherDiv.remove();
        createWeatherDOM(data);
    } else {
        createWeatherDOM(data);
    }
}

function createWeatherDOM(data) {
    const basicWeather = {
        name: data.name,
        temperature: data.temperature.current,
        humidity: data.humidity,
        pressure: data.pressure,
        wind: data.wind.speed,
    };
    const temperature = { ...data.temperature };

    const weatherDiv = document.createElement('div');
    weatherDiv.id = 'weather';
    document.body.appendChild(weatherDiv);

    function weatherData() {
        const div = document.createElement('div');
        div.className = 'weather-main';
        weatherDiv.appendChild(div);

        const name = () => {
            const heading = document.createElement('h3');
            heading.textContent = `Weather: ${basicWeather.name}`;
            div.appendChild(heading);
        };

        const temp = () => {
            const para = document.createElement('p');
            para.textContent = `Temperature: ${basicWeather.temperature}`;
            div.appendChild(para);
        };

        const humidity = () => {
            const para = document.createElement('p');
            para.textContent = `Humidity: ${basicWeather.humidity}`;
            div.appendChild(para);
        };

        const wind = () => {
            const para = document.createElement('p');
            para.textContent = `Wind: ${basicWeather.wind}km/h`;
            div.appendChild(para);
        };

        name();
        temp();
        humidity();
        wind();
    }

    function temperatureData() {
        const tempColor = temperature.current * 6;
        const div = document.createElement('div');
        div.className = 'weather-temperature';
        div.style.backgroundColor = `rgb(${tempColor},100,0)`;
        weatherDiv.appendChild(div);

        const heading = document.createElement('h3');
        heading.textContent = 'Temperature';
        div.appendChild(heading);

        for (const property in temperature) {
            const para = document.createElement('p');
            para.textContent = `${property}: ${temperature[property]}`;
            div.appendChild(para);
        }
    }

    weatherData();
    temperatureData();
}
