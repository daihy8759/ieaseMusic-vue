<template>
    <div v-show="show">
        <div class="container">
            <img
                alt="close"
                class="close"
                src="../assets/close.png" @click="close"/>
            <Hero />
            <aside
              class="lyrics"
              id="lyrics">
                    <ProgressImage :height="imageProps.height" :width="imageProps.width" :src="imageSrc"/>

                    <section>
                        <div style="position:relative;padding-top:10vh;padding-bottom:14vh">
                          <p v-for="(value,key) in lyric"
                              :data-times="key"
                              :key="key">
                              <span>
                                 {{value}}
                              </span>
                          </p>
                        </div>
                    </section>
                </aside>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import ProgressImage from './ProgressImage'
import Hero from './Hero'
export default {
    components: {
      ProgressImage,
      Hero
    },
    data(){
      return {
        imageProps: {
          height: document.body.clientHeight,
          width: document.body.clientHeight
        }
      }
    },
    computed:{
        ...mapState({
            show: state => state.lyrics.show,
            lyric: state => state.lyrics.lyric,
            song: state => state.controller.song,
        }),
        imageSrc() {
          return this.song.album.cover ? this.song.album.cover.replace(/\?.*$/, ''): ''
        }
    },
    methods: {
      close(){
        this.$store.dispatch("lyrics/hide");
      }
    }
}
</script>

<style lang="less" scoped>
.container {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 100;
  position: fixed;
  background-color: white;
}
.container h3 {
  font-size: 24px;
  font-family: HelveticaNeue-UltraLight;
  font-weight: lighter;
  word-spacing: 2px;
  border-bottom: thin solid white;
  padding-bottom: 4px;
  letter-spacing: 1px;
}
.close {
  top: 16px;
  right: 16px;
  height: 32px;
  cursor: pointer;
  z-index: 9;
  position: absolute;
}
.lyrics {
  width: 60vw;
  position: relative;
  font-size: 16px;
  text-align: center;
  font-weight: lighter;
  line-height: 36px;
  word-spacing: 1px;
}
.lyrics section {
  top: 0;
  width: 60vw;
  height: 100vh;
  position: absolute;
  overflow: hidden;
  overflow-y: auto;
}
.lyrics [playing] span {
  color: #48cfad;
  display: inline-block;
  font-size: 24px;
  border-bottom: thin solid #48cfad;
  padding-bottom: 4px;
}
.lyrics figure > img {
  height: 100vh;
}
.lyrics section:before {
  top: 0;
  left: 40vw;
  width: 60vw;
  height: 100vh;
  content: "";
  display: block;
  position: fixed;
  background: rgba(0, 0, 0, .3);
}
.placeholder {
  color: #fff;
  font-size: 32px;
  text-align: center;
  padding-top: 20vh;
  font-family: HelveticaNeue-UltraLight;
  word-spacing: 3px;
  letter-spacing: 1px;
}
</style>
<style>
.lyrics figure {
  filter: blur(40px);
}
</style>



