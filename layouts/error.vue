<template>
  <v-app>
    <v-dialog
      v-model="dialog"
      persistent
      transition="fade-transition"
      max-width="500px"
    >
      <v-card color="error" dark>
        <v-card-title primary-title>
          <v-icon>mdi-alert-circle-outline</v-icon>
          <span class="headline" v-if="error.statusCode === 404">{{
            pageNotFound
          }}</span>
          <span class="headline" v-else>{{ otherError }}</span>
        </v-card-title>
        <v-card-text>
          <p v-if="error.statusCode === 404">
            <br />
            404 Not Found
          </p>
          <p v-else>
            出现了一些错误,错误信息:<br />
            {{ error.message }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="back()">{{ backMessage }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '页面未找到',
      otherError: '出错了',
      dialog: true,
      backMessage: '返回',
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
