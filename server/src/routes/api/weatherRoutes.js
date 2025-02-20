import { Router } from 'express';
const router = Router();
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';
// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
    // TODO: GET weather data from city name
    const weatherData = WeatherService.getWeatherForCity(req.body.city);
    if (weatherData) {
        // TODO: save city to search history
        HistoryService.addCity(req.body.city);
        res.json(weatherData);
    }
});
// TODO: GET search history
router.get('/history', async (_req, res) => {
    const cities = HistoryService.getCities();
    res.json(cities);
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    HistoryService.removeCity(req.params.id);
    res.json({ message: 'City removed from history' });
});
export default router;
