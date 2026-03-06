<script setup lang="ts">
import { Fa6LocationDot } from "vue-icons-plus/fa6";
import { IpWorld } from "vue-icons-plus/ip";
import { reactive, ref } from "vue";
import type { IJob } from "@/types/JobType";
import { useRouter } from "vue-router";
import { jobService } from "@/services/job.service";
import { AiFillSchedule } from "vue-icons-plus/ai";
import { BiMoneyWithdraw } from "vue-icons-plus/bi";
import { EpLocation } from "vue-icons-plus/ep";

const formJob = reactive<Omit<IJob, "id" | "createdBy">>({
    title: "",
    location: "",
    salaryMin: 0,
    salaryMax: 0,
    jobType: "full-time",
    createdAt: new Date(),
    description: "",
    requirements: [],
});
const router = useRouter();

const errors = ref<{ [key: string]: string }>({});
const newRequirement = ref("");
const showPreview = ref(false);

const removeRequirement = (index: number) => {
    if (formJob.requirements) {
        const removed = formJob.requirements.splice(index, 1);
        console.log("❌ Requirement removed:", removed[0]);
    }
};

const addRequirement = () => {
    if (!newRequirement.value.trim()) return;

    if (!formJob.requirements) {
        formJob.requirements = [];
    }

    formJob.requirements.push(newRequirement.value.trim());
    newRequirement.value = "";
    console.log("✅ Requirement added:", formJob.requirements);
};

const handleSubmitJob = async () => {
    console.log(formJob.location);
    try {
        const add = await jobService.addJob(formJob);
        if (add) {
            router.push("/dashboard/manage-job");
        }
        console.log("Job added with ID:", add.id);
    } catch (error) {
        console.error("Error adding job:", error);
    }
};
const seePreview = () => {
    showPreview.value = true;
};
</script>

