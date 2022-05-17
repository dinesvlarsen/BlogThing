<template>
	<img :src="image" alt="Decorative image" />
</template>

<script>
export default {
	props: ['image'],
	created() {
		console.log(this.image);
	},
};
</script>
