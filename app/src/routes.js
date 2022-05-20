import Home from './views/Home.vue';
import BlogPost from './views/BlogPost.vue';

export default [
	{
		name: 'blogpost',
		path: '/:projectSlug',
		component: BlogPost
	},
	{
		name: 'home',
		path: '/',
		component: Home
	},
];
