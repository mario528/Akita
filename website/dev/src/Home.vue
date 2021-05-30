<template>
	<div class="page">
		<div
			class="comp-item"
			v-for="comp in compList"
			:key="comp.path"
			@click="handleGoCompPage(comp.path)"
		>
			{{ comp.title }}
		</div>
	</div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
export default {
	setup() {
		const pageState = reactive({
			compList: [],
		});
		const router = useRouter();
		pageState.compList.push(
			...router.options.routes
				.map(route => {
					if (route.name !== '/') {
						return {
							title: route.meta.title,
							path: route.path,
						};
					}
				})
				.filter(item => item && item),
		);
		const handleGoCompPage = path => {
			router.push(path);
		};
		return {
			handleGoCompPage,
			...toRefs(pageState),
		};
	},
};
</script>

<style lang="scss" scoped>
.page {
	padding: 15px;
}
.comp-item {
	font-size: 24px;
	font-weight: 500;
	padding: 15px 0;
	border-bottom: 1px solid #eeeeee;
}
</style>
