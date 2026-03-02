<script setup lang="ts">
import { AiOutlineLeft, AiOutlineRight } from "vue-icons-plus/ai";
import { BiSearch } from "vue-icons-plus/bi";
import { Fa6LocationDot } from "vue-icons-plus/fa6";
</script>

<template>
	<section class="relative w-full py-16 md:py-24 bg-primary overflow-hidden">
		<!-- Background Decoration -->
		<div
			class="absolute inset-0 opacity-10"
			data-alt="Abstract geometric dark blue pattern background">
			<div
				class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
		</div>
		<div class="relative max-w-5xl mx-auto px-4 text-center">
			<h2
				class="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
				Find your dream job <br class="hidden md:block" />
				in the tech industry.
			</h2>
			<p class="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
				Explore thousands of job opportunities from top-tier companies and take
				the next step in your professional career.
			</p>
			<!-- Search Container -->
			<div
				class="bg-white dark:bg-slate-900 p-2 rounded-xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-4xl mx-auto">
				<div
					class="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800 py-3 md:py-0">
					<span class="material-symbols-outlined text-slate-400"
						><BiSearch
					/></span>
					<input
						class="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 text-sm md:text-base"
						placeholder="Job title or keywords"
						type="text" />
				</div>
				<div class="flex-1 flex items-center px-4 gap-3 py-3 md:py-0">
					<span class="material-symbols-outlined text-slate-400"
						><Fa6LocationDot
					/></span>
					<input
						class="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 text-sm md:text-base"
						placeholder="City, State or Remote"
						type="text" />
				</div>
				<button
					class="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/80 transition-all flex items-center justify-center gap-2">
					<span>Search</span>
				</button>
			</div>
		</div>
	</section>

	<!-- Main Content -->
</template>
