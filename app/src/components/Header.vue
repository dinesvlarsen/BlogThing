<template>
	<header>
		<nav>
			<ul>
				<RouterLink to="/">
					<div class="logo" aria-label="logo">
						Blog<span class="logo__detail">Thing</span>
					</div>
				</RouterLink>
			</ul>
		</nav>
	</header>
</template>
<style>
.logo {
	font-weight: bold;
	color: hsl(284, 90, 45);
}

.logo__detail {
}
</style>
