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

    localStorage.setItem("lastCity", location);

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api_key}&units=metric`;

    whetherData(api);

    // Clear the input field after searching
    searchInput.value = "";
})


const whetherData = async (api) => {
    try {
        let res = await fetch(api);
        let data = await res.json();
        appendData(data)
    } catch (error) {
        console.log(error)
    }
}

const appendData = (data) => {
    let infoDiv = document.querySelector(".whether-info");
    infoDiv.innerHTML = "";
    let time = document.querySelector("#time");
    // time.innerHTML = "";

    let t = document.createElement("p");
    t.innerText = moment().format('LT');

    let temp = document.createElement("p");
    temp.classList.add("temp")

    let cityName = document.createElement("p");
    cityName.classList.add("city-name");

    temp.innerHTML = `${data.main.temp}<sup>&deg;</sup>C`;
    cityName.innerText = data.name;

    time.append(t)
    infoDiv.append(temp, cityName);
};


function getLocation() {
    navigator.geolocation.getCurrentPosition(success);

    function success(pos) {
        const crd = pos.coords;

        // console.log("Your current position is:");
        // console.log(`Latitude: ${crd.latitude}`);
        // console.log(`longitude: ${crd.longitude}`);
        // console.log(`More or Less ${crd.accuracy} meters`);
        get_whether_by_location(crd.latitude, crd.longitude);

    }
}

const get_whether_by_location = async (lat, lon) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

    try {
        let res = await fetch(api);
        let val = await res.json();
        appendData(val)
    } catch (error) {
        console.log(error)
    }
}



window.onload = () => {
    if (lastCity) {
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${lastCity}&appid=${api_key}&units=metric`;
        whetherData(api);
    }
    getLocation()
};

let time = moment().format('LT');
console.log(time);