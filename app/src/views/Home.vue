<template>
	<Loading v-if="loading" />

	<main v-else="loading" class="home" v-for="post in result">
		<div class="home__left">
			<RouterLink :to="post.slug.current">
				<img
					class="home__image"
					:src="this.imageURL(post)"
					:alt="post.coverImage.alt"
				/>
			</RouterLink>
		</div>

		<div class="home__right">
			<RouterLink class="home__right--height" :to="post.slug.current">
				<span class="accent-hover">
					<h1 class="home__header">{{ post.title }}</h1>
				</span>
				<time class="home__time" :datetime="formatDate(post.date)">{{
					formatDate(post.date)
				}}</time>
				<p class="home__description">{{ post.description }}</p>
			</RouterLink>

			<Button :slug="post.slug.current" />
		</div>
	</main>
</template>

<style>
.home {
	margin-bottom: var(--96px);
}

.home__right {
	margin-left: 32px;
	margin-right: 32px;
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

@media screen and (min-width: 50rem) {
	.home:last-child {
		margin-bottom: var(--256px);
	}

	.home {
		display: flex;
		max-width: 800px;
	}

	.home__right {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		margin-left: var(--24px);
		margin-right: 0;
	}

	.home__right--height {
		flex-grow: 1;
	}

	.home__image {
		margin-bottom: 0;
	}

	.home__header {
		margin-bottom: 0;
	}

	.home__description {
		margin-bottom: 0;
	}

	.home__time {
		margin-bottom: var(--32px);
	}

	.home__link {
		/* margin-top: 50px; */
		justify-self: flex-end;
	}
}
</style>

<script>
import query from '../groq/home.groq?raw';
import viewMixin from '../mixins/viewMixin.js';
import Loading from '../components/Loading.vue';
import Button from '../components/Button.vue';

export default {
	components: { Loading, Button },
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
