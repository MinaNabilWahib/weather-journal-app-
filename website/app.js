/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = ',us&appid=0eb764e75bca374ded2f229f3409a303&units=metric';


// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e)
{
    const zipCode = document.getElementById('zip').value;
    const cont = document.getElementById('feelings').value;
    getWeather(baseURL,zipCode,apiKey)
    .then(function(data)
    {
        // Add data
        console.log(data);
        postData('/addWeather', {date:newDate, temp: data.main.temp, content:cont} );
        updateUI()
    })
}


/* Function to POST data */
const postData = async ( url = '', data = {})=>
{
    console.log(data);
      const response = await fetch(url,
      {
        method: 'POST', 
        credentials: 'same-origin',
        headers: 
        {
            'Content-Type': 'application/json',
        },
      // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
      });

      try 
      {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) 
      {
        console.log("error", error);
      }
  }


/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipcode, key)=>
{

    const res = await fetch(baseURL+zipcode+key)
    try 
    {
  
      const data = await res.json();
      console.log(data)
      return data;
    }  
    catch(error) 
    {
      console.log("error", error);
      // appropriately handle the error
    }
}

//update data in website
const updateUI = async () => 
{
    const request = await fetch('/all');
    try
    {
      const allData = await request.json();
      document.getElementById('date').innerHTML = 'Date is:  '+allData.date;
      document.getElementById('temp').innerHTML = 'Temperature is:  '+allData.temp+'  celsius';
      document.getElementById('content').innerHTML = 'Feelings:  '+allData.content;
  
    }
    catch(error)
    {
      console.log("error", error);
    }
}