<template>
  <div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="primary"
      data-testid="loading-indicator"
    />
    <v-alert v-if="loadError" type="error" data-testid="loading-error">
      Restaurants could not be loaded.
    </v-alert>
    <v-list-item
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      data-testid="restaurant"
    >
      <v-list-item-content>
        <v-list-item-title>
          {{ restaurant.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
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
    loading: state => state.restaurants.loading,
    loadError: state => state.restaurants.loadError,
    restaurants: state => state.restaurants.records,
  }),
};
</script>
