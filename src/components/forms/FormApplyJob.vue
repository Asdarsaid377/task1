<script setup lang="ts">
import type { IApplication } from "@/types/ApplicationType";
import { reactive, ref } from "vue";
import { IpUploadLogs } from "vue-icons-plus/ip";
import { TbWorldWww } from "vue-icons-plus/tb";

interface Props {
    jobId: string;
    loading?: boolean;
    candidateId: string;
    candidateEmail: string;
}

const props = defineProps<Props>();

const consent = ref(false);
const resume = ref<File | null>(null);

const formPayload = reactive<Omit<IApplication, "id"> & { portfolio?: string }>(
    {
        jobId: props.jobId,
        candidateId: props.candidateId,
        candidateName: "",
        candidateEmail: props.candidateEmail,
        resumeUrl: "",
        resumeFile: null,
        coverLetter: "",
        status: "pending",
        appliedAt: new Date(),
        updatedAt: new Date(),
        noWhatsapp: "",
        portfolio: "",
    },
);

const emit = defineEmits<{
    (e: "submit", payload: Omit<IApplication, "id">, resume: File | null): void;
}>();

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        resume.value = target.files.item(0);
    } else {
        resume.value = null;
    }
};

const handleSubmit = () => {
    if (!consent.value) {
        alert("Please agree to data processing");
        return;
    }
    if (!formPayload.candidateName) {
        alert("Full name is required");
        return;
    }
    formPayload.updatedAt = new Date();
    formPayload.appliedAt = new Date();
    if (resume.value) {
        formPayload.resumeFile = resume.value;
    }
    emit("submit", formPayload, resume.value);
};
</script>

<template>
    <div
        class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8"
    >
        <div class="mb-8">
            <h2
                class="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight mb-2"
            >
                Apply for this position
            </h2>
            <p class="text-slate-500 dark:text-slate-400">
                Complete the form below to submit your application. We'll review
                your profile and get back to you within 3-5 business days.
            </p>
        </div>

        <form
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
            @submit.prevent="handleSubmit"
        >
            <div class="flex flex-col gap-2">
                <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >Full Name</label
                >
                <input
                    v-model="formPayload.candidateName"
                    class="w-full border p-2 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                    placeholder="John Doe"
                    type="text"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >No Whatsapp</label
                >
                <input
                    v-model="formPayload.noWhatsapp"
                    class="w-full border p-2 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                    placeholder="08123456789"
                    type="number"
                />
            </div>

            <!-- Resume -->
            <div class="flex flex-col gap-2 md:col-span-2">
                <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                >
                    Resume / CV
                </label>

                <!-- Hidden File Input -->
                <input
                    id="resumeUpload"
                    type="file"
                    class="hidden"
                    accept=".pdf,.doc,.docx"
                    @change="handleFileChange"
                />

                <!-- Custom Upload Area -->
                <label
                    for="resumeUpload"
                    class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                    <IpUploadLogs class="text-4xl text-slate-400" />
                    <div class="text-center">
                        <p
                            class="text-slate-900 dark:text-slate-100 font-medium"
                        >
                            Click to upload or drag and drop
                        </p>
                        <p class="text-slate-500 dark:text-slate-400 text-xs">
                            PDF, DOCX up to 10MB
                        </p>
                    </div>
                </label>
            </div>

            <!-- Portfolio -->
            <div class="flex flex-col gap-2 md:col-span-2">
                <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >Portfolio Link</label
                >
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        ><TbWorldWww />
                    </span>
                    <input
                        v-model="formPayload.portfolio"
                        class="w-full pl-10 border p-2 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                        placeholder="https://portfolio.com"
                        type="url"
                        required="false"
                    />
                </div>
            </div>

            <!-- Additional Info -->
            <div class="flex flex-col gap-2 md:col-span-2">
                <label
                    class="text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >Additional Information (Optional)</label
                >
                <textarea
                    class="w-full border p-2 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
                    placeholder="Tell us why you are a great fit..."
                    rows="4"
                ></textarea>
            </div>

            <!-- Consent -->
            <div class="md:col-span-2 flex items-center gap-3">
                <input type="checkbox" v-model="consent" />
                <label>I agree to data processing</label>
            </div>

            <!-- Submit -->
            <div class="md:col-span-2 pt-4">
                <button
                    type="submit"
                    :disabled="loading"
                    class="px-10 py-4 bg-primary text-white rounded-lg font-bold"
                >
                    {{ loading ? "Submitting..." : "Submit Application" }}
                </button>
            </div>
        </form>
    </div>
</template>
