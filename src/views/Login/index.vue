<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="titleLogin" />
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>
<style scoped lang="less">
.titleLogin {
  background-color: #3196fa;
}

/deep/.van-nav-bar__title {
  color: #fff;
}
</style>
