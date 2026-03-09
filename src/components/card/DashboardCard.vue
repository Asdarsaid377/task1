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
    <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div class="flex justify-between items-start">
            <div>
                <p class="text-sm font-medium text-primary">
                    {{ props.title }}
                </p>
                <p class="text-3xl font-bold text-primary mt-1">
                    {{ props.value }}
                </p>
            </div>
            <div
                class="p-2 bg-primary/10 darkssbg-green-500/10 rounded-lg text-primary"
            >
                <span class="material-symbols-outlined">
                    <component :is="props.icon" />
                </span>
            </div>
        </div>
    </div>
</template>
