const restaurants = api => ({
  namespaced: true,
  state: {
    records: [],
    loading: true,
  },
  actions: {
    load({commit}) {
      api.loadRestaurants().then(records => {
        commit('storeRecords', records);
      });
    },
  },
  mutations: {
    storeRecords(state, records) {
      state.records = records;
      state.loading = false;
    },
  },
});

export default restaurants;
