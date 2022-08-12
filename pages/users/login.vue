<template>
  <div class="container">
    <v-card min-width="500px" v-if="!this.isLogin">
      <v-card-title> 登录 </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="form.username" label="用户名" :rules="[(v) => !!v || '请输入用户名']"></v-text-field>
          <v-text-field v-model="form.password" label="密码" :rules="[(v) => !!v || '请输入密码']" type="password">
          </v-text-field>
        </v-form>
        没有账号?<a href="/users/register">注册</a>一个
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="login()">登录</v-btn>
      </v-card-actions>
    </v-card>
    <v-card min-width="500px" v-if="this.isLogin">
      <v-card-title> 你已经登录过了！ </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="goto('/')">返回主页</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async login() {
      var val = this.$refs.form.validate();
      if (val) {
        var res = await this.$axios.$post('/api/users/login', {
          account: this.form.username,
          password: this.form.password,
        });
        console.log(res);
        if (!res.success) {
          return this.$toast.error('出现错误,错误内容:\n' + res.error);
        }
        if (res.message.err) {
          return this.$toast.error('登录失败:\n' + res.message.msg);
        }
        var token = res.message.token;
        this.$store.dispatch('userstore/setToken', token);
        this.$toast.success('登录成功!\n将在一秒后回到主页');
        // console.log(this.$store.state.userstore.token);
        setTimeout(() => {
          window.open('/', '__blank');
        }, 1000);
      }
    },
    goto(url) {
      this.$router.push(url);
    },
  },
};
</script>
<style>
.container {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
}
</style>
