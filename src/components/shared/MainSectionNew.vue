<script setup lang="ts">
import { AiOutlineLeft, AiOutlineRight } from "vue-icons-plus/ai";
import { jobsDummy } from "@/common/dummyData";
import JobCard from "@/components/shared/JobCard.vue";
import { BiBuildingHouse, BiTrendingUp } from "vue-icons-plus/bi";
import { GiHealingShield } from "vue-icons-plus/gi";
import { MdSavings } from "vue-icons-plus/md";
const handleApply = (id: number | string) => {
	console.log("Melamar pada pekerjaan ID:", id);
};

const handleViewDetails = (id: number | string) => {
	console.log("Melihat detail ID:", id);
};
</script>

<template>
	<section class="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
		<div class="mb-16 text-center">
			<h2
				class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">
				Our Culture &amp; Benefits
			</h2>
			<p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
				We believe that happy employees create the best products. Here's what
				you can expect when you join the JobSync family.
			</p>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<div
				class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-sm hover:shadow-md transition-shadow">
				<div
					class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
					<span class="material-symbols-outlined text-3xl"
						><BiBuildingHouse
					/></span>
				</div>
				<h3 class="text-lg font-bold mb-2">Remote Work</h3>
				<p class="text-sm text-slate-600 dark:text-slate-400">
					Flexibility to work from anywhere in the world or our modern hub
					offices.
				</p>
			</div>
			<div
				class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-sm hover:shadow-md transition-shadow">
				<div
					class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
					<span class="material-symbols-outlined text-3xl"
						><GiHealingShield
					/></span>
				</div>
				<h3 class="text-lg font-bold mb-2">Health Insurance</h3>
				<p class="text-sm text-slate-600 dark:text-slate-400">
					Comprehensive health, dental, and vision plans for you and your
					family.
				</p>
			</div>
			<div
				class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-sm hover:shadow-md transition-shadow">
				<div
					class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
					<span class="material-symbols-outlined text-3xl"
						><BiTrendingUp
					/></span>
				</div>
				<h3 class="text-lg font-bold mb-2">Career Growth</h3>
				<p class="text-sm text-slate-600 dark:text-slate-400">
					Annual learning stipend and clear pathways for internal promotion.
				</p>
			</div>
			<div
				class="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-8 shadow-sm hover:shadow-md transition-shadow">
				<div
					class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
					<span class="material-symbols-outlined text-3xl"><MdSavings /></span>
				</div>
				<h3 class="text-lg font-bold mb-2">Retirement Plan</h3>
				<p class="text-sm text-slate-600 dark:text-slate-400">
					Competitive 401k matching to help you plan for a secure future.
				</p>
			</div>
		</div>
	</section>
</template>
