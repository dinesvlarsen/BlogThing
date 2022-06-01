<template class="button">
	<span v-if="slug" class="accent-hover">
		<RouterLink class="button__link arrow--animation-parent" :to="slug">
			more
			<span class="arrow--animation-child">-></span></RouterLink
		>
	</span>

	<span v-else class="accent-hover">
		<button class="button__button arrow--animation-parent">
			{{ buttonText }}
			<span class="arrow--animation-child"> -> </span>
		</button>
	</span>
</template>

<script>
export default {
	props: {
		slug: {
			type: String,
			required: false,
		},
		buttonText: {
			type: String,
			required: false,
		},
	},
};
</script>

<style>
.button__link {
	color: var(--secondary);
	font-weight: 500;
}

.button__link:active {
	color: var(--accent);
}

.button__button {
	font-weight: 500;
}
</style>
