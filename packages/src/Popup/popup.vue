<template>
	<Overlay
		:visible="open"
		:closeAble="closeAble"
		:backgroundColor="backgroundColor"
		@overlay:click="handleMaskClick"
	>
		<Transition :name="animationName">
			<div v-show="open" :class="popupContainerCls">
				<slot></slot>
			</div>
		</Transition>
	</Overlay>
</template>

<script>
import processComponent from '../utils/base';
import Overlay from '../overlay/overlay.vue';
import { computed, onMounted, reactive, toRefs } from '@vue/runtime-core';
const { warpComponent } = processComponent('popup');
export default warpComponent({
	events: ['update:visible'],
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
	setup(props, { emit }) {
		const animationName = computed(() => {
			return `popup-${props.direction}`;
		});
		const popupContainerCls = computed(() => {
			return {
				'akait-popup-container': true,
				[`akait-popup-${props.direction}`]: true,
			};
		});
		const open = computed(() => props.visible);
		const handleMaskClick = () => {
			emit('update:visible', false);
		};

		return {
			open,
			animationName,
			popupContainerCls,
			handleMaskClick,
		};
	},
});
</script>

<style lang="scss" scoped>
@import './popup.scss';
</style>
