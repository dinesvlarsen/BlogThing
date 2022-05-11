import Home from './views/Home.vue';
import ProjectPage from './views/ProjectPage.vue';

export default [
	{ 
		name: 'projectPage', 
		path: '/:projectSlug',
		component: ProjectPage 
	},
	{ 
		name: 'home', 
		path: '/', 
		component: Home 
	},
];
