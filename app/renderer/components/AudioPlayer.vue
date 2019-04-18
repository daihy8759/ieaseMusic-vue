<template>
  <audio
    autoplay
    ref="player"
    :src="song.src"
    @seeked="seeked"
    @progress="progress"
    @timeupdate="timeupdate"
    @ended="ended"
  ></audio>
</template>

<script>
import { mapState } from "vuex";
import helper from "../utils/helper";
import controller from "../store/modules/controller";

export default {
  computed: {
    ...mapState({
      song: state => state.controller.song,
      playing: state => state.controller.playing
    })
  },
  watch: {
    playing(newValue, oldValue) {
      if (newValue !== oldValue) {
        if (!newValue) {
          this.$refs.player.pause();
        } else {
          this.$refs.player.play();
        }
      }
    }
  },
  methods: {
    seeked(e) {},
    ended(e) {
      this.$store.dispatch("controller/next");
    },
    progress(e) {
      const duration = this.song.duration;
      const currentTime = e.target.currentTime;
      const player = this.$refs.player;
      if (this.progressBar && player.buffered.length) {
        let buffered = player.buffered.end(player.buffered.length - 1);
        if (buffered >= 100) {
          buffered = 100;
        }
        this.progressBar.lastElementChild.style.transform = `translate3d(${-100 +
          buffered}%, 0, 0)`;
      } else {
        this.progressBar = document.querySelector("#progress");
      }
    },
    timeupdate(e) {
      const duration = this.song.duration;
      const currentTime = e.target.currentTime;
      setTimeout(() => {
        this.$store.dispatch("controller/currentTime", currentTime);
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
audio {
  display: none;
}
</style>


