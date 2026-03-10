<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { jobService } from "@/services/job.service";
import type { IJob } from "@/types/JobType";
import type { TableColumn } from "@/components/table/BaseTable.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import TitleDashboard from "@/components/shared/TitleDashboard.vue";
import FilterandSearch from "@/components/shared/FilterandSearch.vue";
import EditModal from "@/components/modal/EditModal.vue";
import { useDebounce } from "@/composable/useDebounce";
import { useFetch } from "@/composable/useFetch";
import { useTableFilter } from "@/composable/useFilterTable";
import { formatCurrency } from "@/utils/formatCurrency";

// const loading = ref(true);
// const jobs = ref<IJob[]>([]);
// const error = ref<string | null>(null);
const searchQuery = ref("");
const debouncedSearch = useDebounce<string>(searchQuery, 1000);
const filters = ref({
    status: "all",
});
const isEditModalOpen = ref(false);
const selectedJob = ref<IJob>();
const submitting = ref(false);
const successMessage = ref<string | null>(null);

const columns: TableColumn[] = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "jobType", label: "Job Type" },
    { key: "salary", label: "Salary Range" },
    { key: "location", label: "Location" },
];

const {
    data,
    error,
    loading,
    execute: fetchJobs,
} = useFetch<IJob[]>(() => jobService.fetchJobs(), []);

const { filteredData: filteredJob } = useTableFilter(
    data,
    debouncedSearch,
    filters,
    ["title", "jobType", "location"],
);

const handleEditClick = (job: IJob) => {
    selectedJob.value = job;
    isEditModalOpen.value = true;
};

const handleEditModalClose = () => {
    isEditModalOpen.value = false;
    selectedJob.value = undefined;
};

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

const dismissSuccess = () => {
    successMessage.value = null;
};

onMounted(() => {
    fetchJobs();
});

onUnmounted(() => {
    data.value = [];
});
</script>
<template>
    <main
        class="flex-1 p-6 bg-white darksssbg-zinc-950 transition-colors duration-300"
    >
        <TitleDashboard
            title="Manage Jobs"
            subtitle="Manage and track job listings and applications."
            class="text-zinc-900 darkssstext-zinc-100"
        >
            <template #action>
                <router-link
                    to="/dashboard/add-job"
                    class="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-sm active:scale-95"
                >
                    <span class="material-symbols-outlined text-xl">add</span>
                    Add Job
                </router-link>
            </template>
        </TitleDashboard>

        <transition
            enter-active-class="transition-all duration-300"
            leave-active-class="transition-all duration-300"
            enter-from-class="opacity-0 translate-y-2"
            leave-to-class="opacity-0 translate-y-2"
        >
            <div
                v-if="error"
                class="mb-6 p-4 rounded-lg bg-red-50 darksssbg-red-950/30 border border-red-200 darksssborder-red-900/50"
            >
                <div class="flex items-start gap-3">
                    <span
                        class="material-symbols-outlined text-red-600 darkssstext-red-400 flex-shrink-0"
                    >
                        error
                    </span>
                    <div class="flex-1">
                        <p
                            class="font-semibold text-red-800 darkssstext-red-200"
                        >
                            Error
                        </p>
                        <p
                            class="text-sm text-red-700 darkssstext-red-300 mt-1"
                        >
                            {{ error }}
                        </p>
                    </div>
                    <button
                        @click="dismissError"
                        class="text-red-400 hover:text-red-600 darkssstext-red-500 darkssshover:text-red-300 transition-colors"
                    >
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        </transition>

        <transition
            enter-active-class="transition-all duration-300"
            leave-active-class="transition-all duration-300"
            enter-from-class="opacity-0 translate-y-2"
            leave-to-class="opacity-0 translate-y-2"
        >
            <div
                v-if="successMessage"
                class="mb-6 p-4 rounded-lg bg-green-50 darksssbg-green-950/30 border border-green-200 darksssborder-green-900/50"
            >
                <div class="flex items-start gap-3">
                    <span
                        class="material-symbols-outlined text-green-600 darkssstext-green-400 flex-shrink-0"
                    >
                        check_circle
                    </span>
                    <div class="flex-1">
                        <p
                            class="font-semibold text-green-800 darkssstext-green-200"
                        >
                            Success
                        </p>
                        <p
                            class="text-sm text-green-700 darkssstext-green-300 mt-1"
                        >
                            {{ successMessage }}
                        </p>
                    </div>
                    <button
                        @click="dismissSuccess"
                        class="text-green-400 hover:text-green-600 darkssstext-green-500 darkssshover:text-green-300 transition-colors"
                    >
                        <span class="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        </transition>

        <div
            class="mb-6 p-4 rounded-xl bg-zinc-50 darksssbg-zinc-900/50 border border-zinc-200 darksssborder-zinc-800"
        >
            <FilterandSearch
                v-model:search="searchQuery"
                v-model="filters"
                :selects="[
                    {
                        key: 'role',
                        label: 'Role',
                        options: [
                            { label: 'All Roles', value: 'all' },
                            { label: 'Open', value: 'open' },
                            { label: 'Close', value: 'close' },
                        ],
                    },
                ]"
                search-placeholder="Search jobs..."
            />
        </div>

        <div
            class="rounded-xl border border-zinc-200 darksssborder-zinc-800 overflow-hidden bg-white darksssbg-zinc-900 shadow-sm"
        >
            <BaseTable
                :columns="columns"
                :items="filteredJob"
                :loading="loading"
            >
                <template #salary="{ item }">
                    <span
                        class="text-zinc-700 darkssstext-zinc-300 font-medium"
                    >
                        {{ formatCurrency(item.salaryMin) }} -
                        {{ formatCurrency(item.salaryMax) }}
                    </span>
                </template>

                <template #location="{ item }">
                    <span
                        :class="
                            item.location === 'remote'
                                ? 'bg-emerald-100 text-emerald-700 darksssbg-emerald-900/30 darkssstext-emerald-400'
                                : item.location === 'onsite'
                                  ? 'bg-blue-100 text-blue-700 darksssbg-blue-900/30 darkssstext-blue-400'
                                  : 'bg-violet-100 text-violet-700 darksssbg-violet-900/30 darkssstext-violet-400'
                        "
                        class="px-2.5 py-1 rounded-full text-xs font-bold capitalize inline-flex items-center"
                    >
                        {{ item.location }}
                    </span>
                </template>

                <template #actions="{ item }">
                    <div class="flex justify-end gap-1">
                        <button
                            @click="handleEditClick(item)"
                            class="p-2 text-zinc-600 darkssstext-zinc-400 hover:text-primary darkssshover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                            title="Edit job"
                        >
                            <span class="material-symbols-outlined text-[20px]"
                                >edit</span
                            >
                        </button>

                        <button
                            @click="handleDelete(item)"
                            class="p-2 text-zinc-600 darkssstext-zinc-400 hover:text-red-500 darkssshover:text-red-400 hover:bg-red-50 darkssshover:bg-red-900/20 rounded-lg transition-all"
                            title="Delete job"
                        >
                            <span class="material-symbols-outlined text-[20px]"
                                >delete</span
                            >
                        </button>
                    </div>
                </template>
            </BaseTable>
        </div>
    </main>

    <EditModal
        v-if="isEditModalOpen"
        :job="selectedJob"
        :loading="submitting"
        @close="handleEditModalClose"
        @submit="handleSubmitEdit"
    />
</template>
