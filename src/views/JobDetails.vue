<script setup lang="ts">
import Footer from "@/components/shared/Footer.vue";
import Navbar from "@/components/shared/Navbar.vue";
import SharedJob from "@/components/shared/SharedJob.vue";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AiFillSchedule, AiOutlineShareAlt } from "vue-icons-plus/ai";
import { BiMoneyWithdraw } from "vue-icons-plus/bi";
import { EpLocation } from "vue-icons-plus/ep";
import { useAuth } from "@/lib/authfirebase";
import { jobService } from "@/services/job.service";
import type { IJob } from "@/types/JobType";
import { alertService } from "@/components/alert/notif";
import { applicationService } from "@/services/applications.service";
import FormApplyJob from "@/components/forms/FormApplyJob.vue";
import type { IApplication } from "@/types/ApplicationType";

const route = useRoute();
const { user } = useAuth();
const candidateEmail = computed(() => user.value?.email ?? "");
const candidateDisplayName = computed(() => user.value?.displayName ?? "");
const candidateId = computed(() => user.value?.uid ?? "");
const isLoggedIn = computed(() => !!user.value);
const slugParam = computed(() => route.params.slug as string);
const loading = ref(false);
const isShareOpen = ref(false);
const jobData = ref<IJob | null>(null);
const openShare = () => (isShareOpen.value = true);
const router = useRouter();

const extractedId = computed(() => {
    if (!slugParam.value) return null;
    const parts = slugParam.value.split("-");
    return parts[parts.length - 1];
});

const getJobsId = async () => {
    try {
        if (!extractedId.value) return;
        const data = await jobService.getJobsId(extractedId.value);
        jobData.value = data;
    } catch (error) {
        console.log(error);
        alertService.error("Failed to fetch job data", 2000);
    }
};

const handleSubmit = async (payload: Omit<IApplication, "id">) => {
    try {
        loading.value = true;
        await applicationService.addApplication(payload);
        // console.log(add.id);
        router.push(`/profile`);
        loading.value = false;
    } catch (err) {
        console.error(err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    getJobsId();
});
</script>
<template>
    <Navbar />
    <main class="flex-1 bg-white flex justify-center py-10 px-4 md:px-10">
        <div
            class="layout-content-container flex flex-col max-w-7xl flex-1 gap-8"
        >
            <div
                class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8"
            >
                <div
                    class="flex flex-wrap justify-between items-start gap-4 mb-6"
                >
                    <div class="flex flex-col gap-2">
                        <div
                            class="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider"
                        >
                            <!-- <span class="material-symbols-outlined text-sm">apartment</span> -->
                            <span>CWF</span>
                        </div>
                        <h1
                            class="text-slate-900 text-3xl md:text-4xl font-black leading-tight tracking-tight"
                        >
                            {{ jobData?.title }}
                        </h1>
                        <div
                            class="flex flex-wrap items-center gap-4 text-slate-500 text-sm md:text-base"
                        >
                            <div class="flex items-center gap-1">
                                <span class="material-symbols-outlined text-lg"
                                    ><EpLocation
                                /></span>
                                <span>{{ jobData?.location }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="material-symbols-outlined text-lg"
                                    ><AiFillSchedule
                                /></span>
                                <span>{{ jobData?.jobType }}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="material-symbols-outlined text-lg">
                                    <BiMoneyWithdraw />
                                </span>
                                <span>
                                    Rp. {{ jobData?.salaryMin }} - Rp.
                                    {{ jobData?.salaryMax }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <button
                        @click="openShare"
                        class="bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/20 transition-all"
                    >
                        <AiOutlineShareAlt />
                        Share Job
                    </button>

                    <SharedJob
                        v-model="isShareOpen"
                        :url="`https://cwf.com/details/${slugParam}`"
                        title="Frontend Developer Needed"
                    />
                </div>
                <div class="border-t border-slate-100 pt-6">
                    <h2
                        class="text-slate-900 text-xl font-bold leading-tight mb-4"
                    >
                        Job Description
                    </h2>
                    <div
                        class="prose max-w-none text-slate-600 leading-relaxed space-y-4"
                    >
                        <p>
                            {{ jobData?.description }}
                        </p>
                        <h3
                            class="text-slate-900 darksss:text-slate-100 font-bold mt-6 mb-2"
                        >
                            Requirements
                        </h3>
                        <ul
                            v-for="(value, index) in jobData?.requirements"
                            class="list-disc pl-5 space-y-2"
                        >
                            <li :key="index">
                                {{ value }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <FormApplyJob
                :job-id="extractedId ?? ''"
                :candidate-id="candidateId"
                :candidate-email="candidateEmail"
                :candidate-display-name="candidateDisplayName"
                :loading="loading"
                @submit="handleSubmit"
                v-if="isLoggedIn"
            />

            <div
                v-else
                class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 text-center"
            >
                <h2
                    class="text-slate-900 text-2xl font-bold leading-tight mb-2"
                >
                    Please log in to apply for this job
                </h2>
                <p class="text-slate-500 mb-6">
                    You need to be logged in to submit your application. Please
                    Sign in to continue.
                </p>
                <router-link
                    to="/register"
                    class="inline-block px-6 py-3 bg-primary text-white rounded-lg font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
                >
                    Sign In
                </router-link>
            </div>
        </div>
    </main>
    <Footer />
</template>
