<template>
    <div>
        <header class="container">
            <div>
                <i v-show="showBack"
                    class="ion-android-arrow-back"
                    @click="goBack"
                    :style="'color: '+color" />
            </div>
            <div>
                <i class="ion-stats-bars" @click="showPlaying" :style="'color: '+color"/>
                <i class="ion-android-more-vertical" :style="'color: '+color" @click="showMenu"/>
                <i class="ion-ios-arrow-down" @click="minimize" :style="'color: '+color" />
            </div>
        </header>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron'

export default {
  props: {
    showBack: false,
    color: {
      type: String
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    showMenu() {
      this.$store.dispatch("menu/show");
    },
    showPlaying() {},
    subscribe() {},
    minimize() {
      ipcRenderer.send("minimize");
    }
  }
};
</script>
<style scoped>
.container {
  position: absolute;
  left: 16px;
  top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 32px);
  height: 32px;
  line-height: 32px;
  z-index: 99;
}
.container i {
  display: inline-block;
  width: 32px;
  height: 32px;
  line-height: 32px;
  margin-right: 4px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}
.container i:last-child {
  margin-right: 0;
}
</style>