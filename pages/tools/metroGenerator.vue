<template>
  <div ref="domToImg">
    <div style="height: 20px;"></div>
    <v-card style="width: 49vw; margin-left: 25vw;">
      <v-card-title>
        地铁站牌生成器
      </v-card-title>
      <v-card-text>
        选择站牌样式、内容，点击生成，系统便会为你生成一个站牌。如你需要参与地铁建设，请生成后拷贝链接，使用/tomap指令生成站牌并放置。<br>如您遇到排版错误问题，请刷新。
        <div style="height: 5px;"></div>
        <div class="container">
          <v-col class="d-flex" cols="12">
            <v-select v-model="SignTypes" :items="items" :hint="`${SignTypes.type}`" item-text="type" persistent-hint
              return-object label="选择站牌类型" solo></v-select>
          </v-col>
          <div class="stationInformation" v-if="SignTypes.type == '站台候车信息'">
            <p>拾色器当前颜色：{{ showColor }}</p>
            <v-row>
              <v-text-field :rules="requiredRule" label="本站站名"></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field :rules="requiredRule" label="下一站站名"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field :rules="requiredRule" label="线路编号"></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field disabled :rules="requiredRule" :label="`线路颜色：${mainLineColor}`"></v-text-field>
            </v-row>
            <v-col class="d-flex" cols="12">
              <v-select :items="ArrowDirections" label="箭头方向（必选）" solo></v-select>
            </v-col>
            <v-row>
              <v-switch @change="switchUpdate()" v-model="transferStation" label="换乘站点" color="red" value="red"
                hide-details></v-switch>
              <div style="width: 10px"></div>
              <v-text-field :rules="requiredRule" label="可换乘线路编号" v-if="transferStation"></v-text-field>
              <v-text-field :rules="requiredRule" disabled :label="`换乘线路颜色 ${transferLineColor}`"
                v-if="transferStation">
              </v-text-field>

            </v-row>
          </div>
          <div class="transferGuide" v-if="SignTypes.type == '换乘指引'">
            <p>拾色器当前颜色：{{ showColor }}</p>
            <v-row>
              <v-text-field :rules="requiredRule" label="本站站名"></v-text-field>
            </v-row>
            <v-row>
              <v-text-field :rules="requiredRule" label="线路编号"></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field disabled :rules="requiredRule" :label="`线路颜色：${mainLineColor}`"></v-text-field>
            </v-row>
            <v-col class="d-flex" cols="12">
              <v-select :items="ArrowDirections" label="箭头方向（必选）" solo></v-select>
            </v-col>
            <v-row>
              <v-text-field :rules="requiredRule" label="可换乘线路编号"></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field :rules="requiredRule" disabled :label="`换乘线路颜色 ${transferLineColor}`"></v-text-field>
            </v-row>
          </div>
          <div class="exitInformation" v-if="SignTypes.type == '出站口指引'">
            <p>拾色器当前颜色：{{ showColor }}</p>
            <v-text-field :rules="requiredRule" label="本站站名"></v-text-field>
            <v-row>
              <v-text-field :rules="requiredRule" label="线路编号"></v-text-field>
              <v-spacer></v-spacer>
              <v-text-field disabled :rules="requiredRule" :label="`线路颜色：${mainLineColor}`"></v-text-field>
            </v-row>
            <v-col class="d-flex" cols="12">
              <v-select :items="ArrowDirections" label="箭头方向（必选）" solo></v-select>
            </v-col>
            <v-row>
              <v-switch @change="switchUpdate()" v-model="transferStation" label="换乘站点" color="red" value="red"
                hide-details></v-switch>
              <div style="width: 10px"></div>
              <v-text-field :rules="requiredRule" label="可换乘线路编号" v-if="transferStation"></v-text-field>
              <v-text-field :rules="requiredRule" disabled :label="`换乘线路颜色 ${transferLineColor}`"
                v-if="transferStation">
              </v-text-field>

            </v-row>
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="togglePicker()"
          v-if="SignTypes.type == '站台候车信息' || SignTypes.type == '换乘指引' || SignTypes.type == '出站口指引'">{{ pickerText }}
        </v-btn>
        <div style="width: 10px"></div>
        <v-btn @click="done()" color="green darken-2">完成</v-btn>
      </v-card-actions>
    </v-card>
    <v-color-picker v-model="color" style="margin-left: 500px; position: relative; top: 10px;" v-if="pickerState"
      hide-inputs></v-color-picker>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 'hex',
      hex: '#FF00FF',
      requiredRule: [
        value => !!value || '必填项目',
      ],
      ArrowDirections: [
        '上',
        '下',
        '左',
        '右',
      ],
      SignTypes: { type: '请选择站牌类型' },
      items: [
        { type: '站台候车信息' },
        { type: '换乘指引' },
        { type: '出站口指引' }
      ],
      transferStation: false,
      pickerState: false,
      pickColor: "",
      pickerText: "选择线路颜色",
      pickerFor: 'normal',
      mainLineColor: "#FF00FF",
      transferLineColor: "#FF00FF",
      pickTimes: 0
    }
  },
  head() {
    return {
      title: '地铁站牌生成器',
    };
  },
  methods: {
    done() {
      if (this.SignTypes.type == "请选择站牌类型") {
        this.$toast.error("您还没有选择类型，无法生成！")
      } else {
        this.$toast.success("正在为您生成图片并将在1秒后刷新该页面，您可以浏览生成的图片并在该页面刷新后继续生成站牌。")
        setTimeout(function () {
          window.open("https://www.baidu.com")
        }, 1000);
        setTimeout(function () {
          window.location.reload()
        }, 1200);
      }
    },
    switchUpdate() {
      this.pickTimes += 1
      console.log(this.pickTimes)
      if (!this.pickerState) {
        if (this.pickTimes != 1 && this.pickTimes % 2 == 1) {
          this.pickerFor = "normal"
          this.pickerText = "选择换乘线路颜色"
        } else {
          this.pickerFor = "normal"
          this.pickerText = "选择线路颜色"
        }
      }
    },
    togglePicker() {
      if (!this.pickerState) {
        //未开启拾色器
        if (this.transferStation || this.SignTypes.type == "换乘指引") {
          if (this.pickerFor == "normal") {
            this.pickerFor = "transfer"
          } else {
            this.pickerFor = "normal"
          }
        }
        this.pickerText = "完成"
        this.pickerState = true
      } else {
        //开启拾色器后
        console.log(this.pickerFor)
        if (this.transferStation) {
          switch (this.pickerFor) {
            case "normal":
              this.mainLineColor = this.showColor
              this.$toast.success("线路颜色已成功设置为 " + this.mainLineColor);
              this.pickerText = "选择换乘线路颜色"
              break
            case "transfer":
              this.transferLineColor = this.showColor
              this.$toast.success("换乘线路颜色已成功设置为 " + this.transferLineColor);
              this.pickerText = "选择线路颜色"
              break
          }
        } else if (this.SignTypes.type == "换乘指引") {
          switch (this.pickerFor) {
            //我也不知道为什么他反了但是人和代码有一个能跑就行
            case "normal":
              this.mainLineColor = this.showColor
              this.$toast.success("线路颜色已成功设置为 " + this.mainLineColor);
              this.pickerText = "选择换乘线路颜色"
              break
            case "transfer":
              this.transferLineColor = this.showColor
              this.$toast.success("换乘线路颜色已成功设置为 " + this.transferLineColor);
              this.pickerText = "选择线路颜色"
              break
          }
        } else {
          this.mainLineColor = this.showColor
          this.$toast.success("线路颜色已成功设置为 " + this.mainLineColor);
          this.pickerText = "选择线路颜色"
        }
        this.pickerState = false
      }
    },
    pickChange(color) {
      console.log(color);
      this.pickColor = color;
    }
  },
  computed: {
    color: {
      get() {
        return this[this.type]
      },
      set(v) {
        this[this.type] = v
      },
    },
    showColor() {
      if (typeof this.color === 'string') return this.color

      return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
        color[key] = Number(this.color[key].toFixed(2))
        return color
      }, {}), null, 2)
    },
  }
}
</script>