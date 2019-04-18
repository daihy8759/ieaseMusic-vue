<template>
<div>
    <div class="container">
        <Loader :show="loading" />
        <Header :color="headerIconColor" :showBack="true"/>
        <section>
            <div class="hero" :style="'background:'+heroBackgroundColor">
                <ProgressImage :height="260" :width="260" :src="meta.cover" />
                <aside class="info">
                    <div class="text">
                        <p class="title">
                            <span>
                                {{meta.name}}
                            </span>
                        </p>
                        <p class="author">
                            <span>
                                <router-link :to="author.link" v-for=" (author,index) in meta.author" :key="index">
                                    {{author.name}}
                                </router-link>
                            </span>
                        </p>
                        <p class="subtitle" style="margin-top:20px;">
                            <span>
                                {{company}}
                            </span>
                        </p>
                        <div class="play">
                          <i class="ion-ios-play"></i>
                        </div>
                    </div>
                </aside>

                <div class="recommend">
                    <router-link :to="item.link" v-for=" (item,index) in recommend" :key="index">
                        <ProgressImage :height="260" :width="260" :src="item.cover" />
                    </router-link>
                </div>
            </div>
            <div class="body">
                <div class="people">
                    <div class="nothing" style="height:100%">
                        Nothing ...
                    </div>
                </div>
                <div class="list">
                    <header>
                        <span>
                            Track / SEARCH
                        </span>

                        <span>
                            Time
                        </span>
                    </header>
                    <ul ref="list">
                        <li v-for="(song,index) in songs" :key="song.id" :class="{active: isPlaying(song.id)}"
                          @dblclick="togglePlay(song.id)">
                            <i class="ion-ios-play" @click="play(song.id)" v-show="!isPlaying(song.id)"/>
                            <i class="ion-ios-pause" @click="togglePause" v-show="isPlaying(song.id)"/>
                            <span class="index">
                                {{index}}
                            </span>
                            <span
                                class="name"
                                :title="song.name">
                                {{song.name}}
                            </span>
                            <span class="time">
                                {{song.duration | time}}
                            </span>
                         </li>
                    </ul>
                </div>
            </div>
            <Controller />
        </section>
    </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import Loader from "../components/Loader.vue";
import Header from "../components/Header";
import Controller from "../components/Controller.vue";
import ProgressImage from "../components/ProgressImage";
import helper from "../utils/helper";

export default {
  components: {
    Loader,
    Header,
    ProgressImage,
    Controller
  },
  computed: {
    ...mapState({
      loading: state => state.player.loading,
      recommend: state => state.player.recommend,
      meta: state => state.player.meta,
      songs: state => state.player.songs,
      song: state => state.controller.song,
      playing: state => state.controller.playing
    }),
    ...mapGetters("player", {
      headerIconColor: "headerIconColor",
      heroBackgroundColor: "heroBackgroundColor",
      company: "company"
    })
  },
  filters: {
      time(duration) {
          return helper.getTime(duration)
      }
  },
  methods: {
      load(){
        const params = this.$route.params;
        this.$store.dispatch("player/startLoading")
        this.$store.dispatch("player/getDetail", {
          type: parseInt(params.type),
          id: params.id
        }).then(() => {
          this.$store.dispatch("player/closeLoading")
        })
      },
      togglePlay(songid) {
        if(this.isPlaying(songid)){
          this.togglePause()
        } else {
          this.play(songid)
        }
      },
      isPlaying(songid) {
        return this.song.id === songid;
      },
      togglePause() {
        this.$store.dispatch("controller/toggle", false)
      },
      play(songid) {
        this.$store.dispatch('controller/setup', Object.assign({},this.meta,{
          songs: this.songs
        }))
        this.$store.dispatch('controller/play', songid.toString())
      }
  },
  mounted() {
      this.load()
  }
};
</script>

