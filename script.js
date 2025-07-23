let lastCity = localStorage.getItem("lastCity");

let api_key = "a7f44a715578d31824ab69aeafc9ed80";
let searchbtn = document.querySelector(".fa-magnifying-glass")

searchbtn.addEventListener("click", () => {

    // getting input  value when we click on the seacrh icon(fa-magnifying-glass)
    let searchInput = document.getElementById("search").value.trim();

    if(!searchInput){
        alert("Please Enter a city name");
        return;
    }

     localStorage.setItem("lastCity", searchInput);

    let api = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${api_key}&units=metric`;

    whetherData(api);
})


const whetherData = async(api) => {
    try {
        let res = await fetch(api);
        let data = await res.json();
        appendData(data)
    } catch (error) {
        console.log(error)
    }
}

// const appendData = (data) => {
//     let infoDiv = document.querySelector(".whether-info");
//     infoDiv.innerHTML = "";

//         let temp = document.createElement("p");
//         temp.classList.add("temp")

//         let cityName = document.createElement("p");
//         cityName.classList.add("city-name")

//         temp.innerHTML = `${data.main.temp}<sup>&deg;</sup>C`;
//         cityName.innerText= data.name;

//         infoDiv.append(temp,cityName);
// };

// We'll store the last displayed weather info
let lastCityName = "";
let lastTemp = "";

// Modify your appendData function to store values
const appendData = (data) => {
    let infoDiv = document.querySelector(".whether-info");
    infoDiv.innerHTML = "";

    let temp = document.createElement("p");
    temp.classList.add("temp");

    let cityName = document.createElement("p");
    cityName.classList.add("city-name");

    temp.innerHTML = `${data.main.temp}<sup>&deg;</sup>C`;
    cityName.innerText = data.name;

    infoDiv.append(temp, cityName);

    // Store values for sharing later
    lastCityName = data.name;
    lastTemp = `${data.main.temp}°C`;
};

// Handle sharing
const shareBtn = document.getElementById("shareBtn");
shareBtn.addEventListener("click", async () => {
    if (!lastCityName) {
        alert("Search for a city first to share its weather!");
        return;
    }

    const shareData = {
        title: "Weather Info",
        text: `Current weather in ${lastCityName}: ${lastTemp}`,
        url: window.location.href  // current page URL
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log("Shared successfully");
        } catch (err) {
            console.log("Share failed:", err);
        }
    } else {
        alert("Sharing is not supported in this browser.");
    }
});



window.onload = () => {
    if (lastCity) {
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${lastCity}&appid=${api_key}&units=metric`;
        whetherData(api);
    }
};