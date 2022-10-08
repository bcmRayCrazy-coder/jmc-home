<template>
  <div>
    <h1 align="center">用户管理</h1>
    <v-data-table
        :search="search"
        :headers="headers"
        :items="items"
        class="data-table"
        :loading="listLoading"
      >
        <template v-slot:item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" dark>
            {{ getStatusText(item.status) }}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            v-if="userData.isAdmin"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(item)"
            v-if="item.uid == userData.id"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
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
      userData: {},
      search: '',
      listLoading: true,
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