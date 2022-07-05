<template>
  <div class="login-container">
    <!-- title -->
    <van-nav-bar title="登录" />

    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="from">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        type="number"
        :maxlength="11"
      >
        <template #left-icon>
          <toutiao-icon icon="shouji"></toutiao-icon>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        :maxlength="6"
      >
        <template #left-icon>
          <toutiao-icon icon="yanzhengma"></toutiao-icon>
        </template>

        <template #button>
          <van-count-down
            v-if="isShowCount"
            @finish="isShowCount = false"
            :time="5000"
            format="ss s"
          />
          <van-button
            v-else
            native-type="button"
            class="end-sms-btn"
            size="small"
            :disabled="isDisabled"
            @click="onSmsCode"
            >验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import ToutiaoIcon from '../../components/ToutiaoIcon.vue'
import { Login, getSumCode } from '@/api/Login'
import { Toast } from 'vant'

export default {
  components: { ToutiaoIcon },
  name: 'LoginPage',
  data() {
    return {
      user: {
        mobile: '13911111112',
        code: '246810'
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ]
      },
      isShowCount: false,
      isDisabled: false
    }
  },
  methods: {
    // 表单验证
    async onSubmit() {
      try {
        const res = await Login(this.user)
        console.log(res)
        Toast.success('登录成功')
      } catch (e) {
        console.log(e)
        Toast.fail(e?.response?.data?.message || '登录失败')
      }
    },
    // 验证码验证
    async onSmsCode() {
      try {
        // 进行单个表单校验
        await this.$refs.from.validate('mobile')
      } catch (e) {
        console.log(e)
        return
      }
      try {
        this.isDisabled = true

        // 调取验证码接口
        await getSumCode(this.user.mobile)
        this.isShowCount = true

        // 成功提示
        Toast.success('发送验证码成功')
      } catch (e) {
        // 验证码失败的提示
        Toast.fail(e.response.data.message || '获取失败')
        this.isShowCount = false
      } finally {
        this.isDisabled = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  /deep/.toutiao {
    font-size: 37px;
  }
  .end-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
