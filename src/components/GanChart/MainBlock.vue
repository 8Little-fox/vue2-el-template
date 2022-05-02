<template>
  <div class="main-block">
    <div class="main-block-wrapper">
      <div
        class="main-block-item-start"
        :style="{
          width:
            this.item.stage &&
            this.item.to_be_confirmed === 1 &&
            this.item.status !== 10
              ? 0
              : '5px',
          'background-color': this.darker,
        }"
      ></div>
      <div class="main-block-item" :style="getStyle" @click="selectBlock">
        <a-tooltip :title="item.name" class="text ellipsis">{{
          item.name
        }}</a-tooltip>
      </div>

      <a-popover>
        <span class="status" @mouseenter="handleMsg">待审批</span>
        <template slot="content">
          <div
            v-if="item.status === 10"
            class="item"
            :class="{ loading: loadingMsg }"
            @click.stop=""
          >
            <!-- <img src="../assets/img/time-icon.png" alt="" class="name-icon" /> -->
            <span class="name-text">原时间</span>：
            <span class="content-text"
              >{{ info.start_date }}至{{ info.end_date }}</span
            >
          </div>
          <div v-else :class="{ loading: loadingMsg }" @click.stop="">
            <div class="item">
              <!-- <img
                src="../assets/img/status-icon.png"
                alt=""
                class="name-icon"
                style="width: 11px"
              /> -->
              <span class="name-text">审批状态</span>：
              <span class="content-text">{{ handleText(item) }}</span>
            </div>
            <div class="item">
              <!-- <img
                src="../assets/img/person-icon.png"
                alt=""
                class="name-icon"
              /> -->
              <span class="name-text">审批人</span>：
              <span class="content-text">{{ info.name || "" }}</span>
            </div>
            <div class="item">
              <!-- <img
                src="../assets/img/phone-icon.png"
                alt=""
                class="name-icon"
              /> -->
              <span class="name-text">联系电话</span>：
              <span class="content-text">{{ info.mobile || "" }}</span>
            </div>
          </div>
        </template>
      </a-popover>
    </div>
  </div>
</template>

<script>
// import { getApprover, getChangeDate, setConfirm } from '../api/api'

export default {
  name: 'MainBlock',
  props: {
    data: Object,
    item: Object,
    updateTimeLines: Function,
    cellHeight: Number
  },
  computed: {
    darker () {
      const percent = 15
      const color = this.data.color || this.color

      let R = parseInt(color.substring(1, 3), 16)
      let G = parseInt(color.substring(3, 5), 16)
      let B = parseInt(color.substring(5, 7), 16)

      R = parseInt(((R || 1) * (100 - percent)) / 100)
      G = parseInt(((G || 1) * (100 - percent)) / 100)
      B = parseInt(((B || 1) * (100 - percent)) / 100)

      R = R > 0 ? R : 0
      G = G > 0 ? G : 0
      B = B > 0 ? B : 0

      R = R < 255 ? R : 255
      G = G < 255 ? G : 255
      B = B < 255 ? B : 255

      const RR = (R < 16 ? '0' : '') + R.toString(16)
      const GG = (G < 16 ? '0' : '') + G.toString(16)
      const BB = (B < 16 ? '0' : '') + B.toString(16)

      return '#' + RR + GG + BB
    },
    handleText () {
      return (item) => {
        let txt
        if (item.status !== 10) {
          txt =
            item.status === 1
              ? '待机构审核'
              : item.status === 2
              ? '待小区审核'
              : item.status === 3
              ? '待大区审核'
              : '待总部审'
        } else {
          txt = item.status_sub === 1 ? '新增' : '变更'
        }
        return txt
      }
    },
    parsedColor () {
      return this.data.color || this.color
    },
    getStyle () {
      const style = {}

      if (
        this.item.stage &&
        this.item.to_be_confirmed === 1 &&
        this.item.status !== 10
      ) {
        style['border-radius'] = '8px'
        style['border-width'] = '2px'
        style['border-style'] = 'solid'
        style['border-color'] = this.parsedColor
        style.color = this.parsedColor
      } else {
        style['background-color'] = this.parsedColor
      }

      return style
    }
  },
  created () {
    console.log('this.item', this.item)
  },
  data () {
    return {
      color: '#36584B',
      info: {}
    }
  },
  methods: {
    async selectBlock () {
      this.$router.push({
        path: '/index/offline/trainDetails/trainSign',
        query: {
          id: this.item.training_id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main-block,
.main-block-wrapper {
  width: 100%;
  height: 100%;
}

.main-block-wrapper {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.main-block-item-start {
  width: 5px;
  height: 60%;
  border-radius: 3px 0 0 3px;
}

.main-block-item {
  position: relative;
  flex: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-width: 100%;
  width: 100%;
  height: 60%;
  border-radius: 3px 8px 8px 3px;
  padding-left: 10px;
  padding-right: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC, sans-serif;
  font-weight: 600;
  color: #ffffff;
}

.status {
  position: absolute;
  top: -3px;
  right: 5px;
  background-color: #ff2d36;
  padding: 0 10px;
  color: #fff;
  height: 28px;
  line-height: 28px;
  border-radius: 4px;
  border: 1px solid #fff;
  cursor: pointer;
  white-space: nowrap;

  &::before {
    content: "";
    position: absolute;
    right: 1px;
    bottom: -5.5px;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 6px solid #ff2d36;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    right: 0;
    bottom: -7.5px;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 8px solid #fff;
  }
}

.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #3350a0;

  &:last-child {
    margin-bottom: 0;
  }

  .content-text {
    font-size: 14px;
    font-weight: 600;
    color: #333333;
  }
}

.name-text {
  flex: none;
  display: inline-block;
  transform: translateY(2px);
  width: 60px;
  line-height: 0;
  text-align: justify;
  text-justify: inter-ideograph;

  &::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 0;
    line-height: 0;
  }
}

.name-icon {
  flex: none;
  width: 10px;
  margin-right: 4px;
}

.live-tag {
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  height: 60%;
  background: #7d79ae;
  border-radius: 8px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC, sans-serif;
  font-weight: 600;
  color: #ffffff;
}

.text {
  &.ellipsis {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }
}

.loading {
  position: relative;

  &::after {
    display: block;
    position: absolute;
    content: "加载中...";
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    padding-top: 20px;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
</style>
