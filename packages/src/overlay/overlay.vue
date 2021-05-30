<template>
	<Teleport :to="teleportId">
		<transition name="overlay-fade">
			<div
				v-show="visible"
				:class="overlayCls"
				:style="overlayStyle"
				@click="handleClickOverlay"
			>
				<slot></slot>
			</div>
		</transition>
	</Teleport>
</template>

<script>
import { computed, watch } from '@vue/runtime-core';
import processComponent from '../utils/base';
import useScroll from '../utils/useScroll';
const { warpComponent } = processComponent('overlay');
export default warpComponent({
	props: {
		teleportId: {
			type: String,
			default: 'body',
		},
		visible: {
			type: Boolean,
			default: false,
		},
		duration: {
			type: [Number, String],
			default: 0.2,
		},
		backgroundColor: {
			type: String,
			default: 'rgba(0,0,0,.4)',
		},
		closeAble: {
			type: Boolean,
			default: true,
		},
		useLock: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['overlay:click'],
	setup(props, { emit }) {
		const [lock, unLock] = useScroll();
		const overlayCls = computed(() => {
			return {
				'overlay-container': true,
			};
		});
		const overlayStyle = computed(() => {
			return {
				animationDuration: `${props.duration}s`,
				backgroundColor: props.backgroundColor,
			};
		});
		watch(
			() => props.visible,
			newValue => {
				if (props.useLock) {
					if (newValue) {
						lock();
					} else {
						unLock();
					}
				}
			},
		);
		const handleClickOverlay = () => {
			if (props.closeAble) {
				emit('overlay:click');
			}
		};
		return {
			overlayCls,
			overlayStyle,
			handleClickOverlay,
		};
	},
});
</script>

<style lang="scss" scoped>
@import url('./overlay.scss');
</style>
