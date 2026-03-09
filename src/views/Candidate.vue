<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { applicationService } from "@/services/applications.service";
import type {
    IApplication,
    GetApplication,
    ApplicationStatus,
} from "@/types/ApplicationType";
import type { TableColumn } from "@/components/table/BaseTable.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import FilterandSearch from "@/components/shared/FilterandSearch.vue";
import EditCandidate from "@/components/modal/EditCandidate.vue";
import { alertService } from "@/components/alert/notif";
import TitleDashboard from "@/components/shared/TitleDashboard.vue";
import { useDebounce } from "@/composable/useDebounce";

const applications = ref<GetApplication[]>([]);
const loading = ref(false);
const submitting = ref(false);
const error = ref<string | null>(null);
const successMessage = ref<string | null>(null);

// Modal state
const isEditStatusModalOpen = ref(false);
const selectedApplication = ref<IApplication | undefined>(undefined);

const columns: TableColumn[] = [
    { key: "candidateEmail", label: "Candidate Email" },
    { key: "candidateName", label: "Candidate Name" },
    { key: "jobTitle", label: "Job Title" },
    { key: "status", label: "Status" },
    { key: "noWhatsapp", label: "No Whatsapp" },
    { key: "portfolio", label: "Portfolio" },
    { key: "jobType", label: "Job Type" },
    { key: "resumeUrl", label: "Resume" },
];
const searchQuery = ref("");
const debouncedSearch = useDebounce<string>(searchQuery, 1000);
const filters = ref({
    status: "all",
});

const filteredUsers = computed(() => {
    const query = debouncedSearch.value.toLowerCase();
    return applications.value.filter((user) => {
        const matchesSearch =
            !query ||
            user.candidateName?.toLowerCase().includes(query) ||
            user.candidateEmail?.toLowerCase().includes(query) ||
            user.job.title?.toLowerCase().includes(query);
        const matchesRole =
            filters.value.status === "all" ||
            user.status === filters.value.status;

        return matchesSearch && matchesRole;
    });
});

/**
 * Fetch all applications with job details
 */
const fetchApplications = async () => {
    try {
        loading.value = true;
        error.value = null;
        const data = await applicationService.fetchApplicationsWithJob();
        applications.value = data;
    } catch (error: any) {
        console.error("❌ Error fetching applications:", error);
        error.value = "Failed to fetch applications";
    } finally {
        loading.value = false;
    }
};

/**
 * Open edit status modal
 */
const handleEditStatusClick = (application: IApplication) => {
    selectedApplication.value = application;
    isEditStatusModalOpen.value = true;
};

/**
 * Close edit status modal
 */
const handleEditStatusModalClose = () => {
    isEditStatusModalOpen.value = false;
    selectedApplication.value = undefined;
};

/**
 * Handle edit status form submit
 */
const handleSubmitEditStatus = async (newStatus: ApplicationStatus) => {
    if (!selectedApplication.value?.id) {
        error.value = "Application ID is missing";
        return;
    }

    try {
        submitting.value = true;
        error.value = null;

        // Call service untuk update status
        await applicationService.updateApplication(
            selectedApplication.value.id,
            {
                status: newStatus,
                updatedAt: new Date(),
            },
        );
        alertService.success(`Berhasil edit status ke ${newStatus}`, 2000);
        // Close modal
        handleEditStatusModalClose();

        // Refresh applications list
        await fetchApplications();

        // Clear success message after 3 seconds
        setTimeout(() => {
            successMessage.value = null;
        }, 3000);
    } catch (err: any) {
        console.error("❌ Error updating application status:", err);
        error.value = err.message || "Failed to update application status";
    } finally {
        submitting.value = false;
    }
};

/**
 * Open resume in new tab
 */
const handleResume = (url: string) => {
    if (url) {
        window.open(url, "_blank");
    }
};

/**
 * Delete application dengan confirmation
 */
const handleDelete = async (application: IApplication) => {
    // Optional: Show confirmation dialog
    const confirmed = confirm(
        `Are you sure you want to delete the application from ${application.candidateName}?`,
    );
    if (!confirmed) return;

    try {
        loading.value = true;
        error.value = null;

        await applicationService.deleteApplication(application.id);

        // Show success message
        successMessage.value = "Application deleted successfully!";

        // Refresh applications list
        await fetchApplications();

        // Clear success message after 3 seconds
        setTimeout(() => {
            successMessage.value = null;
        }, 3000);
    } catch (err: any) {
        console.error(" Error deleting application:", err);
        error.value = err.message || "Failed to delete application";
    } finally {
        loading.value = false;
    }
};

const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
        pending:
            "bg-yellow-100 text-yellow-700 darksssbg-yellow-900/30 darkssstext-yellow-400",
        reviewed:
            "bg-blue-100 text-blue-700 darksssbg-blue-900/30 darkssstext-blue-400",
        interviewed:
            "bg-purple-100 text-purple-700 darksssbg-purple-900/30 darkssstext-purple-400",
        rejected:
            "bg-red-100 text-red-700 darksssbg-red-900/30 darkssstext-red-400",
        accepted:
            "bg-green-100 text-green-700 darksssbg-green-900/30 darkssstext-green-400",
    };
    return statusColors[status] || statusColors.pending;
};

