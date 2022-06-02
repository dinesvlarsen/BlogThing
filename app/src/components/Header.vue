<template>
	<header class="header">
		<RouterLink to="/">
			<div class="header__logo" aria-label="logo">
				Blog<span class="logo__detail">Thing</span>
			</div>
		</RouterLink>
	</header>
</template>

<style>
.header {
	display: flex;
	justify-content: center;
	margin-top: var(--16px);
	margin-bottom: var(--32px);
	/* Dont want the logo to be root size,  */
	font-size: 16px;
}

.header__logo {
	font-weight: bold;
}

.logo__detail {
	color: var(--accent);
}

@media screen and (min-width: 50rem) {
	.header {
		margin-top: var(--32px);
		margin-bottom: var(--128px);
		font-size: 24px;
		justify-content: flex-start;
	}
}
</style>
