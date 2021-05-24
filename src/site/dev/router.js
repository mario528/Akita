import { createWebHashHistory, createRouter } from 'vue-router';
import Home from './src/Home.vue';

let routes = [{
    path: '/',
    name: '/',
    component: Home,
}];

// 遍历 package.json 中的组件 使用Vite Glob批量导入到 routes 中
// const compDemoModules = import.meta.glob()


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;