const dismissError = () => {
    error.value = null;
};
const dismissSuccess = () => {
    successMessage.value = null;
};

// Lifecycle
onMounted(() => {
    fetchApplications();
});
</script>

<template>
    <main class="flex-1 p-6 overflow-y-auto">
        <!-- Page Header -->
        <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
            <TitleDashboard
                title="  Applicant Tracking"
                subtitle="Manage and track candidate progress across all job openings."
                class="text-zinc-900 darkssstext-zinc-100"
            />
            <button
                @click="fetchApplications"
                class="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
                <span class="material-symbols-outlined text-xl">refresh</span>
                Refresh
            </button>
        </div>

        <!-- Error Message -->
        <transition
            enter-active-class="transition-all duration-300"
            leave-active-class="transition-all duration-300"
            enter-from-class="opacity-0 translate-y-2"
            leave-to-class="opacity-0 translate-y-2"
        >
            <div
                v-if="error"
                class="mb-6 p-4 rounded-lg bg-red-50 darksssbg-red-900/20 border border-red-200 darksssborder-red-800"
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
                        class="text-red-400 hover:text-red-600 darkssstext-red-400 darkssshover:text-red-300"
                    >
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
            leave-to-class="opacity-0 translate-y-2"
        >
            <div
                v-if="successMessage"
                class="mb-6 p-4 rounded-lg bg-green-50 darksssbg-green-900/20 border border-green-200 darksssborder-green-800"
            >
                <div class="flex items-start gap-3">
                    <span
                        class="material-symbols-outlined text-green-600 darkssstext-green-400 flex-shrink-0"
                    >
                        check_circle
                    </span>
                    <div>
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
                        class="text-green-400 hover:text-green-600 darkssstext-green-400 darkssshover:text-green-300"
                    >
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
                    key: 'status',
                    label: 'Status',
                    options: [
                        { label: 'All Status', value: 'all' },
                        { label: 'Pending', value: 'pending' },
                        { label: 'Reviewed', value: 'reviewed' },
                        { label: 'Interviewed', value: 'interviewed' },
                        { label: 'Rejected', value: 'rejected' },
                        { label: 'Accepted', value: 'accepted' },
                    ],
                },
            ]"
            search-placeholder="Name or email..."
        />

        <!-- Applications Table -->
        <BaseTable :columns="columns" :items="filteredUsers" :loading="loading">
            <!-- Job Title -->
            <template #jobTitle="{ item }">
                <span class="font-medium text-slate-900 darkssstext-white">
                    {{ item.job?.title || "N/A" }}
                </span>
            </template>

            <!-- Status Badge -->
            <template #status="{ item }">
                <span
                    :class="getStatusColor(item.status)"
                    class="px-2.5 py-1 rounded-full text-xs font-bold capitalize"
                >
                    {{ item.status }}
                </span>
            </template>

            <!-- Portfolio Link -->
            <template #portfolio="{ item }">
                <a
                    v-if="item.portfolio"
                    :href="item.portfolio"
                    target="_blank"
                    class="text-primary hover:underline text-sm font-medium"
                >
                    View Portfolio
                </a>
                <span v-else class="text-slate-400 text-sm">-</span>
            </template>

            <!-- Job Type -->
            <template #jobType="{ item }">
                <span
                    class="text-sm text-slate-700 darkssstext-slate-300 capitalize"
                >
                    {{ item.job?.jobType || "N/A" }}
                </span>
            </template>

            <!-- Resume Button -->
            <template #resumeUrl="{ item }">
                <button
                    v-if="item.resumeUrl"
                    @click="handleResume(item.resumeUrl)"
                    class="px-3 py-1.5 text-white text-sm font-medium whitespace-nowrap hover:bg-primary/80 bg-primary rounded-lg transition-colors flex items-center gap-1"
                >
                    <span class="material-symbols-outlined text-sm"
                        >download</span
                    >
                    View Resume
                </button>
                <span v-else class="text-slate-400 text-sm">No Resume</span>
            </template>

            <!-- Actions -->
            <template #actions="{ item }">
                <div class="flex justify-end gap-2">
                    <!-- Edit Status Button -->
                    <button
                        @click="handleEditStatusClick(item as IApplication)"
                        class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                        title="Edit Status"
                    >
                        <span class="material-symbols-outlined">edit</span>
                    </button>

                    <!-- Delete Button -->
                    <button
                        @click="handleDelete(item as IApplication)"
                        class="p-2 text-red-500 hover:bg-red-100 darkssshover:bg-red-900/20 rounded-lg transition-all"
                        title="Delete Application"
                    >
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </template>
        </BaseTable>
    </main>

    <!-- Edit Application Status Modal -->
    <EditCandidate
        v-if="isEditStatusModalOpen"
        :application="selectedApplication"
        :loading="submitting"
        @close="handleEditStatusModalClose"
        @submit="handleSubmitEditStatus"
    />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

.material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-variation-settings:
        "FILL" 0,
        "wght" 300,
        "GRAD" 0,
        "opsz" 24;
}
</style>
