<template>
	<section class="comments">
		<h4 class="comments__heading">
			-Comments<span class="comments__count">{{ commentsCount }}</span>
		</h4>

		<div class="comment" v-if="comments.length === 0">
			<p class="comments--secondary comments--bold">No comments...</p>
		</div>

		<div v-else>
			<div
				class="comment fade-in"
				v-for="comment in computedList"
				:key="comment._id"
			>
				<div class="comment__country-info">
					<span :aria-label="comment.country">{{
						getFlag(comment.country)
					}}</span>

					<span class="comment__country"> {{ comment.country }}</span>
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
			<button v-if="!noMoreComments" @click="showMoreComments">
				Show more
			</button>
		</div>

		<div class="form-section">
			<h4 class="form-section__heading">Leave a comment</h4>

			<p class="form-section__description">
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
				/>
				<span class="accent-hover">
					<button class="form__button arrow--animation-parent" type="submit">
						Submit
						<span class="arrow--animation-child">-></span>
					</button>
				</span>
			</form>
		</div>
	</section>
</template>

<style scoped>
.form, .comment {
	max-width: 384px;

}
/* Comments section */
.comments {
	margin-top: var(--128px);
	margin-left: 32px;
	margin-right: 32px;
	border-top: solid 4px #e2e2e2;
}

.comments__heading {
	position: relative;
	margin: var(--64px) 0 var(--24px) 0;
	font-size: var(--30px);
}

.comments__count {
	position: relative;
	bottom: 13px;
	left: 4px;
	font-size: var(--24px);
	color: var(--comments-secondary);
}

.comment:last-child {
	margin-bottom: var(--96px);
}

.comment {
	margin-bottom: var(--32px);
	background-color: var(--comments-background);
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
	padding: var(--16px);
	border-radius: 2px;
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

.comment__name--secondary {
	color: var(--comments-secondary);
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
.form-section__heading {
	margin-bottom: var(--24px);
	font-size: var(--24px);
	font-style: italic;
}

.form-section__description {
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
	max-width: 384px;
	margin-bottom: 192px;
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
</style>

<script>
import sanity from './../sanity.js';

export default {
	props: ['id', 'restCountries', 'country', 'comments', 'queryForComments'],

	created() {
		this.formatDate();
	},

	data() {
		return {
			form: {
				name: '',
				textArea: '',
			},
			limit: 5,
			loading: true,
		};
	},

	methods: {
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
			await this.createComment(this.form);
			this.form.name = '';
			this.form.textArea = '';
			await this.queryForComments(this.$route.params.projectSlug);
		},

		async createComment() {
			await sanity.create({
				_type: 'comment',
				name: this.form.name,
				text: this.form.textArea,
				country: this.country,
				post: {
					_type: 'reference',
					_ref: this.id,
				},
			});
		},

		getFlag(countryName) {
			const countryObject = this.restCountries.find((object) => {
				return object.name.common === countryName;
			});
			if (!countryObject) return 'No Country';
			this.countryLoading = false;
			return countryObject.flag;
		},

		//Increases the property used to determine how many comments are displayed.
		showMoreComments() {
			this.limit += 5;
		},
	},

	computed: {
		//Used to calculate how many comments are going to be shown. Solution found here: https://stackoverflow.com/questions/46622209/how-to-limit-iteration-of-elements-in-v-for
		computedList() {
			return this.limit ? this.comments.slice(0, this.limit) : this.object;
		},

		//Used to check if there are no comments on the page, so the proper message can be displayed.
		noMoreComments() {
			return this.comments.length < this.limit;
		},

		commentsCount() {
			return this.comments.length;
		},
	},
};
</script>
