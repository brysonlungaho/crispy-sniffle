# crispy-sniffle

# Travel Risk Assistant

## Project Description

The Travel Risk Assistant is a web-based application that helps users make informed travel decisions by aggregating and analyzing real-time data from multiple external APIs. By entering a city name, users can view current weather conditions, a computed travel risk level, population data, and recent news related to the destination.

The application goes beyond simply displaying raw data by processing and interpreting the information to provide meaningful insights, such as a calculated risk level based on environmental conditions.

---

## Features

* Search for any city worldwide
* View current temperature and weather conditions
* Automatically calculated travel risk level (Low, Moderate, High)
* Country and population information
* Recent news articles related to the searched city
* Multiple search results displayed as individual cards
* Clear results functionality
* Error handling for invalid inputs and API failures

---

## Technologies Used

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js with Express
* HTTP Client: Axios
* Environment Management: dotenv

---

## APIs Used

This application integrates the following external APIs:

1. OpenWeather API
   Provides real-time weather data
   https://openweathermap.org/api

2. REST Countries API
   Provides country and population data
   https://restcountries.com

3. NewsAPI
   Provides recent news articles related to a query
   https://newsapi.org

All APIs are used in accordance with their respective terms, and proper credit is given.

---

## Project Structure

```
travel-assistant/
│
├── server.js
├── package.json
├── .env
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
```

---

## Installation and Local Setup

1. Clone the repository:

```
git clone <your-repository-url>
cd travel-assistant
```

2. Install dependencies:

```
npm install
```

3. Create a `.env` file in the root directory:

```
WEATHER_API_KEY=your_openweather_api_key
NEWS_API_KEY=your_newsapi_key
PORT=3000
```

4. Start the server:

```
node server.js
```

5. Open your browser and navigate to:

```
http://localhost:3000
```

---

## How It Works

1. The user enters a city name in the interface.
2. The frontend sends a request to the backend endpoint `/api/travel`.
3. The backend retrieves:

   * Weather data from OpenWeather
   * Country and population data from REST Countries
   * News articles from NewsAPI
4. The backend processes the data and computes a travel risk level based on temperature and weather conditions.
5. The processed data is returned to the frontend and displayed as a structured card.

---

## Deployment

The application is deployed across two web servers and accessed through a load balancer.

### Steps Taken:

1. The application was cloned onto both Web01 and Web02 servers.
2. Dependencies were installed using `npm install`.
3. Environment variables were configured using a `.env` file on each server.
4. The application was started using a process manager (pm2) to ensure continuous operation.
5. Nginx was configured on the load balancer (Lb01) to distribute traffic between the two servers.

### Load Balancer Configuration Example:

```
upstream travel_app {
    server WEB01_IP:3000;
    server WEB02_IP:3000;
}

server {
    listen 80;

    location / {
        proxy_pass http://travel_app;
    }
}
```

---

## Challenges and Solutions

* API Key Security
  API keys were stored in environment variables using a `.env` file and excluded from version control using `.gitignore`.

* Handling Multiple APIs
  Coordinating responses from different APIs required careful asynchronous handling using async/await.

* Error Handling
  Implemented checks for invalid user input, failed API requests, and missing data to ensure the application remains stable.

* Windows Execution Policy Issue
  Resolved npm script execution errors by adjusting PowerShell execution policies.

---

## Future Improvements

* Add caching to reduce API calls and improve performance
* Implement user preferences or saved locations
* Improve UI with advanced styling or frameworks
* Add more data sources such as travel advisories or currency exchange rates

---

## Demo

A demonstration video showcasing the application locally and through the load balancer is included with the submission.

---

## Author

This project was developed as part of an assignment and all code is original work.
