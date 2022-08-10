<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ title }}</h3>
            <div class="description">看看你是否在白名单中</div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="[rules.required, rules.username]"
            label="用户名"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="warning" @click="reset()">重置</v-btn>
          <v-btn
            outlined
            color="primary"
            @click="find()"
            :disabled="unv"
            :loading="searching"
          >
            查询
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog
        v-model="resault"
        max-width="500px"
        transition="fade-transition"
      >
        <v-card color="primary">
          <v-card-title primary-title> 结果 </v-card-title>
          <v-card-text>
            <p v-if="isIn">{{ username }}在白名单内</p>
            <p v-else>{{ username }}不在白名单内</p>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn outlined @click="resault = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar">
        {{ text }}
        <v-btn color="pink" text @click="snackbar = false"> 我知道了 </v-btn>
      </v-snackbar>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      title: '白名单查询',
      username: '',
      unv: true,
      searching: false,

      snackbar: false,
      isIn: false,
      resault: false,
      text: `测试`,

      dialog: false,
      requiredMessage: '必填',
      notUsernameMessage: '不是用户名',

      rules: {
        required: (value) => {
          var r = !!value

          if (r) this.unv = false
          else this.unv = true

          return r || this.requiredMessage
        },
        username: (value) => {
          var r = /^[a-zA-Z0-9_]{3,16}$/.test(value)

          if (r) this.unv = false
          else this.unv = true

          return r || this.notUsernameMessage
        },
      },
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  methods: {
    timeout() {
      // 请求超时
      this.searching = false
      this.text = `请求超时，请重试`
      this.snackbar = true
    },
    find() {
      this.searching = true

      const tourl = 'http://120.24.231.164:1203/api/whitelist/'
      this.$axios
        .$get(tourl + this.username)
        .then((res) => {
          // 用户在白名单内);
          this.isIn = true
          this.resault = true
          this.searching = false
          // like this
        })
        .catch((res) => {
          if (res.message == 'Network Error') return this.timeout()
          // 用户不在白名单内
          this.isIn = false
          this.resault = true
          this.searching = false
        })
    },
    reset() {
      this.username = ''
      this.unv = true
    },
  },
}
</script>
<style scoped>
.description {
  font-size: 13px;
  color: #bdbdbd;
}
</style>
