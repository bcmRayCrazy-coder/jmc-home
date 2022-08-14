<template>
    <div class="fcontainer">
        <v-card>
            <v-card-title>
                白名单列表
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="搜索" single-line hide-details>
                </v-text-field>
            </v-card-title>
            <v-data-table :search="search" :headers="headers" :items="items" class="data-table" :loading="listLoading">
                <template v-slot:item.status="{ item }">
                    <v-chip :color="getStatusColor(item.status)" dark>
                        {{ getStatusText(item.status) }}
                    </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)" v-if="userData.isAdmin">
                        mdi-pencil
                    </v-icon>
                    <v-icon small class="mr-2" @click="deleteItem(item)" v-if="item.uid == userData.id">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-card>
        <v-dialog v-model="editDialog.show" persistent max-width="500px" transition="slide-y-transition">
            <v-card>
                <v-card-title>
                    <span class="text-h5">修改状态</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <!-- <v-text-field v-model="editDialog.status" label="状态"></v-text-field> -->
                        <v-select :items="statusItems" :hint="`状态码 - ${editDialog.status}`" v-model="editDialog.status"
                            label="状态" item-text="text" item-value="value" persistent-hint></v-select>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" plain @click="editDialog.show = false;">
                        取消
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save()">
                        更新
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    head() {
        return {
            title: '白名单列表',
        };
    },
    data() {
        return {
            userData: {},
            search: '',
            listLoading: true,
            headers: [
                {
                    text: '编号',
                    align: 'start',
                    value: 'id',
                },
                {
                    text: '游戏昵称',
                    sortable: false,
                    value: 'nickname',
                },
                {
                    text: '申请者id',
                    value: 'uid'
                },
                {
                    text: '状态',
                    value: 'status'
                },
                {
                    text: '服里面做的事情',
                    value: 'does',
                    sortable: false,
                },
                {
                    text: '操作',
                    value: 'actions',
                    sortable: false
                },
            ],
            items: [],
            editDialog: {
                show: false,
                status: 0,
                nickname: '',
                uid: 0,
                does: '',
                id: 0
            },
            statusItems: [
                {
                    text: "审核中",
                    value: 0
                },
                {
                    text: "通过",
                    value: 1
                },
                {
                    text: "驳回",
                    value: 2
                },
                {
                    text:"封禁",
                    value:3
                }
            ]
        }
    },
    mounted() {
        var that = this;
        setTimeout(async () => {
            var token = that.token;
            if (!token) {
                this.$toast.error('请先登录');
                return this.$router.push('/users/login');
            }
            var res = await this.$axios.$post('/api/users/online', { token });
            if (!res.success || res.message.err) {
                this.$toast.error('登录状态获取失败!请重新登录');
                return this.$router.push('/users/login');
            }
            that.userData = res.message.data;
            console.log(token, res);
            that.refreshList();
        }, 100);
    },
    computed: {
        token() {
            var token = this.$store.state.userstore.token;
            return token;
        },
    },
    methods: {
        editItem(item) {
            console.log(item);
            Object.assign(this.editDialog, item);
            this.editDialog.show = true;
        },
        deleteItem() {
            this.$toast.warning('Sorry,功能制作中\n该功能还在开发,暂不支持使用')
        },
        async refreshList() {
            this.listLoading = true;
            this.items = [];
            var { list } = await this.$axios.$post('/api/whitelist/list', { token: this.token });
            console.log(list);
            var that = this;
            list.forEach(e => {
                that.items.push({
                    id: e.id,
                    nickname: e.nickname,
                    uid: e.uid,
                    status: e.status,
                    does: e.does
                })
            });
            this.listLoading = false;
        },
        async save() {
            var res = await this.$axios.$post('/api/whitelist/change', {
                token: this.token,
                id: this.editDialog.id,
                status: this.editDialog.status
            });
            console.log(res);
            if (res.success) {
                this.$toast.success('更改成功!');
                this.editDialog.show = false;
                this.refreshList();
            }
        },
        getStatusColor(status) {
            return ['grey', 'green', 'yellow','red'][status];
        },
        getStatusText(status){
            return ['审核中', '通过', '驳回','封禁'][status];
        }
    }
};
</script>
<style>
.fcontainer {
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

.data-table {
    margin-left: 30px;
    margin-right: 30px;
}
</style>
