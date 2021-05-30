import { createWebHashHistory, createRouter } from 'vue-router';
import Home from './src/Home.vue';

let routes = [
	{
		path: '/',
		name: '/',
		component: Home,
	},
];

// 遍历 package.json 中的组件 使用Vite Glob批量导入到 routes 中
const compDemoModules = import.meta.glob('../../packages/src/**/dev.vue');
const REG = /\..\/..\/packages\/src\/(.*)\/dev.vue/;
for (const path in compDemoModules) {
	const compName = REG.exec(path)[1];
	routes.push({
		path: `/${compName}`,
		name: `/${compName}`,
		meta: {
			title: compName,
		},
		component: compDemoModules[path],
	});
}

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach((to, from) => {
	if (to.meta && to.meta.title) {
		document.title = to.meta.title;
	}
});

export default router;
