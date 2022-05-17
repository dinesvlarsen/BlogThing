<template>
	<div v-if="loading">...</div>
	<div v-else>
		<h1>{{ result.title }}</h1>

		<p>{{ result.description }}</p>

		<img
			loading="lazy"
			:src="result.coverImage.image.asset.url"
			:alt="result.coverImage.alt"
		/>

		<SanityBlocks :blocks="blocks" :serializers="serializers" />
	</div>
</template>

<script>
import { SanityBlocks } from 'sanity-blocks-vue-component';
import query from '../groq/projectPage.groq?raw';
import viewMixin from '../mixins/viewMixin.js';
import CustomComponent from '../components/PostBodyImages.vue';

export default {
	components: { SanityBlocks },

	mixins: [viewMixin],

	data() {
		return {
			blocks: [],
			serializers: {
				types: {
					image: CustomComponent,
				},
			},
		};
	},

	async created() {
		await this.sanityFetch(
			query,
			{
				slug: this.$route.params.projectSlug,
			},
			this.blocks
		);

		this.metaTags({
			title: this.result.title,
			description: this.result.description,
			image: this.result.coverImage.image.asset.url,
		});
	},

	computed: {
		sanityData() {
			return this.$store.state.sanityData;
		},
	},
};
</script>
