<template>
  <v-card>
    <v-card-title>Restaurants</v-card-title>
    <v-card-text>
      <RestaurantList />
    </v-card-text>
  </v-card>
</template>

<script>
import RestaurantList from '@/components/RestaurantList';

export default {
  name: 'RestaurantScreen',
  components: {RestaurantList},
};
</script>