<style scoped>
.container {
  background: #fff;
}
.hero {
  height: 260px;
  display: flex;
  position: relative;
  transition: 0.4s;
  align-items: center;
  justify-content: space-between;
}
.cover {
  height: 260px;
  width: 260px;
}
.info {
  flex: 1;
  margin-bottom: 60px;
}
.text {
  display: inline-block;
}
.text .title span,
.text .author span,
.text .subtitle span {
  padding: 10px 20px;
  margin: 0;
  background: #000;
  color: #fff;
}
.title {
  font-size: 20px;
}
.title span {
  display: -webkit-box;
  max-width: 280px;
  line-height: 30px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.author a {
  display: inline-block;
  color: #fff;
  padding-bottom: 2px;
  border-bottom: thin solid rgba(255, 255, 255, 0);
  transition: 0.2s;
}
.author a:hover {
  border-bottom-color: #fff;
}
.author a:after {
  content: "/";
  display: inline-block;
  margin: 0 5px;
}
.author a:last-child::after {
  content: "none";
}
.subtitle {
  font-size: 12px;
  text-transform: uppercase;
}
.play {
  right: 32px;
  width: 44px;
  color: #654b58;
  cursor: pointer;
  height: 44px;
  bottom: 38px;
  z-index: 9;
  position: absolute;
  font-size: 20px;
  background: #e0daeb;
  text-align: center;
  box-shadow: 0 2px 4px 9px #9687a2;
  line-height: 44px;
  border-radius: 44px;
}
.recommend {
  right: 0;
  bottom: 0;
  height: 60px;
  position: absolute;
}
.body {
  display: flex;
  height: calc(100vh - 260px - 50px);
}
.people {
  display: flex;
  height: calc(100vh - 50px - 260px);
  width: 240px;
  justify-content: space-around;
  flex-direction: column;
  padding-left: 20px;
}
.people img {
  width: 32px;
  height: 32px;
  margin-right: 16px;
  margin-bottom: 4px;
  border-radius: 32px;
}
.people h3 {
  margin-top: 0px;
  margin-bottom: 8px;
  font-size: 13px;
  font-family: Roboto;
}
.list {
  flex: 1;
  font-family: "Roboto";
  color: #a2a2a2;
}
.list header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  line-height: 40px;
  border-bottom: thin solid #a2a2a2;
}
.list header span {
  width: 60px;
  border-bottom: 2px solid #000;
  font-family: "Roboto";
  text-transform: uppercase;
  letter-spacing: 1;
}
.list header span:first-child {
  width: 120px;
  text-align: right;
  transition: 0.2s;
  cursor: pointer;
}
.list header span:last-child {
  text-align: left;
}
.list ul {
  height: calc(100vh - 260px - 90px);
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  overflow-y: auto;
}
.list li {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 32px;
  line-height: 32px;
  cursor: pointer;
  transition: 0.2s;
}
.list li i {
  position: absolute;
  left: -32px;
  top: 0px;
  display: inline-block;
  height: 32px;
  width: 32px;
  color: #fff;
  text-align: center;
  background: linear-gradient(to bottom, #1cd8d2, #93edc7);
  box-shadow: 0 0 24px 0 #48cfad;
}
.list li:not(.active):hover {
  transform: translateX(32px);
}
.list li.active i {
  left: 0;
  width: 60px;
  background: linear-gradient(to left, #ff512f, #dd2476);
  box-shadow: 0 0 24px 0 #ea4c89;
}
.index {
  display: inline-block;
  width: 60px;
  text-align: center;
}
.time {
  display: inline-block;
  width: 60px;
  font-size: 12px;
}
.name {
  flex: 0.8;
  font-size: 13px;
  color: #654b58;
  letter-spacing: 0.5px;
  word-spacing: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 288px;
}
.nothing {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: HelveticaNeue-UltraLight;
  font-size: 24px;
  letter-spacing: 1px;
  word-spacing: 3px;
  color: #000;
}
</style>


