<template>
	<div @click="handleShowLoading">点击打开 Loading</div>
	<div @click="handleShowToast('common')">常规 Toast</div>
	<div @click="handleShowToast('success')">成功 Toast</div>
	<div @click="handleShowToast('error')">错误 Toast</div>
	<div @click="handleShowToast('warn')">警告 Toast</div>
	<div @click="handleShowToastContinuous">Toast连续弹出</div>
	<div @click="handleShowLoadingWithToast">Loading Toast 同时调起</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { Toast } from './index';
export default {
	setup() {
		onMounted(() => {});
	},
	methods: {
		handleShowLoading() {
			Toast.loading();
			Toast.loading();
			setTimeout(() => {
				Toast.close();
			}, 2000);
			setTimeout(() => {
				Toast.close();
			}, 1000);
		},
		handleShowToast(type = 'common') {
			switch (type) {
				case 'common':
					Toast.text('普通级别 Toast');
					break;
				case 'success':
					Toast.success('成功');
					break;
				case 'warn':
					Toast.warn('警告');
					break;
				case 'error':
					Toast.error('错误');
					break;
			}
		},

		handleShowToastContinuous() {
			Toast.text('1');
			Toast.text('2');
			Toast.text('3');
			Toast.text('4');
			Toast.text('5');
			Toast.text('6');
		},
		handleShowLoadingWithToast() {
			Toast.loading();
			Toast.text('1');
			Toast.text('2');
			setTimeout(() => {
				Toast.close();
			}, 2000);
		},
	},
};
</script>

<style></style>
