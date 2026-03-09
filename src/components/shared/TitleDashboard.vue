<script setup lang="ts">
defineProps<{
    title: string;
    subtitle?: string;
    actionLabel?: string;
    actionIcon?: string;
}>();

defineEmits<{
    (e: "action"): void;
}>();
</script>

<template>
    <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
        <!-- Title Section -->
        <div>
            <h1 class="text-3xl font-black tracking-tight text-slate-900">
                {{ title }}
            </h1>
            <p v-if="subtitle" class="text-slate-500 text-base mt-1">
                {{ subtitle }}
            </p>
        </div>

        <!-- Right Action -->
        <div>
            <!-- If slot provided, use slot -->
            <slot name="action">
                <!-- Default Button -->
                <button
                    v-if="actionLabel"
                    @click="$emit('action')"
                    class="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                    <span
                        v-if="actionIcon"
                        class="material-symbols-outlined text-xl"
                    >
                        {{ actionIcon }}
                    </span>
                    {{ actionLabel }}
                </button>
            </slot>
        </div>
    </div>
</template>
