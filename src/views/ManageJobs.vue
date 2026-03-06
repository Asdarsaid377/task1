<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { jobService } from "@/services/job.service";
import type { IJob } from "@/types/JobType";
import type { TableColumn } from "@/components/table/BaseTable.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import TitleDashboard from "@/components/shared/TitleDashboard.vue";
import FilterandSearch from "@/components/shared/FilterandSearch.vue";
import EditModal from "@/components/modal/EditModal.vue";

const loading = ref(true);
const jobs = ref<IJob[]>([]);
const error = ref<string | null>(null);
const searchQuery = ref("");
const filters = ref({
    role: "all",
});
const isEditModalOpen = ref(false);
const selectedJob = ref<IJob | undefined>(undefined);
const submitting = ref(false);
const successMessage = ref<string | null>(null);

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

/**
 * Open edit modal dengan selected job
 */
const handleEditClick = (job: IJob) => {
	selectedJob.value = job;
	isEditModalOpen.value = true;
};

/**
 * Handle edit modal close
 */
const handleEditModalClose = () => {
	isEditModalOpen.value = false;
	selectedJob.value = undefined;
};

/**
 * Handle edit form submit
 * @param updatedData - Data yang sudah diedit dari form
 */
const handleSubmitEdit = async (updatedData: Partial<IJob>) => {
	if (!selectedJob.value?.id) {
		error.value = "Job ID is missing";
		return;
	}

	try {
		submitting.value = true;
		error.value = null;

		//  Service untuk update job
		await jobService.updateJob(selectedJob.value.id, updatedData);

		// Show success message
		successMessage.value = "Job listing updated successfully!";

		// Close modal
		handleEditModalClose();

		// Refresh jobs list
		await fetchJobs();

		// Clear success message after 3 seconds
		setTimeout(() => {
			successMessage.value = null;
		}, 3000);
	} catch (err: any) {
		console.error("Error updating job:", err);
		error.value = err.message || "Failed to update job listing";
	} finally {
		submitting.value = false;
	}
};

const handleDelete = async (job: IJob) => {
    await jobService.deleteJob(job.id);

    await fetchJobs();
};

const dismissError = () => {
	error.value = null;
};

/**
 * Dismiss success message
 */
const dismissSuccess = () => {
	successMessage.value = null;
};

onMounted(() => {
	fetchJobs();
});

onUnmounted(() => {
	jobs.value = [];
});
</script>

<template>
	<main class="flex-1 p-6">
		<!-- Header -->
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

		<!-- Error Message -->
		<transition
			enter-active-class="transition-all duration-300"
			leave-active-class="transition-all duration-300"
			enter-from-class="opacity-0 translate-y-2"
			leave-to-class="opacity-0 translate-y-2">
			<div
				v-if="error"
				class="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
				<div class="flex items-start gap-3">
					<span
						class="material-symbols-outlined text-red-600 dark:text-red-400 flex-shrink-0">
						error
					</span>
					<div class="flex-1">
						<p class="font-semibold text-red-800 dark:text-red-200">Error</p>
						<p class="text-sm text-red-700 dark:text-red-300 mt-1">
							{{ error }}
						</p>
					</div>
					<button
						@click="dismissError"
						class="text-red-400 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
						<span class="material-symbols-outlined">close</span>
					</button>
				</div>
			</div>
		</transition>

		<!-- Success Message -->
		<transition
			enter-active-class="transition-all duration-300"
			leave-active-class="transition-all duration-300"
			enter-from-class="opacity-0 translate-y-2"
			leave-to-class="opacity-0 translate-y-2">
			<div
				v-if="successMessage"
				class="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
				<div class="flex items-start gap-3">
					<span
						class="material-symbols-outlined text-green-600 dark:text-green-400 flex-shrink-0">
						check_circle
					</span>
					<div>
						<p class="font-semibold text-green-800 dark:text-green-200">
							Success
						</p>
						<p class="text-sm text-green-700 dark:text-green-300 mt-1">
							{{ successMessage }}
						</p>
					</div>
					<button
						@click="dismissSuccess"
						class="text-green-400 hover:text-green-600 dark:text-green-400 dark:hover:text-green-300">
						<span class="material-symbols-outlined">close</span>
					</button>
				</div>
			</div>
		</transition>

		<!-- Filters -->
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

		<!-- Jobs Table -->
		<BaseTable :columns="columns" :items="jobs" :loading="loading">
			<!-- Custom Salary Slot -->
			<template #salary="{ item }">
				IDR {{ item.salaryMin?.toLocaleString() }} -
				{{ item.salaryMax?.toLocaleString() }}
			</template>

			<!-- Custom Location Badge -->
			<template #location="{ item }">
				<span
					:class="
						item.location === 'remote'
							? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
							: item.location === 'onsite'
								? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
								: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
					"
					class="px-2.5 py-1 rounded-full text-xs font-bold capitalize">
					{{ item.location }}
				</span>
			</template>

			<!-- Actions Slot -->
			<template #actions="{ item }">
				<div class="flex justify-end gap-2">
					<!-- Edit Button -->
					<button
						@click="handleEditClick(item)"
						class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
						title="Edit job">
						<span class="material-symbols-outlined">edit</span>
					</button>

					<!-- Delete Button -->
					<button
						@click="handleDelete(item)"
						class="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors"
						title="Delete job">
						<span class="material-symbols-outlined">delete</span>
					</button>
				</div>
			</template>
		</BaseTable>
	</main>

	<!-- Edit Job Modal -->
	<EditModal
		:is-open="isEditModalOpen"
		:job="selectedJob"
		:loading="submitting"
		@close="handleEditModalClose"
		@submit="handleSubmitEdit" />
</template>
