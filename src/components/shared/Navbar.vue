<script setup lang="ts">
import { MdWork } from "vue-icons-plus/md";
</script>

<template>
	<header
		class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between gap-4">
				<div class="flex items-center gap-2">
					<div
						class="flex items-center justify-center size-10 rounded-lg bg-primary text-white">
						<span class="material-symbols-outlined">
							<MdWork />
						</span>
					</div>
					<h1 class="font-bold tracking-tight text-primary dark:text-white">
						JobSync
					</h1>
				</div>

				<div class="flex items-center gap-3">
					<button
						class="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all">
						<RouterLink to="/login">Sign In</RouterLink>
					</button>
					<button
						class="inline-flex items-center justify-center px-5 py-2 text-sm font-bold text-primary bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-all text-white">
						<RouterLink to="/register">Register</RouterLink>
						<!-- Register -->
					</button>
				</div>
			</div>
		</div>
	</header>
</template>
