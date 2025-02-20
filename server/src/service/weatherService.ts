import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temperature: any;
  weatherCode: any;
};

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL!: string;
  private apiKey!: string 
  private cityName!: string;
  // TODO: Create fetchLocationData method
   private async fetchLocationData(query: string) {
    const response = await fetch(query);
    return response.json();
   }
  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
    const { lat, lon } = locationData;
    return { lat, lon };
   }
  // TODO: Create buildGeocodeQuery method
   private buildGeocodeQuery(): string {
    return `${this.baseURL}/geocode/v1/json?q=${this.cityName}&key=${this.apiKey}`;
   }
  // TODO: Create buildWeatherQuery method
   private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather/1.0/report.json?product=observation&latitude=${coordinates.lat}&longitude=${coordinates.lon}`;
   }
  // TODO: Create fetchAndDestructureLocationData method
   private async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
   }
  // TODO: Create fetchWeatherData method
   private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    return await fetch(query);
   }
  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any) {
    return response.data.observations.location[0].observation[0];
   }
  // TODO: Complete buildForecastArray method
   private buildForecastArray(_currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [];
    weatherData.forEach((weather) => {
      const forecast = new Weather();
      forecast.temperature = weather.temperature;
      forecast.weatherCode = weather.weatherCode;
      forecastArray.push(forecast);
    });
    return forecastArray;
   }
  // TODO: Complete getWeatherForCity method
   async getWeatherForCity(city: string) {
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
