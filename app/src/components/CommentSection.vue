<template>
	<div>
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

		<div v-if="localComments.length === 0">There Are No Comments!</div>
		<div v-else>
			<div v-for="comment in computedObj" :key="comment._id">
				<span :aria-label="comment.country">{{
					getFlag(comment.country)
				}}</span>
				<h2>{{ comment.name }}</h2>
				<hr />
				<p>{{ comment.text }}</p>
			</div>
			<button v-if="!noMoreComments" @click="showMoreComments">
				Show more
			</button>
		</div>
	</div>
</template>

<script>
import sanity from './../sanity.js';
import commentsQuery from './../groq/comments.groq?raw';

export default {
	props: ['id'],

	created() {
		this.queryForComments();
		this.getCountry();
		this.getRestCountries();
	},

	data() {
		return {
			restCountries: [],
			countryLoading: true,
			form: {
				name: '',
				country: '',
				textArea: '',
			},

			localComments: [],
			limit: 5,

			loading: true,
			componentKey: 0,
		};
	},

	computed: {
		//Used to calculate how many comments are going to be shown. Solution found here: https://stackoverflow.com/questions/46622209/how-to-limit-iteration-of-elements-in-v-for
		computedObj() {
			return this.limit ? this.localComments.slice(0, this.limit) : this.object;
		},

		//Used to check if there are no comments on the page, so the proper message can be displayed.
		noMoreComments() {
			return this.localComments.length < this.limit;
		},
	},

	methods: {
		async submit() {
			await this.createComment(this.form);
			await this.queryForComments();
		},

		async createComment() {
			await sanity.create({
				_type: 'comment',
				name: this.form.name,
				text: this.form.textArea,
				country: this.form.country,
				post: {
					_type: 'reference',
					_ref: this.id,
				},
			});
		},
		
		async queryForComments() {
			await sanity
				.fetch(commentsQuery, {
					slug: this.$route.params.projectSlug,
				})
				.then((data) => {
					//Spreads the data from the response into the localComments, so we get an array, instead of an object with an array.
					this.localComments = [...data.comments];
					this.loading = false;
				});
		},

		async getCountry() {
			await fetch('http://ip-api.com/json/?fields=status,message,country')
				.then((response) => response.json())
				.then((data) => (this.form.country = data.country));
		},

		async getRestCountries() {
			await fetch('https://restcountries.com/v3.1/all')
				.then((response) => response.json())
				.then((data) => (this.restCountries = data));
		},

		getFlag(countryName) {
			const countryObject = this.restCountries.find((object) => {
				return object.name.common === countryName;
			});
			if (!countryObject) return 'Country not given';
			this.countryLoading = false;
			return countryObject.flag;
		},

		//Increases the property used to determine how many comments are displayed.
		showMoreComments() {
			this.limit += 5;
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
