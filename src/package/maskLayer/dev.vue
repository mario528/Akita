<template>
    <Overlay :visible="show" @overlay:click="changeOverlay"></Overlay>
    <div @click="changeOverlay">测试 Overlay</div>
</template>

<script>
import Overlay from './overlay.vue';
export default {
  components: {
    Overlay
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    changeOverlay() {
      this.show = !this.show;
    }
  }
}
</script>

<style>

</style>