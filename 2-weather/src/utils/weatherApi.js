import axios from 'axios';

const key = process.env.REACT_APP_API_KEY;

export const getCurrentWeatherAPI = async (lat, lon) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`; // 좌표
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.warn(err);
    return null;
  }
};

export const getCityWeatherAPI = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`; // 도시이름, metric=섭씨단위온도
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.warn(err);
    return {
      weather: [{
        main: 'Error'
      }]
    };
  }
};