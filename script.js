  // TO DO
    // SEARCH LIST
      // show searched items in list on left
      // each item in this list is a button
      // click button and see weather info for that city
      // only call api for new city
      // details of saved searches are retrieved from local storage - only save names of city
        // if calling data stored in local storage from over 4 hours ago then go back to api (makes sure data is up to date)
      // check if city is already in list, if so don't add to list again
    // LAYOUT & STYLING
      // use bootstrap cards or bootstrap grid system
    // FORECAST INFO
      // retrieve weather info for the next 5 days
      // append to page
    // README file


var APIkey = 'd91f911bcf2c0f925fb6535547a5ddc9';
var searchTerm;
var queryURL1;

var todayEl = $('#today-weather')
var forecastEl = $('#forecast')


function searchButtonHandler(event){
  event.preventDefault();

  todayEl.empty();
  forecastEl.empty();

  searchTerm = $('#search-input').val().trim();
  queryURL1 = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchTerm + '&limit=1&appid=' + APIkey;
  
$.ajax({
    url: queryURL1,
    method: "GET"
  }).then(function(response) {
   console.log(response);
   
   var lat = response[0].lat
   var lon = response[0].lon

  var queryURL2 = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIkey;

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      console.log(queryURL2);
      
      // TODAY
      var cityName = response.city.name;
      var date = response.list[0].dt_txt;
      var icon = response.list[0].weather[0].icon;
      var temp = response.list[0].main.temp;
      var humid = response.list[0].main.humidity;
      var wind = response.list[0].wind.speed;

      var cityNameEl = $('<h2>').text(cityName);
      var dateEl = $('<p>').text(date);
      var iconEl = $('<p>').attr('src', icon);
      var tempEl = $('<p>').text(temp);
      var humidEl = $('<p>').text(humid);
      var windEl = $('<p>').text(wind);

      todayEl.append(cityNameEl);
      todayEl.append(dateEl);
      todayEl.append(iconEl);
      todayEl.append('Temp: ' + JSON.stringify(temp) + '°C');
      todayEl.append('Humidity: ' + JSON.stringify(humid) + '%');
      todayEl.append('Wind: ' + JSON.stringify(wind) + 'KPH');

      // 5-DAY FORECAST
        // DAY 1
      
      // SEARCH LIST
      // take the search term and create a button with that word on it✅
      // save to local storage the info retrieved from that search✅
      // save info about MULTIPLE cities to local storage
      // when user clicks on that button info is retrieved and displayed on page
      var historyEl = $('#history');
      var cityButton = $('<button>').addClass('city');
      cityButton.text(searchTerm);
      historyEl.append(cityButton);

      localStorage.setItem('city', cityName);
      localStorage.setItem('date', date);
      localStorage.setItem('icon', icon);
      localStorage.setItem('temp', temp);
      localStorage.setItem('humid', humid);
      localStorage.setItem('wind', wind);
  
    })
  })
}

  $('#search-button').on('click', searchButtonHandler)