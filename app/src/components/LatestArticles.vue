<template>
	<div class="latest-articles">
		<h2 class="latest-articles__heading">Other articles:</h2>

		<div class="latest-articles__article">
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

				<Button :slug="article.slug.current" />
			</div>
		</div>
	</div>
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

@media screen and (min-width: 50rem) {
	.article:not(.article:last-child) {
		margin-bottom: 0;
	}
	.latest-articles {
		margin-left: 0;
		margin-right: auto;
	}
	.latest-articles__article {
		/* background-color: red; */
		display: flex;
		flex-grow: 1;
		gap: var(--16px);
	}

	.article {
		justify-content: space-between;
	}

	.article__image {
		max-height: 288px;
	}
}
</style>

<script>
import Button from './Button.vue';

export default {
	components: { Button },
	props: ['articles'],
};
</script>
