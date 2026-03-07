<script setup lang="ts">
import Navbar from "@/components/shared/Navbar.vue";
import { useAuth } from "@/lib/authfirebase";
import { applicationService } from "@/services/applications.service";
import type { GetApplication } from "@/types/ApplicationType";
import { onMounted, ref, computed } from "vue";

const { user } = useAuth();
const profile = user.value;
const applications = ref<GetApplication[]>([]);
const activeStatus = ref<string | null>(null);
const loading = ref(false);

// Status tabs
const statusTabs = [
    { label: "All", value: null },
    { label: "Pending", value: "pending" },
    { label: "Reviewed", value: "reviewed" },
    { label: "Interviewing", value: "interviewed" },
    { label: "Accepted", value: "accepted" },
    { label: "Rejected", value: "rejected" },
];

// Filtered applications based on active status
const filteredApplications = computed(() => {
    if (activeStatus.value === null) {
        return applications.value;
    }
    return applications.value.filter(
        (app) => app.status === activeStatus.value,
    );
});

// Count applications by status
const statusCounts = computed(() => {
    const counts = {
        all: applications.value.length,
        pending: 0,
        reviewed: 0,
        interviewed: 0,
        accepted: 0,
        rejected: 0,
    };

    applications.value.forEach((app) => {
        if (app.status === "pending") counts.pending++;
        else if (app.status === "reviewed") counts.reviewed++;
        else if (app.status === "interviewed") counts.interviewed++;
        else if (app.status === "accepted") counts.accepted++;
        else if (app.status === "rejected") counts.rejected++;
    });

    return counts;
});

// Get status badge color
const getStatusColor = (status: string) => {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
        case "reviewed":
            return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
        case "interviewed":
            return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
        case "accepted":
            return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
        case "rejected":
            return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
        default:
            return "bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400";
    }
};

// Format date
const formatDate = (date: any) => {
    if (!date) return "N/A";
    const d = date.toDate?.() || new Date(date);
    return new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(d);
};

const getData = async () => {
    try {
        if (!user.value) return;
        loading.value = true;
        const data = await applicationService.fetchApplicationsByCandidateId(
            user.value.uid,
        );
        applications.value = data;
        console.log("Applications loaded:", data);
        return data;
    } catch (error) {
        console.log("Error fetching applications:", error);
    } finally {
        loading.value = false;
    }
};

// Handle status tab click
const selectStatus = (status: string | null) => {
    activeStatus.value = status;
};

onMounted(() => {
    getData();
});
</script>

