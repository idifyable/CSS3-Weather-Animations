var latitude = 0;
var longitude = 0;

var curTemperature;
var curCondition;
var curIcon;
var curLocation;

var publicData;
var link;

var convertedTemperature;
var tempString = "";
var preferredScale = "farenheit";

//Icon : Weather condition
var weather = {
    "01d": "Clear Sky",
    "01n": "Clear Sky",
    "02d": "Few Clouds",
    "02n": "Few Clouds",
    "03d": "Scattered Clouds",
    "03n": "Scattered Clouds",
    "04d": "Broken Clouds",
    "04n": "Broken Clouds",
    "09d": "Shower Rain",
    "09n": "Shower Rain",
    "10d": "Rain",
    "10n": "Rain",
    "11d": "Thunderstorm",
    "11d": "Thunderstorm",
    "13d": "Snow",
    "13n": "Snow",
    "50d": "Mist",
    "50n": "Mist"
};

var exampleCall = {
    "coord": {
        "lon": -0.13,
        "lat": 51.51
    },
    "weather": [{
        "id": 521,
        "main": "Rain",
        "description": "shower rain",
        "icon": "09n"
    }],
    "base": "stations",
    "main": {
        "temp": 280.89,
        "pressure": 989,
        "humidity": 87,
        "temp_min": 279.15,
        "temp_max": 283.15
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.1,
        "deg": 240
    },
    "clouds": {
        "all": 75
    },
    "dt": 1488652440,
    "sys": {
        "type": 1,
        "id": 5168,
        "message": 0.1883,
        "country": "GB",
        "sunrise": 1488609430,
        "sunset": 1488649663
    },
    "id": 2643743,
    "name": "London",
    "cod": 200
}

$(document).ready(function () {

    //Geo-Locating user coordinates

    if ("geolocation" in navigator) {
        //If available
        navigator.geolocation.getCurrentPosition(function (position) {
            setCoords(position.coords.latitude, position.coords.longitude);
        });
    } else {
        //If not available
        console.log("Geo-Location Failed");
    }


    //Event handlers
    $(".drops").css("visibility", "hidden");
    $(".drops").css("opacity", "0");

    $("#convert").click(function () {
        if (preferredScale == "farenheit") {
            perferredScale = "celcius";
            convertedTemperature = convertKToString(curTemperature, preferredScale);
            $("#temperature").text(tempString);

        } else if (preferredScale == "celcius") {
            perferredScale = "farenheit";
            convertedTemperature = convertKToString(curTemperature, preferredScale);


        }
    });
    $("select").change(function () {
        var selectedVal = $(this).find(":selected").val();
        var selectedText = $(this).find(":selected").text();
        if (selectedVal != "current") {
            setWeatherCondition(selectedText);
            setWeatherIcon(selectedVal);
        } else {
            setCurrent(publicData);
        }
    });
});



// Sets coordinate variables
function setCoords(lat, long) {
    latitude = lat;
    longitude = long;
    getWeatherInfo();
    console.log("Coordinates set: " + longitude + " , " + latitude);
}



// Update weather
function setWeatherIcon(icon) {
    switch (icon) {
        case "01n":
        case "01d":
            sun(true);
            clouds(0);
            precipitate("none");
            lightning(false);
            break;
        case "02n":
        case "02d":
            sun(true);
            clouds(1);
            precipitate("none");
            lightning(false);
            break;
        case "03n":
        case "03d":
            sun(true);
            clouds(2);
            precipitate("none");
            lightning(false);
            break;
        case "04n":
        case "04d":
            sun(true);
            clouds(3);
            precipitate("none");
            lightning(false);
            break;
        case "09n":
        case "09d":
            sun(false);
            clouds(3);
            precipitate("rain", .15);
            lightning(false);
            break;
        case "10n":
        case "10d":
            sun(false);
            clouds(3);
            precipitate("rain", .5);
            lightning(false);
            break;
        case "11n":
        case "11d":
            sun(false);
            clouds(3);
            precipitate("rain");
            lightning(true);
            break;
        case "13n":
        case "13d":
            sun(false);
            clouds(3);
            precipitate("snow", 3);
            lightning(false);
            break;
        case "50n":
        case "50d":
            sun(false);
            clouds(3);
            precipitate("rain", .15);
            lightning(false);
            break;
            break;
    }
}

