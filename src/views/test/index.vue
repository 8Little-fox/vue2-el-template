<template>
  <el-row>
    <el-form>
      <el-form-item>
        <button @click="btnHandler">点击121212</button>
        复制剪贴板<input @click="handlerCopy" id="input" />
        <el-tag> Vue.$set</el-tag>
      </el-form-item>
      <el-form-item>
        <el-button @click="setMessage">添加属性</el-button>
        {{ student.name }}
        <el-input
          type="text"
          v-model="student.age"
          style="width: 350px"
        ></el-input>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item>
        <el-tag>sync</el-tag>
        <template>
          <SyncText :money.sync="money" />
          {{ money }}
        </template>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item>
        <el-tag>$attrs</el-tag>
        <BTest :msg="msg" @click="say"></BTest>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item>
        <el-button @click="debounceChange">函数防抖</el-button>
        <el-button @click="throttleChange">函数节流</el-button>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item>
        <el-tag>作用域插槽</el-tag>
        <slotsChild>
          <template slot-scope="props">
            <div>{{ props.item }}</div>
          </template>
        </slotsChild>
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item>
        v-once 只对内部组件渲染一次
        <el-divider></el-divider>
      </el-form-item>
      <el-form-item>
        <el-button @click="exportExcel">exportExcel</el-button>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <el-button @click="$refs.message.autoClose(), (isShow = true)"
          >组件式调用</el-button
        >
        <component-message
          ref="message"
          :visible.sync="isShow"
        ></component-message>
      </el-form-item>
      <el-form-item>
        <el-button @click="openMessage">函数式组件调用 Message</el-button>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item>
        <img :src="logo" alt="">
        <el-button
          size="small"
          @click="downloadFile(logo, '10.png')"
          >下载</el-button
        >
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
import SyncText from './components/syncText'
import BTest from './components/b'
import SlotsChild from './components/slotsChild'
import { exportExcel } from '@/utils/tools/ExportExcel'
import { debounce, throttle, downloadImage } from '@/utils/tools/method'
import ComponentMessage from '@/components/Message/index'
export default {
  name: 'Test',
  components: {
    SyncText,
    BTest,
    SlotsChild,
    ComponentMessage
  },
  data () {
    return {
      money: '',
      student: {
        name: '张三'
      },
      msg: 'A组件数据',
      isShow: false,
      logo: 'https://qmplusimg.henrongyi.top/gvalogo.png'
    }
  },
  mounted () {
    setInterval(() => this.num++, 10000)
  },
  methods: {
    setMessage () {
      // this.$set(this.student, 'age' ,15)
      this.student.age = '15'
      this.student = Object.assign({}, this.student)
      console.log('this.student', this.student)
    },
    say () {
      console.log('事件')
    },
    debounceChange: debounce(
      function () {
        console.log('防抖')
      },
      1000,
      true
    ),
    throttleChange: throttle(
      function () {
        console.log('节流')
      },
      2000,
      1
    ),
    btnHandler () {
      this.$router.push({ path: '/test/slot' })
    },
    handlerCopy () {
      const element = document.querySelector('#input')
      console.log('element', element)
      element.select()
      document.execCommand('copy')
    },
    exportExcel () {
      exportExcel({
        aoaList: [
          [
            ['姓名', '性别', '年龄', '注册时间'],
            ['张三', '男', 18, new Date()],
            ['李四', '女', 22, new Date()]
          ]
        ],
        cell: [
          {
            type: '!merges',
            value: [{ s: { r: 0, c: 0 }, e: { r: 0, c: 2 } }]
          }
        ],
        sheetNames: ['表格1', '列表']
      })
    },
    openMessage () {
      this.$BlMessage({
        message: 'Hello',
        visible: true,
        duration: 2000
      })
    },
  downloadFile (url, name) {
      if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
        downloadImage(url, name)
      } else {
        downloadImage('http://47.93.102.44:8001' + url, name)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.num {
  --width: 26px;
  margin-right: 6px;
  border: 1px solid black;
  border-radius: 8px;
}
</style>
