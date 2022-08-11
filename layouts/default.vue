<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <div class="text-center mr-5">
          <div class="text-h6">JerryMc</div>
        </div>

        <v-btn
          v-for="link in links"
          :key="link"
          @click="$router.push(link.to)"
          text
        >
          {{ link.text }}
        </v-btn>

        <v-spacer></v-spacer>

        <div class="text-center">
          <v-chip class="ma-1" color="indigo" text-color="white">
            <v-avatar class="mr-2" color="grey darken-1" size="24"></v-avatar>
            {{ isLogin ? accountInfo.name : '未登录' }}
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
      ],
      isLogin: false,
      accoutInfo: {
        name: '',
      },
    };
  },
  mounted() {
    if (window.screen.height <= 450) {
      console.log('屏幕太小！');
      throw new Error('屏幕太小！');
    }
    var token = this.$store.state.userstore.token;
    console.log(token);
    if (!token) console.log('未登录');
    if (token) {
      console.log('登录');
    }
  },
};
</script>
