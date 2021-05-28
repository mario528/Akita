<template>
    <transition name="toast-fade">
        <div class="akita-loading-container" :style="maskStyle" v-if="visible">
            <template v-if="type === 'loading'">
                <div class="loading">

                </div>
            </template>
            <template v-if="type !== 'loading'">

            </template>
        </div>
    </transition>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from "vue";
import processComponent from "../../utils/base";

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
        }
    },
    setup(props) {
        const toastState = reactive({
            visible: false,
        });
        onMounted(() => {
            toastState.visible = true;
        });
        const maskStyle = computed(() => {
            return {
                backgroundColor: props.background,
                transitionDuration: `${props.maskDuration}s`
            }
        })
        return {
            maskStyle,
            ...toRefs(toastState),
        }
    }
});
</script>

<style lang="scss" scoped>
@import url('./toast.scss');
</style>
