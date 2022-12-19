<template>
  <div class="weather-card-info">
    <div class="weather-card-info__main">
      <div class="weather-card-info__main__date text">
        <h2>{{ date(weatherView) }}</h2>
        <h2 class="cityname">{{ city.name.toUpperCase() }}</h2>
        <h2>{{ time(weatherView) }}</h2>
      </div>
      <div class="weather-card-info__main__details">
        <div class="weather-icon text">
          <h3>{{ weatherView.weather[0].main }}</h3>
          <img
            :src="currentIcon(weatherView.weather[0].main)"
            class="weather-card-info__main__details__icon"
          />
          <h3>{{ Math.round(weatherView.main.temp) }} °C</h3>
        </div>
        <div class="weather-descr text">
          <ul>
            <li>
              <span>Feels like:</span>
              <span>{{ Math.round(weatherView.main.feels_like) }} °C</span>
            </li>
            <li>
              <span>Humidity:</span>
              <span>{{ weatherView.main.humidity }} %</span>
            </li>
            <li>
              <span>Pressure: </span>
              <span>{{ weatherView.main.pressure }} mb</span>
            </li>
            <li>
              <span>Temp max: </span>
              <span>{{ Math.round(weatherView.main.temp_max) }} °C</span>
            </li>
            <li>
              <span>Temp min: </span>
              <span>{{ Math.round(weatherView.main.temp_min) }} °C</span>
            </li>
            <li>
              <span>Wind speed: </span>
              <span>{{ weatherView.wind.speed }} km/h</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="weather-card-info__list">
      <ul>
        <li
          v-for="(item, i) in weather"
          :key="item.dt"
          :class="{ active: item.isActive }"
          @click="selectWeather(i)"
        >
          <img :src="currentIcon(item.weather[0].main)" alt="" />
          <span>{{ Math.round(item.main.temp) }} °C</span>
          <span class="weather-card-info__list-date">{{ date(item) }}</span>
          <span>{{ time(item) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCurrentDate, chosenIcon } from '@/utils/helpers.js';

export default {
  name: 'WeatherCardInfo',
  props: {
    weather: {
      type: Array,
      default: () => [],
    },
    city: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    weatherView() {
      return this.weather.find((el) => el.isActive === true);
    },
  },
  methods: {
    currentIcon(icon) {
      return chosenIcon(icon);
    },
    date(weatherItem) {
      return getCurrentDate(weatherItem.dt);
    },
    time(weatherItem) {
      return weatherItem.dt_txt.split(' ')[1];
    },
    selectWeather(idx) {
      this.weather.forEach((el, i) =>
        i === idx ? (el.isActive = true) : (el.isActive = false)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-card-info {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 0.5rem;
  &__main {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 1rem;
    gap: 1rem;
    &__date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cityname {
        font-size: 2rem;
        line-height: 2rem;
        font-weight: 700;
      }
    }
    &__details {
      display: grid;
      grid-template-columns: 1fr 2fr;
      ul {
        list-style-type: none;
        li {
          display: flex;
          justify-content: space-between;
        }
      }
      h3 {
        font-size: 1.5rem;
        line-height: 1.5rem;
        font-weight: 700;
      }
      &__icon {
        width: 10rem;
        height: 10rem;
      }
      &__list {
        display: flex;
        align-items: flex-start;
        justify-content: space-evenly;
      }
    }
    .weather-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .weather-descr {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 2rem;
    }
  }
}

.text * {
  font-size: 1.25rem;
  line-height: 1.25rem;
  font-weight: 300;
  color: $second-color;
}

.weather-card-info__list {
  ul {
    width: 100%;
    background-color: $third-color;
    list-style: none;
    border-radius: 0.5rem;
    transition: 0.5s all ease;
    li {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0.2rem;
      text-align: center;
      color: $second-color;
      background-color: $third-color;
      font-weight: 500;
      box-shadow: 0px 0px 3px -1px rgba(255, 255, 255, 0.8);
      transition: all 0.5s ease;
      cursor: pointer;
      &:first-child {
        border-radius: 0.5rem 0.5rem 0 0;
      }
      &:last-child {
        border-radius: 0 0 0.5rem 0.5rem;
      }
      &:hover,
      &:active,
      &:focus {
        background-color: $fourth-color;
      }
      p {
        font-size: 16px;
        line-height: 16px;
      }
      img {
        width: 2rem;
        height: 2rem;
      }
    }
    li.active {
      background-color: $fourth-color;
    }
  }
}
@media (max-width: 1200px) {
}

@media (max-width: 992px) {
  .weather-card-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    &__main {
      padding-right: 0;
      .weather-descr {
        padding-left: 0;
      }
      &__details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        ul {
          padding: 0 1rem;
        }
        &__icon {
          width: 8rem;
          height: 8rem;
        }
      }
    }
  }

  .weather-card-info__list {
    ul {
      width: 24rem;
      li {
        font-weight: 300;
      }
    }
  }

  .text * {
    font-size: 1rem;
    line-height: 1rem;
    font-weight: 300;
    color: $second-color;
  }
}

@media (max-width: 768px) {
  .weather-card-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    &__main {
      &__date {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  }
  .weather-card-info__list {
    ul {
      width: 20rem;
      li {
        font-weight: 300;
      }
    }
  }
}

@media (max-width: 481px) {
  .weather-card-info {
    gap: 1rem;
    &__main {
      &__details {
        &__icon {
          width: 5rem;
          height: 5rem;
        }
      }
    }
  }

  .weather-card-info__list {
    &-date {
      display: none;
    }
    ul {
      width: 12rem;
      li {
        padding: 0.1rem;
        font-weight: 300;
      }
    }
  }
}

@media (max-width: 320px) {
}
</style>