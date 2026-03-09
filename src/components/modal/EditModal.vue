<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { IJob } from "@/types/JobType";

interface Props {
    job?: IJob;
    loading?: boolean;
}

interface Emits {
    (e: "close"): void;
    (e: "submit", data: Partial<IJob>): void;
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    job: undefined,
});

const emit = defineEmits<Emits>();

// Form state
const formData = ref<Partial<IJob>>({});

const errors = ref<{ [key: string]: string }>({});
const newRequirement = ref("");
const editingIndex = ref<number | null>(null);
const editingRequirement = ref<string>("");

// ✅ WATCH isOpen PROP - Trigger saat modal dibuka
watch(
    () => props.job,
    (job) => {
        if (!job) return;

        formData.value = {
            id: job.id,
            title: job.title,
            description: job.description,
            location: job.location,
            jobType: job.jobType,
            salaryMin: job.salaryMin,
            salaryMax: job.salaryMax,
            requirements: Array.isArray(job.requirements)
                ? [...job.requirements]
                : [],
            status: job.status,
            createdAt: job.createdAt,
            createdBy: job.createdBy,
        };
    },
    { immediate: true },
);

// Computed untuk check apakah form changed
const isFormChanged = computed(() => {
    if (!props.job) return true;
    return (
        formData.value.title !== props.job.title ||
        formData.value.description !== props.job.description ||
        formData.value.location !== props.job.location ||
        formData.value.jobType !== props.job.jobType ||
        formData.value.salaryMin !== props.job.salaryMin ||
        formData.value.salaryMax !== props.job.salaryMax ||
        formData.value.status !== props.job.status ||
        JSON.stringify(formData.value.requirements) !==
            JSON.stringify(props.job.requirements)
    );
});

// Validate form
const validateForm = (): boolean => {
    errors.value = {};

    if (!formData.value.title?.trim()) {
        errors.value.title = "Job title is required";
    }

    if (!formData.value.description?.trim()) {
        errors.value.description = "Description is required";
    }

    if (!formData.value.location?.trim()) {
        errors.value.location = "Location is required";
    }

    if (
        !formData.value.requirements ||
        formData.value.requirements.length === 0
    ) {
        errors.value.requirements = "At least one requirement is needed";
    }

    return Object.keys(errors.value).length === 0;
};

// Add requirement
const addRequirement = () => {
    if (!newRequirement.value.trim()) return;
    if (!formData.value.requirements) {
        formData.value.requirements = [];
    }
    formData.value.requirements.push(newRequirement.value.trim());
    newRequirement.value = "";
};

// Remove requirement
const removeRequirement = (index: number) => {
    if (formData.value.requirements) {
        const removed = formData.value.requirements.splice(index, 1);
        console.log(" Requirement removed:", removed[0]);
    }
};

const startEditRequirement = (index: number) => {
    editingIndex.value = index;
    editingRequirement.value = formData.value.requirements?.[index] || "";
};

const saveRequirement = () => {
    if (editingIndex.value === null || !formData.value.requirements) return;
    formData.value.requirements[editingIndex.value] = editingRequirement.value;
    editingIndex.value = null;
    editingRequirement.value = "";
};

const cancelEdit = () => {
    editingIndex.value = null;
    editingRequirement.value = "";
};

// Handle submit
const handleSubmit = () => {
    // console.log(" Form submit - Validating...");

    if (!validateForm()) {
        // console.log("Validation failed:", errors.value);
        return;
    }

    // console.log("Validation passed - Submitting data:", formData.value);
    emit("submit", formData.value);
};

// Handle close
const handleClose = () => {
    // console.log("❌ Modal closed");
    emit("close");
};
</script>

