<script setup lang="ts">
import { Fa6LocationDot } from "vue-icons-plus/fa6";
import { IpWorld } from "vue-icons-plus/ip";
import { reactive, ref } from "vue";
import type { IJob } from "@/types/JobType";
import { useRouter } from "vue-router";
import { jobService } from "@/services/job.service";

const location = ref("on-site");

const formJob = reactive<IJob>({
    id: "",
    title: "",
    location: "on-site",
    salaryMin: 0,
    salaryMax: 0,
    jobType: "full-time",
    createdBy: "",
    createdAt: new Date(),
    description: "",
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
const saveDraft = () => {
    // Logic to save the job listing as a draft
    console.log("Saving draft:", formJob);
};

const toggleLocation = (value: string) => {
    location.value = value;
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
                                >Location</label
                            >
                            <div class="flex gap-4">
                                <label
                                    @click="toggleLocation('remote')"
                                    :class="
                                        location === 'remote'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-slate-200 '
                                    "
                                    class="flex-1 flex items-center justify-center border-2 rounded-lg p-3 cursor-pointer"
                                >
                                    <span
                                        class="flex items-center gap-2 text-sm font-semibold text-primary"
                                    >
                                        <span
                                            class="material-symbols-outlined text-lg"
                                            ><IpWorld
                                        /></span>
                                        Remote
                                    </span>
                                </label>

                                <label
                                    @click="toggleLocation('on-site')"
                                    :class="
                                        location === 'on-site'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-slate-200 '
                                    "
                                    class="flex-1 flex items-center justify-center border-2 rounded-lg p-3 cursor-pointer"
                                >
                                    <span
                                        class="flex items-center gap-2 text-sm font-semibold text-slate-600"
                                    >
                                        <span
                                            class="material-symbols-outlined text-lg"
                                            ><Fa6LocationDot
                                        /></span>
                                        On-site
                                    </span>
                                </label>
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
                        @click="saveDraft"
                    >
                        Save Draft
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
    </main>
</template>
