<template>
	<img loading="lazy" :src="sizedImage(src, height)" :alt="alt" />
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

		height: {
			type: String,
			required: false,
		},
	},

	methods: {
		sizedImage(sourceLink, height) {
			if (height) {
				return `${sourceLink}?h=${height}`;
			} else {
				return sourceLink;
			}
		},
	},
};
</script>
