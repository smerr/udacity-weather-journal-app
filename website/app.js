/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "64c53fcb8511223cc71a5629d3c4be74";

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeatherData);

/* Function called by event listener */
function getWeatherData(

)
/* Function to GET Web API Data*/

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data) /*body data must match content type header*/,
  });
};

try {
  const newData = await response.json();
  return newData;
} catch (error) {
  console.log("Error has occured", error);
}

/* Function to GET Project Data */
const retrieveData = async (url = "") => {
  const request = await fetch(url);
  try {
    //transform into JSON
    const allData = await request.json();
  } catch (error) {
    console.log("Error has occured", error);
  }
};
