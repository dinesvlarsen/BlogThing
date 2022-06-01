<template>
	<img loading="lazy" :src="src" :alt="alt" width="400px" height="300px" />
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			required: true,
		},
		alt: {
			type: String,
			required: false,
		},
	},

	methods: {
		smallImage(sourceLink) {
			return `${sourceLink}?h=271`;
		},
	},
};
</script>
