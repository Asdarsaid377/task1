<script setup lang="ts">
interface Props {
    title: string;
    value: number;
    icon: any;
    trend: string;
}

const props = defineProps<Props>();
</script>

<template>
    <div
        class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
    >
        <div class="flex justify-between items-start">
            <div>
                <p class="text-sm font-medium text-primary-500">
                    {{ props.title }}
                </p>
                <p class="text-3xl font-bold mt-1">{{ props.value }}</p>
            </div>
            <div
                class="p-2 bg-primary/10 dark:bg-green-500/10 rounded-lg text-primary"
            >
                <span class="material-symbols-outlined">
                    <component :is="props.icon" />
                </span>
            </div>
        </div>
        <p class="text-sm font-medium text-primary mt-4">
            {{ props.trend }}%
            <span class="text-slate-400 font-normal">from last month</span>
        </p>
    </div>
</template>
