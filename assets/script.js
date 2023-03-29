
var inputCity = document.getElementById('inputCity');

var citySearchBtn = document.getElementById('citySearchBtn');

var futureDays = document.getElementById('futureDays');

var cityStats = document.getElementById('cityStats');

var cityPicksList = document.getElementById('cityPicksList');

const timeHours = [0, 8, 16, 24, 32, 39];

var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');

var fiveDays = [cityStats, day1, day2, day3, day4, day5];

var savedCities = [];


fetch('https://api.openweathermap.org/data/2.5/forecast?lat=34.1808&lon=-118.3090&appid=d1525879b423538907af5db6aa1d4658')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

citySearchBtn.addEventListener('click', () => {
    var cityPlace = inputCity.value;
    clearAll();

    getWeather(cityPlace);

    console.log(cityPlace);
    // create element to append to page where the citySearch aside gets populated with user inputed cities in their search 
    // get city, push cityPlace to city, create buttonfor city,  set city
    // should be able to click city button again to pull up location weather 
    // when you getItem, store it as an array 

    // localStorage.getItem('city');

    savedCities.push(cityPlace);
    localStorage.setItem('city', JSON.stringify(savedCities));





});

function getWeather(cityPlace) {

    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityPlace}&appid=d1525879b423538907af5db6aa1d4658`;

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data, "TEST");

            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=d1525879b423538907af5db6aa1d4658&units=imperial`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data, "TEST AGAIN");

                    for (i = 0; i < timeHours.length; i++) {
                        var date = new Date(data.list[timeHours[i]].dt * 1000);
                        var dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                        
                        var icon = data.list[timeHours[i]].weather[0].icon;
                        var temp = data.list[timeHours[i]].main.temp;
                        var wind = data.list[timeHours[i]].wind.speed;
                        var humidity = data.list[timeHours[i]].main.humidity;

                        var dateEl = document.createElement("h4");
                        var iconEl = document.createElement("img");
                        var listEl = document.createElement("ul");
                        var tempEl = document.createElement("li");
                        var windEl = document.createElement("li");
                        var humidityEl = document.createElement("li");



                        fiveDays[i].appendChild(dateEl);
                        fiveDays[i].appendChild(iconEl);
                        fiveDays[i].appendChild(listEl);
                        listEl.appendChild(tempEl);
                        listEl.appendChild(windEl);
                        listEl.appendChild(humidityEl);

                        dateEl.textContent = dateString;
                        iconEl.setAttribute("src", `http://openweathermap.org/img/w/${icon}.png`)
                        tempEl.textContent = `temp: ${temp} °F`;
                        windEl.textContent = `wind: ${wind} MPH`;
                        humidityEl.textContent = `humidity: ${humidity}%`;

                    }
                    futureDays.style.visibility = "visible";
                });

        });


}

var searchHistory = [];
function init() {
    var storeData = JSON.parse(localStorage.getItem('city'));
    if (storeData != null) {
        searchHistory = storeData;
        generateHistory();
    }



}
function generateHistory() {
    searchHistory.forEach((searchEntry) => {
        var cityPicksBtn = document.createElement("button");
        var cityPicksItem = document.createElement("li");
        cityPicksItem.appendChild(cityPicksBtn);
        cityPicksList.appendChild(cityPicksItem);
        cityPicksBtn.textContent = searchEntry;
        cityPicksBtn.setAttribute("data-city", searchEntry)

    })
}
// when they click on search new button is added to list 

function clearAll() {
    fiveDays.forEach(day => {
        if (day.children.length) {
            var clear = day.children.length;
            for (i = 0; i < clear; i++) {
                console.log(day.children[0]);
                day.removeChild(day.children[0]);

            }
        }
    });
}
init();
cityPicksList.addEventListener("click", function (event) {
    console.log(event.target)
    if (event.target.matches("button")) {
        var city = event.target.getAttribute("data-city")
        clearAll();
        getWeather(city);
    }
})

// will need to create & append TEMP, WIND, HUMIDITY + weather indication icon -- from API pull weather: icon, main; pull wind: gust, weather -> main: humidity



