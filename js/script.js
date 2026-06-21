const apiKey = "f1783547197d06a93a7f2e244f8a9b3e";

async function getWeather(){

    const city =
    document.getElementById("city").value.trim();

    if(city===""){
        alert("Enter City Name");
        return;
    }

    await fetchWeather(city);
}

async function fetchWeather(city){

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response =
        await fetch(url);

        const data =
        await response.json();

        // OpenWeatherMap returns HTTP 200 with an error body for bad requests,
        // so fetch() alone won't catch a "city not found" — check the status here.
        if(!response.ok){
            throw new Error(data.message || "City Not Found");
        }

        document.getElementById("cityName")
        .innerHTML =
        data.name;

        document.getElementById("temp")
        .innerHTML =
        Math.round(data.main.temp)+"°C";

        document.getElementById("condition")
        .innerHTML =
        data.weather[0].main;

        document.getElementById("humidity")
        .innerHTML =
        data.main.humidity+"%";

        document.getElementById("wind")
        .innerHTML =
        data.wind.speed+" km/h";

        document.getElementById("pressure")
        .innerHTML =
        data.main.pressure+" hPa";

        document.getElementById("feels")
        .innerHTML =
        Math.round(data.main.feels_like)+"°C";

        const icon =
        data.weather[0].icon;

        document.getElementById("icon")
        .src =
        `https://openweathermap.org/img/wn/${icon}@4x.png`;

    }
    catch(error){

        alert("City Not Found");
    }

}

// Allow pressing Enter in the input box to trigger search
document.getElementById("city")
.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        getWeather();
    }
});

// Load default city weather on page load so the placeholder values aren't stuck on "--"
window.addEventListener("load", () => {
    fetchWeather("Chennai");
});