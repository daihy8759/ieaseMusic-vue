import { personalized, playlistDetail } from "../../api/iease";

const state = {
  loading: true,
  added: [],
  checkoutStatus: null,
  playlist: [],
};

const actions = {
  loading({commit}) {
    commit("setLoading", true);
  },
  closeLoading({commit}) {
    commit("setLoading", false);
  },
  async getPersonalized({ commit }) {
    const res = await personalized();
    const playlist = res.data.result;
    const list = playlist.map((e: any) => {
      return {
        id: e.id.toString(),
        type: 0,
        name: e.name,
        played: e.playCount,
        cover: `${e.picUrl}?param=130y130`,
        link: `/player/0/${e.id}`,
      };
    });
    if (res.data.result.length > 0) {
      const detailRes = await playlistDetail(res.data.result[0].id);
      const songs = detailRes.data.playlist.tracks.map((e: any) => {
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
          artists: ar.map((e: any) => ({
            id: e.id.toString(),
            name: e.name,
            link: e.id ? `/artist/${e.id}` : "",
          })),
        };
      });
      list[0].songs = songs;
      commit("setPlaylist", list);
    }
  },
};

const mutations = {
  setLoading(state: any, loading: boolean) {
    state.loading = loading;
  },
  setPlaylist(state: any, playlist: object[]) {
    state.playlist = playlist;
    state.loading = false;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
