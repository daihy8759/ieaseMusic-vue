<template>
    <div class="container" :style="{ 'background': background}">
        <Loader :show="loading" text="Please Wait ..." />
        <Header />
        <main>
            <div>
                <svg class="svg">
                    <defs>
                        <pattern id="mask" patternUnits="userSpaceOnUse" height="600" width="600">
                            <image xmlns:xlink="http://www.w3.org/1999/xlink" x="100px" y="-100px" xlink:href="../assets/bgcolorful.jpg" width="600" height="600"></image>
                        </pattern>
                    </defs>
                    <text class="welcome" text-anchor="middle" x="50%" y="0" dy="100px">Welcome</text>
                    <text class="description" text-anchor="middle" x="50%" y="0" dy="130px">ieaseMusic is Made by 💖</text>
                </svg>
            </div>
            <div style="margin-top:20px">
                <happy-scroll hide-horizontal hide-vertical resize style="height:180px;overflow-y:hidden">
                    <div class="item-wrap">
                        <div @focus="playlistFocus" class="clearfix item" v-for="item in playlist" :key="item.id">
                            <router-link :to="item.link" :class="{ clearfix: true, playing: isPlaying(item) }">
                                <img :src="item.cover" />
                                <div class="info">
                                    <span class="subtitle">
                                        {{formatSubtitle(item)}}
                                    </span>
                                    <div class="title">
                                        {{item.name}}
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                 </happy-scroll>
            </div>
            <Controller />
        </main>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import colors from "../utils/colors";
import helper from "../utils/helper";
import Loader from "../components/Loader.vue";
import Header from "../components/Header.vue";
import Controller from "../components/Controller.vue";

export default {
  name: "home-page",
  components: {
    Header,
    Loader,
    Controller
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      playlist: state => state.home.playlist,
      currentPlay: state => state.controller.playlist,
      loading: state => state.home.loading
    }),
    background: () => {
      return colors.randomGradient();
    }
  },
  methods: {
    formatSubtitle(item) {
      return item.type === 0
        ? `${helper.humanNumber(item.played)} PLAYED`
        : `${item.size} TRACKS`;
    },
    playlistFocus(e) {
      console.log(e)
    },
    isPlaying(item) {
      if (item.id === this.currentPlay.id) {
        return true;
      }
      return false;
    },
    init: async function() {
      if(!this.currentPlay.id){
        await this.$store.dispatch("home/getPersonalized");
        this.$store.dispatch("controller/setup", this.playlist[0]);
        await this.$store.dispatch("controller/play");
      }
    }
  },
  mounted() {
    this.init()
  }
};
</script>

<style scoped lang="less">
.container {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.container main {
  background: linear-gradient(to top, transparent, rgba(255, 255, 255, 1));
  height: 100vh;
}
.svg {
  width: 100%;
  height: 180px;
}
.welcome {
  font-family: HelveticaNeue-UltraLight;
  font-size: 54px;
  font-weight: lighter;
  fill: url(#mask);
  letter-spacing: 4.5px;
  text-shadow: 1px 1px 0 rgba(227, 218, 219, 1),
    3px 3px 0 rgba(227, 218, 219, 0.9), 5px 5px 0 rgba(227, 218, 219, 0.8),
    7px 7px 0 rgba(227, 218, 219, 0.7), 9px 9px 0 rgba(227, 218, 219, 0.6),
    11px 11px 0 rgba(227, 218, 219, 0.5), 13px 13px 0 rgba(227, 218, 219, 0.4),
    15px 15px 0 rgba(227, 218, 219, 0.3), 17px 17px 0 rgba(227, 218, 219, 0.2),
    19px 19px 0 rgba(227, 218, 219, 0.1), 21px 21px 0 rgba(227, 218, 219, 0.08),
    22px 22px 0 rgba(227, 218, 219, 0.07);
}
.description {
  font-family: HelveticaNeue-UltraLight;
  font-weight: lighter;
  font-size: 14px;
  fill: "url(#mask)";
  letter-spacing: 1px;
  word-spacing: 3px;
  text-shadow: 1px 1px 0 rgba(227, 218, 219, 1),
    3px 3px 0 rgba(227, 218, 219, 0.9), 5px 5px 0 rgba(227, 218, 219, 0.8),
    7px 7px 0 rgba(227, 218, 219, 0.7), 9px 9px 0 rgba(227, 218, 219, 0.6),
    11px 11px 0 rgba(227, 218, 219, 0.5), 13px 13px 0 rgba(227, 218, 219, 0.4),
    15px 15px 0 rgba(227, 218, 219, 0.3), 17px 17px 0 rgba(227, 218, 219, 0.2),
    19px 19px 0 rgba(227, 218, 219, 0.1), 21px 21px 0 rgba(227, 218, 219, 0.08),
    22px 22px 0 rgba(227, 218, 219, 0.07);
}
.item-wrap {
  transform: translate3d(0px, 0px, 0px);
  position: absolute;
  // height: 100%;
  display: inline-flex;
  height: 200px;
  padding-top: 25px;
}
.item {
  position: relative;
  display: inline-block;
  min-width: 130px;
  text-align: right;
  cursor: pointer;

  img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    pointer-events: none;
    transition: 0.4s;
  }
  .playing,
  .item:hover {
    img {
      box-shadow: 0 20px 30px 4px rgba(97, 45, 45, 0.5);
      transform: translateY(-24px);
    }
    .info {
      opacity: 1;
      visibility: visible;
      transform: translateY(-8px);
    }
    .mask {
      transform: translateY(-24px);
      :before,
      :after {
        opacity: 1;
      }
    }
  }
}
.info {
  position: absolute;
  top: 100px;
  right: 0;
  text-align: right;
  color: #fff;
  opacity: 0;
  transition: 1s;
  transform: translateY(-16px);
}
.subtitle {
  display: inline-block;
  padding: 4px 8px;
  font-family: Roboto;
  font-weight: lighter;
  font-size: 11px;
  background: #000;
}
.title {
  display: -webkit-box;
  padding: 6px 8px;
  background: #000;
  line-height: 16px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.4s;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>