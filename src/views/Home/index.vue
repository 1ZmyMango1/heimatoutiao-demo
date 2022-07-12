<template>
  <div class="home">
    <!-- 搜索title -->
    <van-nav-bar fixed>
      <template #title>
        <van-button
          class="search-btn"
          icon="search"
          round
          type="info"
          size="small"
          to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs swipeable animated class="channel-tabs" v-model="active">
      <van-tab
        v-for="(item, index) in userChannel"
        :key="index"
        :title="item.name"
      >
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn" @click="showPopup = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>

    <!-- 弹出层 频道编辑 -->
    <van-popup
      close-icon-position="top-left"
      closeable
      v-model="showPopup"
      position="bottom"
      style="height: 90%"
    >
      <!-- 传给子组件 channel-edit -->
      <!-- active 是父组件选中当前的内容索引号 -->
      <ChannelEdit
        :active="active"
        :userChannel="userChannel"
        @changeActive="changeActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/HomeChannel'
import ArticleList from './commponents/article-list.vue'
import ChannelEdit from './commponents/channel-edit.vue'
import USERCHANNELKEY from '../../constants'
import { getLocal } from '../../utils/storage'
export default {
  name: 'home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      showPopup: false,
      active: 0,
      userChannel: []
    }
  },
  created() {
    this.getUserChannels()
  },
  methods: {
    // 获取用户频道列表
    async getUserChannels() {
      // const res = await getUserChannels()
      // // console.log(res)
      // this.userChannel = res.data.data.channels

      // 如果用户登录 | 本地没有数据 ---接口
      // 其他 -- 本地存储
      try {
        // 获取用户token
        const token = this.$store.state.user?.token
        // 获取本地存储频道数据
        let channel = getLocal(USERCHANNELKEY)
        if (token || !channel) {
          const res = await getUserChannels()
          console.log(res)
          channel = res.data.data.channels
        }
        this.userChannel = channel
      } catch (e) {
        console.log(e)
      }
    },
    // 修改active的方法
    changeActive(index, state) {
      this.active = index
      // 弹层关闭
      this.showPopup = state
    }
  }
}
</script>

<style scoped lang="less">
.home {
  padding: 180px 0 110px 0;
  .van-icon-search:before {
    color: #fff;
  }
  .search-btn {
    background-color: #5babfb;
    width: 100%;
    border: none;
  }
  /deep/.van-nav-bar__title {
    width: 75%;
    max-width: unset;
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }

    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
    }
  }
}
</style>
