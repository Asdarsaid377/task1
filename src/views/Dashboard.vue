<script setup lang="ts">
import { alertService } from "@/components/alert/notif";
import DashboardCard from "@/components/card/DashboardCard.vue";
import HiringPipelineCard from "@/components/card/HiringPipelineCard.vue";
import ListingCard from "@/components/card/ListingCard.vue";
import TitleDashboard from "@/components/shared/TitleDashboard.vue";
import { applicationService } from "@/services/applications.service";
import type { GetApplication } from "@/types/ApplicationType";
import { formatDate } from "@/utils/formatDate";
import { onMounted, onUnmounted, ref } from "vue";
import { AiFillCalendar } from "vue-icons-plus/ai";
import { BiTrendingUp } from "vue-icons-plus/bi";
import { MdOutlineWork } from "vue-icons-plus/md";

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

            <TitleDashboard
                title="  Dashboard Overview"
                subtitle="Welcome back, here is what's happening with your job
                    listings today."
                class="text-zinc-900 darkssstext-zinc-100"
            />

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
                class="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
            >
                <div
                    class="p-6 border-b border-slate-200 flex justify-between items-center"
                >
                    <h2 class="text-xl text-slate-500 font-bold">
                        Recent Applicant Activity
                    </h2>
                    <router-link
                        to="/dashboard/candidates"
                        class="text-primary text-sm font-bold hover:underline"
                    >
                        View All
                    </router-link>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-background-light">
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
                        <tbody class="divide-y divide-slate-200">
                            <tr
                                v-for="applicant in applications"
                                :key="applicant.id"
                                class="hover:bg-background-light transition-colors"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="size-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-primary"
                                        >
                                            <img
                                                class="rounded-full"
                                                :src="applicant.user.photoURL"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <p
                                                class="text-sm text-slate-500 font-bold"
                                            >
                                                {{ applicant.candidateName }}
                                            </p>
                                            <p class="text-xs text-slate-500">
                                                {{ applicant.candidateEmail }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <p
                                        class="text-sm font-medium text-slate-500"
                                    >
                                        {{ applicant.job.title }}
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-sm text-slate-500">
                                        {{ formatDate(applicant.appliedAt) }}
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800"
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
