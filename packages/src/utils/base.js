import { defineComponent } from 'vue';
const _getPrefix = () => {
	if (!window._akaitLib) {
		window._akaitLib = {};
		window._akaitLib.prefix = 'akait';
		return window._akaitLib.prefix;
	} else {
		if (window._akaitLib && window._akaitLib.prefix) {
			return window._akaitLib.prefix;
		}
	}
};

// 包装传入组件 添加 install 以便使用方按需引入
const processComponent = componentName => {
	const componentNameWithPrefix = `${_getPrefix()}-${componentName}`;
	return {
		componentNameWithPrefix,
		warpComponent: _component => {
			_component.name = componentNameWithPrefix;
			_component.realName = componentName;
			_component.install = vue => {
				// 全局导入
				vue.component(_component.name, _component);
			};
			return defineComponent(_component);
		},
	};
};

export default processComponent;
