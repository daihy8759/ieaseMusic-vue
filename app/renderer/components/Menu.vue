<template>
    <div v-show="show">
        <div class="container" ref="container" tabIndex="-1">
            <div class="overlay" @click="close"/>
                <section class="body">
                    <img
                        alt="Close Menus"
                        class="close"
                        @click="close"
                        src="../assets/close.png" />
                    <div>
                        <div class="navs">
                            <p v-if="hasLogin">
                                <artist class="profile">
                                    <router-link class="clearfix" :to="userLink">
                                        <FadeImage :src="profile.avatarUrl" />
                                    </router-link>

                                    <div class="info">
                                        <p
                                            class="username"
                                            @click="close"
                                            :title="profile.nickname">
                                            <router-link :to="userLink">{{profile.nickname}}</router-link>
                                        </p>
                                        <a
                                            class="logout"
                                            href=""
                                            @click="doLogout">
                                            Logout
                                        </a>
                                    </div>
                                </artist>
                            </p>
                            <p v-else>
                                <a @click="goLogin">
                                    Sign in
                                </a>
                            </p>
                            <p>
                                <router-link @click="close" to="/">
                                    Home
                                </router-link>
                            </p>
                            <p>
                                <router-link @click="showSearch" to="search">
                                    Search
                                </router-link>
                            </p>
                            <p>
                                <router-link @click="close"
                                    to="/playlist/全部">
                                    Playlist
                                </router-link>
                            </p>
                            <p>
                                <router-link
                                    @click="close"
                                    to="/top">
                                    Top
                                </router-link>
                            </p>

                            <p>
                                <router-link
                                    @click="close"
                                    to="/fm">
                                    My FM
                                </router-link>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import FadeImage from "./FadeImage";
export default {
  components: {
    FadeImage
  },
  computed: {
    ...mapState({
      show: state => state.menu.show,
      hasLogin: state => state.me.hasLogin,
      profile: state => state.me.profile
    }),
    userLink() {
      return `/user/${this.profile.userId}`;
    }
  },
  methods: {
    goLogin() {
      this.close();
      this.$router.push("/login/0");
    },
    doLogout() {
      this.$store.dispatch("me/logout");
    },
    close() {
      this.$store.dispatch("menu/hide");
    },
    showSearch() {
      this.close();
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  outline: 0;
}
.body {
  top: 0;
  left: 0;
  width: 40vw;
  height: 100vh;
  z-index: 999;
  display: flex;
  position: fixed;
  background: #fff;
  box-shadow: 0 30px 80px 0 rgba(97, 45, 45, 0.25);
  font-family: HelveticaNeue-UltraLight;
  padding-left: 78px;
  flex-direction: column;
  justify-content: space-around;
}
.body a {
  color: #000;
}
.overlay {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  position: fixed;
  background: rgba(255, 255, 255, 0.3);
}
.close {
  top: 16px;
  left: 32px;
  height: 32px;
  cursor: pointer;
  position: absolute;
}
.navs a {
  cursor: pointer;
  position: relative;
  font-size: 20px;
  text-indent: 4px;
  letter-spacing: 4px;
}
.navs a:after {
  left: 0;
  width: 100px;
  bottom: 0;
  height: 1px;
  content: "";
  opacity: 0;
  position: absolute;
  transform: translateX(-160px) translateY(-11px);
  background: #000;
  transition: 0.2s ease-out;
}
.navs a:hover:after {
  width: 160px;
  opacity: 1;
  transform: translateX(-100px) translateY(-11px);
}
.profile {
  display: flex;
  margin-top: 24px;
  align-items: center;
  margin-bottom: 32px;
  justify-content: flex-start;
}
.profile img {
  width: 64px;
  height: 64px;
  margin-right: 20px;
  border-radius: 64px;
}
.profile .username a {
  display: inline-block;
  overflow: hidden;
  font-size: 24px;
  max-width: 200px;
  text-indent: 0;
  white-space: nowrap;
  margin-bottom: 4px;
  text-overflow: ellipsis;
  letter-spacing: 1px;
}
.profile .logout {
  font-size: 14px;
  letter-spacing: 2px;
}
.info-0-41 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.username {
  margin: 0;
  padding: 0;
}
.logout {
  display: inline-table;
  transition: 0.4s;
  text-indent: 4px;
  border-bottom: thin solid transparent;
  padding-bottom: 2px;
}
.logout:hover {
  border-bottom-color: #000;
}
.social a {
  color: #fff;
  width: 48px;
  height: 48px;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  transition: 0.2s;
  text-align: center;
  line-height: 48px;
  margin-right: 20px;
  border-radius: 48px;
  letter-spacing: 0;
}
.social a:hover {
  box-shadow: 0 1px 24px rgba(0, 0, 0, 0.24);
}
.social .twitter-0-46 {
  background: #55acee;
}
.social .github-0-45 {
  background: rgba(0, 0, 0, 0.7);
}
</style>