<template>
    <!-- Modal Backdrop -->
    <teleport to="body">
        <transition
            enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                @click.self="handleClose"
            >
                <!-- Modal Container -->
                <div
                    class="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    @click.stop
                >
                    <!-- Header -->
                    <div
                        class="sticky top-0 bg-white border-b border-slate-200 darksss:border-slate-800 px-6 py-4 flex items-center justify-between"
                    >
                        <div>
                            <h2
                                class="text-xl font-bold text-slate-900 darksss:text-white"
                            >
                                Edit Job Listing
                            </h2>
                            <p
                                v-if="job"
                                class="text-xs text-slate-500 darksss:text-slate-400 mt-1"
                            >
                                {{ job.title }}
                            </p>
                        </div>
                        <button
                            @click="handleClose"
                            class="text-slate-400 hover:text-slate-600 darksss:hover:text-slate-300 transition-colors"
                        >
                            <span class="material-symbols-outlined text-2xl"
                                >close</span
                            >
                        </button>
                    </div>

                    <!-- Form Content -->
                    <div class="p-6 space-y-6">
                        <!-- Job Title -->
                        <div>
                            <label
                                class="block text-sm font-semibold text-slate-700 darksss:text-slate-300 mb-2"
                            >
                                Job Title <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="formData.title"
                                type="text"
                                placeholder="e.g., Senior Frontend Developer"
                                class="w-full px-4 py-2.5 rounded-lg border border-slate-300 darksss:border-slate-700 bg-white darksss:bg-slate-800 text-slate-900 darksss:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                :class="{ 'border-red-500': errors.title }"
                            />
                            <p
                                v-if="errors.title"
                                class="text-xs text-red-600 darksss:text-red-400 mt-1"
                            >
                                {{ errors.title }}
                            </p>
                        </div>

                        <!-- Description -->
                        <div>
                            <label
                                class="block text-sm font-semibold text-slate-700 darksss:text-slate-300 mb-2"
                            >
                                Description <span class="text-red-500">*</span>
                            </label>
                            <textarea
                                v-model="formData.description"
                                placeholder="Describe the job role, responsibilities, and what you're looking for..."
                                rows="5"
                                class="w-full px-4 py-2.5 rounded-lg border border-slate-300 darksss:border-slate-700 bg-white darksss:bg-slate-800 text-slate-900 darksss:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                :class="{
                                    'border-red-500': errors.description,
                                }"
                            />
                            <p
                                v-if="errors.description"
                                class="text-xs text-red-600 darksss:text-red-400 mt-1"
                            >
                                {{ errors.description }}
                            </p>
                        </div>

                        <!-- Location & Job Type -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Location -->
                            <div>
                                <label
                                    class="block text-sm font-semibold text-slate-700 darksss:text-slate-300 mb-2"
                                >
                                    Location <span class="text-red-500">*</span>
                                </label>
                                <select
                                    v-model="formData.location"
                                    class="w-full px-4 py-2.5 rounded-lg border border-slate-300 darksss:border-slate-700 bg-white darksss:bg-slate-800 text-slate-900 darksss:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    :class="{
                                        'border-red-500': errors.location,
                                    }"
                                >
                                    <option value="">Select location</option>
                                    <option value="remote">Remote</option>
                                    <option value="onsite">Onsite</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                                <p
                                    v-if="errors.location"
                                    class="text-xs text-red-600 darksss:text-red-400 mt-1"
                                >
                                    {{ errors.location }}
                                </p>
                            </div>

                            <!-- Job Type -->
                            <div>
                                <label
                                    class="block text-sm font-semibold text-slate-700 darksss:text-slate-300 mb-2"
                                >
                                    Job Type
                                </label>
                                <select
                                    v-model="formData.jobType"
                                    class="w-full px-4 py-2.5 rounded-lg border border-slate-300 darksss:border-slate-700 bg-white darksss:bg-slate-800 text-slate-900 darksss:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                >
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">
                                        Internship
                                    </option>
                                </select>
                            </div>
                        </div>

                        <!-- Salary Range -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Min Salary -->
                            <div>
                                <label
                                    class="block text-sm font-semibold text-slate-700 darksss:text-slate-300 mb-2"
                                >
                                    Minimum Salary
                                    <span class="text-red-500">*</span>
                                </label>
                                <input
                                    v-model.number="formData.salaryMin"
                                    type="number"
                                    placeholder="e.g., 50000000"
                                    class="w-full px-4 py-2.5 rounded-lg border border-slate-300 darksss:border-slate-700 bg-white darksss:bg-slate-800 text-slate-900 darksss:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    :class="{
                                        'border-red-500': errors.salaryMin,
                                    }"
                                />
                                <p
                                    v-if="errors.salaryMin"
                                    class="text-xs text-red-600 darksss:text-red-400 mt-1"
                                >
                                    {{ errors.salaryMin }}
                                </p>
                            </div>

                            <!-- Max Salary -->
                            <div>
                                <label
                                    class="block text-sm font-semibold text-slate-700 darksss:text-slate-300 mb-2"
                                >
                                    Maximum Salary
                                    <span class="text-red-500">*</span>
                                </label>
                                <input
                                    v-model.number="formData.salaryMax"
                                    type="number"
                                    placeholder="e.g., 75000000"
                                    class="w-full px-4 py-2.5 rounded-lg border border-slate-300 darksss:border-slate-700 bg-white darksss:bg-slate-800 text-slate-900 darksss:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    :class="{
                                        'border-red-500': errors.salaryMax,
                                    }"
                                />
                                <p
                                    v-if="errors.salaryMax"
                                    class="text-xs text-red-600 darksss:text-red-400 mt-1"
                                >
                                    {{ errors.salaryMax }}
                                </p>
                            </div>
                        </div>

                        <!-- Salary Range Error -->
                        <div
                            v-if="errors.salaryRange"
                            class="p-3 rounded-lg bg-red-50 darksss:bg-red-900/20 border border-red-200 darksss:border-red-800"
                        >
                            <p
                                class="text-xs text-red-600 darksss:text-red-400"
                            >
                                {{ errors.salaryRange }}
                            </p>
                        </div>

                        <!-- Requirements -->
                        <div>
                            <label
                                class="block text-sm font-semibold text-slate-700 darksss:text-slate-300 mb-2"
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
                                    class="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 darksss:border-slate-700 bg-white darksss:bg-slate-800 text-slate-900 darksss:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
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
                                    v-for="(
                                        req, index
                                    ) in formData.requirements || []"
                                    :key="index"
                                    class="flex items-center justify-between p-3 rounded-lg bg-slate-50 border"
                                >
                                    <!-- Mode Edit -->
                                    <template v-if="editingIndex === index">
                                        <input
                                            v-model="editingRequirement"
                                            class="flex-1 px-3 py-1 text-slate-700 border rounded"
                                        />
                                        <div class="flex gap-2 ml-2">
                                            <button
                                                @click="saveRequirement"
                                                class="text-green-600"
                                            >
                                                Save
                                            </button>

                                            <button
                                                @click="cancelEdit"
                                                class="text-gray-500"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </template>

                                    <!-- Mode View -->
                                    <template v-else>
                                        <span class="text-sm text-slate-700">
                                            {{ req }}
                                        </span>

                                        <div class="flex gap-3">
                                            <button
                                                @click="
                                                    startEditRequirement(index)
                                                "
                                                class="text-blue-500"
                                            >
                                                <span
                                                    class="material-symbols-outlined text-xl"
                                                    >edit</span
                                                >
                                            </button>

                                            <button
                                                @click="
                                                    removeRequirement(index)
                                                "
                                                class="text-red-500"
                                            >
                                                <span
                                                    class="material-symbols-outlined text-xl"
                                                    >close</span
                                                >
                                            </button>
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <p
                                v-if="errors.requirements"
                                class="text-xs text-red-600 darksss:text-red-400 mt-1"
                            >
                                {{ errors.requirements }}
                            </p>
                        </div>

                        <!-- Status -->
                        <div>
                            <label
                                class="block text-sm font-semibold text-slate-700 darksss:text-slate-300 mb-2"
                            >
                                Status
                            </label>
                            <select
                                v-model="formData.status"
                                class="w-full px-4 py-2.5 rounded-lg border border-slate-300 darksss:border-slate-700 bg-white darksss:bg-slate-800 text-slate-900 darksss:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            >
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div
                        class="sticky bottom-0 bg-slate-50 darksss:bg-slate-800/50 border-t border-slate-200 darksss:border-slate-800 px-6 py-4 flex items-center justify-end gap-3"
                    >
                        <button
                            @click="handleClose"
                            class="px-6 py-2.5 rounded-lg border border-slate-300 darksss:border-slate-700 text-slate-700 darksss:text-slate-300 font-semibold hover:bg-slate-100 darksss:hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            @click="handleSubmit"
                            :disabled="!isFormChanged || loading"
                            class="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            <span
                                v-if="!loading"
                                class="material-symbols-outlined text-lg"
                            >
                                save
                            </span>
                            <span
                                v-else
                                class="material-symbols-outlined text-lg animate-spin"
                            >
                                loading
                            </span>
                            {{ loading ? "Saving..." : "Save Changes" }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
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
