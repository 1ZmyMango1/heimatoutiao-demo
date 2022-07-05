module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    'postcss-pxtorem': {
      // vant组建的rootValue设置为37.5
      // 区分设置
      rootValue: (arg) => {
        // 处理的文件对象
        // px---> rem
        // 动态设置
        // 如果我们自己写的样式  75
        // 如果是vant组件的样式37.5
        // console.log(arg)
        // 判断需要处理的样式文件是否是vant组件
        // 如果是返回37.5
        // 如果不是返回75
        return arg.file.includes('vant') ? '37.5' : '75'
      },
      propList: ['*']
    }
  }
}
