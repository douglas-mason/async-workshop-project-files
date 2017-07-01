(function() {
  // Entry Point
  const apiKeys = KEYS; // Keys should be a global object
  init();

  // Function Definitions
  async function init() {
    const data = await requestWeatherInfo()
    renderWeatherInfo(data);
  }

  async function requestWeatherInfo() {
    const urlBase = 'http://api.openweathermap.org/data/2.5/weather';
    const query = `?q=Pittsburgh&APPID=${apiKeys.weather}`;
    const request = new Request(urlBase + query);
    const response  =  await fetch(request, {
      method: "GET"
    });
    return response.json();
  }

  function renderWeatherInfo(weatherData) {
    const weatherInfoElement = document.getElementsByClassName(
      "weather-info"
    )[0];
    weatherInfoElement.innerHTML = generateWeatherInfoHtmlTemplate(weatherData);
  }

  function generateWeatherInfoHtmlTemplate(weatherData) {
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

  function getWeatherIconUrl(iconCode) {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }

  // End Function Definitions
})();
