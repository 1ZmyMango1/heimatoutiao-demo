<template>
  <div>
    <van-button
      v-if="value"
      @click="follow"
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="isFollowLoading"
      >关注</van-button
    >
    <van-button
      :loading="isFollowLoading"
      v-else
      @click="follow"
      class="follow-btn"
      round
      size="small"
      >已关注</van-button
    >
  </div>
</template>

<script>
import { deleteFollow, addFollow } from '@/api/user'

export default {
  props: {
    // is_followed: {
    //   type: Boolean,
    //   required: true
    // },
    autId: {
      type: [String, Number],
      required: true
    },
    value: {
      type: [Boolean]
    }
  },
  data() {
    return {
      isFollowLoading: false
    }
  },
  methods: {
    // 关注
    async follow() {
      this.isFollowLoading = true
      try {
        // 调用接口，关注/取消关注/ 当前作者
        if (this.value) {
          // 取消关注
          await deleteFollow(this.autId)
        } else {
          // 去关注
          await addFollow(this.autId)
        }
        // this.is_followed = !this.is_followed
        this.$emit('input', !this.value)

        // 关注之后进行提示
        this.$notify({
          type: 'success',
          message: this.value ? '关注成功' : '取消成功'
        })

        this.isFollowLoading = false
      } catch (e) {
        console.log(e)
        this.$notify({
          type: 'danger',
          message: '操作失败'
        })
      }

      this.isFollowLoading = false
    }
  }
}
</script>

<style></style>
