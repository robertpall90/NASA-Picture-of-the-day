var baseUrl = new URL("https://api.nasa.gov/planetary/apod");
var apiKey = "TtJg5xlzI6DCmgLjwOpyjwYvbdWWchOUun75WSmO";

document.getElementById("buttonPicture").addEventListener("click", getAPOD);
document.getElementById("buttonPicture2").addEventListener("click", getDatePicture);


function getAPOD() {
    displayLoader();
    setApiKeyParams();
    requestData();
}
setDateMax();
function getDatePicture() {
    displayLoader();
    setApiKeyParams();
    setDateParams();
    requestData();
}


function requestData() {
    fetch(baseUrl.href, { method: "GET" })
        .then(
            function (response) {
                return response.json();
            }
        ).then(
            function (jsonResp) {
                console.log(jsonResp);
                if (jsonResp.error) {
                    displayError("Sorry... " + jsonResp.error);
                } else {
                    displayApod(jsonResp);
                }
            }
        ).catch(
            function (error) {
                console.log(error);
                displayError("Sorry! Something went wrong... " + error);
            }
        ).finally(hideLoader);
}


function displayApod(currentApod) {
    var apod = document.getElementById("apodDiv");
    apod.innerHTML = "";

    var title = document.createElement("p");
    title.innerText = "Title: " + currentApod.title;

    var date = document.createElement("p");
    date.innerText = "Date : " + currentApod.date;
    date.style.fontSize = "small";

    var image = document.createElement("img");
    image.src = currentApod.url;

    apod.appendChild(title);
    apod.appendChild(date);
    apod.appendChild(image);
}

function setApiKeyParams() {
    baseUrl.searchParams.set("api_key", apiKey);
    console.log(baseUrl.href);              //pentru a verifica setarea parametrului
}
function setDateParams() {
    var chosenDate = document.getElementById("inputDate").value;
    if (chosenDate) {
        baseUrl.searchParams.set("date", chosenDate);
        console.log(baseUrl.href);          //pentru verificare doar
    }

}

function displayError(error) {
    var errorDiv = document.getElementById("errorDiv");
    errorDiv.innerText = error;
}

function displayLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "block";

}

function hideLoader() {
    var loader = document.getElementsByClassName("loader")[0];
    loader.style.display = "none";
}

function setDateMax() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("inputDate").setAttribute("max", today);
}