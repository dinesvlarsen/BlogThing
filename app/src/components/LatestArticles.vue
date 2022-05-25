<template>
	<div>
		<div v-for="article in articles" :key="article._id">
			<img
				:src="article.coverImage.image.asset.url"
				:alt="article.coverImage.alt"
			/>
			<router-link :to="article.slug.current">
				<h2>{{ article.title }}</h2>
			</router-link>
			<!-- Need to change these to router-link, but couldn't figure out what was causing the router-link to not work -->
		</div>
	</div>
</template>
<script>
import viewMixin from '../mixins/viewMixin.js';

export default {
	props: ['articles'],
	mixins: [viewMixin],

	methods: {},
};
</script>
