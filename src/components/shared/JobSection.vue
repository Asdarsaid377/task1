<script setup lang="ts">
import { useDebounce } from "@/composable/useDebounce";
import { jobService } from "@/services/job.service";
import type { IJob } from "@/types/JobType";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Fa6LocationDot } from "vue-icons-plus/fa6";
import { PiBriefcaseBold } from "vue-icons-plus/pi";

const searchQuery = ref("");
const debouncedSearch = useDebounce<string>(searchQuery, 1000);
const selectedDept = ref("");
const loading = ref(true);
const jobs = ref<IJob[]>([]);
const error = ref<string | null>(null);
const isMounted = ref(false);

const uniqueJobTypes = computed(() => {
    return [...new Set(jobs.value.map((job) => job.jobType))];
});

const filteredJobs = computed(() => {
    const query = debouncedSearch.value.toLowerCase().trim();
    return jobs.value.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(query) ||
            job.location.toLowerCase().includes(query);

        const matchesDept =
            !selectedDept.value || job.jobType === selectedDept.value;

        return matchesSearch && matchesDept;
    });
});

const getJob = async () => {
    try {
        loading.value = true;
        error.value = null;
        const data = await jobService.fetchJobs();
        if (isMounted.value) {
            jobs.value = data;
        }
    } catch (err) {
        if (isMounted.value) {
            error.value = "Failed to fetch users";
        }
    }
};

onMounted(() => {
    isMounted.value = true;
    getJob();
});

onUnmounted(() => {
    isMounted.value = false;
});
</script>

<template>
    <section id="jobs" class="bg-white py-20 px-6 lg:px-20">
        <div class="max-w-7xl mx-auto">
            <!-- Section Header -->
            <div
                class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 animate-slide-up"
            >
                <div>
                    <h2 class="text-3xl font-extrabold text-slate-900 mb-2">
                        Current Openings
                    </h2>
                    <p class="text-slate-600">
                        Join our growing team of designers, engineers, and
                        thinkers.
                    </p>
                </div>

                <!-- Search & Filter -->
                <div
                    class="flex flex-col sm:flex-row gap-4 w-full md:w-auto"
                    style="animation-delay: 1s"
                >
                    <!-- Search Input -->
                    <div class="relative group">
                        <span
                            class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                            >search</span
                        >
                        <input
                            v-model="searchQuery"
                            class="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-300 text-slate-600"
                            placeholder="Search for jobs..."
                            type="text"
                        />
                    </div>

                    <!-- Department Filter -->
                    <select
                        v-model="selectedDept"
                        class="px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-slate-600 transition-all duration-300"
                    >
                        <option value="">All Job Types</option>
                        <option
                            v-for="jobType in uniqueJobTypes"
                            :key="jobType"
                            :value="jobType"
                        >
                            {{ jobType }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Job Listings -->
            <div class="space-y-4">
                <div
                    v-for="(job, index) in filteredJobs"
                    :key="job.id"
                    class="group flex flex-col md:flex-row items-center justify-between p-6 rounded-xl border border-slate-200 bg-white hover:border-primary/50 opacity-0 hover:shadow-2xl hover:scale-102 transition-all duration-300 cursor-pointer animate-fade-up"
                    :style="{ animationDelay: `${index * 0.6}s` }"
                >
                    <!-- Job Info -->
                    <div class="flex flex-col gap-1 mb-4 md:mb-0 flex-grow">
                        <h3
                            class="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors duration-300"
                        >
                            {{ job.title }}
                        </h3>
                        <div
                            class="flex justify-between md:justify-start items-center gap-4 text-sm text-slate-500 flex-wrap"
                        >
                            <span class="flex items-center gap-1">
                                <span
                                    class="material-symbols-outlined text-base"
                                >
                                    <Fa6LocationDot />
                                </span>
                                {{ job.location }}
                            </span>
                            <span class="flex items-center gap-1">
                                <span
                                    class="material-symbols-outlined text-base"
                                >
                                    <PiBriefcaseBold />
                                </span>
                                {{ job.jobType }}
                            </span>
                            <span
                                class="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider"
                            >
                                Rp. {{ job.salaryMin.toLocaleString() }} -
                                {{ job.salaryMax.toLocaleString() }}
                            </span>
                        </div>
                    </div>

                    <!-- View Details Button -->
                    <router-link
                        :to="`/details/${job.title.toLowerCase().replace(/\s+/g, '-')}-${job.id}`"
                        class="w-full md:w-auto px-6 py-2.5 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300 group-hover:scale-110 ml-4"
                    >
                        View Details
                    </router-link>
                </div>

                <!-- No Results -->
                <div
                    v-if="filteredJobs.length === 0"
                    class="text-center py-12 animate-fade-up"
                >
                    <p class="text-slate-500 text-lg">
                        No jobs found matching your criteria.
                    </p>
                </div>
            </div>

            <!-- General Application CTA -->
        </div>
    </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-up {
    animation: fadeInUp 0.9s ease-out forwards;
}

.animate-slide-up {
    animation: slideUp 0.9s ease-out forwards;
}

.animate-fade-in {
    animation: fadeIn 0.9s ease-out forwards;
}

.hover\:scale-102:hover {
    transform: scale(1.02);
}
</style>
