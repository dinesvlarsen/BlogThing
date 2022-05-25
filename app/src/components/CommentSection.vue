<template>
	<section class="comments">
		<h4 class="comments__heading">-Comments</h4>

		<div class="comments__comments" v-if="localComments.length === 0">
			<p class="comments--secondary comments--bold">No comments...</p>
		</div>

		<div class="comments__comments" v-else>
			<div class="comment" v-for="comment in computedObj" :key="comment._id">
				<div class="comment__country-info">
					<span :aria-label="comment.country">{{
						getFlag(comment.country)
					}}</span>

					<span class="comment__country"> {{ comment.country }}</span>
				</div>

				<span class="comment__name" aria-label="Comment name">
					{{ comment.name }} wrote - {{ formatDate(comment._createdAt) }}
				</span>
				<p class="comment__text" aria-label="Comment text">
					{{ comment.text }}
				</p>
			</div>
			<button v-if="!noMoreComments" @click="showMoreComments">
				Show more
			</button>
		</div>

		<form class="form" id="form" @submit.prevent="submit">
			<label for="text">Your message:</label>
			<textarea name="text" v-model="form.textArea" required></textarea>

			<label for="name">Your name:</label>
			<input
				type="text"
				name="name"
				placeholder="Your name"
				v-model="form.name"
				required
			/>
			<button type="submit">submit</button>
		</form>
	</section>
</template>

<style scoped>
/* Comments section */
.comments {
	margin-top: var(--128px);
	margin-left: 32px;
	margin-right: 32px;
	border-top: solid 4px #e2e2e2;
}

.comments__heading {
	margin: var(--64px) 0 var(--24px) 0;
	font-size: var(--30px);
}

.comments__comments {
	margin-bottom: var(--32px);
	background-color: var(--comments-background);
	padding: var(--16px);
	border-radius: 2px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}

.comment__country-info {
	margin-bottom: var(--8px);
}

.comment__country {
	margin-left: 4px;
	font-size: var(--14px);
	color: var(--comments-secondary);
}

.comment__name {
	display: inline-block;
	margin-bottom: var(--16px);
	font-weight: bold;
}

.comment__text {
	margin-bottom: var(--16px);
}

.comments--secondary {
	color: var(--comments-secondary);
}

.comments--bold {
	font-weight: bold;
}

/* Form section */
.form {
	margin-bottom: 192px;
	display: flex;
	flex-direction: column;
	background-color: var(--comments-background);
	padding: var(--16px);
}
</style>

<script>
import sanity from './../sanity.js';
import commentsQuery from './../groq/comments.groq?raw';

export default {
	props: ['id'],

	created() {
		this.queryForComments();
		this.getCountry();
		this.getRestCountries();
		this.formatDate();
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
		formatDate(date) {
			// Found this method on https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript since there is no replaceAt() function.
			function setCharAt(str, index, chr) {
				if (index > str.length - 1) return str;
				return str.substring(0, index) + chr + str.substring(index + 1);
			}
			const options = {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
				hour: 'numeric',
				hourCycle: 'h24',
				minute: 'numeric',
			};
			const dateConvert = new Date(date);
			const newDate = dateConvert.toLocaleString('en-US', options);

			return setCharAt(newDate, newDate.lastIndexOf(','), '');
			return dateConvert.toLocaleString('en-US', options);
		},

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
				});
		},

		async getCountry() {
			await fetch('http://ip-api.com/json/?fields=status,message,country')
				.then((response) => response.json())
				.then((data) => (this.form.country = data.country))
				.catch((e) => console.error(e));
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
