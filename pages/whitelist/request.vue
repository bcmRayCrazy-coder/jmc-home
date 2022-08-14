<template>
    <div class="container">
        <v-card min-width="500px">
            <v-card>
                <v-card-title>
                    申请白名单
                </v-card-title>
                <v-expand-transition>
                    <v-card-text v-if="animation.text">
                        <v-form ref="form">
                            <v-text-field v-model="form.nickname" label="游戏昵称" :rules="[v => !!v || '请输入游戏昵称']">
                            </v-text-field>
                            <v-text-field v-model="form.does" :label="`${form.nickname}在里面做的事情`"
                                :placeholder="`简单阐述一下${form.nickname.length == 0 ? '您' : form.nickname}会在服务器内做的事情`"
                                :rules="[v => !!v || '请输入在里面做的事情']"></v-text-field>
                            <v-checkbox v-model="form.promise"
                                :label="`我保证${form.nickname.length == 0 ? '我' : form.nickname}不会在服务器内作出 损害玩家利益、违反法律 的行为`"
                                :rules="[v => !!v || '必须保证上述内容']">
                                ></v-checkbox>
                        </v-form>
                    </v-card-text>
                </v-expand-transition>
                <v-expand-transition>
                    <v-card-actions v-if="animation.action">
                        <v-btn color="warning" plain @click="rewrite()">重写</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="submit()" :loading="form.loading" :disabled="form.disabled">提交</v-btn>
                    </v-card-actions>
                </v-expand-transition>
            </v-card>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                nickname: '',
                does: '',
                promise: false,
                loading: true,
                disabled: true,
            },
            animation: {
                text: false,
                action: false
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.animation.text = true;
        }, 200);
        setTimeout(() => {
            this.animation.action = true;
        }, 500);
        var that = this;
        setTimeout(async () => {
            var token = that.token;
            if (!token) {
                this.$toast.error('请先登录');
                return this.$router.push('/users/login');
            };
            var res = await this.$axios.$post('/api/users/online', { token });
            if (!res.success) {
                this.$toast.error('登录状态获取失败!请重新登录');
                return this.$router.push('/users/login');
            }
            this.form.loading = false;
            this.form.disabled = false;
        }, 100);
    },
    methods: {
        rewrite() {
            this.form.nickname = '';
            this.form.does = '';
            this.form.promise = false;
            this.$refs.form.resetValidation();
        },
        async submit() {
            if (!this.$refs.form.validate()) return;
            this.form.loading = true;
            this.form.disabled = true;
            var res = await this.$axios.$post('/api/whitelist/request', {
                token: this.token,
                nickname: this.form.nickname,
                does: this.form.does
            });
            console.log(res.success);
            if (res.success) {
                this.$toast.success('申请成功!\n请等待管理员审核,请求id:' + res.message.requestId[0]);
                this.$router.push('/');
            }else{
                this.$toast.error('出现错误:'+res.error);
                this.form.loading = false;
                this.form.disabled = false;
            }
        }
    },
    computed: {
        token() {
            var token = this.$store.state.userstore.token;
            return token;
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
