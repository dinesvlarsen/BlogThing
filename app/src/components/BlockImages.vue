<template>
	<div>
		<img v-if="alt" :src="image.asset.url" :alt="alt" />
		<img v-else :src="image.asset.url" alt="" />
	</div>
</template>

<script>
export default {
	props: ['alt', 'image'],
};
</script>
