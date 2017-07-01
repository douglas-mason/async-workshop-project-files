(function(){
  const url = new Request(`http://api.openweathermap.org/data/2.5/weather?q=Pittsburgh&APPID=${keys.weather}`);
  fetch(url, {
          method: 'GET'
      }).then((resp) => {
          return resp.json();
      })
      .then((data) => {
        renderWeatherInfo(data);
      });

  function renderWeatherInfo(weatherData){
    const weatherInfoElement = document.getElementsByClassName('weather-info')[0];
    weatherInfoElement.innerHTML = generateWeatherInfoHtmlTemplate(weatherData);
  }

  function generateWeatherInfoHtmlTemplate(weatherData){
    const weather = weatherData.weather[0] || {};
    const iconUrl = getWeatherIconUrl(weather.icon);
    return `
        <section>
          <h2>Weather Forecast for ${weatherData.name}</h2>
          <ul>
            <li>
              <image src="${iconUrl}"/>
              <span>${weather.main}</span>
            </li>
          </ul>
        </section>
      `;
  }

  function getWeatherIconUrl(iconCode){
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }
})();
