<template>
  <div>
    <div style="height: 20px"></div>
    <v-skeleton-loader
      class="user-card"
      v-if="loading"
      type="card-heading, list-item-avatar-two-line, list-item-three-line, actions"
    ></v-skeleton-loader>
    <v-card class="user-card" v-if="!loading" :loading="loading">
      <v-card-title> 个人中心 </v-card-title>
      <v-card-text>
        <v-row style="margin-left: 0px" class="mt-2">
          <v-avatar class="mr-2" color="grey darken-1" size="60"
            ><img :src="userInfo.avatar" alt="用户头像"
          /></v-avatar>
          <v-col cols="13" style="margin-top: -10px" class="user-info-col">
            <p>
              {{ userInfo.name }}
              <v-chip
                v-if="userInfo.isAdmin"
                class="ma-1"
                :color="userInfo.isAdmin ? adminBadgeColor : 'grey'"
                text-color="white"
                small
                >{{
                  ['普通用户', '1', '2', '3', '服主'][userInfo.adminLevel]
                }}</v-chip
              >
            </p>
            <p>个性签名：{{ userInfo.description }}</p>
          </v-col>
        </v-row>

        <v-col class="ml-0 mt-2 user-info-col">
          <p>邮箱： {{ userInfo.email }}</p>
          <p>金币: {{ userInfo.gold }}</p>
          <p>等级: {{ userInfo.level }}</p>
          <p>经验值：{{ userInfo.exp }}</p>
          <v-progress-linear
            class="mt-5"
            :value="userInfo.exp"
            rounded
            height="25px"
            color="yellow"
          >
            <template v-slot:default="{ value }">
              <strong>{{ value }} / 100</strong>
            </template>
          </v-progress-linear>
          <div style="height: 10px" v-if="userInfo.sponsershipAmount > 0"></div>
          <p v-if="userInfo.sponsershipAmount > 0">
            你是为JerryMC赞助了{{ userInfo.sponsershipAmount }}元的用户!
          </p>
        </v-col>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" dark elevation="0" @click="logOut()">登出</v-btn>
      </v-card-actions>
    </v-card>
  </div>
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
      ],
      adminBadgeColor: '',
      userInfo: {
        isLogin: false,
        name: '',
        adminLevel: 0,
        avatar: '',
        description: '',
        email: '未绑定',
        exp: 0,
        gender: 0,
        gold: 0,
        id: 0,
        isAdmin: false,
        level: 0,
        qq: '未绑定',
        sponsershipAmount: 0,
      },
      loading: true,
      text: '',
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch('userstore/setToken', 'loggedOut');
      window.location.href = '/';
    },
  },
  mounted() {
    var that = this;
    setTimeout(async () => {
      var token = that.token;
      if (!token) console.log('未登录');
      if (token) {
        var res = await that.$axios.$post('/api/users/online', { token });
        if (!res.success)
          return that.$toast.error('登录状态获取失败!请重新登录');
        that.isLogin = true;
        that.userInfo = res.message.data;
        that.adminBadgeColor = [
          'grey',
          'green lighten-1',
          'yellow darken-2',
          'blue lighten-1',
          'red',
        ][that.userInfo.adminLevel];
      }
      this.loading = false;
    }, 100);
  },
  computed: {
    token() {
      var token = this.$store.state.userstore.token;
      return token;
    },
  },
  head() {
    return {
      title: '用户信息',
    };
  },
};
</script>
<style scoped>
.user-card {
  width: 50vw;
  margin-left: 25vw;
}
.user-info-col p {
  margin-bottom: 2px;
}
</style>
