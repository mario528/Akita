<template>
  <div @click="handleShowToast">点击打开 Loading</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { Toast } from './index';
export default {
    setup() {
        onMounted(() => {

        })
    },
    methods: {
        handleShowToast() {
            Toast.loading()
        }
    }
}
</script>

<style>

</style>