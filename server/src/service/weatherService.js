import dotenv from 'dotenv';
dotenv.config();
// TODO: Define a class for the Weather object
class Weather {
}
;
// TODO: Complete the WeatherService class
class WeatherService {
    // TODO: Create fetchLocationData method
    async fetchLocationData(query) {
        const response = await fetch(query);
        return response.json();
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        const { lat, lon } = locationData;
        return { lat, lon };
    }
    // TODO: Create buildGeocodeQuery method
    buildGeocodeQuery() {
        return `${this.baseURL}/geocode/v1/json?q=${this.cityName}&key=${this.apiKey}`;
    }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/weather/1.0/report.json?product=observation&latitude=${coordinates.lat}&longitude=${coordinates.lon}`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData() {
        const query = this.buildGeocodeQuery();
        const locationData = await this.fetchLocationData(query);
        return this.destructureLocationData(locationData);
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const query = this.buildWeatherQuery(coordinates);
        return await fetch(query);
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        return response.data.observations.location[0].observation[0];
    }
    // TODO: Complete buildForecastArray method
    buildForecastArray(_currentWeather, weatherData) {
        const forecastArray = [];
        weatherData.forEach((weather) => {
            const forecast = new Weather();
            forecast.temperature = weather.temperature;
            forecast.weatherCode = weather.weatherCode;
            forecastArray.push(forecast);
        });
        return forecastArray;
    }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city) {
        this.cityName = city;
        const coordinates = await this.fetchAndDestructureLocationData();
        const response = await this.fetchWeatherData(coordinates);
        const weatherData = await response.json();
        const currentWeather = this.parseCurrentWeather(weatherData);
        const forecastArray = this.buildForecastArray(currentWeather, weatherData);
        return { currentWeather, forecastArray };
    }
}
export default new WeatherService();
