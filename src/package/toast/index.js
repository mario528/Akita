import { createVNode, render } from 'vue';
import { generateID } from '../../utils/util';
import ToastComp from './Toast.vue';
// loading text wraning error success
// position: center top
// 目标：连续弹出toast loading 支持延迟
// Vue component => vNode => (render) => Dom

// 优先展示 Loading
// Loading 栈清空后再查询 toast 栈
let nowElId = ''
const loadingList = [];
const toastList = [];
const defaultOptions = {
    type: 'text',
    text: '',
    duration: 500,
    id: "toast-" + generateID(),
    mask: true,
    background: 'rgba(0,0,0,.3)',
    useLock: true,
    maskDuration: 0.3,
};

const create = (text, options) => {
    // 查看此时
    const { id, type } = options;
    if (nowElId === '') {
        const div = document.createElement('div');
        div.id = id;
        const instance = createVNode(ToastComp, options);
        render(instance, div);
        document.body.appendChild(div);
    }
}

const remove = () => {

}

const clearAll = () => {

}

export const Toast = {
    loading: (text, options) => {
        create(text, {
            ...defaultOptions,
            ...options,
            ...{
                type: 'loading'
            }
        });
    }
}