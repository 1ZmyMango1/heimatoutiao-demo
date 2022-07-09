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
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs swipeable animated class="channel-tabs">
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
      <van-cell style="text-align: center" title="频道编辑"></van-cell>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/HomeChannel.js'
import ArticleList from './commponents/article-list.vue'
export default {
  components: {
    ArticleList
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
    async getUserChannels() {
      const res = await getUserChannels()
      // console.log(res)
      this.userChannel = res.data.data.channels
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
