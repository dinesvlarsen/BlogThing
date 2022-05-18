<template>
	<form
		id="form"
		@submit.prevent="checkForm"
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

	<hr />
</template>

<script>
const comment_key = import.meta.env.VITE_APP_SANITY_COMMENT;

import sanity from './../sanity.js';

export default {
	data() {
		return {
			form: {
				name: '',
				textArea: '',
			},
		};
	},
	methods: {
		submit() {
			console.log('click');
			this.createComment(this.form);
		},
		createComment({ name, textArea }) {
			console.log(name, textArea);
		},
	},
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
