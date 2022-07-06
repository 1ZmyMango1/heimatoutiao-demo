<template>
  <div>
    <h1>demo</h1>
    <hr />
    <h3>{{ count }}</h3>
    <p>{{ $store.state.userInfo.name }}</p>
    <span>{{ $store.state.userInfo.age }}</span>

    <hr />
    <input type="number" v-model.number="num" />
    <hr />
    <button @click="countChange">点击count++</button>
    <hr />
    <button @click="changeName">点击更换名字</button>
    <hr />
    <button @click="changeCount">加加</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      num: 0
    }
  },
  methods: {
    countChange() {
      this.$store.commit('changeCount')
    },
    changeName() {
      this.$store.commit('changeName')
    },
    changeCount() {
      this.$store.commit('changeCount2', this.num)
    }
  },
  computed: {
    ...mapState(['count'])
  }
}
</script>

<style></style>
