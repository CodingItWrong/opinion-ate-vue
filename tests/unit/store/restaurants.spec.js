import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils';
import restaurants from '@/store/restaurants';

describe('restaurants', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  describe('load action', () => {
    it('stores the restaurants', async () => {
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];

      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };
      const store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });

      await store.dispatch('restaurants/load');

      expect(store.state.restaurants.records).toEqual(records);
    });
  });
});
