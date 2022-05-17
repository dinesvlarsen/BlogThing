<template>
	<div>
		<img v-if="asset.url" :src="asset.url" alt="Decorative image" />
	</div>
</template>

<script>
export default {
	props: ['asset'],

	created() {},
};
</script>
