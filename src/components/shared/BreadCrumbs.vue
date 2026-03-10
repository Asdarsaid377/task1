<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";

export interface BreadcrumbItem {
    label: string;
    to?: string;
    icon?: boolean;
}

interface Props {
    items: BreadcrumbItem[];
}

const props = defineProps<Props>();

const lastIndex = computed(() => props.items.length - 1);
</script>

<template>
    <div class="flex items-center gap-4 w-1/2">
        <nav class="flex" aria-label="Breadcrumb">
            <ol
                class="inline-flex text-slate-700 items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
            >
                <li
                    v-for="(item, index) in items"
                    :key="index"
                    class="inline-flex items-center"
                >
                    <!-- Separator -->
                    <svg
                        v-if="index !== 0"
                        class="w-3.5 h-3.5 mx-1 text-body rtl:rotate-180"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m9 5 7 7-7 7"
                        />
                    </svg>

                    <!-- Link -->
                    <RouterLink
                        v-if="item.to && index !== lastIndex"
                        :to="item.to"
                        class="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
                    >
                        <!-- Optional Home Icon -->
                        <svg
                            v-if="item.icon"
                            class="w-4 h-4 me-1.5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                            />
                        </svg>

                        {{ item.label }}
                    </RouterLink>

                    <!-- Current Page -->
                    <span
                        v-else
                        class="inline-flex items-center text-sm font-medium text-body-subtle"
                    >
                        {{ item.label }}
                    </span>
                </li>
            </ol>
        </nav>
    </div>
</template>
