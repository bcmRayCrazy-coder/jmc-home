<template>
  <div ref="domToImg">
    <div style="height: 20px;"></div>
    <v-card style="width: 49vw; margin-left: 25vw;">
      <v-card-title>
        地铁站牌生成器
      </v-card-title>
      <v-card-text>
        选择站牌样式、内容，点击生成，系统便会为你生成一个站牌。如你需要参与地铁建设，请生成后拷贝链接，使用/tomap指令生成站牌并放置。
        <div style="height: 5px;"></div>
        <div class="container">
          <v-col class="d-flex" cols="12">
            <v-select v-model="SignTypes" :items="items" :hint="`${SignTypes.type}`" item-text="type" persistent-hint
              return-object label="选择站牌类型" solo></v-select>
          </v-col>
          <v-row>
            <v-text-field :rules="requiredRule" label="本站站名"></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field :rules="requiredRule" label="下一站站名"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field :rules="requiredRule" label="线路编号"></v-text-field>
            <v-spacer></v-spacer>
            <v-text-field disabled :rules="requiredRule" label="线路颜色"></v-text-field>
          </v-row>
          <v-col class="d-flex" cols="12">
            <v-select :items="ArrowDirections" label="箭头方向（必选）" solo></v-select>
          </v-col>
          <v-row>
            <v-switch v-model="transferStation" label="换乘站点" color="red" value="red" hide-details></v-switch>
            <div style="width: 10px"></div>
            <v-text-field :rules="requiredRule" label="可换乘线路" v-if="transferStation"></v-text-field>
            <v-text-field :rules="requiredRule" label="换乘线路颜色（如#233333）" v-if="transferStation"></v-text-field>
          </v-row>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="togglePicker()">选择线路颜色</v-btn>
      </v-card-actions>
    </v-card>
    <v-color-picker v-model="color" style="margin-left: 500px; position: relative; top: 10px;" v-if="pickerState" hide-inputs></v-color-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      requiredRule: [
        value => !!value || '必填项目',
      ],
      ArrowDirections: [
        '上',
        '下',
        '左',
        '右',
      ],
      SignTypes: {type: '请选择站牌类型'}, 
      items: [
        { type: '站台候车信息' },
        { type: '换乘指引' },
        { type: '出站口指引' }
      ],
      transferStation: false,
      pickerState: false,
    }
  },
  head() {
    return {
      title: '地铁站牌生成器',
    };
  },
  methods: {
    togglePicker() {
      if (!this.pickerState) {
        this.pickerState = true
      } else {
        this.pickerState = false
      }
    }
  },
}
</script>