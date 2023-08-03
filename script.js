checkWeather('london')
        .then(dataObject => displayWeather(dataObject))
        .catch(() => badInput());

let inputElement = document.querySelector('input');
inputElement.addEventListener('keyup', submit);

function submit(e) {
    if (e.key !== 'Enter'){
        return;
    }

    let area = inputElement.value;

    // Get weather data then display or catch error
    checkWeather(area)
        .then(dataObject => displayWeather(dataObject))
        .catch(() => badInput());
}

function badInput() {
    let errorMessage = document.querySelector('span');
    errorMessage.classList.add('show');
}

function displayWeather(obj) {
    // remove error message if it exists
    let errorMessage = document.querySelector('span');
    errorMessage.classList.remove('show');

    let condition = document.getElementById('condition');
    let location = document.getElementById('location');
    let temp = document.getElementById('temp');
    let feelsLike = document.getElementById('feelsLike');
    let wind = document.getElementById('wind');
    let uv = document.getElementById('uv');

    let degF1 = document.createElement('sup');
    let degF2 = document.createElement('sup');
    degF1.innerText = '°F';
    degF2.innerText = '°F';

    condition.innerText = obj.condition;
    location.innerText = `${obj.city.toUpperCase()}, ${obj.country.toUpperCase()}`;
    temp.innerText = `${Math.round(obj.tempF)}`;
    temp.appendChild(degF1);
    feelsLike.innerText = `FEELS LIKE: ${Math.round(obj.feelsLike)}`;
    feelsLike.appendChild(degF2);
    wind.innerText = `WIND: ${obj.wind}`;
    uv.innerText = `UV INDEX: ${obj.uv}`;
}


async function checkWeather(area) {
    const apiKey = '5561cbd346214ecbb9b44923230308'
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${area}`,
        {
            mode: 'cors',
        }
    );
    let data = await response.json()

    let city = data.location.name;
    let country = data.location.country;
    if (country === "United States of America") {
        country = data.location.region;
    }

    let tempF = data.current.temp_f;
    let feelsLike = data.current.feelslike_f;
    let condition = data.current.condition.text;
    let wind = data.current.gust_mph;
    let uv = data.current.uv;

    inputElement.value = "";

    return { city, country, tempF, feelsLike, condition, wind, uv };
}
