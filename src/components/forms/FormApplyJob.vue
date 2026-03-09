<script setup lang="ts">
import type { IApplication } from "@/types/ApplicationType";
import { reactive, ref } from "vue";
import { IpUploadLogs } from "vue-icons-plus/ip";
import { TbWorldWww } from "vue-icons-plus/tb";
import TitleDashboard from "../shared/TitleDashboard.vue";

interface Props {
    jobId: string;
    loading?: boolean;
    candidateId: string;
    candidateEmail: string;
    candidateDisplayName: string;
}
const props = defineProps<Props>();
const consent = ref(false);
const resume = ref<File | null>(null);

const formPayload = reactive<Omit<IApplication, "id"> & { portfolio?: string }>(
    {
        jobId: props.jobId,
        candidateId: props.candidateId,
        candidateName: props.candidateDisplayName,
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
        class="bg-white rounded-xl shadow-sm border border-slate-200 darksss:border-slate-800 p-6 md:p-8"
    >
        <TitleDashboard
            title="Apply for this position"
            subtitle="Complete the form below to submit your application. We'll review
                your profile and get back to you within 3-5 business days."
            class="text-zinc-900 darkssstext-zinc-100"
        />
        <form
            class="grid grid-cols-1 md:grid-cols-2 gap-6"
            @submit.prevent="handleSubmit"
        >
            <div class="flex flex-col gap-2">
                <label
                    class="text-sm font-semibold text-slate-700 darksss:text-slate-300"
                    >Full Name</label
                >
                <input
                    v-model="formPayload.candidateName"
                    class="w-full border p-2 text-slate-700 rounded-lg border-slate-300 darksss:border-slate-700 darksss:bg-slate-800 focus:ring-primary focus:border-primary"
                    placeholder="John Doe"
                    type="text"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label
                    class="text-sm font-semibold text-slate-700 darksss:text-slate-300"
                    >No Whatsapp</label
                >
                <input
                    v-model="formPayload.noWhatsapp"
                    class="w-full border p-2 rounded-lg text-slate-700 border-slate-300 darksss:border-slate-700 darksss:bg-slate-800 focus:ring-primary focus:border-primary"
                    placeholder="08123456789"
                    type="tel"
                />
            </div>

            <!-- Resume -->
            <div class="flex flex-col gap-2 md:col-span-2">
                <label
                    class="text-sm font-semibold text-slate-700 darksss:text-slate-300"
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
                    class="border-2 border-dashed border-slate-300 darksss:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 darksss:bg-slate-800/50 hover:bg-slate-100 darksss:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                    <IpUploadLogs class="text-4xl text-slate-400" />
                    <div class="text-center">
                        <p
                            class="text-slate-900 darksss:text-slate-100 font-medium"
                        >
                            Click to upload or drag and drop
                        </p>
                        <p
                            class="text-slate-500 darksss:text-slate-400 text-xs"
                        >
                            PDF, DOCX up to 10MB
                        </p>
                    </div>
                </label>
            </div>

            <!-- Portfolio -->
            <div class="flex flex-col gap-2 md:col-span-2">
                <label
                    class="text-sm font-semibold text-slate-700 darksss:text-slate-300"
                    >Portfolio Link</label
                >
                <div class="relative">
                    <span
                        class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        ><TbWorldWww />
                    </span>
                    <input
                        v-model="formPayload.portfolio"
                        class="w-full pl-10 text-slate-700 border p-2 rounded-lg border-slate-300 darksss:border-slate-700 darksss:bg-slate-800 focus:ring-primary focus:border-primary"
                        placeholder="https://portfolio.com"
                        type="url"
                        required="false"
                    />
                </div>
            </div>

            <!-- Additional Info -->
            <div class="flex flex-col gap-2 md:col-span-2">
                <label
                    class="text-sm font-semibold text-slate-700 darksss:text-slate-300"
                    >Additional Information (Optional)</label
                >
                <textarea
                    class="w-full text-slate-700 border p-2 rounded-lg border-slate-300 darksss:border-slate-700 darksss:bg-slate-800 focus:ring-primary focus:border-primary"
                    placeholder="Tell us why you are a great fit..."
                    rows="4"
                ></textarea>
            </div>

            <!-- Consent -->
            <div class="md:col-span-2 bg-white flex items-center gap-3">
                <input
                    type="checkbox"
                    v-model="consent"
                    class="w-5 h-5 accent-primary"
                />
                <label class="text-slate-700 darksss:text-slate-300"
                    >I agree to data processing</label
                >
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
