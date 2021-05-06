import Vuex from 'vuex';
import {mount, createLocalVue} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  it('loads restaurants on mount', () => {
    const restaurantsModule = {
      namespaced: true,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    mount(RestaurantList, {localVue, store});

    expect(restaurantsModule.actions.load).toHaveBeenCalled();
  });
});
