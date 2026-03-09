<script setup lang="ts">
import { computed } from "vue";
import type { GetApplication } from "@/types/ApplicationType";
import { TbBrandGoogleAnalytics } from "vue-icons-plus/tb";

interface Props {
    applications: GetApplication[];
    loading?: boolean;
    maxItems?: number;
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    maxItems: 5,
});

// Group applications by job
const applicationsByJob = computed(() => {
    const grouped = new Map<string, GetApplication[]>();

    props.applications.forEach((app) => {
        const jobId = app.jobId;
        if (!grouped.has(jobId)) {
            grouped.set(jobId, []);
        }
        grouped.get(jobId)?.push(app);
    });

    // Convert to array and sort by application count (descending)
    return Array.from(grouped.entries())
        .map(([jobId, apps]) => ({
            jobId,
            jobTitle: apps[0]?.job?.title || "Untitled Position",
            companyName: apps[0]?.job?.companyName || "Company",
            jobIcon: getJobIcon(apps[0]?.job?.title || ""),
            applicationCount: apps.length,
            daysLeft: calculateDaysLeft(apps[0]?.job?.createdAt),
            engagement: getEngagement(apps.length),
            apps,
        }))
        .sort((a, b) => b.applicationCount - a.applicationCount)
        .slice(0, props.maxItems);
});

// Get icon berdasarkan job title
const getJobIcon = (title: string): string => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("backend") || lowerTitle.includes("engineer")) {
        return "terminal";
    } else if (lowerTitle.includes("design") || lowerTitle.includes("ui")) {
        return "palette";
    } else if (lowerTitle.includes("frontend")) {
        return "code";
    } else if (lowerTitle.includes("product")) {
        return "shopping_cart";
    } else if (lowerTitle.includes("marketing")) {
        return "trending_up";
    } else if (lowerTitle.includes("sales")) {
        return "trending_up";
    } else if (lowerTitle.includes("manager")) {
        return "person";
    } else {
        return "work";
    }
};

// Calculate days left (dari created date)
const calculateDaysLeft = (createdAt: any): number => {
    if (!createdAt) return 0;

    const created = createdAt.toDate?.() || new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Assuming job posting lasts 30 days
    return Math.max(0, 30 - diffDays);
};

// Get engagement level berdasarkan aplikasi count
const getEngagement = (count: number): string => {
    if (count >= 100) return "High";
    if (count >= 50) return "Medium";
    return "Low";
};

// Get engagement color
const getEngagementColor = (engagement: string): string => {
    switch (engagement) {
        case "High":
            return "text-green-600";
        case "Medium":
            return "text-yellow-600";
        case "Low":
            return "text-orange-600";
        default:
            return "text-slate-600";
    }
};

// Get engagement bg color
const getEngagementBgColor = (engagement: string): string => {
    switch (engagement) {
        case "High":
            return "bg-green-50";
        case "Medium":
            return "bg-yellow-50";
        case "Low":
            return "bg-orange-50";
        default:
            return "bg-slate-50 /20";
    }
};
</script>

<template>
    <div
        class="bg-white p-6 rounded-xl border border-slate-200 :border-slate-800 shadow-sm"
    >
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <h3 class="font-bold text-lg text-slate-900">
                Recent Listings Performance
            </h3>
            <button
                class="text-slate-400 hover:text-slate-600 transition-colors"
            >
                <span class="material-symbols-outlined text-xl">
                    <TbBrandGoogleAnalytics />
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
            <p class="text-slate-500 mt-3">Loading listings...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="applicationsByJob.length === 0" class="p-8 text-center">
            <span class="material-symbols-outlined text-4xl text-slate-300">
                briefcase_off
            </span>
            <p class="text-slate-500 mt-2">No applications yet</p>
        </div>

        <!-- Job Listings -->
        <div v-else class="flex flex-col gap-4">
            <div
                v-for="job in applicationsByJob"
                :key="job.jobId"
                class="flex items-center gap-4 p-4 rounded-lg border border-slate-100 darkssborder-slate-800 hover:bg-slate-50 darksshover:bg-slate-800/50 transition-colors cursor-pointer group"
            >
                <!-- Job Icon -->
                <div
                    class="size-12 rounded bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                >
                    <span class="material-symbols-outlined text-lg">
                        {{ job.jobIcon }}
                    </span>
                </div>

                <!-- Job Info -->
                <div class="flex-1 min-w-0">
                    <p
                        class="text-sm font-bold text-slate-900 darksstext-white truncate"
                    >
                        {{ job.jobTitle }}
                    </p>
                    <p
                        class="text-xs text-slate-500 darksstext-slate-400 mt-0.5"
                    >
                        <span
                            >{{ job.applicationCount }} application{{
                                job.applicationCount !== 1 ? "s" : ""
                            }}</span
                        >
                        <span
                            v-if="job.daysLeft > 0"
                            class="before:content-['•'] before:mx-1.5"
                        >
                            {{ job.daysLeft }} days left
                        </span>
                        <span
                            v-else
                            class="text-red-500 before:content-['•'] before:mx-1.5"
                        >
                            Closed
                        </span>
                    </p>
                </div>

                <!-- Engagement Badge -->
                <div
                    class="px-3 py-2 rounded-lg flex-shrink-0 text-right"
                    :class="getEngagementBgColor(job.engagement)"
                >
                    <p
                        class="text-sm font-bold"
                        :class="getEngagementColor(job.engagement)"
                    >
                        {{ job.engagement }}
                    </p>
                    <p
                        class="text-[10px] text-slate-500 darksstext-slate-400 uppercase tracking-wider mt-0.5"
                    >
                        Engagement
                    </p>
                </div>
            </div>
        </div>

        <!-- Show More Link -->
        <div
            v-if="
                applicationsByJob.length >= maxItems &&
                applications.length > maxItems
            "
            class="mt-4 pt-4 border-t border-slate-100 darkssborder-slate-800 text-center"
        >
            <button
                class="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
                View all {{ applications.length }} listings
            </button>
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
