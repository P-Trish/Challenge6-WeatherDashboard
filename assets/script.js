var currentTime = dayjs();
$('#cityStats').text(currentTime.format('hh:mm A'));

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

// fetched Open Weather API

fetch('https://api.openweathermap.org/data/2.5/forecast?lat=34.1808&lon=-118.3090&appid=d1525879b423538907af5db6aa1d4658')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

// when user clicks the button, get weather is called to provide weather info and saves the history of the cities they looked up in a buttons list so the user can go back and refer to past cities they've searched.

// when you getItem, store it as an array


citySearchBtn.addEventListener('click', (event) => {
    event.preventDefault();

    var cityPlace = inputCity.value;
    clearAll();

    getWeather(cityPlace);

    console.log(cityPlace);

    savedCities.push(cityPlace);
    localStorage.setItem('city', JSON.stringify(savedCities));

    clearHistory();
    generateHistory();

});

// Create & append TEMP, WIND, HUMIDITY + weather indication icon -- from API pull weather: icon, main; pull wind: gust, weather -> main: humidity
// create element to append to page where the citySearch aside gets populated with user inputed cities in their search

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

                        if (i === 0) {
                            var currentCity = data.city.name;
                            var currentCityEl = document.createElement("h3");
                            fiveDays[i].appendChild(currentCityEl);
                            currentCityEl.textContent = `${currentCity}`;

                        }

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


function init() {
    var storeData = JSON.parse(localStorage.getItem('city'));
    if (storeData != null) {
        savedCities = storeData;
        generateHistory();

    }



}
function generateHistory() {
    savedCities.forEach((searchEntry) => {
        var cityPicksBtn = document.createElement("button");
        var cityPicksItem = document.createElement("li");
        cityPicksItem.appendChild(cityPicksBtn);
        cityPicksList.appendChild(cityPicksItem);
        cityPicksBtn.textContent = searchEntry;
        cityPicksBtn.setAttribute("data-city", searchEntry)

    })
}
// when they click on search new button is added to list it is cleared.  

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

function clearHistory() {
    while (cityPicksList.children.length) {
        cityPicksList.removeChild(cityPicksList.children[0]);
    }
}

init();
cityPicksList.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(event.target)
    if (event.target.matches("button")) {
        var city = event.target.getAttribute("data-city")
        clearAll();
        getWeather(city);
    }
})
