import Vue from 'vue';
import Vuex from 'vuex';
import { HTTP } from '@/services/axios.js';
import { getHours } from '@/utils/helpers.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allCities: {},
    weatherData: [],
    favoriteData: [],
  },
  getters: {
    getAllCities(state) {
      return state.allCities.data;
    },
    getWeatherData(state) {
      return state.weatherData;
    },
    getFavoriteData(state) {
      return state.favoriteData;
    },
  },
  mutations: {
    setAllCities(state, payload) {
      state.allCities = payload;
    },
    setWeatherData(state, payload) {
      state.weatherData = [...state.weatherData, ...payload];
    },
    deleteFormWeatherData(state, payload) {
      state.weatherData = payload;
    },
    addToFavotiteData(state, payload) {
      state.favoriteData = payload;
    },
    deleteFromFavoriteData(state, payload) {
      state.favoriteData = payload;
    },
    updateWeatherData(state, payload) {
      state.weatherData = payload;
    },
  },
  actions: {
    async getFullCities({ commit }) {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow',
      };

      const res = await fetch(
        'https://countriesnow.space/api/v0.1/countries',
        requestOptions
      );
      const data = await res.json();

      commit('setAllCities', data);
    },
    async getWeatherForFiveDays({ commit }, cityName) {
      const key = '57c3e1c35cc649247ff016541099737c';
      const res = await HTTP.get(
        `forecast/?q=${cityName}&appid=${key}&units=metric`
      );

      const { city } = res.data;
      const weatherDay = [];
      const weatherWeek = [];
      const isFavorite = false;

      //create weatherDay [], and add isActive
      res.data.list.slice(0, 8).forEach((el, idx) => {
        let isActive = false;
        if (idx === 0) {
          isActive = true;
          weatherDay.push({ ...el, isActive });
        } else {
          weatherDay.push({ ...el, isActive });
        }
      });

      //create weatherWeek [], and add isActive
      res.data.list.forEach((el, idx, arr) => {
        let isActive = false;
        if (getHours(el.dt) === getHours(arr[0].dt)) {
          if (idx === 0) {
            isActive = true;
            weatherWeek.push({ ...el, isActive });
          } else {
            weatherWeek.push({ ...el, isActive });
          }
        } else if (arr.length - 1 === idx) {
          weatherWeek.push({ ...el, isActive });
        } else {
          weatherWeek.push();
        }
      });

      const weatherDataObj = {
        city,
        weatherDay,
        weatherWeek,
        isFavorite,
      };

      const data = JSON.parse(localStorage.getItem('favoriteData'));
      if (data) {
        const findFavorite = data.find((el) => el.city.name === city.name);
        if (findFavorite) {
          weatherDataObj.isFavorite = true;
        }
      }

      commit('setWeatherData', [weatherDataObj]);
    },
    getLocalStorageData({ commit }) {
      const data = JSON.parse(localStorage.getItem('favoriteData'));
      commit('addToFavotiteData', data);
    },
  },
  modules: {},
});
