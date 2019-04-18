import Router from "vue-router";

import Home from "../views/Home.vue";

const routes = [
    { name: "home", path: "/", component:  Home },
    { name: "player", path: "/player/:type/:id", component:  () => import("../views/Player.vue") },
    { name: "login", path: "/login/:fm", component:  () => import("../views/Login.vue") },
];

export default new Router({ routes });
