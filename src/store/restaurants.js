const restaurants = api => ({
  namespaced: true,
  state: {
    records: [],
    loading: false,
  },
  actions: {
    load({commit}) {
      commit('startLoading');
      api.loadRestaurants().then(records => {
        commit('storeRecords', records);
      });
    },
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
    },
    storeRecords(state, records) {
      state.records = records;
      state.loading = false;
    },
  },
});

export default restaurants;
