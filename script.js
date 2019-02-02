var latitude = 0;
var longitude = 0;

var curCondition;
var curIcon;

//Icon : Weather condition  <=== Based off of 
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

$(document).ready(function () {

    //Event handlers
    $(".drops").css("visibility", "hidden");
    $(".drops").css("opacity", "0");

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
            precipitate("rain", .5);
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

function setWeatherCondition(condition) {
    $("#weather-condition").text(condition);
}

    // Handles sun
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

    // Handles clouds
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

    // Handles precipitate
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

    // Handles lightning
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