<template>
  <div>
    <div style="height: 20px;"></div>
    <v-card style="width: 100px; margin-left: 48vw; margin-top: 40vh" v-if="loading">
      <v-card-title>
        加载中
      </v-card-title>
    </v-card>
    <v-card style="width: 50vw; margin-left: 25vw" v-if="!loading">
      <v-card-title>
        用户信息
      </v-card-title>
      <v-card-text>
        <div style="height: 10px;"></div>
        <v-row style="margin-left: 0px">
          <div @click="snackbar = true; text = '管理员权限组lv.' + userInfo.adminLevel + '勋章'"
            style="position: relative; left: 65px; top: -5px;z-index: 3;">
            <v-badge :color="adminBadgeColor" avatar overlap offset-x="70" icon="mdi-account"></v-badge>
          </div>
          <v-avatar class="mr-2" color="grey darken-1" size="60"></v-avatar>
          <v-snackbar v-model="snackbar">
            {{ text }}
            <v-btn style="position: relative; margin-left: 20vw;" color="pink" text @click="snackbar = false">
              我知道了
            </v-btn>
          </v-snackbar>
          <v-col cols="13" style="margin-top: -10px;">
            <p>{{ userInfo.name }} <v-chip v-if="userInfo.isAdmin" class="ma-1" :color="userInfo.isAdmin ? adminBadgeColor : 'grey'"
                text-color="white" small>{{ userInfo.isAdmin ? '管理员 lv'+userInfo.adminLevel : '普通用户' }}</v-chip>
            </p>
            <p>个性签名：{{ userInfo.description }}</p>
          </v-col>
        </v-row>
        <div style="height: 30px"></div>
        <v-col style="margin-left: 0px; margin-top: -40px;">
          <p> 等级: {{ userInfo.level }} </p>
          <v-row style="margin-left: 0px;">
            <p> 绑定的邮箱： {{ userInfo.email }}</p>
            <v-spacer></v-spacer>
            <v-btn height="20px" @click="changeEmail()">更改</v-btn>
          </v-row>
          <p> 等级经验值：{{ userInfo.exp }}/100 来达到等级{{ userInfo.level + 1 }}</p>
          <v-progress-linear :value="userInfo.exp" rounded></v-progress-linear>
          <div style="height: 10px;" v-if="userInfo.sponsershipAmount > 0"></div>
          <p v-if="userInfo.sponsershipAmount > 0"> 你是为JerryMC赞助了{{ userInfo.sponsershipAmount }}元的用户！ 谢谢你！</p>
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
      snackbar: false,
      text: '',
    };
  },
  methods: {
    changeEmail() {
      this.text = '功能开发中，敬请谅解~'
      this.snackbar = true
    }
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
        switch (that.userInfo.adminLevel) {
          case 1:
            that.adminBadgeColor = 'green lighten-1';
            break;
          case 2:
            that.adminBadgeColor = 'yellow darken-2';
            break;
          case 3:
            that.adminBadgeColor = 'blue lighten-1';
            break;
          case 4:
            that.adminBadgeColor = 'red';
            break;
        };
      }
    }, 100);
    setTimeout(async () => {
      this.loading = false
    }, 200)
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