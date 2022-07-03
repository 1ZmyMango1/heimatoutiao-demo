<template>
  <div>
    <!-- 封装 -->
    <i :class="['toutiao', `toutiao-${icon}`]"></i>
  </div>
</template>

<script>
export default {
  // 父传子
  props: {
    icon: {
      type: String
    }
  }
}
</script>

<style></style>
