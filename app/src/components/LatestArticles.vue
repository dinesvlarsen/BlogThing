<template>
	<div>
		<div v-for="article in articles" :key="article._id">
			<img
				:src="article.coverImage.image.asset.url"
				:alt="article.coverImage.alt"
			/>
			<router-link @click="scrollToTop" :to="article.slug.current">
				<h2>router link</h2>
			</router-link>
			<!-- Need to change these to router-link, but couldn't figure out what was causing the router-link to not work -->
			<a :href="article.slug.current">{{ article.title }}</a>
		</div>
	</div>
</template>
<script>
import sanity from './../sanity.js';
import latestArticles from './../groq/latestArticles.groq?raw';
import viewMixin from '../mixins/viewMixin.js';

export default {
	mixins: [viewMixin],
	created() {
		this.latestArticlesQuery();
	},

	async beforeRouteUpdate(to, from, next) {
		console.log(to);
		console.log(from);
		this.latestArticlesQuery();
		next();
		// console.log(next);
	},
	data() {
		return {
			articles: [],
		};
	},

	methods: {
		async latestArticlesQuery() {
			await sanity
				.fetch(latestArticles, { slug: this.$route.params.projectSlug })
				.then((data) => {
					//Spreads the data from the response into the localComments, so we get an array, instead of an object with an array.
					this.articles = data;
				});
		},

		scrollToTop() {
			window.scrollTo(0, 0);
		},
	},
};
</script>
