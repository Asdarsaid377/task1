<script setup lang="ts">
import type { IJob } from "@/types/JobType";
import { BsBuilding } from "vue-icons-plus/bs";
import { Fa6LocationDot } from "vue-icons-plus/fa6";
import { PiMoneyWavyBold } from "vue-icons-plus/pi";

// Mendefinisikan props dengan default value
const props = defineProps<{
    job: IJob;
}>();

// Mendefinisikan emit untuk aksi tombol
const emit = defineEmits<{
    (e: "view-details", job: IJob): void;
    (e: "apply", job: IJob): void;
}>();
</script>

<template>
    <div
        class="group relative bg-white p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary dark:hover:border-primary/50 hover:shadow-lg transition-all"
    >
        <div class="flex flex-col md:flex-row gap-6">
            <div
                class="size-14 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 overflow-hidden"
            >
                <img
                    class="w-full h-full object-cover"
                    :src="job.companyLogo"
                    :alt="`Logo ${job.companyName}`"
                />
            </div>

            <div class="flex-1">
                <div
                    class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2"
                >
                    <h4
                        class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors"
                    >
                        {{ job.title }}
                    </h4>
                    <span
                        class="items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    >
                        {{ job.jobType }}
                    </span>
                </div>

                <div
                    class="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4"
                >
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm"
                            ><BsBuilding
                        /></span>
                        <span>{{ job.companyName }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm"
                            ><Fa6LocationDot
                        /></span>
                        <span>{{ job.location }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm"
                            ><PiMoneyWavyBold
                        /></span>
                        <span>{{ job.salaryMin }} - {{ job.salaryMax }}</span>
                    </div>
                </div>

                <div
                    class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800"
                >
                    <span class="text-xs text-slate-400 italic">
                        Posted {{ job.createdAt }}
                    </span>
                    <div class="flex items-center gap-3">
                        <button
                            @click="emit('view-details', job)"
                            class="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/80 rounded-lg transition-colors"
                        >
                            View Details
                        </button>
                        <!-- <button
							@click="emit('apply', job.id)"
							class="px-4 py-2 text-sm font-bold text-white bg-primary rounded-lg shadow-sm hover:shadow-md transition-all">
							Apply Now
						</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
