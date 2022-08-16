<template>
  <div>
    <div style="height: 20px;"></div>
    <v-card style="width: 50vw; margin-left: 25vw">
      <v-card-title>
        用户信息
      </v-card-title>
      <v-card-text>
        <div style="height: 10px;"></div>
        <v-row style="margin-left: 0px">
          <v-avatar class="mr-2" color="grey darken-1" size="60"></v-avatar>
          <v-col cols="13" style="margin-top: -10px;">
            <p>{{ userInfo.name }} <v-chip v-if="userInfo.isAdmin" class="ma-1" :color="userInfo.isAdmin?'red':'grey'" text-color="white" small>{{userInfo.isAdmin?'管理员':'普通用户'}}</v-chip>
            </p>
            <p>个性签名：{{ userInfo.description }}</p>
          </v-col>
        </v-row>
        <div style="height: 30px"></div>
        <v-col style="margin-left: 0px; margin-top: -40px;">
          <p> 等级: {{ userInfo.level }} </p>
          <div style="width: 5px"></div>
        </v-col>
      </v-card-text>
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
      userInfo:{
      isLogin: false,
      name: '',
      adminLevel: 0,
      avatar: '',
      description: '',
      email: '',
      exp: 0,
      gender: 0,
      gold: 0,
      id: 0,
      isAdmin: false,
      level: 0,
      qq: '',
      sponsershipAmount: 0
      }
    };
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
      }
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

</script>