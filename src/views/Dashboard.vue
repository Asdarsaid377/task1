<script setup lang="ts">
import { alertService } from "@/components/alert/notif";
import DashboardCard from "@/components/card/DashboardCard.vue";
import HiringPipelineCard from "@/components/card/HiringPipelineCard.vue";
import ListingCard from "@/components/card/ListingCard.vue";
import { applicationService } from "@/services/applications.service";
import type { GetApplication } from "@/types/ApplicationType";
import { onMounted, onUnmounted, ref } from "vue";
import { AiFillCalendar, AiOutlineMore } from "vue-icons-plus/ai";
import { BiTrendingUp } from "vue-icons-plus/bi";
import { BsPalette, BsTerminal } from "vue-icons-plus/bs";
import { CgMoreAlt } from "vue-icons-plus/cg";
import { MdOutlineWork } from "vue-icons-plus/md";
import { TbBrandGoogleAnalytics } from "vue-icons-plus/tb";

const applications = ref<GetApplication[]>([]);
const loading = ref(false);

const fetchApplication = async () => {
    try {
        loading.value = true;
        const data = await applicationService.fetchApplicationsWithJob();
        applications.value = data
            .sort(
                (a, b) =>
                    new Date(b.appliedAt).getTime() -
                    new Date(a.appliedAt).getTime(),
            )
            .slice(0, 7);
        loading.value = false;
    } catch (e: any) {
        alertService.error(`Error ${e}`, 2000);
    }
};

onMounted(() => {
    fetchApplication();
});

onUnmounted(() => [(applications.value = [])]);
</script>

<template>
    <main class="flex-1 flex flex-col">
        <!-- Dashboard Content -->
        <div class="p-6 space-y-8">
            <!-- Welcome -->
            <div>
                <h1 class="text-3xl font-black tracking-tight">
                    Dashboard Overview
                </h1>
                <p class="text-slate-500 mt-1">
                    Welcome back, here is what's happening with your job
                    listings today.
                </p>
            </div>
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                    :value="applications.length"
                    :title="'Total Lamaran'"
                    :icon="BiTrendingUp"
                    :trend="'12'"
                />

                <DashboardCard
                    :value="applications.length"
                    :title="'Lowongan Aktif'"
                    :icon="MdOutlineWork"
                    :trend="'0'"
                />

                <DashboardCard
                    :value="
                        applications.filter(
                            (app) => app.status === 'interviewed',
                        ).length
                    "
                    :title="'Wawancara'"
                    :icon="AiFillCalendar"
                    :trend="'20'"
                />
            </div>
            <!-- Recent Applicants -->
            <div
                class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
                <div
                    class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center"
                >
                    <h2 class="text-xl font-bold">Recent Applicant Activity</h2>
                    <a
                        href="/dashboard/applicant"
                        class="text-primary text-sm font-bold hover:underline"
                    >
                        View All
                    </a>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-background-light dark:bg-slate-800/50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-xs font-bold text-slate-500 uppercase"
                                >
                                    Applicant
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-bold text-slate-500 uppercase"
                                >
                                    Role Applied
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-bold text-slate-500 uppercase"
                                >
                                    Applied Date
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-bold text-slate-500 uppercase"
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            class="divide-y divide-slate-200 dark:divide-slate-800"
                        >
                            <tr
                                v-for="applicant in applications"
                                :key="applicant.id"
                                class="hover:bg-background-light dark:hover:bg-slate-800/30 transition-colors"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="size-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-primary"
                                        >
                                            <img
                                                class="rounded-full"
                                                :src="applicant.user.photoURL"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <p class="text-sm font-bold">
                                                {{ applicant.candidateName }}
                                            </p>
                                            <p class="text-xs text-slate-500">
                                                {{ applicant.candidateEmail }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-sm font-medium">
                                        {{ applicant.job.title }}
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-sm text-slate-500">
                                        {{
                                            new Date(
                                                applicant.appliedAt,
                                            ).toLocaleString()
                                        }}
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                        >{{ applicant.status }}</span
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Job Performance Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
                <HiringPipelineCard
                    :applications="applications"
                    :loading="loading"
                />
                <ListingCard
                    :applications="applications"
                    :loading="loading"
                    :max-items="3"
                />
            </div>
        </div>
    </main>
</template>
