<template>
	<section class="latest-articles">
		<h2 class="latest-articles__heading">Other articles:</h2>

		<div class="article" v-for="article in articles" :key="article._id">
			<router-link :to="article.slug.current">
				<span class="opacity-hover">
					<img
						class="article__image"
						:src="article.coverImage.image.asset.url"
						:alt="article.coverImage.alt"
					/>
				</span>
				<span class="accent-hover">
					<h3 class="article__heading accent-hover">{{ article.title }}</h3>
				</span>
			</router-link>

			<span class="accent-hover">
				<RouterLink
					class="article__link arrow--animation-parent"
					:to="article.slug.current"
					>more <span class="arrow--animation-child"> -> </span></RouterLink
				>
			</span>
		</div>
	</section>
</template>

<style>
.latest-articles {
	margin-top: var(--192px);
	margin-left: 32px;
	margin-right: 32px;
}

.latest-articles__heading {
	margin-bottom: var(--32px);
	font-size: var(--20px);
}

.article:not(.article:last-child) {
	margin-bottom: var(--48px);
}

.article {
	display: flex;
	flex-direction: column;
}

.article__image {
	margin-bottom: var(--8px);
	border-radius: 2px;
	max-height: calc(288px - 130px);
	object-fit: cover;
}

.article__heading {
	margin-bottom: var(--8px);
	font-size: var(--20px);
}

.article__link {
	font-weight: 500;
	color: var(--secondary);
}
</style>

<script>
import viewMixin from '../mixins/viewMixin.js';

export default {
	props: ['articles'],
	mixins: [viewMixin],
};
</script>
