<template>
    <div>
        <div class="container">
            <ProgressImage :width="imageProps.width" :height="imageProps.height" :src="imageSrc"/>
            <header>
                <i class="ion-ios-heart" style="cursor:pointer"></i>
                <span
                    class="highquality"
                    title="High Quality Music">
                    SQ
                </span>
            </header>
            <section>
                <p>
                    <span>
                      1  Comments
                    </span>
                </p>
                <p class="active">
                    <span>
                      Lyrics
                    </span>
                </p>
            </section>
            <footer>
                <h3>{{song.name}}</h3>
                <p class="author">
                    <router-link :to="artist.link" v-for="artist in song.artists" :key="artist.id">
                        {{artist.name}}
                    </router-link>
                </p>
            </footer>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import ProgressImage from "./ProgressImage";
export default {
  components: {
    ProgressImage
  },
  data(){
    return {
      imageProps: {
        width: document.body.clientHeight,
        height: document.body.clientHeight
      }
    }
  },
  computed: {
    ...mapState({
      song: state => state.controller.song
    }),
    imageSrc() {
      return  this.song.album.cover
          ? this.song.album.cover.replace(/100y100$/, "500y500")
          : "";
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 40vw;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
}
.container header {
  padding: 24px;
  font-size: 24px;
  font-family: HelveticaNeue-UltraLight;
  justify-content: space-between;
}
.container footer {
  padding: 12px 24px;
  position: relative;
}
.container p {
  margin: 0;
  padding: 0;
}
.container:before {
  left: 0;
  width: 100%;
  bottom: 0;
  height: 20vh;
  content: "";
  display: block;
  position: absolute;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(216, 216, 216, 0.6)
  );
}
.container section p {
  color: #fff;
}
.container section span {
  color: #fff;
  cursor: pointer;
  display: inline-block;
  padding: 12px 24px;
  font-size: 12px;
  background: #000;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.container figure::after {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  display: block;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
}
.liked {
  color: #e0245e;
  text-shadow: 0 0 24px #e0245e;
}
.author {
  overflow: hidden;
  font-size: 11px;
  max-width: 400px;
  margin-top: 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.author a {
  color: #4a4a4a;
  display: inline-block;
  transition: 0.2s;
  border-bottom: thin solid rgba(255, 255, 255, 0);
  padding-bottom: 2px;
}
.author a:last-child:after {
  content: none;
}
.author a:after {
  margin: 0 5px;
  content: "/";
  display: inline-block;
}
.author a:hover {
  border-bottom-color: #000;
}
.highquality {
  zoom: 0.8;
  color: #fff;
  display: inline-block;
  padding: 6px 8px;
  transform: translateY(-6px);
  font-size: 12px;
  background: #ea4c89;
  box-shadow: 0 0 24px #ea4c89;
  font-family: Roboto;
  margin-left: 30px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.active span {
  color: #ea4c89 !important;
  font-size: 18px !important;
}
.container footer h3 {
  font-size: 24px;
  font-family: "HelveticaNeue-UltraLight";
  font-weight: lighter;
  word-spacing: 2px;
  border-bottom: thin solid white;
  padding-bottom: 4px;
  letter-spacing: 1px;
}
.container /deep/ figure {
  top: 0;
  left: 0;
  z-index: -1;
  position: absolute;
}
</style>

