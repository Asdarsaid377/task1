<script setup lang="ts">
import type { PropType } from "vue";

export interface TableColumn {
    key: string;
    label: string;
    align?: "left" | "right" | "center";
}

defineProps({
    columns: {
        type: Array as PropType<TableColumn[]>,
        required: true,
    },
    items: {
        type: Array as PropType<any[]>,
        required: true,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div
        class="relative bg-white darksss:bg-slate-900 border border-slate-200 darksss:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
    >
        <!-- Loading -->
        <div
            v-if="loading"
            class="flex items-center justify-center py-16 text-slate-500 text-sm"
        >
            Loading data...
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
            <table class="w-full border-collapse text-sm">
                <!-- Header -->
                <thead>
                    <tr
                        class="bg-slate-50/70 darksss:bg-slate-800/60 border-b border-slate-200 darksss:border-slate-800"
                    >
                        <th
                            v-for="col in columns"
                            :key="col.key"
                            class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                            :class="{
                                'text-right': col.align === 'right',
                                'text-center': col.align === 'center',
                                'text-left': !col.align || col.align === 'left',
                            }"
                        >
                            {{ col.label }}
                        </th>

                        <th
                            v-if="$slots.actions"
                            class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>

                <!-- Body -->
                <tbody
                    class="divide-y divide-slate-100 darksss:divide-slate-800"
                >
                    <tr
                        v-for="(item, index) in items"
                        :key="index"
                        class="group transition hover:bg-slate-50 darksss:hover:bg-slate-800/40"
                    >
                        <td
                            v-for="col in columns"
                            :key="col.key"
                            class="px-6 py-4 text-slate-700 darksss:text-slate-300"
                            :class="{
                                'text-right': col.align === 'right',
                                'text-center': col.align === 'center',
                                'text-left': !col.align || col.align === 'left',
                            }"
                        >
                            <slot :name="col.key" :item="item">
                                {{ item[col.key] }}
                            </slot>
                        </td>

                        <td
                            v-if="$slots.actions"
                            class="px-6 py-4 text-right opacity-70 group-hover:opacity-100 transition"
                        >
                            <slot name="actions" :item="item" />
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Footer -->
            <div
                v-if="!loading && items.length > 0"
                class="flex items-center justify-between px-6 py-4 bg-slate-50/70 darksss:bg-slate-800/50 border-t border-slate-200 darksss:border-slate-800"
            >
                <p class="text-sm text-slate-500">
                    Showing
                    <span
                        class="font-semibold text-slate-900 darksss:text-white"
                    >
                        {{ items.length }}
                    </span>
                    entries
                </p>
            </div>

            <!-- Empty -->
            <div
                v-if="!items.length"
                class="flex flex-col items-center justify-center py-16 text-slate-400"
            >
                <p class="text-sm">No data available</p>
            </div>
        </div>
    </div>
</template>
