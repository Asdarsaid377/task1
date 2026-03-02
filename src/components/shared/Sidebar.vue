<script setup lang="ts">
import { GrAdd } from "vue-icons-plus/gr";
import { MdWork } from "vue-icons-plus/md";
</script>

<template>
	<aside
		class="w-64 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 h-screen overflow-y-auto">
		<div class="flex h-full flex-col justify-between p-4">
			<div class="flex flex-col gap-8">
				<!-- Brand -->
				<div class="flex items-center gap-3 px-2">
					<div
						class="flex size-10 items-center justify-center rounded-lg bg-primary text-white">
						<span class="material-symbols-outlined text-2xl"><MdWork /></span>
					</div>
					<div class="flex flex-col">
						<h1 class="text-lg font-bold leading-none text-primary">JobSync</h1>
						<p class="text-xs font-medium text-slate-500">Employer Dashboard</p>
					</div>
				</div>
				<!-- Navigation -->
				<nav class="flex flex-col gap-1">
					<a
						class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors"
						href="#">
						<span class="material-symbols-outlined text-xl"><GrAdd /></span>
						<span class="text-sm font-semibold">Post New Job</span>
					</a>
					<a
						class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white shadow-md"
						href="#">
						<!-- <span class="material-symbols-outlined text-xl">list_alt</span> -->
						<span class="text-sm font-semibold">Active Listings</span>
					</a>
					<a
						class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors"
						href="#">
						<!-- <span class="material-symbols-outlined text-xl">groups</span> -->
						<span class="text-sm font-semibold">Applicant Tracking</span>
					</a>
					<a
						class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary transition-colors"
						href="#">
						<!-- <span class="material-symbols-outlined text-xl"
							>corporate_fare</span
						> -->
						<span class="text-sm font-semibold">Company Profile</span>
					</a>
				</nav>
			</div>
			<!-- Footer Sidebar -->
			<div
				class="flex flex-col gap-4 mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
				<div class="flex items-center gap-3 px-2">
					<div
						class="size-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center"
						data-alt="User profile avatar of a smiling man"
						style="
							background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuC-f29aBZKgLyvnIwD8PvWZ0fbRMhPAG3LNotQTS1rLuDeLIyf8Rih2VLQ2oeKeFwH27yAghMscE0BITHgqu5VeYX3rBgO-yJSaME_cs5zIH9siM4AzwR5Eaa67UmEt5VGuVPAOefz1aH-mUZn8eTYQbiHicNDgdLSWB4VtOYbvwfa3JDsanZrcGSnGSeAlzehKHgcnBV9VSa_IRJUTmjY32dvuMYZz8gL72Pfmb9prAmbRj23mCwnHQbRoyAYFr-JALpUymG9vNXo&quot;);
						"></div>
					<div class="flex flex-col overflow-hidden">
						<p class="text-sm font-bold truncate">Alex Morgan</p>
						<p class="text-xs text-slate-500 truncate">Talent Manager</p>
					</div>
				</div>
				<button
					class="w-full flex items-center justify-center rounded-lg h-10 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">
					Upgrade Plan
				</button>
			</div>
		</div>
	</aside>
</template>
