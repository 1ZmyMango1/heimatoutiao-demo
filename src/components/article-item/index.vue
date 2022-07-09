<template>
  <div class="article-item">
    <van-cell :title="article.title">
      <template #default v-if="article.cover.type === 1">
        <van-image
          class="vt-right-img"
          :src="article.cover.images[0]"
        ></van-image>
      </template>
      <template #label>
        <div class="vt-bottom-img" v-if="article.cover.type === 3">
          <van-image
            class="vt-bottom-img"
            v-for="(item, index) in article.cover.images"
            :key="index"
            :src="item"
          ></van-image>
        </div>
        <div class="vt-bottom-text">
          <span>{{ article.aut_name }}</span
          ><span>{{ article.comm_count }}</span
          ><span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="less">
/deep/ img {
  width: 200px;
  height: 200px;
}

.van-cell__value {
  flex: unset;
}

/deep/ .vt-bottom-img {
  display: flex;
  justify-content: space-between;
}

/deep/ .vt-bottom-text {
  span {
    margin-right: 20px;
  }
}

.van-cell__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
