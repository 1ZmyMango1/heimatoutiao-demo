<template>
  <div>
    <!-- <van-nav-bar title="选择性别"> -->
    <!-- <template #left>
        <span @click="$emit('close')">取消</span>
      </template>
      <template #right>
        <span @click="submitSex">完成</span>
      </template>
    </van-nav-bar> -->

    <van-picker
      title="编辑性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      :default-index="userInfo.gender"
    />
  </div>
</template>

<script>
import { getUserName } from '@/api/user.js'
export default {
  name: 'userSex',
  props: {
    userInfo: {
      type: Object
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      gender: null
    }
  },
  methods: {
    async onConfirm(value) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中···'
      })
      try {
        // async onConfirm(...[, index]) {
        value === '男' ? (this.gender = 0) : (this.gender = 1)
        // console.log(value)
        await getUserName({
          gender: this.gender
          // gender: index
        })
        this.userInfo.gender = this.gender
        this.$toast.success('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败')
      }

      // this.userInfo.gender = index
      this.$emit('close')
    },
    onCancel() {
      this.$emit('close')
    }
  }
}
</script>

<style></style>
