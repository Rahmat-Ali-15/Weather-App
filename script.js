let lastCity = localStorage.getItem("lastCity");

let api_key = "a7f44a715578d31824ab69aeafc9ed80";
let searchbtn = document.querySelector(".fa-magnifying-glass")

searchbtn.addEventListener("click", () => {

    // getting input  value when we click on the seacrh icon(fa-magnifying-glass)
    let searchInput = document.getElementById("search");
    let location = searchInput.value.trim();

    if (!location) {
        alert("Please Enter a city name");
        return;
    }

    // Saving last searched city in ls
    // localStorage.setItem("lastCity", location);

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`;

    weatherData(api);

    getForecastTempData(location);

    // Clear the input field after searching
    searchInput.value = "";
})

const weatherData = async (api) => {
    try {
        let res = await fetch(api);
        let data = await res.json();
        appendData(data)
    } catch (error) {
        console.log(error)
    }
}

// <=============== Appending data ================>

const appendData = (data) => {
    let infoDiv = document.querySelector(".weather-info");
    infoDiv.innerHTML = "";

    //  Update date

    document.querySelector("#current_date").innerText = moment().format('MMMM Do YYYY,dddd');

    let temp = document.createElement("p");
    temp.classList.add("temp");

    let cityName = document.createElement("p");
    cityName.classList.add("city-name");

    temp.innerHTML = `${data.main.temp}<sup>&deg;</sup>C`;
    cityName.innerText = data.name;

    infoDiv.append(temp, cityName);
};

// <============ Finding Current location ===============>

function getLocation() {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        const crd = pos.coords;

        // console.log("Your current position is:");
        // console.log(`Latitude: ${crd.latitude}`);
        // console.log(`longitude: ${crd.longitude}`);
        // console.log(`More or Less ${crd.accuracy} meters`);
        get_weather_by_location(crd.latitude, crd.longitude);

    }
}

const get_weather_by_location = async (lat, lon) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

    try {
        let res = await fetch(api);
        let val = await res.json();
        appendData(val)
    } catch (error) {
        console.log(error)
    }
}

// <============= getting Past temp data ==============>

const getForecastTempData = async (cityName) => {
    let forecastTempApi = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${api_key}&units=metric`;

    try {
        let res = await fetch(forecastTempApi);
        let forcasteData = await res.json();
        console.log(forcasteData);
        appendForecastTemp(forcasteData);
    } catch (error) {
        console.log(error, "forcasteData data")
    }
}
getForecastTempData("Mumbai");

// <============= Appending past temp data ==============>

const appendForecastTemp = (forecastData) => {
    document.querySelector("#next_3_hrs_temp").innerHTML = `${forecastData.list[0].main.temp}<sup>&deg;</sup>C`;

    document.querySelector("#next_6_hrs_temp").innerHTML = `${forecastData.list[1].main.temp}<sup>&deg;</sup>C`;

    document.querySelector("#next_9_hrs_temp").innerHTML = `${forecastData.list[2].main.temp}<sup>&deg;</sup>C`;

    document.querySelector("#next_12_hrs_temp").innerHTML = `${forecastData.list[3].main.temp}<sup>&deg;</sup>C`;

}


// <============= Updateing time ==============>

function updateTimes() {
    document.querySelector("#after_3_hrs_time").innerText = moment().add(3, 'hours').format('LT');
    document.querySelector("#after_6_hrs_time").innerText = moment().add(6, 'hours').format('LT');
    document.querySelector("#after_9_hrs_time").innerText = moment().add(9, 'hours').format('LT');
    document.querySelector("#after_12_hrs_time").innerText = moment().add(12, 'hours').format('LT');
}

window.onload = () => {
    // if (lastCity) {
    //     let api = `https://api.openweathermap.org/data/2.5/weather?q=${lastCity}&appid=${api_key}&units=metric`;
    //     weatherData(api);
    // }
    getLocation();
    updateTimes();
    setInterval(updateTimes, moment().format('LT'));
};