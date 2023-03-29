var date = dayjs();
$('#cityStats').text(date.format ('ddd, MM/ DD/ YYYY hh:mm A'));

var inputCity = document.getElementById('inputCity');

var citySearchBtn = document.getElementById('citySearchBtn');

const timeHours = [8, 16, 24, 32, 39];

var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');

var fiveDays = [day1, day2, day3, day4, day5];

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

    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityPlace}&appid=d1525879b423538907af5db6aa1d4658`;

    fetch(weatherUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data, "TEST");

    fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=d1525879b423538907af5db6aa1d4658&units=imperial`)
        .then(function (response){
            return response.json();
        })
        .then(function (data){
            console.log(data, "TEST AGAIN");
        
            for (i=0; i <timeHours.length; i++) {
                fiveDays [i].textContent = data.list[timeHours[i]].dt
            }
            // timeHours.for ((day) => {
            //     console.log(day);


            // })
        });
    
    });

    



    localStorage.setItem('city', cityPlace);
    console.log (cityPlace)

    var place = localStorage.getItem ('city');
    console.log('city');

// create element to append to page where the citySearch aside gets populated with user inputed cities in their search 

// remember this: i created an element here to be appended later 
var cityInputEl = $('<button>');


});

// will need to create & append TEMP, WIND, HUMIDITY + weather indication icon -- from API pull weather: icon, main; pull wind: gust, weather -> main: humidity


//    var temp = data.list[i].main.temp,
//    var wind = data.list[i].weather.icon ,
//    var humidity = data.list[i].main.humidity,
