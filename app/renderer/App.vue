<template>
  <div id="app">
    <AudioPlayer />
    <Lyrics />
    <Menu />
    <router-view></router-view>
  </div>
</template>

<script>
  import AudioPlayer from './components/AudioPlayer'
  import Lyrics from './components/Lyrics'
  import Menu from './components/Menu'
  export default {
    name: 'app',
    components: {
      AudioPlayer,
      Lyrics,
      Menu
    },
    mounted(){
      this.$store.dispatch("me/init");
    }
  }
</script>