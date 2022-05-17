<template>
	<img :src="image" alt="" />
	<div>THIS IS COMPONENT</div>
</template>

<script>
export default {
	props: ['image'],
	created() {
		console.log(this.image);
	},
};
</script>
