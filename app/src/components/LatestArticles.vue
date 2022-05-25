<template>
	<section class="latest-articles">
		<h2 class="latest-articles__heading">Other articles:</h2>
		<div class="article" v-for="article in articles" :key="article._id">
			<router-link :to="article.slug.current">
				<img
					class="article__image"
					:src="article.coverImage.image.asset.url"
					:alt="article.coverImage.alt"
				/>

				<h3 class="article__heading">{{ article.title }}</h3>
			</router-link>
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

.article__image {
	margin-bottom: var(--8px);
	border-radius: 2px;
	max-height: calc(288px - 130px);
	object-fit: cover;
}
</style>

<script>
import viewMixin from '../mixins/viewMixin.js';

export default {
	props: ['articles'],
	mixins: [viewMixin],
};
</script>
