<template>
  <v-card>
    <v-card-title>Restaurants</v-card-title>
    <v-card-text>
      <NewRestaurantForm />
      <RestaurantList />
    </v-card-text>
  </v-card>
</template>

<script>
import NewRestaurantForm from '@/components/NewRestaurantForm';
import RestaurantList from '@/components/RestaurantList';

export default {
  name: 'RestaurantScreen',
  components: {NewRestaurantForm, RestaurantList},
};
</script>
