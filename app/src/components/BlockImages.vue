<template>
	<div>
		<img :src="image.asset.url" :alt="alt" />
		<p>{{ alt }}</p>
	</div>
</template>

<script>
export default {
	props: ['alt', 'image'],
};
</script>
