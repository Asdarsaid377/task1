<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import { Fa6LocationDot } from "vue-icons-plus/fa6";
import { IpWorld } from "vue-icons-plus/ip";
</script>

<template>
	<main
		class="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
		<div class="max-w-7xl mx-auto">
			<div class="mb-8">
				<h1
					class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
					Post New Job
				</h1>
				<p class="text-slate-500 dark:text-slate-400 mt-2">
					Fill in the details below to find your next great hire.
				</p>
			</div>
			<form class="space-y-6">
				<!-- Card: Basic Information -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 border dark:border-slate-800 p-6">
					<h3 class="text-lg font-bold mb-6 text-primary">Basic Information</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="col-span-full">
							<label
								class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
								>Job Title</label
							>
							<input
								class="w-full rounded-lg border-slate-200 border border px-4 py-3"
								placeholder="e.g. Senior Full Stack Engineer"
								type="text" />
						</div>
						<div>
							<label
								class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
								>Category</label
							>
							<select
								class="w-full rounded-lg border-slate-200 border dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3">
								<option>Engineering</option>
								<option>Design</option>
								<option>Marketing</option>
								<option>Product Management</option>
								<option>Sales</option>
							</select>
						</div>
						<div>
							<label
								class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
								>Location</label
							>
							<div class="flex gap-4">
								<label
									class="flex-1 flex items-center justify-center border-2 border-primary rounded-lg p-3 cursor-pointer bg-primary/5">
									<input
										checked="true"
										class="hidden"
										name="location"
										type="radio" />
									<span
										class="flex items-center gap-2 text-sm font-semibold text-primary">
										<span class="material-symbols-outlined text-lg"
											><IpWorld
										/></span>
										Remote
									</span>
								</label>
								<label
									class="flex-1 flex items-center justify-center border-2 border-slate-200 border dark:border-slate-700 rounded-lg p-3 cursor-pointer hover:border-slate-300">
									<input class="hidden" name="location" type="radio" />
									<span
										class="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
										<span class="material-symbols-outlined text-lg"
											><Fa6LocationDot
										/></span>
										On-site
									</span>
								</label>
							</div>
						</div>
						<div>
							<label
								class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
								>Employment Type</label
							>
							<select
								class="w-full rounded-lg border-slate-200 border dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3">
								<option>Full-time</option>
								<option>Part-time</option>
								<option>Contract</option>
								<option>Freelance</option>
								<option>Internship</option>
							</select>
						</div>
						<div>
							<label
								class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
								>Salary Range (Annual)</label
							>
							<div class="flex items-center gap-2">
								<div class="relative flex-1">
									<span
										class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
										>$</span
									>
									<input
										class="w-full pl-8 rounded-lg border-slate-200 border dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary py-3"
										placeholder="Min"
										type="text" />
								</div>
								<span class="text-slate-400">—</span>
								<div class="relative flex-1">
									<span
										class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
										>$</span
									>
									<input
										class="w-full pl-8 rounded-lg border-slate-200 border dark:border-slate-700 dark:bg-slate-800 py-3"
										placeholder="Max"
										type="text" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- Card: Job Description -->
				<div
					class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 border dark:border-slate-800 p-6">
					<h3 class="text-lg font-bold mb-6 text-primary">Job Description</h3>
					<QuillEditor theme="snow" class="min-h-72 border-slate-200 border" />
				</div>
				<!-- Actions -->
				<div class="flex items-center justify-end gap-4 py-4">
					<button
						class="px-6 py-3 rounded-lg border-slate-200 border dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
						type="button">
						Save Draft
					</button>
					<button
						class="px-10 py-3 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
						type="submit">
						Publish Job Listing
					</button>
				</div>
			</form>
		</div>
	</main>
</template>
