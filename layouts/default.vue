<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <div class="text-center mr-5">
          <div class="text-h6">JerryMC</div>
        </div>

        <v-btn
          v-for="link in links"
          :key="link"
          @click="$router.push(link.to)"
          text
        >
          {{ link.text }}
        </v-btn>
        <v-btn
          v-if="this.adminLevel > 0"
          key="1"
          @click="$router.push('/tools/user')"
          text
        >
          用户管理
        </v-btn>

        <v-spacer></v-spacer>

        <div class="text-center">
          <v-chip
            class="ma-1"
            color="indigo"
            text-color="white"
            @click="$router.push('/users/self')"
          >
            <v-avatar class="mr-2" color="grey darken-1" size="24"></v-avatar>
            {{ isLogin ? accoutInfo.name : '未登录' }}
          </v-chip>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          text: '主页',
          to: '/',
        },
        {
          text: '白名单列表',
          to: '/whitelist/list',
        },
        {
          text: '个人中心',
          to: '/users/self/',
        },
        {
          text: '地铁站牌生成器',
          to: '/tools/metroGenerator',
        }
      ],
      isLogin: false,
      accoutInfo: {
        name: '',
      },
      adminLevel: 0,
    };
  },
  mounted() {
    if (window.screen.height <= 450) {
      console.log('屏幕太小！');
      throw new Error('屏幕太小！');
    }
    var that = this;
    setTimeout(async () => {
      var token = that.token;
      if (!token) console.log('未登录');
      if (token != '' && token != 'loggedOut') {
        var res = await that.$axios.$post('/api/users/online', { token });
        if (!res.success)
          return that.$toast.error('登录状态获取失败!请重新登录');
        that.isLogin = true;
        that.accoutInfo = res.message.data;
        that.adminLevel = res.message.data.adminLevel
        console.log(that.accoutInfo);
      }
    }, 100);
  },
  computed: {
    token() {
      var token = this.$store.state.userstore.token;
      return token;
    },
  },
};
</script>
