<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
    router.push("/");
};

const goBack = () => {
    router.back();
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div class="text-center max-w-lg animate-fade-in">
            <!-- Icon -->
            <div class="flex justify-center mb-6">
                <div
                    class="w-24 h-24 flex items-center justify-center rounded-full bg-red-100 animate-pulse"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-12 h-12 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </div>

            <!-- Title -->
            <h1 class="text-4xl font-bold text-slate-900 mb-3">
                403 Forbidden
            </h1>

            <p class="text-slate-600 mb-8">
                You don't have permission to access this page. Please contact an
                administrator if you believe this is a mistake.
            </p>

            <!-- Buttons -->
            <div class="flex justify-center gap-4">
                <button
                    @click="goBack"
                    class="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                >
                    Go Back
                </button>

                <button
                    @click="goHome"
                    class="px-6 py-2 rounded-lg bg-primary text-white hover:scale-105 transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

.animate-fade-in {
    animation: fade-in 0.6s ease forwards;
}
</style>
