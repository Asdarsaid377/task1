<script setup lang="ts">
import { AiOutlineSearch } from "vue-icons-plus/ai";
import { Fa6LocationDot } from "vue-icons-plus/fa6";
import { MdWork } from "vue-icons-plus/md";
import { dummyJobs } from "@/common/dummyData";
import type { IJob } from "@/types/JobType";
</script>

<template>
	<section class="bg-white dark:bg-background-dark/50" id="jobs">
		<div class="max-w-7xl mx-auto py-20 px-6 lg:px-20">
			<div
				class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
				<div>
					<h2
						class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
						Current Openings
					</h2>
					<p class="text-slate-600 dark:text-slate-400">
						Join our growing team of designers, engineers, and thinkers.
					</p>
				</div>
				<div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
					<div class="relative group">
						<span
							class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
							><AiOutlineSearch
						/></span>
						<input
							class="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
							placeholder="Search for jobs..."
							type="text" />
					</div>
					<select
						class="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-background-light dark:bg-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-600 dark:text-slate-400">
						<option>All Departments</option>
						<option>Engineering</option>
						<option>Design</option>
						<option>Marketing</option>
						<option>Product</option>
					</select>
				</div>
			</div>
			<div class="space-y-4">
				<div
					v-for="data in dummyJobs as IJob[]"
					:key="data.id"
					class="group flex flex-col md:flex-row items-center justify-between p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary/50 hover:shadow-lg transition-all">
					<div class="flex flex-col gap-1 mb-4 md:mb-0">
						<h3
							class="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
							{{ data.title }}
						</h3>
						<div class="flex items-center gap-4 text-sm text-slate-500">
							<span class="flex items-center gap-1">
								<span class="text-sm">
									<Fa6LocationDot />
								</span>
								{{ data.location }}
							</span>
							<span class="flex items-center gap-1"
								><span class="text-base"><MdWork /></span>
								{{ data.jobType }}</span
							>
							<span
								class="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider">
								Rp.{{ data.salaryMin.toLocaleString("id-ID") }} - Rp.
								{{ data.salaryMax.toLocaleString("id-ID") }}
							</span>
						</div>
					</div>
					<router-link
						:to="`/details/${data.title.toLowerCase().replace(/\s+/g, '-')}-${data.id}`"
						class="w-full md:w-auto text-center px-6 py-2.5 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-all">
						View Details
					</router-link>
				</div>
			</div>
			<div class="mt-12 text-center">
				<p class="text-slate-500 text-sm mb-4">
					Don't see a role that fits? We're always looking for talent.
				</p>
				<button
					class="font-bold text-primary hover:underline underline-offset-4">
					Send a General Application
				</button>
			</div>
		</div>
	</section>
</template>
