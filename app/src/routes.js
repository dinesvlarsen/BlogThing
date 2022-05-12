import Home from './views/Home.vue';
import BlogArticlePage from './views/BlogArticlePage.vue';

export default [
	{
		name: 'blogArticlePage',
		path: '/:projectSlug',
		component: BlogArticlePage
	},
	{
		name: 'home',
		path: '/',
		component: Home
	},
];
