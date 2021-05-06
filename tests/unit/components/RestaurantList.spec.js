import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {mount, createLocalVue} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList';

describe('RestaurantList', () => {
  Vue.use(Vuetify);

  const findByTestId = (wrapper, testId, index) =>
    wrapper.findAll(`[data-testid="${testId}"]`).at(index);

  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantsModule;
  let wrapper;

  const mountWithStore = (state = {records}) => {
    restaurantsModule = {
      namespaced: true,
      state,
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    wrapper = mount(RestaurantList, {localVue, store});
  }

  it('loads restaurants on mount', () => {
    mountWithStore();
    expect(restaurantsModule.actions.load).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    mountWithStore();
    expect(findByTestId(wrapper, 'restaurant', 0).text()).toBe('Sushi Place');
    expect(findByTestId(wrapper, 'restaurant', 1).text()).toBe('Pizza Place');
  });
});
