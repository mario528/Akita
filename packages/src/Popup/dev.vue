<template>
	<div @click="handleClickPopup">操作 popup</div>
	<Popup :visible="visible">
		<div class="test"></div>
	</Popup>
</template>

<script>
import Popup from './popup.vue';
export default {
	components: {
		Popup,
	},
	data() {
		return {
			visible: false,
		};
	},
	methods: {
		handleClickPopup() {
			this.visible = !this.visible;
		},
	},
};
</script>

<style>
.test {
	height: 50vh;
	width: 100vw;
	background-color: white;
}
</style>
