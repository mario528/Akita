<template>
    <transition name="toast-fade">
        <div class="akita-toast-container" :style="maskStyle" v-if="visible">
            <template v-if="type === 'loading'">
                <div class="akita-loading-box">
                    <img class="akita-loading-icon" src="../../../assets/loading.png" />
                    <div class="akita-loading-text" v-if="text">{{text}}</div>
                </div>
            </template>
            <template v-if="type !== 'loading'">
                <div :class="toastCls">
                    <div>{{ text }}</div>
                </div>
            </template>
        </div>
    </transition>
</template>

<script>
import { reactive, toRefs, onMounted, computed, onUpdated } from "vue";
import processComponent from "../utils/base";

const { warpComponent } = processComponent("toast");
export default warpComponent({
    props: {
        id: {
            type: String,
            default: 'toast'
        },
        text: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text',
            validator: (val) => {
                if (!['text', 'warn', 'error', 'success', 'loading'].includes(val)) {
                    throw new Error('Toast: type 输入参数有误')
                }
                return true;
            }
        },
        background: {
            type: String,
            default: 'rgba(0,0,0,.3)'
        },
        maskDuration: {
            type: [Number, String],
            default: 0.3,
        },
        level: {
            type: String,
            default: 'common'
        },
        duration: {
            type: Number,
            default: 500,
        },
        onClose: {
            type: Function,
            default: () => {},
        }
    },
    setup(props) {
        let timer = null;
        const toastState = reactive({
            visible: false,
        });
        onMounted(() => {
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
                transitionDuration: `${props.maskDuration}s`
            }
        });
        const toastCls = computed(() => {
            return {
                'akita-toast-box': true,
                'akita-toast-box-common': props.level === 'common',
            }
        })
        const hide = (flag = true) => {
            toastState.visible = false;
            if (props.type === 'text' && flag) {
                props.onClose();
            }
        }
        return {
            hide,
            maskStyle,
            toastCls,
            ...toRefs(toastState),
        }
    }
});
</script>

<style lang="scss" scoped>
@import './toast.scss';
</style>
