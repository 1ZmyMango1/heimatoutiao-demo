<template>
  <div class="ali">
    <h3>1688进货红包</h3>

    <div class="box" v-for="(item, index) in list" :key="index">
      <div class="leftNum">{{ item.money }}<span>元</span></div>
      <div class="middle">
        <div class="topNum">{{ item.title }}</div>
        <div class="topNumber">{{ item.description }}</div>
        <div class="countdown">
          <div v-if="item.restTime">
            据结束<span>{{ currentTime[index][0] }}</span>
            <span>{{ currentTime[index][1] }}</span>
            <span>{{ currentTime[index][2] }}</span>
          </div>
          <div v-else>有效期：{{ item.time[0] }}-{{ item.time[1] }}</div>
        </div>
      </div>
      <div class="rightNum">
        <span>{{ item.status }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  name: 'AliTest',
  data() {
    return {
      list: [],
      currentTime: [],
      time: null
    }
  },
  created() {
    this.getAliList()
  },
  methods: {
    async getAliList() {
      const res = await axios({
        url: 'https://systemjs.1688.com/krump/schema/1352.json'
      })
      console.log(res)
      this.list = res.data.list
      this.handleTime(this.list)
      this.list.forEach((item, index) => {
        for (let i = 0; i < item.time.length; i++) {
          item.time[i] = dayjs(item.time[i]).format('MM-DD mm:ss')
        }
        this.currentTime[index] = dayjs(item.restTime)
          .format('HH:mm:ss')
          .split(':')
      })
    },
    handleTime(list) {
      list.forEach((item, index) => {
        if (item.restTime) {
          this.time = setInterval(() => {
            item.restTime -= 1000
            this.currentTime[index] = dayjs(item.restTime)
              .format('HH:mm:ss')
              .split(':')
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.ali {
  margin: 30px;
}
.box {
  width: 690px;
  height: 182px;
  background-image: url(@/assets/ali.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  .leftNum {
    color: #a45927;
    font-size: 65px;
    font-weight: 700;
    width: 200px;
    line-height: 182px;
    text-align: center;
    // padding-left: 5px;
    span {
      font-size: 28px;
    }
  }
  .middle {
    width: 4.33333rem;
    font-size: 25px;
    color: #ffe9b0;
    .topNum {
      font-size: 36px;
      font-weight: 700;
      margin-top: 25px;
    }
    .topNumber {
      font-size: 22px;
      margin-top: 6px;
    }
    .countdown {
      font-size: 20px;
      margin-top: 15px;
      color: #ffb394;
      span {
        width: 34px;
        height: 32px;
        background-color: #fff0c9;
        display: inline-block;
        line-height: 32px;
        text-align: center;
        color: #ff4000;
        font-weight: 700;
      }
    }
  }
  .rightNum {
    background-color: #ffdfaf;
    width: 146px;
    height: 64px;
    text-align: center;
    border-radius: 10%;
    margin-top: 60px;
    span {
      color: #a34d1a;
      font-size: 36px;
      text-align: center;
      font-weight: 700;
    }
  }
}
</style>
