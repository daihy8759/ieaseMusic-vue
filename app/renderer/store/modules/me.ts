import {login} from "../../api/iease";
import storage from "../../utils/storage";

const state = {
  initialized: false,
  logining: false,
  hasLogin: false,
  profile: {},
  likes: {},
};

const actions = {
  async login({commit}, {phone, password}) {
    commit("setLogining", true);
    const res = await login(phone, password);
    const data = res.data;
    console.log(res);
    commit("setProfile", data.profile);
    // cache
    storage.set("profile", data.profile);
    commit("setLogining", false);
    return res.data;
  },
  logout({ commit }) {
    storage.remove("profile");
  },
  async init({ commit }) {
    const profile = await storage.get("profile");
    if (!profile) {
      commit("setProfile", profile);
    } else {
        // Cookie expired
      // const response = await axios.get("/login/refresh?" + Date.now());

      // if (response.data.code === 301) {
      //   commit("setProfile", profile);
      //   await storage.remove("profile");
      // }
    }
  },
};

const mutations = {
  setLogining(state, logining) {
    state.logining = logining;
  },
  setProfile(state, profile) {
    state.hasLogin = true;
    state.profile = profile;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
