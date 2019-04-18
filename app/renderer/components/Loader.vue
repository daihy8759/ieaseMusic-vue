<template>
   <div v-show="show" class="container">
        <span>{{textShow}}</span>
    </div> 
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                // required: true
            },
            show: {
                type: Boolean,
                // required: true,
                default: false
            },
        },
        data() {
            return {
                randomText: [
                    '时间就是金钱我的朋友',
                    '是办正事，还是找乐子？',
                    '尘归尘，土归土。 ',
                    '我还不能施放这个法术',
                    '能量不足',
                    '我需要更多的怒气值',
                    '说得好！但这毫无意义。',
                    '我很好奇，真的是正义驱使你们吗？',
                    '狡诈的联盟狗 ',
                    'lok tar! org! ',
                    '自诩正义的圣光终于来了？我是不是该丢下霜之哀伤 恳求您的宽恕呢？',
                    '你总是饿，所以我们才这么胖！',
                    '下次我请',
                    '皇帝之怒,响彻群山',
                    '火墙火墙火墙火墙火墙火墙火墙火墙火墙',
                    '换坦嘲讽',
                    '炸弹快躲',
                    '你的护甲毫无意义，你的信仰一文不值！',
                    '这个按钮是干什么用的？',
                    '你不能拿走我的蜡烛！',
                    '复活吧，我的勇士！',
                    '为你而战，我的女士！ ',
                    'You will learn why im king and you were just little more than persons！',
                    '快跑啊，小姑娘～快跑！',
                    '赞吉尔没有朋友，赞吉尔自己造朋友……',
                    '指挥官～～我全听你的，指挥官～～',
                    'My son, no kind rules forever...... ',
                    '蠢货！你别想控制我！',
                    'V 站上都是基佬',
                    'Life is short, use Python3',
                ]
            }
        },
        computed: {
            textShow: function () {
                const randomText = this.randomText;
                return this.text || randomText[Math.floor(Math.random() * randomText.length)];
            }
        }
    }
</script>
<style scoped>
    .container{
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        width: 100vw;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background: white;
        font-family: HelveticaNeue-UltraLight;
        font-size: 24px;
        opacity: 0;
        visibility: hidden;
        transition: .2s;
        opacity: 1;
        visibility: visible;
        z-index: 1000;
    }
    .container:before{
        content: url(../assets/loading.gif);
        position: absolute;
        top: 40%;
        left: 50%;
        display: block;
        transform: translateX(-50%);
    }
    .container span {
        margin-top: 8%;
        max-width: 60vw;
        text-align: center;
        line-height: 32px;
        color: #ea4c89;
    }
</style>