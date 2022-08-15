<template>
  <div>
    <div class="main-screen" ref="mainWrapper">
      <v-img :lazy-src="mainImgLazy" :height="screen.height" :width="screen.width" :src="mainImg"
        style="position: absolute; z-index: 1"></v-img>
      <v-scroll-y-reverse-transition>
        <div class="text-center main" ref="main">
          <h1 class="mtitle mb-10">JerryMC</h1>
          <h5 class="mdescription mb-6">
            JerryMC (简称JMC) 是一个养老的生存服务器, 玩家活跃, 等待你的加入哦~
          </h5>
          <div class="d-flex mb-6 btn-group buttons">
            <div>
              <v-btn v-if="isLogin == false" block @click="goto('/users/login')" id="login">
                <v-icon>mdi-account-circle-outline</v-icon> 登录/注册
              </v-btn>
              <v-btn v-if="isLogin == true" block @click="goto('/users/login')" id="login">
                <v-icon>mdi-account-box-multiple-outline</v-icon> 切换账号
              </v-btn>
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-btn block dark color="green lighten-1" @click="goto('/whitelist/request')">
                <v-icon>mdi-text-box-check-outline</v-icon> 申请白名单
              </v-btn>
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-btn block color="blue lighten-1" :loading="loading.qq" @click="
                openNewBlank(
                  'https://qm.qq.com/cgi-bin/qm/qr?k=cCRVoxnZBl6T2vVpSHRnUk1f3RR3RJH9'
                )
              ">
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
  // https://s2.loli.net/2022/08/11/gdL2MxBvorJehDZ.png
  name: 'IndexPage',
  data() {
    var mainImg = this.$_.sample(['0.png', '1.png']);
    var mainImgLazyMap = {
      '0.png': 'https://s2.loli.net/2022/08/10/sQG8KqyVhUzn13I.png',
      '1.png': 'https://s2.loli.net/2022/08/11/gdL2MxBvorJehDZ.png',
    };
    return {
      screen: {
        width: 1000,
        height: 1000,
      },
      isLogin: false,
      accoutInfo: {},
      show: false,
      mainMarginTop: 500,
      mainImg: '/mainPageImgs/' + mainImg,
      mainImgLazy: mainImgLazyMap[mainImg],
      loading: {
        qq: false,
      },
    };
  },
  mounted() {
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight - 64;
    var that = this;
    setTimeout(async () => {
      var token = that.token;
      if (!token) console.log('未登录');
      if (token) {
        var res = await that.$axios.$post('/api/users/online', { token });
        if (!res.success)
          return that.$toast.error('登录状态获取失败!请重新登录');
        that.isLogin = true;
        that.accoutInfo = res.message.data;
        console.log(that.accoutInfo);
      }
    }, this.$nextTick);
    setTimeout(() => {
      that.show = true;
    }, 700);
  },
  computed: {
    token() {
      var token = this.$store.state.userstore.token;
      return token;
    },
  },
  methods: {
    openNewBlank(url) {
      var that = this;
      this.loading.qq = true;
      window.open(url, '_blank');
      setTimeout(() => {
        that.loading.qq = false;
      }, 200);
    },
    goto(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style>
.buttons {
  width: 50vw;
}

.main {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  margin-top: 350px;
  color: #fff3e0;
}

.main .mtitle {
  font-family: 'Roboto', sans-serif !important;
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
</style>
.
