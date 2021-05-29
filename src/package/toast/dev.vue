<template>
  <div @click="handleShowLoading">点击打开 Loading</div>
  <div @click="handleShowToast">点击打开 Toast</div>
  <div @click="handleShowLoadingWithToast">Loading with Toast</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { Toast } from './index';
export default {
    setup() {
        onMounted(() => {})
    },
    methods: {
        handleShowLoading() {
            Toast.loading()
            Toast.loading()
            setTimeout(() => {
                Toast.close()
            }, 2000);
            setTimeout(() => {
                Toast.close()
            }, 6000);
        },
        handleShowToast() {
            Toast.text('1');
            Toast.text('2');
            Toast.text('3');
            Toast.text('4');
            Toast.text('5');
            Toast.text('6');
        },
        handleShowLoadingWithToast () {
            Toast.loading();
            Toast.text('1');
            Toast.text('2');
            setTimeout(() => {
                Toast.close()
            }, 2000);
        }
    }
}
</script>

<style>

</style>