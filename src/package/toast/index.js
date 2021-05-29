import { createVNode, render } from "vue";
import { generateID } from "../utils/util";
import ToastComp from "./Toast.vue";
// loading text wraning error success
// position: center top
// 目标：
// 连续toast弹出 ✅
// loading Toast 无冲突 ✅
// Vue component => vNode => (render) => Dom

// 优先展示 Loading
// Loading 栈清空后再查询 toast 栈
let nowElId = "";
let nowConf = {};
let instance = null;
let loadingMap = {};
let toastList = [];
let cacheToastList = [];
const defaultOptions = {
  type: "text",
  text: "",
  duration: 1000,
  id: "toast-" + generateID(),
  mask: true,
  background: "rgba(0,0,0,.3)",
  useLock: true,
  maskDuration: 0.3,
  level: "common",
  delay: 0,
};

const _render = function (options) {
  const { id } = options;
  const div = document.createElement("div");
  div.id = id;
  instance = createVNode(ToastComp, options);
  render(instance, div);
  document.body.appendChild(div);
};

// 创建 Toast 实例
const create = (options) => {
  // 查看此时
  const { id, type } = options;
  let toastConf = {
    options: options,
  };
  // 当前没有正在加载的 toast
  if (nowElId === "") {
    nowElId = id;
    nowConf = options;
    _render(options);
  } else {
    if (type === "loading") {
      loadingMap[id] = toastConf;
    } else {
        toastList.push(toastConf);
    }
  }
};

const remove = () => {
  let isToast = true;
  if (loadingMap[nowElId]) {
    isToast = false;
  }
  if (Object.keys(loadingMap).length !== 0 && !isToast) {
    nowElId = loadingMap[Object.keys(loadingMap)[0]].options.id;
    delete loadingMap[`${nowElId}`];
  } else if (isToast && toastList.length !== 0) {
    const conf = toastList.shift()
    instance.component.ctx.hide(false);
    instance = null;
    cacheToastList.push(nowElId)
    nowElId = "";
    create(conf.options);
  } else if (Object.keys(loadingMap).length !== 0 || toastList.length !== 0) {
    instance.component.ctx.hide();
    instance = null;
    nowElId = "";
    nowConf = {};
    if (isToast) {
      create(toastList[0].config);
    } else {
      create(loadingMap[Object.keys(loadingMap)[0]].config);
    }
  } else {
    !isToast && instance.component.ctx.hide();
    instance = null;
    if (cacheToastList.length) {
        cacheToastList.push(nowElId);
        cacheToastList.map(id => {
            const dom = document.getElementById(id);
            if (dom) {
                document.body.removeChild(dom);
            }
        })
    }
    nowElId = "";
    nowConf = {};
  }
};

const clearAll = () => {
    instance = null;
    nowElId = "";
    nowConf = {};
    loadingMap = {};
    toastList = [];
    instance.component.ctx.hide();
};

export const Toast = {
  loading: (text, options) => {
    create({
      ...defaultOptions,
      ...options,
      ...{
        text: text,
        type: "loading",
        onClose: remove,
      },
    });
  },
  text: (text, options) => {
    create({
      ...defaultOptions,
      ...options,
      ...{
        text: text,
        type: "text",
        id: "toast-" + generateID(),
        onClose: remove,
      },
    });
  },
  close: () => {
    remove(nowElId);
  },
  closeAll: () => {
    clearAll();
  },
  install(app) {
    app.use(ToastComp);
    app.config.globalProperties.$toast = Toast;
  }
};
