import {lyric} from "../../api/iease";

const state = {
    show: false,
    lyric: [],
};

const getters = {};

const actions = {
    async show({commit, dispatch}) {
        await dispatch("home/loading", {}, {root: true});
        await dispatch("load");
        await dispatch("home/closeLoading", {}, {root: true});
        commit("toggle", true);
    },
    hide({commit}) {
        commit("toggle", false);
    },
    async load({rootState, commit}) {
        const songid = rootState.controller.song.id;
        const res = await lyric(songid);
        const lyrics = res.data.lrc.lyric.split("\n");
        const result = {};
        lyrics.map((e) => {
            const match = e.match(/\[.+\]/);

            if (!match) {
                return;
            }

            const timestamp: number[] = match[0].replace(/\D/g, ":").replace(/^:|:$/g, "").split(":");
            const content = e.replace(/\[.+\]/, "");
            const times: number = parseInt(timestamp[0] * 60 * 1000 + "", 10) +
                parseInt(timestamp[1] * 1000 + "", 10) + parseInt(timestamp[2] + "", 10);

            result[times] = content;
        });
        commit("setLyric", result);
    },
};

const mutations = {
    toggle(state, show) {
        state.show = show;
    },
    setLyric(state, lyric) {
        state.lyric = lyric;
    },
};
export default {
    namespaced : true,
    state,
    getters,
    actions,
    mutations,
};
