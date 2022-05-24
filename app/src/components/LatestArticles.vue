<template>
	<div>
		<div v-for="article in articles" :key="article._id">
			<img :src="article.coverImage.image.asset.url" alt="" />
			<RouterLink :to="article.slug.current">
				<h2>{{ article.title }}</h2>
			</RouterLink>
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
	data() {
		return {
			articles: [],
		};
	},

	methods: {
		async latestArticlesQuery() {
			await sanity.fetch(latestArticles, {}).then((data) => {
				//Spreads the data from the response into the localComments, so we get an array, instead of an object with an array.
				this.articles = data;
			});
		},
	},
};
</script>
