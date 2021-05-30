<template>
	<transition name="toast-fade" @after-leave="afterLeave">
		<div class="akita-toast-container" :style="maskStyle" v-if="visible">
			<template v-if="type === 'loading'">
				<div class="akita-loading-box">
					<img class="akita-loading-icon" src="../../../assets/loading.png" />
					<div class="akita-loading-text" v-if="text">{{ text }}</div>
				</div>
			</template>
			<template v-if="type !== 'loading'">
				<div :class="toastCls">
					<img
						v-if="level !== 'common'"
						:src="`../../../assets/${level}.png`"
						class="akita-toast-icon"
					/>
					<div>{{ text }}</div>
				</div>
			</template>
		</div>
	</transition>
</template>

<script>
import { reactive, toRefs, onMounted, computed, onUnmounted } from 'vue';
import processComponent from '../utils/base';
import useScroll from '../utils/useScroll';

const { warpComponent } = processComponent('toast');
export default warpComponent({
	props: {
		id: {
			type: String,
			default: 'toast',
		},
		text: {
			type: String,
			default: '',
		},
		type: {
			type: String,
			default: 'text',
			validator: val => {
				if (!['text', 'warn', 'error', 'success', 'loading'].includes(val)) {
					throw new Error('Toast: type 输入参数有误');
				}
				return true;
			},
		},
		background: {
			type: String,
			default: 'rgba(0,0,0,.3)',
		},
		maskDuration: {
			type: [Number, String],
			default: 0.3,
		},
		level: {
			type: String,
			default: 'common',
		},
		duration: {
			type: Number,
			default: 500,
		},
		onClose: {
			type: Function,
			default: () => {},
		},
		removeDom: {
			type: Function,
			default: () => {},
		},
		useLock: {
			type: Boolean,
			default: false,
		},
	},
	setup(props) {
		let timer = null;
		const [lock, unLock] = useScroll();
		const toastState = reactive({
			visible: false,
		});
		onMounted(() => {
			if (props.useLock) {
				lock();
			}
			toastState.visible = true;
			if (props.type === 'text') {
				timer = setTimeout(() => {
					hide();
					clearTimeout(timer);
					timer = null;
				}, props.duration);
			}
		});
		const maskStyle = computed(() => {
			return {
				backgroundColor: props.background,
				transitionDuration: `${props.maskDuration}s`,
			};
		});
		const toastCls = computed(() => {
			return {
				'akita-toast-box': true,
				'akita-toast-box-common': props.level === 'common',
				'akita-toast-box-success': props.level === 'success',
				'akita-toast-box-error': props.level === 'error',
				'akita-toast-box-warn': props.level === 'warn',
			};
		});
		const hide = (flag = true) => {
			if (props.useLock) {
				unLock();
			}
			toastState.visible = false;
			if (props.type === 'text' && flag) {
				props.onClose();
			}
		};
		const afterLeave = () => {
			props.removeDom && props.removeDom();
		};

		return {
			hide,
			maskStyle,
			toastCls,
			afterLeave,
			...toRefs(toastState),
		};
	},
});
</script>

<style lang="scss" scoped>
@import './toast.scss';
</style>
