import sanity from '../sanity.js';

export default {
	data() {
		return {
			loading: true,
			result: null
		}
	},

	methods: {
		async sanityFetch(query, params, blocks) {
			await sanity.fetch(query, params).then((data) => {
				this.result = data;
				this.loading = false;
				blocks = this.result.body
				//Only want to get blocks if we enter a blog post page.
				if (params.slug) {
					this.blocks = this.result.body
				}
			});


		},

		metaTags(meta) {
			const currentURL = window.location.origin + this.$route.path;

			if (meta.title) {
				document.title = meta.title;
			}

			if (meta.description) {
				document.querySelector('meta[name="description"]').setAttribute('content', meta.description);
				document.querySelector('meta[property="og:description"]').setAttribute('content', meta.description);
			}

			if (meta.image) {
				document.querySelector('meta[property="og:image"]').setAttribute('content', meta.image);
			}

			document.querySelector('link[rel="canonical"]').setAttribute('href', currentURL);
			document.querySelector('meta[property="og:url"]').setAttribute('content', currentURL);
		}
	}
}