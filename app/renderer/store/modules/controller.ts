import { musicUrl } from "../../api/iease";
import { IControllerState } from "../../interface/IController";
import { IPlaylist } from "../../interface/IPlaylist";
import { ISong } from "../../interface/ISong";
import helper from "../../utils/helper";

const state = {
  playlist: {
    songs: [],
  },
  playing:  false,
  song: {
    album: {},
  },
  currentTime: 0,
};

const getters = {
    currentTime(state) {
      const currentTime = state.currentTime;
      const duration = state.song.duration;
      return `${helper.getTime(currentTime * 1000)} / ${helper.getTime(duration)}`;
    },
    transform(state) {
      const duration = state.song.duration;
      const currentTime = state.currentTime;
      const percent = (currentTime * 1000) / duration;
      return `transform:translate3d(${-100 + percent * 100}%, 0, 0)`;
    },
};

const resolveSong = async (songid) => {
  const res = await musicUrl(songid);
  if (res.data.code === 200) {
    const resArray = res.data.data;
    const song = resArray[0];
    return {
      id: song.id.toString(),
      src: song.url,
      md5: song.md5,
      bitRate: song.br,
    };
  } else {
    console.log("fetch music url error");
    return {

    };
  }
};

const actions = {
  setup({ commit }, playlist: IPlaylist) {
    commit("setPlaylist", playlist);
  },
  toggle({commit}, playing) {
    commit("setPlaying", playing);
  },
  currentTime({commit}, currentTime) {
    commit("setCurrentTime", currentTime);
  },
  async next({ state, commit, dispatch }) {
    const songs = state.playlist.songs;
    const index = songs.findIndex((song) => state.song.id === song.id);
    let nextSong;
    if (index === -1 || index === songs.length - 1) {
      nextSong = songs[0];
    } else {
      nextSong = songs[index + 1];
    }
    const songDetail = await resolveSong(nextSong.id);
    nextSong = Object.assign({}, nextSong, songDetail);
    if (nextSong.src) {
      commit("setSong", nextSong);
    }
  },
  async play({ state, commit, dispatch }, songid: string | undefined) {
    const songs = state.playlist.songs;
    let song;
    if (songid) {
      song = songs.find((e: ISong) => e.id === songid);
    }
    song = song || state.song || songs[0];
    const songDetail = await resolveSong(song.id);
    song = Object.assign({}, song, songDetail);
    if (song.src) {
      commit("setSong", song);
    } else {
      dispatch("next");
    }
  },
};

const mutations = {
  setPlaylist(state: IControllerState, playlist: IPlaylist) {
    state.playlist = playlist;
    state.song = playlist.songs[0];
  },
  setPlaying(state: IControllerState, playing: boolean) {
    state.playing = playing;
  },
  setSong(state: IControllerState, song: ISong) {
    state.song = song;
    state.playing = true;
  },
  setCurrentTime(state: IControllerState, currentTime) {
    state.currentTime = currentTime;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
