<template>
  <div class="user-profile">
    <van-nav-bar title="个人中心">
      <template #left>
        <van-icon color="white" name="arrow-left" @click="$router.back()"
      /></template>
    </van-nav-bar>

    <input type="file" hidden ref="input" @change="fileChange" />
    <van-cell title="头像" is-link center @click="clickInput">
      <template #default>
        <van-image round class="image" :src="userInfo.photo"></van-image>
      </template>
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="userInfo.name"
      @click="isShowPopup = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="userInfo.gender === 1 ? '女' : '男'"
      @click="isShowPopupSex = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="userInfo.birthday"
      @click="isShowPopupYear = true"
    />

    <!-- 设置昵称的弹层 -->
    <van-popup
      v-model="isShowPopup"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-nav-bar title="设置昵称">
        <template #left>
          <span @click="isShowPopup = false">取消</span>
        </template>
        <template #right>
          <span @click="submitNickName">完成</span>
        </template>
      </van-nav-bar>
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        :placeholder="userInfo.name"
        show-word-limit
      />
    </van-popup>

    <!-- 设置性别的弹层 -->
    <van-popup
      v-model="isShowPopupSex"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <userSex :userInfo="userInfo" @close="isShowPopupSex = false"></userSex>
    </van-popup>

    <!-- 设置生日的弹层 -->
    <van-popup
      v-model="isShowPopupYear"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <userYear
        @close="isShowPopupYear = false"
        v-model="userInfo.birthday"
      ></userYear>
    </van-popup>

    <!-- 设置头像的弹层 -->
    <van-popup
      v-model="isShowImg"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UserImg
        v-model="userInfo.photo"
        @close="isShowImg = false"
        :img="img"
      ></UserImg>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile, getUserName } from '@/api/user.js'
import userSex from './user-sex/index.vue'
import userYear from './user-year/index.vue'
import UserImg from './user-img/index.vue'
export default {
  name: 'UserProfile',
  components: { userSex, userYear, UserImg },
  data() {
    return {
      userInfo: [],
      isShowPopup: false,
      isShowPopupSex: false,
      isShowPopupYear: false,
      isShowImg: false,
      message: '',
      img: ''
    }
  },
  created() {
    this.getUserProfile()
  },
  methods: {
    async getUserProfile() {
      const res = await getUserProfile()
      console.log(res)
      this.userInfo = res.data.data
    },
    // 设置昵称
    async submitNickName() {
      await getUserName({
        name: this.message
      })
      this.userInfo.name = this.message
      this.isShowPopup = false
    },
    clickInput() {
      this.$refs.input.click()
    },
    fileChange(e) {
      const file = e.target.files[0]
      console.log(file)
      // 拿到图片的预览地址
      const url = URL.createObjectURL(file)
      console.log(url)
      // 获取到文件
      this.img = url
      this.isShowImg = true
      this.$refs.file.value = ''
    }
  }
}
</script>
<style lang="less" scoped>
.image {
  width: 80px;
}
</style>
