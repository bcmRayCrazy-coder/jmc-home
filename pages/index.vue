<template>
  <div>
    <div class="main-screen">
      <v-img lazy-src="https://s2.loli.net/2022/08/10/sQG8KqyVhUzn13I.png" :max-height="screen.height"
        :max-width="screen.width" src="/main_page_img.png" style="position:absolute;z-index: 1;"></v-img>
      <v-scroll-y-reverse-transition>
        <div v-if="show" class="text-center main" :style="(()=>{return `margin-top:${mainMarginTop}}px`})()">
          <h1>欢迎来到 JerryMc</h1>
        </div>
      </v-scroll-y-reverse-transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      screen: {
        width: 1000,
        height: 1000
      },
      show: false,
      mainMarginTop:500
    }
  },
  mounted() {
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;

    var that = this;
    setTimeout(() => {
      that.show = true;
    }, 700);
  }
}
</script>
<style>
.main {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
}
</style>.