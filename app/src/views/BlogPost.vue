<template>
	<Loading v-if="loading" />

	<div v-else>
		<section class="post__intro">
			<h1 class="post__heading">{{ result.title }}</h1>
			<p class="post__description">{{ result.description }}</p>
			<img
				class="post__image"
				loading="lazy"
				:src="result.coverImage.image.asset.url"
				:alt="result.coverImage.alt"
			/>
		</section>

		<main class="post__main">
			<SanityBlocks :blocks="blocks" :serializers="serializers" />
		</main>

		<section>
			<LatestArticles :articles="result.articles" />
		</section>

		<section>
			<CommentSection :id="this.result._id" />
		</section>
	</div>
</template>

<style>
.post__heading {
	font-size: 2.25rem;
	margin-bottom: 16px;
}
</style>

<script>
import { SanityBlocks } from 'sanity-blocks-vue-component';
import BlockImages from '../components/BlockImages.vue';
import CommentSection from '../components/CommentSection.vue';
import LatestArticles from '../components/LatestArticles.vue';
import Loading from '../components/Loading.vue';

import query from '../groq/blogPost.groq?raw';
import viewMixin from '../mixins/viewMixin.js';

export default {
	components: { SanityBlocks, CommentSection, LatestArticles, Loading },

	mixins: [viewMixin],

	data() {
		return {
			blocks: [],
			serializers: {
				types: {
					figure: BlockImages,
				},
			},
			loading: true,
			loadingDots: '',
		};
	},
	async beforeRouteUpdate(to, from, next) {
		this.loading = true;
		await this.sanityFetch(
			query,
			{
				slug: to.params.projectSlug,
			},
			this.blocks
		);

		this.metaTags({
			title: this.result.title,
			description: this.result.description,
			image: this.result.coverImage.image.asset.url,
		});

		this.scrollToTop();
		next();
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

	methods: {
		scrollToTop() {
			window.scrollTo(0, 0);
		},
	},
};
</script>
