<script setup lang="ts">
import { ref, watch } from "vue";
import type { ApplicationStatus, IApplication } from "@/types/ApplicationType";

interface Props {
    // isOpen: boolean;
    application?: IApplication;
    loading?: boolean;
}

interface Emits {
    (e: "close"): void;
    (e: "submit", status: ApplicationStatus): void;
}

const props = withDefaults(defineProps<Props>(), {
    loading: false,
    application: undefined,
});

const emit = defineEmits<Emits>();

const newStatus = ref<ApplicationStatus>("pending");

const statusOptions = [
    {
        value: "pending",
        label: "Pending",
        description: "Waiting for review",
        color: "bg-yellow-100 text-yellow-700 darksssbg-yellow-900/30 darkssstext-yellow-400",
    },
    {
        value: "reviewed",
        label: "Reviewed",
        description: "Application has been reviewed",
        color: "bg-blue-100 text-blue-700 darksssbg-blue-900/30 darkssstext-blue-400",
    },
    {
        value: "interviewed",
        label: "Interviewed",
        description: "Candidate has been interviewed",
        color: "bg-purple-100 text-purple-700 darksssbg-purple-900/30 darkssstext-purple-400",
    },
    {
        value: "rejected",
        label: "Rejected",
        description: "Application rejected",
        color: "bg-red-100 text-red-700 darksssbg-red-900/30 darkssstext-red-400",
    },
    {
        value: "accepted",
        label: "Accepted",
        description: "Offer accepted by candidate",
        color: "bg-green-100 text-green-700 darksssbg-green-900/30 darkssstext-green-400",
    },
];

// Watch isOpen prop untuk populate form
watch(
    () => props.application,
    (application) => {
        if (!application) return;
        newStatus.value = application.status;
    },
);

const handleSubmit = () => {
    emit("submit", newStatus.value);
};

const handleClose = () => {
    emit("close");
};

const getStatusColor = (status: string) => {
    return statusOptions.find((opt) => opt.value === status)?.color || "";
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
                    class="bg-white p-3 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    @click.stop
                >
                    <!-- Header -->
                    <div
                        class="sticky top-0 bg-white border-b border-slate-200 darksss:border-slate-800 px-6 py-4 flex items-center justify-between"
                    >
                        <div>
                            <h2
                                class="text-xl font-bold text-slate-900 darkssstext-white"
                            >
                                Update Application Status
                            </h2>
                            <p
                                class="text-xs text-slate-500 darkssstext-slate-400 mt-1"
                            >
                                Change the status of this application
                            </p>
                        </div>
                        <button
                            @click="handleClose"
                            class="text-slate-400 hover:text-slate-600 darkssshover:text-slate-300 transition-colors"
                        >
                            <span class="material-symbols-outlined text-2xl"
                                >close</span
                            >
                        </button>
                    </div>

                    <!-- Application Info -->
                    <div
                        class="bg-slate-50 darksssbg-slate-800 p-4 rounded-lg mb-6"
                    >
                        <p class="text-sm text-slate-500 darkssstext-slate-400">
                            Candidate
                        </p>
                        <p
                            class="font-semibold text-slate-900 darkssstext-white"
                        >
                            {{ application?.candidateName }}
                        </p>
                        <p
                            class="text-xs text-slate-500 darkssstext-slate-400 mt-1"
                        >
                            {{ application?.candidateEmail }}
                        </p>

                        <div
                            class="mt-3 pt-3 border-t border-slate-200 darksssborder-slate-700"
                        >
                            <p
                                class="text-sm text-slate-500 darkssstext-slate-400"
                            >
                                Applied for
                            </p>
                            <p
                                class="font-semibold text-slate-900 darkssstext-white text-sm"
                            >
                                {{ application?.status }}
                            </p>
                        </div>

                        <!-- Current Status Badge -->
                        <div
                            class="mt-3 pt-3 border-t border-slate-200 darksssborder-slate-700"
                        >
                            <p
                                class="text-sm text-slate-500 darkssstext-slate-400 mb-2"
                            >
                                Current Status
                            </p>
                            <span
                                :class="
                                    getStatusColor(
                                        application?.status || 'pending',
                                    )
                                "
                                class="px-2.5 py-1 rounded-full text-xs font-bold inline-block capitalize"
                            >
                                {{ application?.status }}
                            </span>
                        </div>
                    </div>

                    <!-- Status Selection -->
                    <div class="mb-6">
                        <label
                            class="block text-sm font-semibold text-slate-700 darkssstext-slate-300 mb-3"
                        >
                            New Status
                        </label>
                        <div class="space-y-2">
                            <label
                                v-for="option in statusOptions"
                                :key="option.value"
                                class="flex items-center gap-3 p-3 border border-slate-200 darksssborder-slate-700 rounded-lg hover:bg-slate-50 darkssshover:bg-slate-800 cursor-pointer transition-colors"
                                :class="{
                                    'border-primary bg-primary/5 darksssbg-primary/10':
                                        newStatus === option.value,
                                }"
                            >
                                <input
                                    v-model="newStatus"
                                    type="radio"
                                    :value="option.value"
                                    class="w-4 h-4 cursor-pointer"
                                />
                                <div class="flex-1">
                                    <p
                                        class="font-medium text-slate-900 darkssstext-white"
                                    >
                                        {{ option.label }}
                                    </p>
                                    <p
                                        class="text-xs text-slate-500 darkssstext-slate-400"
                                    >
                                        {{ option.description }}
                                    </p>
                                </div>
                                <span
                                    :class="option.color"
                                    class="px-2 py-1 rounded text-xs font-bold"
                                >
                                    {{ option.label }}
                                </span>
                            </label>
                        </div>
                    </div>

                    <!-- Status Timeline Info -->
                    <div
                        class="mb-6 p-3 rounded-lg bg-blue-50 darksssbg-blue-900/20 border border-blue-200 darksssborder-blue-800"
                    >
                        <div class="flex gap-2">
                            <span
                                class="material-symbols-outlined text-blue-600 darkssstext-blue-400 flex-shrink-0 text-lg"
                            >
                                info
                            </span>
                            <p
                                class="text-xs text-blue-700 darkssstext-blue-300"
                            >
                                Updating the status will notify the candidate
                                via email about the progress of their
                                application.
                            </p>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-3">
                        <button
                            @click="handleClose"
                            class="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 darksssborder-slate-700 text-slate-700 darkssstext-slate-300 font-semibold hover:bg-slate-50 darkssshover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            @click="handleSubmit"
                            :disabled="
                                loading || newStatus === application?.status
                            "
                            class="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            <span
                                v-if="!loading"
                                class="material-symbols-outlined text-lg"
                            >
                                check
                            </span>
                            <span
                                v-else
                                class="material-symbols-outlined text-lg animate-spin"
                            >
                                loading
                            </span>
                            {{ loading ? "Updating..." : "Update Status" }}
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

.animate-in {
    animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
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
