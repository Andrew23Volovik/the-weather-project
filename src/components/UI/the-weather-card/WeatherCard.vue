<template>
  <div
    class="weather-card"
    @mouseover="showIcons = true"
    @mouseleave="showIcons = false"
  >
    <div class="weather-card__wrapper">
      <div class="weather-card__wrapper__bar">
        <div class="favorite" @click="$emit('click-favorite', currentIdx)">
          <mdicon
            :name="iconStyle"
            v-if="showIcons"
            :class="{ 'active-favorite': isFavorite }"
          />
        </div>
        <TheButton class="button" @click="changeWeather">{{
          buttonName
        }}</TheButton>
        <div class="delete" @click="showModal">
          <mdicon name="delete" v-if="showIcons" />
        </div>
      </div>
      <TheCard :width="'100%'" :color="'#191b1d'">
        <transition name="fade" mode="out-in">
          <WeatherCardInfo
            :weather="currentWeatherProps"
            :city="city"
            :key="currentWeatherProps[currentWeatherProps.length - 1].dt"
          ></WeatherCardInfo>
        </transition>
      </TheCard>
      <TheCard :width="'100%'" :color="'#191b1d'">
        <div class="chart">
          <canvas :class="chartClass"></canvas>
        </div>
      </TheCard>
    </div>

    <TheModal v-if="isModal">
      <template #header>
        <p>Are you sure you want to delete the card?</p>
      </template>
      <template #footer>
        <TheButton
          @click="
            closeModal();
            $emit('click-delete', currentIdx);
          "
        >
          Yes
        </TheButton>
        <TheButton @click="closeModal">No</TheButton>
      </template>
    </TheModal>
  </div>
</template>

<script>
import { convertDtx } from '@/utils/helpers';

import TheCard from '@/components/UI/TheCard.vue';
import TheButton from '@/components/UI/TheButton.vue';
import TheModal from '@/components/UI/TheModal.vue';
import WeatherCardInfo from '@/components/UI/the-weather-card/WeatherCardInfo.vue';

import Chart from 'chart.js/auto';

export default {
  name: 'WeatherCardComponent',
  emits: ['click-favorite', 'click-delete'],
  components: {
    TheCard,
    TheButton,
    WeatherCardInfo,
    TheModal,
  },
  props: {
    city: {
      type: Object,
      required: true,
      default: () => {},
    },
    weatherDay: {
      type: Array,
      required: true,
      default: () => [],
    },
    weatherWeek: {
      type: Array,
      required: true,
      default: () => [],
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
    chartClass: {
      type: String,
      required: true,
    },
    currentIdx: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      weather: true,
      chart: null,
      buttonName: 'Week',
      showIcons: false,
      isModal: false,
    };
  },

  computed: {
    currentWeatherProps() {
      if (this.weather) {
        return this.weatherDay;
      } else {
        return this.weatherWeek;
      }
    },
    chartValues() {
      return this.currentWeatherProps.map((el) => ({
        date: convertDtx(el.dt_txt),
        temp: Math.round(el.main.temp),
      }));
    },
    iconStyle() {
      if (!this.isFavorite) {
        return 'star-outline';
      } else {
        return 'star';
      }
    },
  },
  methods: {
    changeWeather() {
      this.weather = !this.weather;

      if (this.currentWeatherProps.length === 8) {
        this.buttonName = 'Week';
      } else {
        this.buttonName = 'Day';
      }

      this.chart.destroy();
      this.createChart();
    },
    createChart() {
      const data = this.chartValues;

      this.chart = new Chart(document.querySelector('.' + this.chartClass), {
        type: 'line',
        data: {
          labels: data.map((row) => row.date),
          datasets: [
            {
              label: 'Temperature',
              data: data.map((row) => row.temp),
              borderColor: '#0e8efe',
              backgroundColor: '#f3f6f4',
              borderWidth: 3,
              tension: 0.2,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: true,
                color: 'rgba(243, 246, 244, 0.1)',
              },
            },
            y: {
              ticks: {
                callback: (value) => `${value} °C`,
              },
              grid: {
                display: true,
                color: 'rgba(243, 246, 244, 0.1)',
              },
            },
          },
        },
      });
    },
    showModal() {
      this.isModal = true;
    },
    closeModal() {
      this.isModal = false;
    },
    resize() {
      let width = window.innerWidth;
      if (width < 922) {
        this.showIcons = true;
      } else {
        this.showIcons = false;
      }
      if (width < 481) {
        this.chart.data.datasets[0].stepped = true;
      } else {
        this.chart.data.datasets[0].stepped = false;
      }
    },
  },
  mounted() {
    this.createChart();
    window.addEventListener('resize', this.resize);
    this.resize();
    this.chart.canvas.parentNode.style.height = '250px';
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  },
};
</script>

<style lang="scss" scoped>
.weather-card {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &__bar {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 32px;
        height: 32px;
        color: $second-color;
        transition: 0.4s all ease;
        &:hover {
          color: $fourth-color;
        }
      }

      .favorite {
        margin-right: auto;
      }
      .delete {
        margin-left: auto;
      }
      .active-favorite {
        svg {
          color: $fourth-color;
        }
      }
    }
  }
}

.fade-enter-active,
.component-fade-leave-active {
  transition: opacity 3s ease;
}
.fade-enter,
.component-fade-leave-to {
  opacity: 0;
}

@media (max-width: 1200px) {
}

@media (max-width: 992px) {
  .weather-card {
    &__wrapper {
      &__bar {
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
}

@media (max-width: 481px) {
}

@media (max-width: 320px) {
}
</style>