<template>
  <div class="termsContainer">
    <v-card style="width: 50vw;">
      <v-card-title>
        用户条款
      </v-card-title>
      <v-card-text>
        <p>欢迎来到JerryMC生存服务器！在此服务器游玩前，您需要知晓并同意我们的用户条款才能游玩我们的服务器。</p>
        <p>1. 我们将会知晓您的IP地址。您的IP地址不会泄露。如果您不同意我们收集您的IP地址，请不要同意本条款且进入服务器。</p>
        <p>2. 在游戏服务器内，请友善对待他人，不在服务器或官方群聊中做违反中华人民共和国法律的言行或行为。违者将会被IP封号。</p>
        <p>3. 在游戏服务器与本网站内，请不要取一些不合适的用户名，包括但不限于：黄色内容、恐吓内容等。一旦被发现，我们有权封禁用户名不合适的账号。</p>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: '用户条款',
    };
  },
}
</script>
<style>
.termsContainer {
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>