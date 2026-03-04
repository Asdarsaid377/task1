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
		class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
		<div v-if="loading" class="p-6 text-center text-slate-500">Loading...</div>

		<div v-else class="overflow-x-auto">
			<table class="w-full text-left border-collapse">
				<thead>
					<tr
						class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
						<th
							v-for="col in columns"
							:key="col.key"
							class="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider"
							:class="{
								'text-right': col.align === 'right',
								'text-center': col.align === 'center',
							}">
							{{ col.label }}
						</th>
						<th
							v-if="$slots.actions"
							class="px-3 py-2 text-right text-xs font-bold text-slate-400 uppercase">
							Actions
						</th>
					</tr>
				</thead>

				<tbody class="divide-y divide-slate-100 dark:divide-slate-800">
					<tr
						v-for="(item, index) in items"
						:key="index"
						class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
						<td
							v-for="col in columns"
							:key="col.key"
							class="px-3 py-2 text-sm text-slate-700 dark:text-slate-300"
							:class="{
								'text-right': col.align === 'right',
								'text-center': col.align === 'center',
							}">
							<slot :name="col.key" :item="item">
								{{ item[col.key] }}
							</slot>
						</td>

						<td v-if="$slots.actions" class="px-3 py-2 text-right">
							<slot name="actions" :item="item" />
						</td>
					</tr>
				</tbody>
			</table>

			<div v-if="!items.length" class="p-6 text-center text-slate-400">
				No data available
			</div>
		</div>
	</div>
</template>
