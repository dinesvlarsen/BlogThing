<template>
	<div v-if="loading">...</div>
	<pre v-else>result: {{ JSON.stringify(result, null, 3) }}</pre>
</template>

<script> 
	import query from '../groq/projectPage.groq?raw';
	import viewMixin from '../mixins/viewMixin.js';
	
	export default {
		mixins: [viewMixin],
		
		async created() {
			await this.sanityFetch(query, { 
				slug: this.$route.params.projectSlug
			});

			this.metaTags({
				title: this.result.title,
				description: this.result.description,
				image: this.result.documentation[0].asset.url
			});
		}
	}
</script>