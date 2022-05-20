<template>
	<form
		id="form"
		@submit.prevent="submit"
		method="post"
		action="https://sanity.io"
	>
		<input
			type="text"
			name="name"
			placeholder="Your name"
			v-model="form.name"
		/>
		<textarea name="text" v-model="form.textArea"></textarea>
		<button type="submit">submit</button>
	</form>

	<div>
		<div v-for="comment in localComments" :key="comment._id">
			<h2>{{ comment.name }}</h2>
			<hr />
			<p>{{ comment.text }}</p>
		</div>
	</div>
	<hr />
</template>

<script>
import sanity from './../sanity.js';
import commentsQuery from './../groq/comments.groq?raw';

export default {
	props: ['id', 'comments'],
	mounted() {
		//Doing this because I need my prop to be mutable, solution taken from https://stackoverflow.com/questions/69225771/are-the-props-in-a-vue-component-mutable.
		//Might have to refactor this approach and move the query for comments into store, or query for the data needed in this component directly inside it, instead of passing the data down from BlogArticlePage.vue.
		this.localComments = [...this.comments];
	},
	created() {
		// console.log(this.$route.params.projectSlug);
	},
	data() {
		return {
			form: {
				name: '',
				textArea: '',
				id: this.id,
			},
			localComments: [],
		};
	},
	methods: {
		submit() {
			// console.log('form made?');
			this.createComment(this.form);
			this.queryForComments();
		},
		createComment({ name, textArea }) {
			// console.log(name, textArea);
			sanity.create({
				_type: 'comment',
				name: this.form.name,
				text: this.form.textArea,
				post: {
					_type: 'reference',
					_ref: this.form.id,
				},
			});
		},
		async queryForComments() {
			await sanity
				.fetch(commentsQuery, {
					slug: this.$route.params.projectSlug,
				})
				.then((data) => {
					console.log(data);
					this.localComments = data;
					this.loading = false;
					// blocks = this.result.body;
					// //Only want to get blocks if we enter a blog post page.
					// if (params.slug) {
					// 	this.blocks = this.result.body;
					// 	this.id = this.result._id;
					// }
				});
		},
	},
	computed: {},
};
</script>

<style scoped>
input {
	border: 1px solid lightcoral;
	padding: 0.5rem;
	border-radius: 4px;
}
input + input {
	margin-top: 8px;
}

form textarea {
	width: 270px;
	min-height: 100px;
	margin-top: 8px;
}

button {
	background: black;
	color: white;
	padding: 0.5em;
	border-radius: 4px;
	margin-top: 8px;
	margin-bottom: 16px;
}
</style>
