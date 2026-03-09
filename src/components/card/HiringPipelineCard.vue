<script setup lang="ts">
import { computed } from "vue";
import type { GetApplication } from "@/types/ApplicationType";
import { CgMoreAlt } from "vue-icons-plus/cg";

interface Props {
    applications: GetApplication[];
    loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
});

// Count applications by status
const statusCounts = computed(() => {
    const counts = {
        applied: 0, // semua applications
        screening: 0, // "pending" + "reviewed"
        interview: 0, // "interviewed"
        final: 0, // "accepted"
    };

    const apps = props.applications || [];

    apps.forEach((app) => {
        // Semua applications dihitung sebagai "applied"
        counts.applied++;

        // Categorize berdasarkan status
        if (app.status === "pending" || app.status === "reviewed") {
            counts.screening++;
        } else if (app.status === "interviewed") {
            counts.interview++;
        } else if (app.status === "accepted") {
            counts.final++;
        }
    });

    return counts;
});

// Calculate percentage untuk progress bar
const getPercentage = (count: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
};
</script>

<template>
    <div
        class="bg-white p-6 rounded-xl border border-slate-200 darkssborder-slate-800 shadow-sm"
    >
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div>
                <h3 class="font-bold text-lg text-slate-900 darksstext-white">
                    Hiring Pipeline
                </h3>
                <p class="text-xs text-slate-500 darksstext-slate-400 mt-1">
                    Total applications: {{ statusCounts.applied }}
                </p>
            </div>
            <button
                class="text-slate-400 hover:text-slate-600 darksshover:text-slate-300 transition-colors"
            >
                <span class="material-symbols-outlined text-xl">
                    <CgMoreAlt />
                </span>
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="py-8 text-center">
            <svg
                class="animate-spin h-8 w-8 text-primary mx-auto"
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
            <p class="text-slate-500 darksstext-slate-400 mt-3">
                Loading pipeline...
            </p>
        </div>

        <!-- Pipeline Stages -->
        <div v-else class="space-y-4">
            <!-- Applied Stage -->
            <div class="space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="font-medium text-slate-900 darksstext-white">
                        Applied
                    </span>
                    <span
                        class="text-slate-600 darksstext-slate-400 font-semibold"
                    >
                        {{ statusCounts.applied }} candidates
                    </span>
                </div>
                <div
                    class="w-full bg-slate-100 darkssbg-slate-800 h-3 rounded-full overflow-hidden"
                >
                    <div
                        class="bg-blue-500 h-full w-[100%] rounded-full transition-all duration-500"
                    ></div>
                </div>
            </div>

            <!-- Screening Stage -->
            <div class="space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="font-medium text-slate-900 darksstext-white">
                        Screening
                    </span>
                    <span
                        class="text-slate-600 darksstext-slate-400 font-semibold"
                    >
                        {{ statusCounts.screening }} candidates
                    </span>
                </div>
                <div
                    class="w-full bg-slate-100 darkssbg-slate-800 h-3 rounded-full overflow-hidden"
                >
                    <div
                        class="bg-purple-500 h-full transition-all duration-500"
                        :style="{
                            width: `${getPercentage(statusCounts.screening, statusCounts.applied)}%`,
                        }"
                    ></div>
                </div>
                <p class="text-xs text-slate-500 darksstext-slate-400">
                    {{
                        getPercentage(
                            statusCounts.screening,
                            statusCounts.applied,
                        )
                    }}% of applied
                </p>
            </div>

            <!-- Interview Stage -->
            <div class="space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="font-medium text-slate-900 darksstext-white">
                        Interview
                    </span>
                    <span
                        class="text-slate-600 darksstext-slate-400 font-semibold"
                    >
                        {{ statusCounts.interview }} candidates
                    </span>
                </div>
                <div
                    class="w-full bg-slate-100 darkssbg-slate-800 h-3 rounded-full overflow-hidden"
                >
                    <div
                        class="bg-yellow-500 h-full transition-all duration-500"
                        :style="{
                            width: `${getPercentage(statusCounts.interview, statusCounts.applied)}%`,
                        }"
                    ></div>
                </div>
                <p class="text-xs text-slate-500 darksstext-slate-400">
                    {{
                        getPercentage(
                            statusCounts.interview,
                            statusCounts.applied,
                        )
                    }}% of applied
                </p>
            </div>

            <!-- Final Selection Stage -->
            <div class="space-y-2">
                <div class="flex justify-between text-sm">
                    <span class="font-medium text-slate-900 darksstext-white">
                        Final Selection
                    </span>
                    <span
                        class="text-slate-600 darksstext-slate-400 font-semibold"
                    >
                        {{ statusCounts.final }} candidates
                    </span>
                </div>
                <div
                    class="w-full bg-slate-100 darkssbg-slate-800 h-3 rounded-full overflow-hidden"
                >
                    <div
                        class="bg-green-500 h-full transition-all duration-500"
                        :style="{
                            width: `${getPercentage(statusCounts.final, statusCounts.applied)}%`,
                        }"
                    ></div>
                </div>
                <p class="text-xs text-slate-500 darksstext-slate-400">
                    {{
                        getPercentage(statusCounts.final, statusCounts.applied)
                    }}% of applied
                </p>
            </div>
        </div>

        <!-- Pipeline Info -->
        <div
            v-if="!loading && statusCounts.applied > 0"
            class="mt-6 p-4 rounded-lg bg-slate-50 darkssbg-slate-800/50"
        >
            <p class="text-xs text-slate-600 darksstext-slate-400">
                <span class="font-semibold text-slate-900 darksstext-white">
                    Conversion Rate:
                </span>
                {{ getPercentage(statusCounts.final, statusCounts.applied) }}%
                from applications to offers
            </p>
        </div>
    </div>
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
