<template>
  <div class="search" @click="openList">
    <div class="search__wrapper">
      <mdicon name="magnify" class="search__input__icon" />
      <input
        class="search__input"
        type="text"
        v-model="inputValue"
        placeholder="Search city..."
        @input="searchFilter"
      />
    </div>
    <div class="search__list" v-if="isOpen">
      <ul>
        <li
          v-for="(item, idx) in slicedSortedCurrencies"
          :key="idx"
          @click="$emit('click', item)"
        >
          <p>{{ item }}</p>
          <mdicon name="plus" class="search__list__icon" />
        </li>
      </ul>
    </div>
    <span class="error" v-if="isError"> No result found! </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'TheAutocompleteComponent',

  data() {
    return {
      inputValue: '',
      sortedCities: [],
      isError: false,
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(['getAllCities']),
    slicedSortedCurrencies() {
      if (this.inputValue === '') {
        return [];
      } else {
        return this.sortedCities.slice(0, 10);
      }
    },
  },
  methods: {
    ...mapActions(['getFullCities']),
    searchFilter() {
      const newArr = [];

      this.getAllCities.filter((city) => {
        return city.cities.forEach((el) => {
          if (el.toLowerCase().includes(this.inputValue.toLowerCase())) {
            newArr.push(el);
          } else {
            newArr.push();
          }
        });
      });

      if (newArr.length === 0) {
        this.isError = true;
      } else {
        this.isError = false;
      }

      this.sortedCities = newArr;
    },
    openList() {
      this.isOpen = !this.isOpen;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.inputValue = '';
        this.sortedCities = [];
        this.isOpen = false;
      }
    },
  },
  created() {
    this.getFullCities();
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 20rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    margin: 0.3rem;
    font-size: 16px;
    line-height: 16px;
    background-color: $first-color;
    border: 1px solid $second-color;
    border-radius: 0.3rem;
    transition: 0.3s border-color;
    &:hover,
    &:active,
    &:focus-within {
      border: 1px solid $fourth-color;
    }
  }
  &__input {
    width: 100%;
    padding: 0.3rem;
    font-size: 16px;
    line-height: 16px;
    border: none;
    color: $second-color;
    border-radius: 0.3rem;
    background-color: $first-color;
    &:focus {
      outline: none;
    }
    &__icon {
      padding: 0.3rem;
      svg {
        width: 20px;
        height: 20px;
        path {
          fill: $second-color;
        }
      }
    }
  }
  &__list {
    position: absolute;
    margin-top: 3rem;
    border-radius: 0.5rem;
    width: 100%;
    z-index: 100;
    ul {
      width: 100%;
      background-color: $first-color;
      list-style: none;
      border-radius: 0.5rem;
      transition: 0.5s all ease;
      &__span {
        color: $danger-color;
        background-color: $third-color;
      }
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.4rem;
        text-align: center;
        color: $second-color;
        background-color: $first-color;
        font-weight: 300;
        box-shadow: 0px 0px 3px -1px rgba(255, 255, 255, 0.8);
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
      }
    }
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $fourth-color;
      border-radius: 50%;
      svg {
        width: 20px;
        height: 20px;

        path {
          fill: $second-color;
        }
      }
    }
  }
}

.error {
  color: $danger-color;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
}
</style>