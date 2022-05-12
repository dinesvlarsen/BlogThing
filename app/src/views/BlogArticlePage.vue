<template>
	<div v-if="loading">...</div>
	<pre v-else>result: {{ JSON.stringify(result, null, 3) }}</pre>
	<div v-else>
		<h1>{{ result.title }}</h1>

		<p>{{ result.description }}</p>

		<img
			loading="lazy"
			:src="result.coverImage.image.asset.url"
			:alt="result.coverImage.alt"
		/>
		<!-- <p v-for="paragraph in result.body">{{ paragraph.children.text }}</p> -->
		<SanityBlocks :blocks="blocks" />

		<!-- <hr />

		<p v-for="paragraph in blocks">{{ paragraph.children[0].text }}</p> -->
	</div>
</template>

<script>
import { SanityBlocks } from 'sanity-blocks-vue-component';
import query from '../groq/projectPage.groq?raw';
import viewMixin from '../mixins/viewMixin.js';

export default {
	components: { SanityBlocks },

	mixins: [viewMixin],

	data() {
		return {
			blocks: [],
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
			// image: this.result.documentation[0].asset.url,
		});
	},

	computed: {
		sanityData() {
			return this.$store.state.sanityData;
		},
	},
};
</script>
