/* Global Variables */

// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=64c53fcb8511223cc71a5629d3c4be74";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", getWeatherData);

/* Function called by event listener */
function getWeatherData(e) {
  e.preventDefault();

  // get user input
  const zip = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  const url = "${baseURL}${zip}${apiKey}";

  getWeatherAPI(baseURL, zip, apiKey)
    .then(function (userData) {
      postData("/add", {
        date: newDate,
        temp: userData.main.temp,
        content: content,
      });
    })
    .then(function (postData) {
      updateUI();
    });

  form.reset();
}
/* Function to GET Web API Data*/
const getWeatherAPI = async (url) => {
  const apiResponse = await fetch(url);
  try {
    const userData = await apiResponse.json();
    console.log(userData);
    return userData;
  } catch (error) {
    console.log("Error while fetching Get request", error);
  }
};

/* Function to POST data */
const postData = async (url, data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }) /*body data must match content type header*/,
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("Error has occured", error);
  }
};

/* Function to GET Project Data */
const updateUI = async (url = "") => {
  const request = await fetch(url);
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("Error has occured", error);
  }
};
