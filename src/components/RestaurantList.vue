<template>
  <ul>
    <li
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      data-testid="restaurant"
    >
      {{ restaurant.name }}
    </li>
  </ul>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'RestaurantList',
  mounted() {
    this.loadRestaurants();
  },
  methods: mapActions({
    loadRestaurants: 'restaurants/load',
  }),
  computed: mapState({
    restaurants: state => state.restaurants.records,
  }),
};
</script>
