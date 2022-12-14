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
            min: json.main.temp_min,
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
    const weather = data;
    const temperature = { ...weather.temperature };
    const wind = { ...weather.wind };

    const weatherDiv = document.createElement('div');
    weatherDiv.id = 'weather';
    document.body.appendChild(weatherDiv);

    function createMiscData() {
        const div = document.createElement('div');
        div.className = 'weather-misc';
        weatherDiv.appendChild(div);

        const heading = document.createElement('h3');
        heading.textContent = `Weather: ${data.name}`;

        div.appendChild(heading);

        for (const property in data) {
            if (typeof data[property] !== 'object') {
                const para = document.createElement('p');
                para.textContent = `${property}: ${data[property]}`;
                div.appendChild(para);
            }
        }
    }

    function createTemperatureData() {
        const div = document.createElement('div');
        div.className = 'weather-temperature';
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

    function createWindData() {
        const div = document.createElement('div');
        div.className = 'weather-wind';
        weatherDiv.appendChild(div);

        const heading = document.createElement('h3');
        heading.textContent = 'Wind';
        div.appendChild(heading);

        for (const property in wind) {
            const para = document.createElement('p');
            para.textContent = `${property}: ${wind[property]}`;
            div.appendChild(para);
        }
    }

    createMiscData();
    createTemperatureData();
    createWindData();
}
