<template>
  <div class="container">
    <v-card min-width="500px">
      <v-card-title> 登录 </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="form.username"
            label="用户名"
            :rules="[(v) => !!v || '请输入用户名']"
          ></v-text-field>
          <v-text-field
            v-model="form.password"
            label="密码"
            :rules="[(v) => !!v || '请输入密码']"
            type="password"
          >
          </v-text-field>
          <v-checkbox
            v-model="form.checkbox"
            :rules="[(v) => !!v || '请同意协议']"
          >
            <template v-slot:label>
              <div>
                我同意
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      target="_blank"
                      href="https://vuetifyjs.com"
                      @click.stop
                      v-on="on"
                    >
                      隐私协议
                    </a>
                  </template>
                  点击查看隐私协议
                </v-tooltip>
              </div>
            </template>
          </v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="login()">登录</v-btn>
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
        checkbox: false,
      },
    }
  },
  computed: {
    checkobxErrors() {
      var errs = []
      if (!this.form.checkbox) errs.push('请同意协议')
      return errs
    },
  },
  methods: {
    async login() {
      var val = this.$refs.form.validate()
      if (val) {
        var res = await this.$axios.$post('/api/users/login', {
          account: this.form.username,
          password: this.form.password,
        })
        console.log(res)
        if (!res.success) {
          return this.$toast.error('出现错误,错误内容:\n' + res.error)
        }
        if (res.message.err) {
          return this.$toast.error('登录失败:\n' + res.message.msg)
        }
        var token = res.message.token
        this.$store.dispatch('userstore/setToken', token)
        this.$toast.success('登录成功!\n将在一秒后回到主页')
        // console.log(this.$store.state.userstore.token);
        setTimeout(() => {
          window.open('/', '__blank')
        }, 1000)
      }
    },
  },
}
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
