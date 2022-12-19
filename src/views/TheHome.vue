<template>
  <div class="home">
    <div style="width: 1198px"></div>
    <TheModal v-if="isModal" error>
      <template #header>{{ errorMessage }} </template>
      <template #footer>
        <TheButton @click="modalClose">Ok</TheButton>
      </template>
    </TheModal>
    <TheCard :color="'#191b1d'">
      <TheCard :color="'#272a30'">
        <div class="home__wrapper">
          <div class="home__wrapper__search">
            <TheAutocomplete @click="selectedCity($event)"></TheAutocomplete>
          </div>
          <div class="home__wrapper__weather">
            <TheWeatherCard
              v-for="(card, idx) in getWeatherData"
              :key="idx"
              :city="card.city"
              :isFavorite="card.isFavorite"
              :weatherDay="card.weatherDay"
              :weatherWeek="card.weatherWeek"
              :chartClass="`temperature-${idx + 1}`"
              :currentIdx="idx"
              @click-delete="deleteWeatherCard($event)"
              @click-favorite="addFavorite($event, card.city.name)"
            ></TheWeatherCard>
          </div>
        </div>
      </TheCard>
    </TheCard>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import TheCard from '@/components/UI/TheCard.vue';
import TheAutocomplete from '@/components/UI/TheAutocomplete.vue';
import TheModal from '@/components/UI/TheModal.vue';
import TheButton from '@/components/UI/TheButton.vue';
import TheWeatherCard from '@/components/UI/the-weather-card/WeatherCard.vue';

export default {
  name: 'TheHomePageComponent',
  components: {
    TheCard,
    TheAutocomplete,
    TheWeatherCard,
    TheModal,
    TheButton,
  },
  data() {
    return {
      currentCity: 'Kiev',
      favoriteList: [],
      errorMessage: null,
      isModal: false,
      rem: '75rem',
    };
  },
  methods: {
    ...mapActions(['getWeatherForFiveDays']),
    ...mapMutations([
      'deleteFormWeatherData',
      'addToFavotiteData',
      'updateWeatherData',
    ]),
    selectedCity(city) {
      this.currentCity = city;
      if (this.getWeatherData.length >= 5) {
        this.errorMessage = 'You cannot add more than 5 cards';
        return this.modalShow();
      }
      this.getWeatherForFiveDays(city);
    },
    deleteWeatherCard(idx) {
      const filteredData = this.getWeatherData.filter((_, i) => i !== idx);
      this.deleteFormWeatherData(filteredData);
    },
    addFavorite(index, city) {
      const favoriteData = this.getWeatherData.find((el, idx) => idx === index);
      favoriteData.isFavorite = true;

      if (this.favoriteList.length >= 5) {
        this.errorMessage = "you can't add more than 5 cards in favorites";
        return this.modalShow();
      }

      if (this.favoriteList.length === 0) {
        this.favoriteList.push(favoriteData);
      } else if (this.favoriteList.find((el) => el.city.name === city)) {
        this.errorMessage = 'You cannot add a card already in favorites';
        this.modalShow();
        this.favoriteList.push();
      } else {
        this.favoriteList.push(favoriteData);
      }

      this.addToFavotiteData(this.favoriteList);
      this.saveToLocaleStorage();
    },
    saveToLocaleStorage() {
      const parsed = JSON.stringify(this.favoriteList);
      localStorage.setItem('favoriteData', parsed);
    },
    modalShow() {
      this.isModal = true;
    },
    modalClose() {
      this.isModal = false;
    },
  },
  computed: {
    ...mapGetters(['getWeatherData', 'getFavoriteData']),
  },
  created() {
    this.getWeatherForFiveDays(this.currentCity);
    this.favoriteList = this.getFavoriteData;
  },
  beforeDestroy() {
    this.updateWeatherData([]);
  },
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 1rem;
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    &__search {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &__weather {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  }
}
</style>