<script setup lang="ts">
import { AiOutlineLeft, AiOutlineRight } from "vue-icons-plus/ai";
import { jobsDummy } from "@/common/dummyData";
import JobCard from "@/components/shared/JobCard.vue";
const handleApply = (id: number | string) => {
	console.log("Melamar pada pekerjaan ID:", id);
};

const handleViewDetails = (id: number | string) => {
	console.log("Melihat detail ID:", id);
};
</script>

<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="flex flex-col lg:flex-row gap-8">
			<!-- Sidebar Filters -->
			<div class="w-full lg:w-64 flex-shrink-0 space-y-8">
				<div>
					<h3
						class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
						Categories
					</h3>
					<div class="space-y-2">
						<label class="flex items-center gap-3 cursor-pointer group">
							<input
								class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
								type="checkbox" />
							<span
								class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors"
								>Technology</span
							>
						</label>
						<label class="flex items-center gap-3 cursor-pointer group">
							<input
								class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
								type="checkbox" />
							<span
								class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors"
								>Design</span
							>
						</label>
						<label class="flex items-center gap-3 cursor-pointer group">
							<input
								class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
								type="checkbox" />
							<span
								class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors"
								>Marketing</span
							>
						</label>
						<label class="flex items-center gap-3 cursor-pointer group">
							<input
								class="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
								type="checkbox" />
							<span
								class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors"
								>Engineering</span
							>
						</label>
					</div>
				</div>
				<div>
					<h3
						class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
						Salary Range
					</h3>
					<div class="space-y-2">
						<label class="flex items-center gap-3 cursor-pointer group">
							<input
								class="text-primary focus:ring-primary h-4 w-4 border-slate-300"
								name="salary"
								type="radio" />
							<span class="text-sm text-slate-700 dark:text-slate-300"
								>$50k - $80k</span
							>
						</label>
						<label class="flex items-center gap-3 cursor-pointer group">
							<input
								class="text-primary focus:ring-primary h-4 w-4 border-slate-300"
								name="salary"
								type="radio" />
							<span class="text-sm text-slate-700 dark:text-slate-300"
								>$80k - $120k</span
							>
						</label>
						<label class="flex items-center gap-3 cursor-pointer group">
							<input
								class="text-primary focus:ring-primary h-4 w-4 border-slate-300"
								name="salary"
								type="radio" />
							<span class="text-sm text-slate-700 dark:text-slate-300"
								>$120k+</span
							>
						</label>
					</div>
				</div>
				<div>
					<h3
						class="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
						Experience Level
					</h3>
					<select
						class="w-full rounded-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary">
						<option>Any Experience</option>
						<option>Entry Level</option>
						<option>Mid Level</option>
						<option>Senior Level</option>
					</select>
				</div>
				<div class="p-4 rounded-xl bg-primary/5 border border-primary/10">
					<h4 class="text-sm font-bold text-primary mb-2">Job Alerts</h4>
					<p class="text-xs text-slate-600 dark:text-slate-400 mb-4">
						Get the latest jobs right in your inbox.
					</p>
					<button
						class="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg">
						Notify Me
					</button>
				</div>
			</div>
			<!-- Job List -->
			<div class="flex-1 space-y-4">
				<div class="flex items-center justify-between mb-6">
					<h3 class="text-xl font-bold text-slate-900 dark:text-white">
						Recommended Jobs
						<span class="text-slate-400 font-normal text-sm ml-2"
							>(124 found)</span
						>
					</h3>
					<div class="flex items-center gap-2">
						<span class="text-sm text-slate-500">Sort by:</span>
						<select
							class="border-none bg-transparent text-sm font-semibold focus:ring-0 cursor-pointer">
							<option>Newest First</option>
							<option>Highest Salary</option>
						</select>
					</div>
				</div>
				<!-- Job Card 1 -->
				<JobCard
					v-for="item in jobsDummy"
					:key="item.id"
					:job="item"
					@apply="handleApply"
					@view-details="handleViewDetails" />

				<!-- Pagination -->
				<div class="flex items-center justify-center gap-2 pt-8">
					<button
						class="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
						<span class="material-symbols-outlined"><AiOutlineLeft /></span>
					</button>
					<button
						class="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold">
						1
					</button>
					<button
						class="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
						2
					</button>
					<button
						class="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
						3
					</button>
					<span class="px-2">...</span>
					<button
						class="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
						<span class="material-symbols-outlined"><AiOutlineRight /></span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
