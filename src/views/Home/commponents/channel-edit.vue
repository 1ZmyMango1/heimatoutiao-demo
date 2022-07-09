<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell style="text-align: center" title="频道编辑"></van-cell>

    <van-cell title="我的频道">
      <template #default>
        <van-button
          class="vt-btn"
          round
          plain
          size="mini"
          type="danger"
          @click="isEdit = !isEdit"
          >{{ isEdit ? '完成' : '编辑' }}
        </van-button>
        <!-- 给button点击事件 -->
      </template>
    </van-cell>

    <van-grid :gutter="10" class="my-icon">
      <!-- 加一个右上角删除按钮 -->
      <van-grid-item
        class="channel-grid"
        v-for="(item, index) in userChannel"
        :key="item.id"
        @click="onMyChannelClick(item, index)"
      >
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <!-- 父组件给的值 在这渲染到页面上 -->
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            item.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"></van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="recommend-grid"
        v-for="item in recommendChannel"
        :key="item.id"
        @click="addChannel(item)"
      >
        <template #text>
          <span class="text"><van-icon name="plus" /> {{ item.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
// import { differenceBy } from 'lodash ' // 引入lodash库  便于使用
import { Notify } from 'vant'
import { getAllChannels } from '@/api/HomeChannel.js'
export default {
  name: 'ChannelEdit',
  components: {},
  // home传过来的值接收一下
  props: {
    userChannel: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number
    }
  },
  data() {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  computed: {
    // 推荐频道
    recommendChannel() {
      return this.allChannels.filter((item) => {
        return !this.userChannel.some((userItem) => userItem.id === item.id)
      })
    }
    // recommendChannel() {
    //   return differenceBy(this.allChannels, this.userChannel, 'id')
    // }
  },
  watch: {},
  created() {
    this.getAllChannels()
  },
  mounted() {},
  methods: {
    // 获取全部频道列表
    async getAllChannels() {
      const res = await getAllChannels()
      //   console.log(res)
      this.allChannels = res.data.data.channels
    },
    // 添加频道到 我的频道
    addChannel(item) {
      this.userChannel.push(item)
      return Notify({ type: 'success', message: '添加成功~~' })
    },
    // 点击切换或者删除我的编辑选项
    onMyChannelClick(item, index) {
      // 判断是否处于编辑状态
      if (this.isEdit) {
        // 处于编辑状态   删除
        //  编辑状态 >> 点击频道 >> 删除频道
        //  点击索引 大于 选中索引(active) --> 直接删除
        //  点击索引小于等于 >> 选中索引(active) >> 先删除/选中状态-1(同时当前频道弹层不能关闭)
        if (index === 0) {
          return Notify({ type: 'danger', message: '都说了不让删 你还删~' })
        }
        if (index <= this.active) {
          this.$emit('changeActive', this.active - 1, true)
        }
        this.userChannel.splice(index, 1)
        return Notify({ type: 'success', message: '删除成功' })
      } else {
        // 非编辑状态 -->切换 -->关弹层
        this.$emit('changeActive', index, false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  .vt-btn {
    width: 100px;
  }

  /deep/ .channel-grid {
    .van-grid-item__content {
      background-color: #f4f5f6;
    }

    .text {
      font-size: 24px;
      color: #222;
      margin-top: 0;

      &.active {
        color: red;
      }
    }
  }

  /deep/ .recommend-grid {
    .van-grid-item__content {
      background-color: #f4f5f6;
    }

    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
  }

  .my-icon {
    /deep/.van-icon-clear {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 30px;
      color: #cacaca;
    }
  }

  /deep/.van-grid-item__icon-wrapper {
    position: unset;
  }
}
</style>
