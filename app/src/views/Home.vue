<template>
	<Loading v-if="loading" />

	<main class="home" v-else="loading" v-for="post in result">
		<RouterLink :to="post.slug.current">
			<div class="home--spacing">
				<img
					class="home__image"
					:src="this.imageURL(post)"
					:alt="post.coverImage.alt"
				/>
				<h1 class="home__header">{{ post.title }}</h1>
				<time class="home__time" :datetime="formatDate(post.date)">{{
					formatDate(post.date)
				}}</time>
				<p class="home__description">{{ post.description }}</p>
			</div>
		</RouterLink>
		<RouterLink class="home__link" :to="post.slug.current">more -></RouterLink>
	</main>
</template>

<style>
.home--spacing > *:not(img),
.home__link {
	margin-left: 32px;
	margin-right: 32px;
}

.home {
	margin-bottom: var(--96px);
}

.home__image,
.home__description {
	margin-bottom: var(--24px);
}

.home__header {
	margin-bottom: var(--4px);
	font-size: var(--24px);
}

.home__time {
	display: inline-block;
	margin-bottom: var(--16px);
	color: var(--secondary);
	font-size: var(--14px);
	font-weight: 500;
}

.home__link {
	color: var(--secondary);
	font-weight: 500;
}

.home__link:visited {
	color: var(--secondary);
}

.home__link:active {
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
		formattedDate(value) {
			this.$store.dispatch('formatDate', value);

			const date = this.$store.getters.date;
			return date;
		},
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

		imageURL(post) {
			return post.coverImage.image.asset.url;
		},
	},
};
</script>
