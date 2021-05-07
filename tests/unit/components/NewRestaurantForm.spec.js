import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {mount, createLocalVue} from '@vue/test-utils';
import NewRestaurantForm from '@/components/NewRestaurantForm.vue';

Vue.use(Vuetify);

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';

  const vuetify = new Vuetify();
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantsModule;
  let wrapper;

  beforeEach(() => {
    restaurantsModule = {
      namespaced: true,
      actions: {
        create: jest.fn().mockName('create'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });

    const div = document.createElement('div');
    document.body.appendChild(div);
    wrapper = mount(NewRestaurantForm, {
      localVue,
      store,
      vuetify,
      attachTo: div,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  describe('when filled in', () => {
    beforeEach(() => {
      wrapper
        .find('[data-testid="new-restaurant-name-field"]')
        .setValue(restaurantName);
      wrapper
        .find('[data-testid="new-restaurant-submit-button"]')
        .trigger('click');
    });

    it('dispatches the create action', () => {
      expect(restaurantsModule.actions.create).toHaveBeenCalledWith(
        expect.anything(),
        restaurantName,
      );
    });

    it('clears the name', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-name-field"]').element.value,
      ).toEqual('');
    });
  });
});
