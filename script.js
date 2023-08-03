
const area = 'london'
const weatherData = checkWeather(area);


async function checkWeather(area) {
    const apiKey = '5561cbd346214ecbb9b44923230308'
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${area}`,
            {
                mode: 'cors',
            }
        );
        const data = await response.json()
        console.log(data);

        const city = data.location.name;
        let country = data.location.country;
        if (country === "United States of America") {
            country = data.location.region;
        }
        const tempF = data.current.temp_f;
        const feelsLike = data.current.feelslike_f;
        const condition = data.current.condition.text;
        const wind = data.current.gust_mph;
        const uv = data.current.uv;
    
        return { city, country, tempF, feelsLike, condition, wind, uv };
    
    } catch (error) {
        console.log(error);
    }
}

// TODO
// add event listener for enter command. 
//      check if input has changed 
//      add input validation and css when checkWeather doesn't work since city was wrong


