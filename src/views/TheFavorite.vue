<template>
  <div class="favorite">
    <div style="width: 1198px"></div>
    <TheCard :color="'#191b1d'">
      <TheCard :color="'#272a30'">
        <div class="favorite__wrapper__weather">
          <WeatherCard
            v-for="(card, idx) in getFavoriteData"
            :key="idx"
            :city="card.city"
            :isFavorite="card.isFavorite"
            :weatherDay="card.weatherDay"
            :weatherWeek="card.weatherWeek"
            :chartClass="`temperature-${idx + 1}`"
            :currentIdx="idx"
            @click-delete="deleteWeatherCard($event)"
          ></WeatherCard>
        </div>
      </TheCard>
    </TheCard>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

import TheCard from '@/components/UI/TheCard.vue';
import WeatherCard from '@/components/UI/the-weather-card/WeatherCard.vue';

export default {
  name: 'TheFavoritePageComponent',
  components: {
    TheCard,
    WeatherCard,
  },
  computed: {
    ...mapGetters(['getFavoriteData']),
  },
  methods: {
    ...mapMutations(['deleteFromFavoriteData']),
    ...mapActions(['getLocalStorageData']),
    deleteWeatherCard(idx) {
      const filteredData = this.getFavoriteData.filter((_, i) => i !== idx);
      this.deleteFromFavoriteData(filteredData);
      this.saveToLocaleStorage(filteredData);
    },
    saveToLocaleStorage(data) {
      const parsed = JSON.stringify(data);
      localStorage.setItem('favoriteData', parsed);
    },
  },
  created() {
    this.getLocalStorageData();
  },
  beforeDestroy() {
    this.deleteFromFavoriteData([]);
  },
};
</script>

<style lang="scss" scoped>
.favorite {
  margin-top: 1rem;
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>