<template>
    <div>
        <figure class="container loaded" :style="style">
            <img class="main" :src="src" :style="style"/>
            <div class="thumb" :style="{paddingBottom: (height / width) * 100 || 0}">
                <img class="loaded" :style="style"/>
            </div>
        </figure>
    </div>
</template>

<script>
    export default {
        props: {
            width:{
                type: Number,
            },
            height: {
                type: Number,
            },
            src: {
                type: String,
            }
        },
        data(){
            return {
                style: {
                    width: this.width+"px",
                    height: this.height+"px"
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .container{
        position: relative;
        padding: 0;
        margin: 0;
        background: #ddd;
        overflow: hidden;
        img{
            height: auto;
            pointer-events: none;
        }
    }
    .main{
        display: block;
        opacity: 0;
        transition: opacity 0.5s ease-out;
    }
    .thumb{
        img{
            position: absolute;
            top: 0;
            left: 0;
            transition: opacity 0.3s ease-out;
            filter: blur(30px);
        }
        img.loaded{
            opacity: 1;
        }
    }
    .loaded{
        .main{
            opacity: 1;
        }
        .thumb img{
            opacity: 0
        }
    }
</style>