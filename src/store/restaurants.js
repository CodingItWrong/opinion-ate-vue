const restaurants = api => ({
  namespaced: true,
  state: {
    records: [],
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
    },
  },
});

export default restaurants;
