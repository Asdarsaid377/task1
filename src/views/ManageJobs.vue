<script setup lang="ts">
import { onMounted, ref } from "vue";
import { jobService } from "@/services/job.service";
import type { IJob } from "@/types/JobType";
import type { TableColumn } from "@/components/table/BaseTable.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import TitleDashboard from "@/components/shared/TitleDashboard.vue";
import FilterandSearch from "@/components/shared/FilterandSearch.vue";

const loading = ref(true);
const jobs = ref<IJob[]>([]);
const error = ref<string | null>(null);
const searchQuery = ref("");
const filters = ref({
	role: "all",
});

const columns: TableColumn[] = [
	{ key: "title", label: "Title" },
	{ key: "description", label: "Description" },
	{ key: "jobType", label: "Job Type" },
	{ key: "salary", label: "Salary Range" },
	{ key: "location", label: "Location" },
];

const fetchJobs = async () => {
	try {
		loading.value = true;
		jobs.value = await jobService.fetchJobs();
	} catch (err) {
		error.value = "Failed to load jobs.";
	} finally {
		loading.value = false;
	}
};

const handleDelete = async (job: IJob) => {
	await jobService.deleteJob(job.id);
	await fetchJobs();
};

onMounted(fetchJobs);
</script>

<template>
	<main class="flex-1 p-6">
		<TitleDashboard
			title="Manage Jobs"
			subtitle="Manage and track job listings and applications.">
			<template #action>
				<router-link
					to="/dashboard/add-job"
					class="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors">
					<span class="material-symbols-outlined text-xl">add</span>
					Add Job
				</router-link>
			</template>
		</TitleDashboard>

		<FilterandSearch
			v-model:search="searchQuery"
			v-model="filters"
			:selects="[
				{
					key: 'role',
					label: 'Role',
					options: [
						{ label: 'All Roles', value: 'all' },
						{ label: 'Admin', value: 'admin' },
						{ label: 'Candidate', value: 'candidate' },
					],
				},
			]"
			search-placeholder="Name or email..." />

		<BaseTable :columns="columns" :items="jobs" :loading="loading">
			<!-- Custom Salary Slot -->
			<template #salary="{ item }">
				{{ item.salaryMin }} - {{ item.salaryMax }}
			</template>

			<!-- Custom Location Badge -->
			<template #location="{ item }">
				<span
					:class="
						item.location === 'remote'
							? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
							: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
					"
					class="px-2.5 py-1 rounded-full text-xs font-bold">
					{{ item.location }}
				</span>
			</template>

			<!-- Actions Slot -->
			<template #actions="{ item }">
				<div class="flex justify-end gap-2">
					<button
						@click="handleDelete(item)"
						class="p-2 text-red-500 hover:bg-red-100 rounded-lg">
						Delete
					</button>
				</div>
			</template>
		</BaseTable>
	</main>
</template>
