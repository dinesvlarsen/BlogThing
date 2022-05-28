<template>
	<Loading v-if="loading" />

	<div class="fade-in" v-else>
		<section class="post__intro">
			<h1 class="post__heading">{{ result.title }}</h1>
			<p class="post__description">{{ result.description }}</p>
			<time class="post__time" :datetime="formattedDate">{{
				formattedDate
			}}</time>
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
			<CommentSection
				:id="this.result._id"
				:restCountries="restCountries"
				:country="country"
				:comments="comments"
				:queryForComments="queryForComments"
			/>
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
import commentsQuery from './../groq/comments.groq?raw';
import sanity from './../sanity';
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
			country: '',
			comments: [],
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

		this.getCountry();
		this.getRestCountries();
		this.queryForComments(this.$route.params.projectSlug);
		this.scrollToTop();
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

		this.queryForComments(to.params.projectSlug);
		this.scrollToTop();
		next();
	},

	methods: {
		//Takes in a date, which we use to generate a date object with new Date(). Which we convert to a language sensitive string ('en-US') with the specified options.
		//toLocalString documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
		formatDate(date) {
			const options = {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			};

			return new Date(date).toLocaleString('en-US', options);
		},

		scrollToTop() {
			window.scrollTo(0, 0);
		},

		async getRestCountries() {
			await fetch('https://restcountries.com/v3.1/all')
				.then((response) => response.json())
				.then((data) => (this.restCountries = data));
		},

		async queryForComments(to) {
			await sanity
				.fetch(commentsQuery, {
					slug: to,
				})
				.then((data) => {
					//Spreads the data from the response into the localComments, so we get an array, instead of an object with an array.
					this.comments = [...data.comments];
				});
		},

		async getCountry() {
			await fetch('http://ip-api.com/json/?fields=status,message,country')
				.then((response) => response.json())
				.then((data) => (this.country = data.country))
				.catch((e) =>
					console.error(e + ' : Might be ad block blocking the api')
				);
		},
	},

	computed: {
		formattedDate() {
			return this.formatDate(this.result.date);
		},
	},
};
</script>
