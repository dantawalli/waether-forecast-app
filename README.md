# Weather Forecast App

Welcome to the Weather Forecast App! This application allows users to get the current weather and a 5-day forecast for any city in the world. Users can search for a city or use their current location to get weather updates.

## Features

- **Search by City:** Enter a city name to get the current weather and a 5-day forecast.
- **Use Current Location:** Use the device's geolocation to get weather information based on current location.
- **Weather Details:** Displays temperature, wind speed, humidity, and weather description.
- **Responsive Design:** The app is designed to work well on both desktop and mobile devices.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/dantawalli/weather-forecast-app.git
    cd weather-forecast-app
    ```

2. **Getting the OpenWeatherMap API Key**

    To use the Weather Forecast App, you need to obtain an API key from OpenWeatherMap. Follow these steps to get your API key:

    1. **Sign Up for an OpenWeatherMap Account:**
        - Go to the [OpenWeatherMap website](https://home.openweathermap.org/users/sign_up).
        - Fill in the required details and create a new account.

    2. **Sign In to Your Account:**
        - Once you have registered, sign in to your OpenWeatherMap account.

    3. **Generate an API Key:**
        - After signing in, navigate to the "API keys" section from the user dropdown menu or directly via this [link](https://home.openweathermap.org/api_keys).
        - Click on the "Create" button to generate a new API key.
        - Name your API key (e.g., "Weather Forecast App") and click "Generate".

    4. **Copy Your API Key:**
        - Once generated, you will see your new API key listed in the "API keys" section.
        - Copy the API key. This will be needed to authenticate your requests to the OpenWeatherMap API.

    5. **Replace the Placeholder in Your Code:**
        - Open your project files and locate the placeholder for the API key in the `index.js` file.
        - Replace `YOUR_API_KEY_HERE` with your actual API key.

        Example:

        ```javascript
        /*==================== OpenWeatherMap API Key ====================*/
        const apiKey = "YOUR_API_KEY_HERE";
        ```

3. **Run the app:**
    - Open `index.html` with the live server to view the app in your browser.

## Usage

1. **Search for a City:**
   - Enter the city name in the search box.
   - Click the "Search" button or press Enter.
   
2. **Use Current Location:**
   - Click the "Use Current Location" button to get weather updates based on your current geographical location.

3. **View Weather Information:**
   - The current weather and 5-day forecast will be displayed, showing temperature, wind speed, humidity, and weather conditions.

## Technologies Used

- **HTML5:** Structure of the app.
- **TailwindCSS:** Styling of the app, including responsiveness.
- **JavaScript:** Functionality and API integration.
- **OpenWeatherMap API:** Fetching weather data.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Enjoy using the Weather Forecast App! If you have any questions or feedback, feel free to open an issue or contact me.