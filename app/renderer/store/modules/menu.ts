const state = {
    show: false,
};

const actions = {
    hide({commit}) {
        commit("toggle", false);
    },
    show({commit}) {
        commit("toggle", true);
    },
};

const mutations = {
    toggle(state, show) {
        state.show = show;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
  };
