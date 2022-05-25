<template>
	<Loading v-if="loading" />

	<main class="post" v-else="loading" v-for="post in result">
		<img
			class="post__image"
			:src="this.imageURL(post)"
			:alt="post.coverImage.alt"
		/>
		<h1 class="post__header">{{ post.title }}</h1>
		<time class="post__time" :datetime="post.date">{{ post.date }}</time>
		<p class="post__description">{{ post.description }}</p>
		<RouterLink class="post__link" :to="post.slug.current">more -></RouterLink>
	</main>
</template>

<style>
.post > *:not(img) {
	margin-left: 32px;
	margin-right: 32px;
}

.post {
	margin-bottom: 6rem;
}

.post__image,
.post__description {
	margin-bottom: 24px;
}

.post__header {
	margin-bottom: 4px;
	font-size: 1.5rem;
}

.post__time {
	display: inline-block;
	margin-bottom: 16px;
	color: var(--secondary);
	font-size: 0.875rem;
}

.post__link {
	color: var(--secondary);
}

.post__link:visited {
	color: var(--secondary);
}

.post__link:active {
	color: var(--accent);
	text-decoration: underline;
}
</style>

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
