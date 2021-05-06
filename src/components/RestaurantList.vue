<template>
  <div>RestaurantList</div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'RestaurantList',
  mounted() {
    this.loadRestaurants();
  },
  methods: mapActions({
    loadRestaurants: 'restaurants/load',
  }),
};
</script>
