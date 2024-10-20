function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '3e8c151f154d04bb947ee90090251dd4'; 
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;;
    //const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            changeBackgroundImage(data.main.temp); // Change background color based on temperature
        })
        .catch(error => console.error('Error fetching current weather:', error));

    // Fetch weather forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error fetching forecast:', error));
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    if (data.cod === 200) {
        const weatherInfo = `
            <div class="weather-info">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" class="weather-icon"/> ${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
        `;
        currentWeatherDiv.innerHTML = weatherInfo;
    } else {
        currentWeatherDiv.innerHTML = `<p>City not found!</p>`;
    }
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '<h2>5-Day Forecast</h2>'; // Add heading

    // Extract data for each day (3-hour intervals, so pick one every 8th record for daily summary)
    const dailyForecasts = data.list.filter((_, index) => index % 8 === 0);

    dailyForecasts.forEach(day => {
        const forecastInfo = `
            <div class="weather-card">
                <h3>${new Date(day.dt_txt).toLocaleDateString()}</h3>
                <p><img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" class="weather-icon"/> ${day.weather[0].description}</p>
                <p>Temp: ${day.main.temp} °C</p>
                <p>Humidity: ${day.main.humidity}%</p>
            </div>
        `;
        forecastDiv.innerHTML += forecastInfo;
    });
}

function changeBackgroundImage(temp) {
    const body = document.body;
    
    if (temp <= 0) {
        
        body.style.backgroundImage = "url('https://media.istockphoto.com/id/1355039197/vector/winter-landscape-with-snow-covered-trees.jpg?s=612x612&w=0&k=20&c=EAWlpYpwN3amAkjE5psAqGHUkra8t7X3MZuSmw6LzsE=')";
    } else if (temp > 0 && temp <= 10) {
        
        body.style.backgroundImage = "url('cool.jpg')";
    } else if (temp > 10 && temp <= 30) {
        
        body.style.backgroundImage = "url('https://www.shutterstock.com/image-photo/mild-seven-hills-group-pine-260nw-1692849502.jpg')";
    } else{
        body.style.backgroundImage = "url('https://media.istockphoto.com/id/1226628621/photo/summer-background-orange-sky-with-clouds-and-bright-sun.jpg?s=612x612&w=0&k=20&c=CWg58-taK46CyW3vcGnKlG0wkjiNhfzsPKZp_zVpAFc=')";
    }
    
    // Ensure the background image properties remain consistent
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundPosition = 'center';
   }
