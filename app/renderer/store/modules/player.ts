import { player } from "../../api/iease";
import helper from "../../utils/helper";

const state = {
  loading: false,
  meta : {
    pallet: [[0, 0, 0]],
    // tslint:disable-next-line:object-literal-sort-keys
    author: [],
  },
  songs: [],
  recommend: [],
};

const actions = {
  startLoading({ commit }) {
    commit("setLoading", true);
  },
  closeLoading({ commit }) {
    commit("setLoading", false);
  },
  async getDetail({ commit }, { type, id }) {
    const res = await player.getDetail(type, id);
    const data = res.data;
    const songs = (data.songs || data.playlist.tracks).map((e: any) => {
      const { al /* Album */, ar /* Artist */ } = e;

      return {
        id: e.id.toString(),
        name: e.name,
        duration: e.dt,
        album: {
          id: al.id.toString(),
          name: al.name,
          cover: `${al.picUrl}?param=y100y100`,
          link: `/player/1/${al.id}`,
        },
        artists: ar.map((e) => ({
          id: e.id.toString(),
          name: e.name,
                // Broken link
          link: e.id ? `/artist/${e.id}` : "",
        })),
      };
    });
    let meta = data.playlist;
    const pallet = await helper.getPallet(meta.coverImgUrl);
    meta = {
      id,
      meta,
      pallet: [state.meta.pallet[0], pallet],
      name: meta.name,
      size: meta.trackCount,
      cover: meta.coverImgUrl,
      author: [{
        id: meta.creator.userId.toString(),
        name: meta.creator.nickname,
        link: `/user/${meta.creator.userId}`,
      }],
      played: meta.playCount,
      subscribed: meta.subscribed,
    };
    commit("setMeta", {
      meta,
      songs,
    });
  },
};

const getters = {
  heroBackgroundColor(state) {
    console.log(helper.pureColor(state.meta.pallet));
    return helper.pureColor(state.meta.pallet);
  },
  headerIconColor(state) {
    return state.meta.pallet[0].join();
  },
  company(state) {
    return state.meta.company || `${helper.humanNumber(state.meta.played)} Played`;
  },
};

const mutations = {
  setMeta(state, { meta, songs }) {
    state.meta = meta;
    state.songs = songs;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
