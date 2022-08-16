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
            <p>{{ name }} <v-chip v-if="isAdmin" class="ma-1" color="red" text-color="white" small>管理员权限组</v-chip>
            </p>
            <p>个性签名：{{ description }}</p>
          </v-col>
        </v-row>
        <div style="height: 30px"></div>
        <v-col style="margin-left: 0px; margin-top: -40px;">
          <p> 等级: {{ level }} </p>
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
      isLogin: false,
      name: '',
      adminLevel: '',
      avatar: '',
      description: '',
      email: '',
      exp: '',
      gender: '',
      gold: '',
      id: '',
      isAdmin: '',
      level: '',
      qq: '',
      sponsershipAmount: '',
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
        that.accoutInfo = res.message.data;
        console.log(that.accoutInfo);
        that.adminLevel = res.message.data.adminLevel;
        that.avatar = res.message.data.avatar;
        that.description = res.message.data.description;
        that.email = res.message.data.email;
        that.exp = res.message.data.exp;
        that.gender = res.message.data.gender;
        that.gold = res.message.data.gold;
        that.id = res.message.data.id;
        that.isAdmin = res.message.data.isAdmin;
        that.level = res.message.data.level;
        that.name = res.message.data.name;
        that.qq = res.message.data.qq;
        that.sponsershipAmount = res.message.data.sponsershipAmount;
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