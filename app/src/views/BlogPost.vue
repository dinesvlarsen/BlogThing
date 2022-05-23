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

		<LatestArticles />

		<CommentSection :id="this.result._id" />
	</div>
</template>

<script>
import { SanityBlocks } from 'sanity-blocks-vue-component';
import BlockImages from '../components/BlockImages.vue';
import CommentSection from '../components/CommentSection.vue';
import LatestArticles from '../components/LatestArticles.vue';

import query from '../groq/blogPost.groq?raw';
import viewMixin from '../mixins/viewMixin.js';

export default {
	components: { SanityBlocks, CommentSection, LatestArticles },

	mixins: [viewMixin],

	data() {
		return {
			blocks: [],
			serializers: {
				types: {
					figure: BlockImages,
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
