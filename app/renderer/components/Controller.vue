<template>
    <div>
        <div class="container">
            <div
                class="bar"
                id="progress"
                @click="seek">
                <div class="playing" :data-time="currentTime" :style="transform"/>
                <div class="buffering" />
            </div>
            <section>
                <router-link to="" class="tooltip">
                    <ProgressImage :height="50" :width="50" :src="song.album.cover" />
                </router-link>
                <aside>
                <div class="info">
                    <p class="title">
                        <router-link to="test">{{song.name}}</router-link>
                    </p>
                    <p class="author">
                        <router-link :to="artist.link" v-for="(artist,index) in song.artists" :key="artist.id">
                          <template v-if="index > 0">
                            &nbsp;/&nbsp;
                          </template>
                          {{artist.name}}
                        </router-link>
                    </p>
                </div>
                <div class="action">
                    <span
                        class="highquality"
                        title="High Quality Music">
                        SQ
                    </span>
                    <span
                        class="text"
                        @click="showLyrics">
                        LRC
                    </span>
                    <span
                        class="text"
                        @click="showComments">
                        {{formatComments(comments)}} Comments
                    </span>
                    <i class="ion-ios-heart"></i>
                    <i class="ion-ios-shuffle-strong"></i>
                    <div class="controls">
                        <i class="ion-ios-rewind"></i>
                        <span class="toggle">
                            <i class="ion-ios-pause" @click="togglePause" v-show="playing"></i>
                            <i class="ion-ios-play" @click="togglePlay" v-show="!playing"></i>
                        </span>
                        <i class="ion-ios-fastforward" style="margin-right:0px" @click="nextSong"></i>
                    </div>
                </div>
                </aside>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState,mapGetters } from "vuex";
import { ipcRenderer } from 'electron';
import ProgressImage from "./ProgressImage.vue";
import helper from "../utils/helper";
import { from } from 'rxjs';
export default {
  components: {
    ProgressImage
  },
  data() {
    return {
      comments: 36760
    };
  },
  computed: {
    ...mapState({
      song: state => state.controller.song,
      playing: state => state.controller.playing,
    }),
    ...mapGetters('controller',{
      currentTime: 'currentTime',
      transform: 'transform'
    })
  },
  methods: {
    seek() {},
    showLyrics() {
      this.$store.dispatch("lyrics/show", true)
    },
    showComments() {
      
    },
    togglePause() {
      this.$store.dispatch("controller/toggle", false);
    },
    togglePlay() {
      this.$store.dispatch("controller/toggle", true);
    },
    nextSong() {
      this.$store.dispatch("controller/next");
    },
    formatComments(comments) {
      return helper.humanNumber(comments);
    }
  },
  mounted() {
    ipcRenderer.on('next', () => {
      this.$store.dispatch('controller/next')
    })
  }
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background: #fff;
  color: #000;
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  aside {
    display: flex;
    padding-left: 20px;
    padding-right: 32px;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    p {
      margin: 0;
      padding: 0;
    }
  }
}
.bar,
.bar .playing {
  left: 0;
  bottom: 50px;
  height: 2px;
  position: fixed;
}

.bar .playing {
  width: 100%;
  z-index: 1;
  background: linear-gradient(
    to right,
    #62efab 5%,
    #f2ea7d 15%,
    #f2ea7d 25%,
    #ff8797 35%,
    #ff8797 45%,
    #e1a4f4 55%,
    #e1a4f4 65%,
    #82fff4 75%,
    #82fff4 85%,
    #62efab 95%
  );
  transition: 0.2s ease-out;
  background-size: 200%;
  background-position: 0;
}

.bar .playing::after {
  right: 0;
  color: #fff;
  bottom: 2px;
  content: attr(data-time);
  display: inline-block;
  padding: 10px 6px;
  position: absolute;
  font-size: 12px;
  transition: 0.2s;
  background: #000;
  white-space: nowrap;
  font-family: Roboto;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  a {
    display: inline-block;
    padding-bottom: 2px;
    border-bottom: thin solid rgba(255, 255, 255, 0);
    transition: 0.2s;
    :hover {
      border-bottom-color: #000;
    }
  }
}
.title {
  margin-bottom: 3px !important;
  a {
    padding-bottom: 1px;
    max-width: 175px;
    font-size: 13px;
    color: #081600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.text {
  cursor: pointer;
  display: inline-block;
  padding: 2px 4px;
  font-size: 11px;
  transform: translateY(-2px);
  border-top: thin solid #333;
  transition: 0.2s;
  margin-right: 20px;
  border-bottom: thin solid #333;
  text-transform: uppercase;
}
.author {
  margin-top: 2px;
  font-size: 11px;
  max-width: 175px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  a {
    color: #4a4a4a;
    :after {
      content: "/";
      display: inline-block;
      margin: 0 5px;
    }
  }
}
.highquality {
  zoom: 0.8px;
  color: #ea4c89;
  border: thin solid #ea4c89;
  display: inline-block;
  text-shadow: 0 0 24px #ea4c89;
  padding: 2px 6px;
  margin-right: 30px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: Roboto;
  font-size: 12px;
  transform: translateY(-3px);
  zoom: 0.8;
}
.controls {
  color: #000;
  display: inline-block;
  margin-left: 16px;
}
.action i {
  width: 24px;
  color: #4a4a4a;
  height: 24px;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  transition: 0.2s;
  line-height: 24px;
  margin-right: 16px;
}
</style>