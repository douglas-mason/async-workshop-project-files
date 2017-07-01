(function() {
  // Entry Point
  const apiKeys = KEYS; // Keys should be a global object
  const STATE = {
    weather: {
      isGood: -1,
    },
  };

  createHandlers();
  init();

  // Function Definitions
  function createHandlers() {
    $('.btn-yes').click(() => (STATE.weather.isGood = 1));
    $('.btn-no').click(() => (STATE.weather.isGood = 0));
  }

  function init() {
    requestWeatherInfo()
      .then(data => {
        renderWeatherInfo(data);
      })
      .then(getUserReaction)
      .then(renderReactionMessage)
      .catch(handleUserReactionTimeout);
  }

  function requestWeatherInfo() {
    const urlBase = 'http://api.openweathermap.org/data/2.5/weather';
    const query = `?q=Pittsburgh&APPID=${apiKeys.weather}`;
    const request = new Request(urlBase + query);
    return fetch(request, {
      method: 'GET',
    }).then(resp => {
      return resp.json();
    });
  }

  function renderWeatherInfo(weatherData) {
    const weatherInfoElement = document.getElementsByClassName(
      'weather-info',
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

  function getUserReaction() {
    return new Promise((resolve, reject) => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        if (count >= 20) {
          clearInterval(interval);
          return reject(new Error('Waiting for user reaction has timed out.'));
        }

        if (STATE.weather.isGood !== -1) {
          return resolve(STATE.weather.isGood);
        }
      }, 250);
    });
  }

  function renderReactionMessage(reaction) {
    console.log(reaction);
    if (reaction) {
      $('.reaction-text').text("That's great! Enjoy your day!");
      return;
    }
    $('.reaction-text').text("Oh well, but it's still a good day, right?");
  }

  function handleUserReactionTimeout(err) {
    $('.reaction-text').text(err.message);
  }

  // End Function Definitions
})();
