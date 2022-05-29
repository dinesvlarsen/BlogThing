<template>
	<section class="comments-and-form">
		<!-- COMMENTS  -->
		<div class="comments-section">
			<h4 class="comments-section__heading">
				Comments<span class="comments-section__count">{{ commentsCount }}</span>
			</h4>
			<button @click="deleteComments">Delete ALL comments</button>
			<div v-if="comments.length === 0" class="comment__no-comments">
				<p class="comments--secondary comments--bold">No comments...</p>
			</div>

			<div v-else>
				<div
					class="comment fade-in"
					v-for="comment in computedList"
					:key="comment._id"
				>
					<div class="comment__country-info">
						<span
							v-if="getFlag(comment.country, 'countryName') === 'No Country'"
							class="comment__country-name"
						>
							No Country</span
						>
						<span
							v-else
							class="comment__country-flag"
							:aria-label="comment.country"
							>{{ getFlag(comment.country, 'flag') }}</span
						>
						<span class="comment__country-name">
							{{ getFlag(comment.country, 'countryName') }}</span
						>
					</div>
					<h4 class="comment__name" aria-label="Comment name">
						{{ comment.name }}
						<span class="comment__name--secondary"
							>wrote - {{ formatDate(comment._createdAt) }}</span
						>
					</h4>
					<p class="comment__text" aria-label="Comment text">
						{{ comment.text }}
					</p>
				</div>
				<!-- <span class="accent-hover">
					<button
						v-if="!noMoreComments"
						class="comment__button arrow--animation-parent"
						@click="showMoreComments"
					>
						Show more <span class="arrow--animation-child">-> </span>
					</button>
				</span> -->

				<Button
					v-if="!noMoreComments"
					@click="showMoreComments"
					:buttonText="'SHOW MORE'"
				/>
			</div>
		</div>

		<!-- FORM -->
		<div class="form-section">
			<h4 class="form-section__heading">Leave a comment</h4>

			<p class="form-section__instruction">
				Fields with an asteriks(*) are mandatory.
			</p>

			<form class="form" id="form" @submit.prevent="submitComment">
				<label class="form__textarea-label" for="text">Message *</label>
				<textarea
					class="form__textarea"
					name="text"
					v-model="form.textArea"
					required
				></textarea>
				<label class="form__name-label" for="name">Name *</label>
				<input
					class="form__name"
					type="text"
					name="name"
					v-model="form.name"
					required
					:disabled="form.submitted"
				/>
				<span class="accent-hover">
					<button
						class="form__button arrow--animation-parent"
						type="submit"
						:disabled="form.submitted"
					>
						Submit
						<span class="arrow--animation-child">-></span>
					</button>
				</span>
			</form>
		</div>
	</section>
</template>

<style>
/* Comments section */
.comments-and-form {
	margin-top: var(--128px);
	margin-right: 32px;
	margin-left: 32px;
	margin-bottom: var(--192px);
	border-top: solid 4px #e2e2e2;
}

.comments-section__heading {
	position: relative;
	margin: var(--64px) 0 var(--24px) 0;
	font-size: var(--30px);
}

.comments-section__count {
	position: relative;
	bottom: 13px;
	left: 4px;
	font-size: var(--24px);
	color: var(--comments-secondary);
}

.comment:last-child {
	margin-bottom: var(--96px);
}

.comment,
.comment__no-comments {
	margin-bottom: var(--32px);
	background-color: var(--comments-background);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
	padding: var(--16px);
	padding-bottom: var(--32px);
	border-radius: 2px;
}

.comment__no-comments {
	padding: var(--16px);
}

.comments--secondary {
	color: var(--comments-secondary);
}

.comments--bold {
	font-weight: bold;
}

.comment__country-info {
	margin-bottom: var(--8px);
}

.comment__country-name {
	margin-left: 4px;
	font-size: var(--14px);
	color: var(--comments-secondary);
}

.comment__name {
	display: inline-block;
	font-size: var(--20px);
	margin-bottom: var(--16px);
	font-weight: bold;
}

.comment__name--secondary {
	color: var(--comments-secondary);
	font-size: var(--16px);
}

.comment__button {
	margin-bottom: var(--64px);
	text-transform: uppercase;
	font-weight: 500;
}

/* Form section */
.form-section__heading {
	margin-bottom: var(--24px);
	font-size: var(--24px);
	font-style: italic;
}

.form-section__instruction {
	margin-bottom: var(--8px);
}

.form label {
	font-weight: 500;
}

.form input:focus,
textarea:focus {
	border: 1px solid rgba(211, 211, 211, 0.87);
	box-shadow: none;
}

.form {
	display: flex;
	flex-direction: column;
	background-color: var(--comments-background);
	padding: var(--16px) var(--16px) 0 var(--16px);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
}

.form__textarea-label,
.form__name-label {
	margin-bottom: var(--8px);
}

