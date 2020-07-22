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
async function getWeatherData(e) {
  try {
    e.preventDefault();

    // get user input
    const zip = document.getElementById("zip").value;
    const content = document.getElementById("feelings").value;
    const url = `${baseURL}${zip}${apiKey}`;

    if (!zip || zip.length !== 5) {
      return alert("Please input 5 digit zipcode.");
    }

    const userData = await getWeatherAPI(url);

    await postData("/add", {
      date: newDate,
      temp: userData.main.temp,
      content: content,
    });

    updateUI("/all");
  } catch (error) {
    console.log("Error while fetching Get request", error);
  }
}
/* Function to GET Web API Data*/
const getWeatherAPI = async (url) => {
  const apiResponse = await fetch(url);
  const userData = await apiResponse.json();
  console.log(userData);
  return userData;
};

/* Function to POST data */
const postData = async (url, data = {}) => {
  try {
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
    const newData = await response.json();
    return newData;
  } catch (error) {
    Promise.reject(error);
  }
};

/* Function to GET Project Data */
const updateUI = async (url = "") => {
  try {
    const request = await fetch(url);
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("Error has occured", error);
  }
};
