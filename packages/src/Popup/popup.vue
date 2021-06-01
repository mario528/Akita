<template>
	<Overlay :visible="visible" :closeAble="closeAble" :backgroundColor="backgroundColor">
		<transition :name="animationName">
			<div v-show="visible" :class="popupContainerCls">
				<slot></slot>
			</div>
		</transition>
	</Overlay>
</template>

<script>
import processComponent from '../utils/base';
import Overlay from '../overlay/overlay.vue';
import { computed } from '@vue/runtime-core';
const { warpComponent } = processComponent('popup');
export default warpComponent({
	components: {
		Overlay,
	},
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
		direction: {
			type: String,
			default: 'bottom',
		},
		closeAble: {
			type: Boolean,
			default: true,
		},
		backgroundColor: {
			type: String,
			default: 'rgba(0,0,0,.2)',
		},
	},
	setup(props) {
		const animationName = computed(() => {
			return [`popup-${props.direction}`];
		});
		const popupContainerCls = computed(() => {
			return {
				'akait-popup-container': true,
				[`akait-popup-${props.direction}`]: true,
			};
		});
		return {
			animationName,
			popupContainerCls,
		};
	},
});
</script>

<style lang="scss" scoped>
@import './popup.scss';
</style>
