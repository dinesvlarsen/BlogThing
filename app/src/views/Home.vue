<template>
	<Loading v-if="loading" />
	<div v-else="loading" v-for="post in result">
		<img :src="this.imageURL(post)" :alt="post.coverImage.alt" />
		<h1>{{ post.title }}</h1>
		<time :datetime="post.date">{{ post.date }}</time>
		<p>{{ post.description }}</p>
		<RouterLink :to="post.slug.current">more -></RouterLink>
	</div>
</template>

<script>
import query from '../groq/home.groq?raw';
import viewMixin from '../mixins/viewMixin.js';
import Loading from '../components/Loading.vue';

export default {
	components: { Loading },
	mixins: [viewMixin],

	async created() {
		await this.sanityFetch(query, {
			blogpost: 'blogpost',
		});

		this.metaTags({
			title: 'BlogThing',
		});
	},

	methods: {
		imageURL(post) {
			return post.coverImage.image.asset.url;
		},
	},

	computed: {
		sanityData() {
			return this.$store.state.sanityData;
		},
	},
};
</script>
