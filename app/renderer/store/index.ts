import Vue from "vue";
import Vuex from "vuex";

import controller from "./modules/controller";
import home from "./modules/home";
import lyrics from "./modules/lyrics";
import me from "./modules/me";
import menu from "./modules/menu";
import player from "./modules/player";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    home,
    me,
    controller,
    player,
    lyrics,
    menu,
  },
  strict: debug,
});