<template>
    <Navbar />
    <main class="max-w-7xl mx-auto px-4 py-12">
        <!-- Profile Section -->
        <section
            class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/5 p-8 mb-8"
        >
            <div
                class="flex flex-col md:flex-row items-center md:items-center gap-8"
            >
                <!-- Avatar -->
                <div class="relative">
                    <div
                        class="size-32 rounded-full border-4 border-primary/10 bg-cover bg-center shadow-lg"
                        :style="
                            profile?.photoURL
                                ? `background-image: url('${profile.photoURL}')`
                                : ''
                        "
                    >
                        <div
                            v-if="!profile?.photoURL"
                            class="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-4xl font-bold rounded-full"
                        >
                            {{ profile?.displayName?.charAt(0) || "U" }}
                        </div>
                    </div>
                </div>

                <!-- Profile Info -->
                <div class="flex-1 text-center md:text-left">
                    <div
                        class="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 gap-4"
                    >
                        <div>
                            <h1
                                class="text-3xl uppercase font-bold text-slate-900 dark:text-white mb-1"
                            >
                                {{ profile?.displayName }}
                            </h1>
                            <p class="text-sm text-primary font-semibold">
                                {{ profile?.email }}
                            </p>
                        </div>
                    </div>
                    <p class="text-slate-600 dark:text-slate-400">
                        You have applied to
                        <span class="font-bold text-primary">
                            {{ applications.length }}
                        </span>
                        job{{ applications.length !== 1 ? "s" : "" }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Applications Section -->
        <div
            class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
            <!-- Status Tabs -->
            <div
                class="flex border-b border-slate-200 dark:border-slate-800 px-6 gap-2 overflow-x-auto scrollbar-hide bg-slate-50 dark:bg-slate-800/30"
            >
                <button
                    v-for="tab in statusTabs"
                    :key="tab.label"
                    @click="selectStatus(tab.value)"
                    class="relative flex flex-col items-center justify-center pb-3 pt-4 px-2 min-w-max transition-all duration-300"
                >
                    <!-- Tab Label with Count -->
                    <span
                        class="text-sm font-bold tracking-wide"
                        :class="
                            activeStatus === tab.value
                                ? 'text-primary dark:text-white'
                                : 'text-slate-500 dark:text-slate-400 hover:text-primary'
                        "
                    >
                        {{ tab.label }}
                        <span
                            class="ml-1 inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                            :class="
                                activeStatus === tab.value
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                            "
                        >
                            {{
                                tab.value === null
                                    ? statusCounts.all
                                    : tab.value === "pending"
                                      ? statusCounts.pending
                                      : tab.value === "reviewed"
                                        ? statusCounts.reviewed
                                        : tab.value === "interviewed"
                                          ? statusCounts.interviewed
                                          : tab.value === "accepted"
                                            ? statusCounts.accepted
                                            : statusCounts.rejected
                            }}
                        </span>
                    </span>

                    <!-- Active Indicator -->
                    <div
                        v-if="activeStatus === tab.value"
                        class="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t transition-all duration-300"
                    ></div>
                </button>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="p-8 text-center">
                <div class="inline-block">
                    <svg
                        class="animate-spin h-8 w-8 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </div>
                <p class="text-slate-500 dark:text-slate-400 mt-4">
                    Loading your applications...
                </p>
            </div>

            <!-- Empty State -->
            <div
                v-else-if="filteredApplications.length === 0"
                class="p-12 text-center"
            >
                <p class="text-slate-500 dark:text-slate-400 text-lg">
                    {{
                        activeStatus
                            ? "No applications found in this status"
                            : "You haven't applied to any jobs yet"
                    }}
                </p>
                <p class="text-sm text-slate-400 dark:text-slate-500 mt-2">
                    Start exploring and apply for your dream job!
                </p>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50 dark:bg-slate-800/50">
                            <th
                                class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                            >
                                Company
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                            >
                                Job Title
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
                            >
                                Date Applied
                            </th>
                            <th
                                class="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center"
                            >
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody
                        class="divide-y divide-slate-100 dark:divide-slate-800"
                    >
                        <tr
                            v-for="item in filteredApplications"
                            :key="item.id"
                            class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                        >
                            <!-- Company -->
                            <td class="px-6 py-5">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="size-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg"
                                    >
                                        {{
                                            item.job.companyName?.charAt(0) ||
                                            "G"
                                        }}
                                    </div>
                                    <span
                                        class="font-semibold text-slate-900 dark:text-slate-100"
                                    >
                                        {{ item.job.companyName || "Company" }}
                                    </span>
                                </div>
                            </td>

                            <!-- Job Title -->
                            <td
                                class="px-6 py-5 text-slate-600 dark:text-slate-300 font-medium"
                            >
                                {{ item.job.title }}
                            </td>

                            <!-- Date Applied -->
                            <td
                                class="px-6 py-5 text-slate-500 dark:text-slate-400 text-sm"
                            >
                                {{ formatDate(item.appliedAt) }}
                            </td>

                            <!-- Status Badge -->
                            <td class="px-6 py-5">
                                <div class="flex justify-center">
                                    <span
                                        class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-tighter"
                                        :class="getStatusColor(item.status)"
                                    >
                                        {{ item.status }}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Table Footer - Summary -->
            <div
                v-if="!loading && filteredApplications.length > 0"
                class="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800"
            >
                <p class="text-sm text-slate-600 dark:text-slate-400">
                    Showing
                    <span class="font-semibold text-slate-900 dark:text-white">
                        {{ filteredApplications.length }}
                    </span>
                    of
                    <span class="font-semibold text-slate-900 dark:text-white">
                        {{ applications.length }}
                    </span>
                    application{{
                        filteredApplications.length !== 1 ? "s" : ""
                    }}
                </p>
            </div>
        </div>
    </main>
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

/* Hide scrollbar while keeping functionality */
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.animate-spin {
    animation: spin 1s linear infinite;
}
</style>
