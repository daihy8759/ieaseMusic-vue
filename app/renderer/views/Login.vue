<template>
    <div>
        <div class="container">
            <FadeImage
                className="background"
                src="https://source.unsplash.com/random" />

            <router-link
                class="back"
                to="/">
                <i class="ion-android-arrow-back" />
                Discover music
            </router-link>

            <header>
                <h1>Sign in</h1>
                <p>Hello there! Sign in and start playing with ieaseMusic</p>
            </header>

            <section>
                <input
                    placeholder="Your phone number"
                    v-model="phone"
                    type="text" />
                <input
                    @keypress="handleEnter"
                    placeholder="Password"
                    v-model="password"
                    type="password" />

                <p :class="{error:true,show:showError}" ref="error">
                    Invalid username or password, Please try again.
                </p>

                <button
                    :class="{logining: logining}"
                    :disabled="logining"
                    @click="doLogin">
                    <span>
                        {{logining ? 'Logining...' : 'Login'}}
                    </span>
                </button>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import FadeImage from '../components/FadeImage'
export default {
    components: {
        FadeImage
    },
    computed: {
      ...mapState({
        logining: state => state.me.logining
      })
    },
    data() {
        return {
            showError: false,
            phone: '',
            password: ''
        }
    },
    methods:{
        doLogin: async function() {
          const res = await this.$store.dispatch("me/login", {
            phone: this.phone,
            password: this.password
          })
          if(res.code === 200){
            this.$router.push("/")
          }
        },
        handleEnter() {

        }
    }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  text-align: center;
  align-items: center;
  padding-top: 8vh;
  flex-direction: column;
  justify-content: space-between;
}
.container header, .container section {
  z-index: 1;
}
.container section {
  margin-top: 5vh;
}
.container h1 {
  color: #ea4c89;
  font-size: 44px;
  font-family: HelveticaNeue-UltraLight;
  font-weight: lighter;
  word-spacing: 6px;
  letter-spacing: 2px;
}
.container p {
  color: #000;
  font-size: 12px;
  max-width: 300px;
  line-height: 24px;
  word-spacing: 2px;
}
.container input {
  color: #000;
  width: 270px;
  height: 36px;
  border: 0;
  display: block;
  outline: 0;
  font-size: 14px;
  background: none;
  text-align: center;
  transition: .2s;
  line-height: 36px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 32px;
}
.container input:focus {
  border-bottom-color: #ff6470;
}
.container button {
  width: 120px;
  color: #fff;
  height: 40px;
  cursor: pointer;
  border: none;
  outline: 0;
  position: relative;
  overflow: hidden;
  font-size: 14px;
  transition: .4s;
  font-weight: 300;
  line-height: 40px;
  font-family: Helvetica Neue;
  border-radius: 1px;
  letter-spacing: 1px;
  background-image: linear-gradient(to right, #fd746c, #ff9068);
}
.container a {
  color: #000;
}
.container:before {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  content: "";
  display: block;
  position: absolute;
  background: rgba(255, 255, 255, .9);
}
.container button:before {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  transition: .4s;
  background-image: linear-gradient(to right, #c2e59c, #64b3f4);
}
.container button:hover, .container button.logining {
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, .5);
}
.container button:hover:before {
  opacity: 1;
}
.container button span {
  z-index: 1;
  position: relative;
}
.container p.error {
  color: #e0245e;
}
.background {
  top: 50%;
  left: 50%;
  width: 100vw;
  display: block;
  z-index: -1;
  position: absolute;
  transform: translate(-50%, -50%);
}
.back {
  top: 16px;
  right: 32px;
  height: 24px;
  display: inline-block;
  z-index: 9;
  position: fixed;
  font-size: 12px;
  transition: .2s;
  line-height: 24px;
}
.back i {
  display: inline-block;
  font-size: 20px;
  transform: translateY(3px);
  margin-right: 8px;
}
.back:hover {
  color: #6496f0;
}
.error {
  opacity: 0;
  visibility: hidden;
  transition: .2s;
}
.show {
  opacity: 1;
  visibility: visible;
}
.logining {
  opacity: 0.5;
}
</style>


