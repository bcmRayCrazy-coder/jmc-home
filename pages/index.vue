<template>
  <div>
    <div class="main-screen">
      <v-img lazy-src="https://s2.loli.net/2022/08/10/sQG8KqyVhUzn13I.png" :max-height="screen.height"
        :max-width="screen.width" src="/main_page_img.png" style="position:absolute;z-index: 1;"></v-img>
      <v-scroll-y-reverse-transition>
        <div v-if="show" class="text-center main" ref="main">
          <h1 class="mtitle mb-10">JerryMc</h1>
          <h5 class="mdescription mb-6">JerryMc (简称jmc) 是一个养老的生存服务器, 玩家活跃, 等待你的加入哦~</h5>
          <div class="d-flex justify-space-around mb-6 btn-group">
            <div>
              <v-btn block>
                <v-icon>mdi-account-circle-outline</v-icon> 登录/注册
              </v-btn>
            </div>
            <div>
              <v-btn block dark color="green lighten-1">
                <v-icon>mdi-text-box-check-outline</v-icon> 申请白名单
              </v-btn>
            </div>
            <div>
              <v-btn block outlined color="blue lighten-1" :loading="loading.qq"
                @click="openNewBlank('https://qm.qq.com/cgi-bin/qm/qr?k=cCRVoxnZBl6T2vVpSHRnUk1f3RR3RJH9')">
                <v-icon>mdi-qqchat</v-icon> 加入QQ群
              </v-btn>
            </div>
          </div>
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
      mainMarginTop: 500,
      loading: {
        qq: false
      }
    }
  },
  mounted() {
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;

    var that = this;
    setTimeout(() => {
      that.show = true;
    }, 700);
  },
  methods: {
    openNewBlank(url) {
      var that = this;
      this.loading.qq = true;
      window.open(url, '_blank');
      setTimeout(() => {
        that.loading.qq = false;
      }, 200);
    }
  }
}
</script>
<style>
.main {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  margin-top: 350px;
  color: #FFF3E0;
}

.main .mtitle {
  font-family: "Roboto", sans-serif !important;
  font-weight: 500;
  font-size: 100px;
  line-height: 2rem;
  letter-spacing: 0.0125em !important;
  user-select: none;
}

.main .btn-group {
  margin-left: 25%;
  margin-right: 25%;
}

.main .btn-group div {
  width: 25%;
}
</style>.