<template>
    <main class="flex-1 overflow-y-auto bg-background-light">
        <div class="max-w-7xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-black text-slate-900 tracking-tight">
                    Post New Job
                </h1>
                <p class="text-slate-500 mt-2">
                    Fill in the details below to find your next great hire.
                </p>
            </div>
            <form @submit.prevent="handleSubmitJob" class="space-y-6">
                <!-- Card: Basic Information -->
                <div
                    class="bg-white rounded-xl shadow-sm border-slate-200 border p-6"
                >
                    <h3 class="text-lg font-bold mb-6 text-primary">
                        Basic Information
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="col-span-full">
                            <label
                                class="block text-sm font-medium text-slate-700 mb-2"
                                >Job Title</label
                            >
                            <input
                                v-model="formJob.title"
                                required="true"
                                class="w-full rounded-lg border-slate-200 border px-4 py-3"
                                placeholder="e.g. Senior Full Stack Engineer"
                                type="text"
                            />
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-slate-700 mb-2"
                                >Employment Type</label
                            >
                            <select
                                v-model="formJob.jobType"
                                class="w-full rounded-lg border-slate-200 border focus:ring-primary focus:border-primary px-4 py-3"
                            >
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                            </select>
                        </div>
                        <div>
                            <label
                                class="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Location
                            </label>

                            <div class="flex gap-4">
                                <!-- Remote -->
                                <div
                                    @click="formJob.location = 'remote'"
                                    :class="[
                                        'flex-1 flex items-center justify-center border-2 rounded-lg p-3 cursor-pointer transition-all',
                                        formJob.location === 'remote'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-slate-200',
                                    ]"
                                >
                                    <span
                                        class="flex items-center gap-2 text-sm font-semibold"
                                        :class="
                                            formJob.location === 'remote'
                                                ? 'text-primary'
                                                : 'text-slate-600'
                                        "
                                    >
                                        <IpWorld class="text-lg" />
                                        Remote
                                    </span>
                                </div>

                                <!-- On-site -->
                                <div
                                    @click="formJob.location = 'on-site'"
                                    :class="[
                                        'flex-1 flex items-center justify-center border-2 rounded-lg p-3 cursor-pointer transition-all',
                                        formJob.location === 'on-site'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-slate-200',
                                    ]"
                                >
                                    <span
                                        class="flex items-center gap-2 text-sm font-semibold"
                                        :class="
                                            formJob.location === 'on-site'
                                                ? 'text-primary'
                                                : 'text-slate-600'
                                        "
                                    >
                                        <Fa6LocationDot class="text-lg" />
                                        On-site
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-slate-700 mb-2"
                                >Salary Range (Annual)</label
                            >
                            <div class="flex items-center gap-2">
                                <div class="relative flex-1">
                                    <span
                                        class="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                                        >Rp.</span
                                    >
                                    <input
                                        v-model="formJob.salaryMin"
                                        class="w-full pl-8 rounded-lg border-slate-200 border focus:ring-primary focus:border-primary py-3"
                                        placeholder="Min"
                                        type="number"
                                    />
                                </div>
                                <span class="text-slate-400">—</span>
                                <div class="relative flex-1">
                                    <span
                                        class="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400"
                                        >Rp.</span
                                    >
                                    <input
                                        v-model="formJob.salaryMax"
                                        class="w-full pl-8 rounded-lg border-slate-200 border py-3"
                                        placeholder="Max"
                                        type="number"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Card: Job Description -->
                <div
                    class="bg-white rounded-xl shadow-sm border-slate-200 border p-6"
                >
                    <h3 class="text-lg font-bold mb-6 text-primary">
                        Job Description
                    </h3>
                    <textarea
                        v-model="formJob.description"
                        class="w-full min-h-48 rounded-lg border-slate-200 border focus:ring-primary focus:border-primary px-4 py-3"
                        placeholder="Describe the role, responsibilities, and qualifications..."
                    />

                    <h3 class="text-lg font-bold mb-2 text-primary">
                        Requirement
                    </h3>
                    <div>
                        <label
                            class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                        >
                            Requirements <span class="text-red-500">*</span>
                        </label>

                        <!-- Add Requirement -->
                        <div class="flex gap-2 mb-3">
                            <input
                                v-model="newRequirement"
                                type="text"
                                placeholder="e.g., 5+ years of experience"
                                @keyup.enter="addRequirement"
                                class="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                            <button
                                @click="addRequirement"
                                type="button"
                                class="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                            >
                                Add
                            </button>
                        </div>

                        <!-- Requirements List -->
                        <div class="space-y-2">
                            <div
                                v-for="(req, index) in formJob.requirements"
                                :key="index"
                                class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                            >
                                <span
                                    class="text-sm text-slate-700 dark:text-slate-300"
                                >
                                    {{ req }}
                                </span>
                                <button
                                    @click="removeRequirement(index)"
                                    type="button"
                                    class="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <span
                                        class="material-symbols-outlined text-lg"
                                        >close</span
                                    >
                                </button>
                            </div>
                        </div>

                        <p
                            v-if="errors.requirements"
                            class="text-xs text-red-600 dark:text-red-400 mt-1"
                        >
                            {{ errors.requirements }}
                        </p>
                    </div>
                    <!-- <QuillEditor
						v-model="formJob.description"
						theme="snow"
						class="min-h-72 border-slate-200 border" /> -->
                </div>

                <!-- Actions -->
                <div class="flex items-center justify-end gap-4 py-4">
                    <button
                        class="px-6 py-3 rounded-lg border-slate-200 border text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                        type="button"
                        @click="seePreview"
                    >
                        Preview
                    </button>
                    <button
                        class="px-10 py-3 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                        type="submit"
                    >
                        Publish Job Listing
                    </button>
                </div>
            </form>
        </div>
        <div
            v-if="showPreview"
            class="bg-white rounded-xl max-w-7xl mx-auto shadow-sm border border-slate-200 p-6 md:p-8"
        >
            <div class="flex flex-wrap justify-between items-start gap-4 mb-6">
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
                        {{ formJob?.title }}
                    </h1>
                    <div
                        class="flex flex-wrap items-center gap-4 text-slate-500 text-sm md:text-base"
                    >
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-lg"
                                ><EpLocation
                            /></span>
                            <span>{{ formJob?.location }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-lg"
                                ><AiFillSchedule
                            /></span>
                            <span>{{ formJob?.jobType }}</span>
                        </div>
                        <div class="flex items-center gap-1">
                            <span class="material-symbols-outlined text-lg">
                                <BiMoneyWithdraw />
                            </span>
                            <span>
                                Rp. {{ formJob?.salaryMin }} - Rp.
                                {{ formJob?.salaryMax }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-t border-slate-100 pt-6">
                <h2 class="text-slate-900 text-xl font-bold leading-tight mb-4">
                    Job Description
                </h2>
                <div
                    class="prose max-w-none text-slate-600 leading-relaxed space-y-4"
                >
                    <p>
                        {{ formJob?.description }}
                    </p>
                    <h3
                        class="text-slate-900 dark:text-slate-100 font-bold mt-6 mb-2"
                    >
                        Requirements
                    </h3>
                    <ul
                        v-for="(value, index) in formJob?.requirements"
                        class="list-disc pl-5 space-y-2"
                    >
                        <li :key="index">
                            {{ value }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div
            v-else
            class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 text-center"
            :class="showPreview == false ? 'hidden' : ''"
        ></div>
    </main>
</template>
