<template>
  <form @submit.prevent="handleSave">
    <v-alert
      v-if="validationError"
      type="error"
      data-testid="new-restaurant-name-error"
    >
      Name is required.
    </v-alert>
    <v-text-field
      placeholder="Add Restaurant"
      filled
      type="text"
      v-model="name"
      data-testid="new-restaurant-name-field"
    />
    <v-btn
      type="submit"
      color="primary"
      class="black--text"
      data-testid="new-restaurant-submit-button"
    >
      Add
    </v-btn>
  </form>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'NewRestaurantForm',
  data() {
    return {
      name: '',
      validationError: false,
    };
  },
  methods: {
    ...mapActions({
      createRestaurant: 'restaurants/create',
    }),
    handleSave() {
      if (this.name) {
        this.validationError = false;
        this.createRestaurant(this.name).then(() => {
          this.name = '';
        });
      } else {
        this.validationError = true;
      }
    },
  },
};
</script>
