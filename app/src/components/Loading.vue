<template>
	<!-- Found this loader on codepen: https://codepen.io/tashfene/pen/raEqrJ/ -->
	<div class="loader-wrapper">
		<div class="loader-wrapper__content">
			<span class="loader"><span class="loader-inner"></span></span>
			<div>
				<span>Loading</span>
				<span class="dots">{{ loadingDots }}</span>
			</div>
		</div>
	</div>
</template>
<style scoped>
.loader-wrapper {
	width: 100%;
	height: 100%;
	text-align: center;
}

.loader-wrapper__content {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	top: 20%;
}

.dots {
	position: absolute;
}

.loader {
	display: inline-block;
	width: 30px;
	height: 30px;

	border: 4px solid var(--primary);
	animation: loader 2s infinite ease;
}
.loader-inner {
	vertical-align: top;
	display: inline-block;
	width: 100%;
	background-color: rgb(10, 10, 10);
	animation: loader-inner 2s infinite ease-in;
}

@keyframes loader {
	0% {
		transform: rotate(0deg);
	}

	25% {
		transform: rotate(180deg);
	}

	50% {
		transform: rotate(180deg);
	}

	75% {
		transform: rotate(360deg);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes loader-inner {
	0% {
		height: 0%;
	}

	25% {
		height: 0%;
	}

	50% {
		height: 100%;
	}

	75% {
		height: 100%;
	}

	100% {
		height: 0%;
	}
}
</style>
<script>
export default {
	mounted() {
		this.dotsAnimation();
	},
	data() {
		return {
			loadingDots: '',
		};
	},
	methods: {
		//Simple interval which adds a period until it reaches 3 then starts over.
		dotsAnimation() {
			setInterval(() => {
				if (this.loadingDots.length === 3) {
					this.loadingDots = '';
				} else {
					this.loadingDots += '.';
				}
			}, 500);
		},
	},
};
</script>
