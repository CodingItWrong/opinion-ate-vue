import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
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

  describe('initially', () => {
    it('does not display a validation error', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-name-error"]').exists(),
      ).toBe(false);
    });

    it('does not display a server error', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-server-error"]').exists(),
      ).toBe(false);
    });
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

    it('does not display a validation error', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-name-error"]').exists(),
      ).toBe(false);
    });

    it('does not display a server error', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-server-error"]').exists(),
      ).toBe(false);
    });
  });

  describe('when empty', () => {
    beforeEach(() => {
      wrapper.find('[data-testid="new-restaurant-name-field"]').setValue('');
      wrapper
        .find('[data-testid="new-restaurant-submit-button"]')
        .trigger('click');
    });

    it('displays a validation error', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-name-error"]').text(),
      ).toContain('Name is required');
    });

    it('does not dispatch the create action', () => {
      expect(restaurantsModule.actions.create).not.toHaveBeenCalled();
    });
  });

  describe('when correcting a validation error', () => {
    beforeEach(() => {
      wrapper.find('[data-testid="new-restaurant-name-field"]').setValue('');
      wrapper
        .find('[data-testid="new-restaurant-submit-button"]')
        .trigger('click');
      wrapper
        .find('[data-testid="new-restaurant-name-field"]')
        .setValue(restaurantName);
      wrapper
        .find('[data-testid="new-restaurant-submit-button"]')
        .trigger('click');
    });

    it('clears the validation error', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-name-error"]').exists(),
      ).toBe(false);
    });
  });

  describe('when the store action rejects', () => {
    beforeEach(() => {
      restaurantsModule.actions.create.mockRejectedValue();

      wrapper
        .find('[data-testid="new-restaurant-name-field"]')
        .setValue(restaurantName);
      wrapper
        .find('[data-testid="new-restaurant-submit-button"]')
        .trigger('click');
    });

    it('displays a server error', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-server-error"]').text(),
      ).toContain('The restaurant could not be saved. Please try again.');
    });

    it('does not clear the name', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-name-field"]').element.value,
      ).toEqual(restaurantName);
    });
  });

  describe('when retrying after a server error', () => {
    beforeEach(async () => {
      restaurantsModule.actions.create
        .mockRejectedValueOnce()
        .mockResolvedValueOnce();

      wrapper
        .find('[data-testid="new-restaurant-name-field"]')
        .setValue('Sushi Place');
      wrapper
        .find('[data-testid="new-restaurant-submit-button"]')
        .trigger('click');
      await flushPromises();
      wrapper
        .find('[data-testid="new-restaurant-submit-button"]')
        .trigger('click');
    });

    it('clears the server error', () => {
      expect(
        wrapper.find('[data-testid="new-restaurant-server-error"]').exists(),
      ).toBe(false);
    });
  });
});