// Pulls current weather data
function getWeatherInfo() {
    link = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=4b5a9d94fe30dee57597a61a5b7ccf07" + "&callback=?";
    $.getJSON(link,
        function (data) {
            publicData = data;
            setCurrent(publicData);
        }
    );
}

function convertKToString(tempK, preferred) {
    if (preferred == "celcius") {
        tempString = Math.round(tempK - 273.15) + " °C";
        return Math.round(tempK - 273.15);
    } else if (preferred == "farenheit") {
        tempString = Math.round(tempK * (9 / 5) - 459.67) + " °F";
    }
    $("#temperature").text(tempString);
}

function setWeatherCondition(condition) {
    $("#weather-condition").text(condition);
}

function setCurrent(jsonData) {
    curCondition = jsonData.weather[0].description;
    curTemperature = jsonData.main.temp;
    curIcon = jsonData.weather[0].icon;
    curLocation = jsonData.name;
    convertedTemperature = convertKToString(curTemperature, preferredScale);
    $("#location").text(curLocation);
    $("#weather-condition").text(curCondition);
    $("#temperature").text(tempString);
    setWeatherIcon(curIcon);
}


function sun(on) {
    if (on) {
        $("#circle").css("visibility", "visible");
        $("#circle").css("opacity", "1");

        $("#location").css("text-shadow", "0px -4px 4px dimgray");
        $("#weather-condition").css("text-shadow", "0px 4px 4px dimgray");
        $("#temperature").css("text-shadow", "0px 4px 4px dimgray");

    } else {
        $("#circle").css("visibility", "hidden");
        $("#circle").css("opacity", "0");

        $("#location").css("text-shadow", "none");
        $("#weather-condition").css("text-shadow", "none");
        $("#temperature").css("text-shadow", "none");
    }
}

function clouds(numberOfClouds) {
    switch (numberOfClouds) {
        case 0:
            $("#c1").css("visibility", "hidden");
            $("#c2").css("visibility", "hidden");
            $("#c3").css("visibility", "hidden");

            $("#c1").css("opacity", "0");
            $("#c2").css("opacity", "0");
            $("#c3").css("opacity", "0");
            break;
        case 1:
            $("#c1").css("visibility", "visible");
            $("#c2").css("visibility", "hidden");
            $("#c3").css("visibility", "hidden");

            $("#c1").css("opacity", "1");
            $("#c2").css("opacity", "0");
            $("#c3").css("opacity", "0");
            break;
        case 2:
            $("#c1").css("visibility", "visible");
            $("#c2").css("visibility", "visible");
            $("#c3").css("visibility", "hidden");

            $("#c1").css("opacity", "1");
            $("#c2").css("opacity", "1");
            $("#c3").css("opacity", "0");
            break;
        case 3:
            $("#c1").css("visibility", "visible");
            $("#c2").css("visibility", "visible");
            $("#c3").css("visibility", "visible");

            $("#c1").css("opacity", "1");
            $("#c2").css("opacity", "1");
            $("#c3").css("opacity", "1");
            break;
        default:
            console.log("Must specify numberOfClouds");
    }

}

function precipitate(type, speed) {
    if (type == "rain") {
        $(".drops").removeClass("snow");
        $(".drops").addClass("rain");
        $(".drops").css("visibility", "visible");
        $(".drops").css("opacity", "1");

        $(".drops").css("animation-duration", speed + "s");
    } else if (type == "snow") {
        $(".drops").removeClass("rain");
        $(".drops").addClass("snow");
        $(".drops").css("visibility", "visible");
        $(".drops").css("opacity", "1");

        $(".drops").css("animation-duration", speed + "s");
    } else if (type == "none") {
        $(".drops").css("visibility", "hidden");
        $(".drops").css("opacity", "0");
    } else {
        console.log("Must specify typeOfPrecipitate");
    }
}

function lightning(on) {
    if (on) {
        $("#c1").css("animation", "shake 2s alternate infinite ease-in-out, lightning 2.5s infinite ease-in-out");
        $("#c2").css("animation", "shake 3s alternate infinite ease-in-out, lightning 3.5s .5s infinite ease-in-out");
        $("#c3").css("animation", "shake 3.5s alternate infinite ease-in-out, lightning 4s 1s infinite ease-in-out");
    } else {
        $("#c1").css("animation", "shake 2s alternate infinite ease-in-out");
        $("#c2").css("animation", "shake 3s alternate infinite ease-in-out");
        $("#c3").css("animation", "shake 3.5s alternate infinite ease-in-out");
    }
}