<template>
  <div>
    <v-row style="margin-top:0; display: flex; justify-content: center;">
      <h1>欢迎来到Ray的博客!</h1>
    </v-row>
    <div style="height: 90vh; display: flex; justify-content: center; align-items: flex-end;">
      <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2022097208号-1</a>
    </div>
  </div>
</template>
<script>
  export default {
    head() {
      return {
        title: "主页"
      }
    }
  }
</script>
<style>
  body {
    min-height: 100vh;
  }
</style>