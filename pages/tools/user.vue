<template>
  <div>
    <h1 align="center">用户管理</h1>
    <v-text-field :label="用户id"></v-text-field>
    <v-select :items="levels" label="管理员等级" solo></v-select>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "主页"
    }
  },
  data() {
    return {
      
      levels: [
        '1',
        '2',
        '3',
        '4',
        '无'
      ],

    }
  },
}
</script>