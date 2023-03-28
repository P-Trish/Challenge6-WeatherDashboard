var date = dayjs();
$('#cityStats').text(date.format ('ddd, MM/ DD/ YYYY'));

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

    
// create element to append to page where the citySearch aside gets populated with user inputed cities in their search 

});