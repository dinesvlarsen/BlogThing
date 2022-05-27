<template>
	<Loading v-if="loading" />

	<div v-else>
		<section class="post__intro">
			<h1 class="post__heading">{{ result.title }}</h1>
			<p class="post__description">{{ result.description }}</p>
			<time class="post__time" :datetime="result.date">{{ result.date }}</time>
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
			<CommentSection :id="this.result._id" :restCountries="restCountries" />
		</section>
	</div>
</template>

<style>
.post__intro > *:not(img),
.post__main > *:not(div) {
	margin-left: 32px;
	margin-right: 32px;
}
.post__heading {
	font-size: var(--36px);
	margin-bottom: var(--16px);
}

.post__description {
	font-size: var(--20px);
	margin-bottom: var(--16px);
	line-height: var(--line-height);
}

.post__time {
	display: block;
	margin-bottom: var(--48px);
	font-size: var(--14px);
	font-weight: 500;
	color: var(--secondary);
}

.post__image {
	margin-bottom: var(--32px);
}

.post__main p:not(p:last-child),
.post__main img {
	margin-bottom: var(--32px);
}

.post__main p {
	font-size: var(--18px);
	line-height: var(--line-height);
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
			restCountries: [],
		};
	},

	async beforeRouteUpdate(to, _, next) {
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

		this.getRestCountries();

		this.scrollToTop();
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

		async getRestCountries() {
			await fetch('https://restcountries.com/v3.1/all')
				.then((response) => response.json())
				.then((data) => (this.restCountries = data));
		},
	},
};
</script>
