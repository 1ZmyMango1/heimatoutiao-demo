<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择生日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { getUserName } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'userYear',
  props: {
    value: { type: String }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '加载中···'
      })
      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await getUserName({
          birthday: currentDate
        })
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast.success('更改生日成功')
      } catch (e) {
        this.$toast.fail('更新生日失败')
      }
    },
    onCancel() {
      this.$emit('close')
    }
  }
}
</script>

<style></style>
