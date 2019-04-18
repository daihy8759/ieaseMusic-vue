<template>
    <img
    ref="image"
    :src="src"
    :class="'fade fadein '+className"
    @load="handleLoad"
    @error="handleError" />
</template>

<script>
export default {
    props:{
        src: {
            type: String
        },
        className: {
            type: String
        },
        fallback: {
            default: 'https://source.unsplash.com/random'
        }
    },
    methods: {
        handleLoad(e) {
            e.target.classList.remove("fadein");
        },
        handleError(e) {
            e.target.src = this.fallback;
        }
    }
}
</script>