.form__textarea,
.form__name {
	background-color: #fcfcfc;
	box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.1);
	font-size: var(--14px);
	padding: var(--8px);
	border-radius: 2px;
}

.form__textarea {
	margin-bottom: var(--24px);
	min-height: 8.625rem;
}

.form__name {
	margin-bottom: var(--32px);
}

.form__button {
	margin-bottom: var(--32px);
	align-self: flex-start;
	text-transform: uppercase;
	font-weight: 500;
}

@media screen and (min-width: 50rem) {
	.comments-section,
	.form-section {
		margin-top: var(--192px);
		width: 50%;
	}

	.comments-section__heading,
	.form-section__heading {
		font-size: var(--36px);
	}

	.comments-and-form {
		margin-top: var(--192px);
		margin-left: 0;
		margin-right: 0;
		display: flex;
		gap: 5%;
	}

	.comments-section {
		max-width: 512px;
	}

	.comments-section__heading {
		margin: 0 0 calc(var(--24px) + var(--20px) + var(--8px)) 0;
	}

	.comment {
		padding: var(--24px);
		padding-bottom: var(--32px);
	}

	.comment__country-info {
		margin-bottom: var(--16px);
	}

	.comment__country-flag {
		display: inline-block;
		font-size: var(--20px);
	}

	.comment__country-name {
		font-size: var(--16px);
	}

	.comment__name {
		font-size: var(--24px);
	}

	.comment__name--secondary {
		font-size: var(--20px);
	}

	.comment__text {
		font-size: var(--20px);
	}

	.form-section {
		margin-right: 32px;
		max-width: 512px;
	}

	.form {
		margin-bottom: 192px;
		display: flex;
		flex-direction: column;
		background-color: var(--comments-background);
		padding: var(--16px) var(--16px) 0 var(--16px);
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
	}

	.form label {
		font-size: var(--20px);
	}

	.form__textarea-label,
	.form__name-label {
		margin-bottom: var(--8px);
	}

	.form__textarea,
	.form__name {
		font-size: var(--16px);
		padding: var(--10px);
		border-radius: 2px;
	}

	.form__name {
		margin-bottom: var(--64px);
	}

	.form__button {
		margin-bottom: var(--32px);
		align-self: flex-start;
		text-transform: uppercase;
		font-size: var(--16px);
		font-weight: 500;
	}

	@media screen and (min-width: 83rem) {
		.comments-and-form {
			gap: 131px;
		}
	}
}
</style>

<script>
import sanity from './../sanity.js';

import Button from './Button.vue';

export default {
	components: { Button },
	props: ['id', 'restCountries', 'countryCode', 'comments', 'queryForComments'],

	created() {
		this.formatDate();
	},

	data() {
		return {
			form: {
				name: '',
				textArea: '',
				submitted: false,
			},
			limit: 3,
			loading: true,
		};
	},

	methods: {
		async deleteComments() {
			await sanity
				.delete({
					query: '*[_type == "comment"]',
				})
				.then(() => {
					console.log('Documents matching *[_type == "comment"] was deleted');
				})
				.catch((err) => {
					console.error('delete failed: ', err.message);
				});
		},

		formatDate(date) {
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

			// Found this method on https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript since there is no replaceAt() function.
			//This function works even tho it is underneath where it is called because it is a function declaration.
			function setCharAt(str, index, chr) {
				if (index > str.length - 1) return str;
				return str.substring(0, index) + chr + str.substring(index + 1);
			}
		},

		async submitComment() {
			this.form.submitted = true;
			await this.createComment(this.form);

			this.form.name = '';
			this.form.textArea = '';
			await this.queryForComments(this.$route.params.projectSlug);
			this.form.submitted = false;
		},

		async createComment() {
			await sanity.create({
				_type: 'comment',
				name: this.form.name,
				text: this.form.textArea,
				country: this.countryCode,
				post: {
					_type: 'reference',
					_ref: this.id,
				},
			});
		},

		//Takes inn the countryCode and a 'string' specifying whether you want 'flag' or 'countryName'
		getFlag(countryCode, option) {
			const countryObject = this.restCountries.find((object) => {
				return object.cca2 === countryCode;
			});
			if (!countryObject) return `No Country`;
			if (option === 'flag') return countryObject.flag;
			if (option === 'countryName') return countryObject.name.common;

			return countryObject.flag;
		},

		//Increases the property used to determine how many comments are displayed.
		showMoreComments() {
			this.limit += 3;
		},
	},

	computed: {
		//Used to calculate how many comments are going to be shown. Solution found here: https://stackoverflow.com/questions/46622209/how-to-limit-iteration-of-elements-in-v-for
		computedList() {
			return this.limit ? this.comments.slice(0, this.limit) : this.object;
		},

		//Used to check if there are no comments on the page, so the proper message can be displayed.
		noMoreComments() {
			return this.comments.length <= this.limit;
		},

		commentsCount() {
			return this.comments.length;
		},
	},
};
</script>
