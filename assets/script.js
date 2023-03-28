var date = dayjs();
$('#cityStats').text(date.format ('ddd, MM/ DD/ YYYY hh:mm A'));

var inputCity = document.getElementById('inputCity');

var citySearchBtn = document.getElementById('citySearchBtn');

// will eventually need to create a variable for geolocation to pull lat and longitude in api weather fetch 
// create variable breaking up api URL and calling it back together with fetched data of location coordinates and city 

fetch('https://api.openweathermap.org/data/2.5/forecast?lat=34.1808&lon=-118.3090&appid=d1525879b423538907af5db6aa1d4658')
.then(function (response){
    return response.json();
})
.then(function (data){
    console.log(data);
});

citySearchBtn.addEventListener('click', () => {
    var cityPlace = inputCity.value;

    localStorage.setItem('city', cityPlace);
    console.log (cityPlace)

    var place = localstorage.getItem ('city');
    console.log('city');

// create element to append to page where the citySearch aside gets populated with user inputed cities in their search 

// remember this: i created an element here to be appended later 
var cityInputEl = $('<button>');


});

// will need to create & append TEMP, WIND, HUMIDITY + weather indication icon -- from API pull weather: icon, main; pull wind: gust, weather -> main: humidity

var weatherResults = {
    temp: temp.value,
    wind: weather.icon ,
    humidity: weather.humidity,
  };
  