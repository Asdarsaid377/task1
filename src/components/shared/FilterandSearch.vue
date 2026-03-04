<script setup lang="ts">
import { AiOutlineSearch } from "vue-icons-plus/ai";

interface SelectOption {
	label: string;
	value: string;
}

interface SelectFilter {
	key: string;
	label: string;
	options: SelectOption[];
}

const props = defineProps<{
	search?: string;
	searchPlaceholder?: string;
	selects?: SelectFilter[];
	modelValue?: Record<string, string>;
}>();

const emit = defineEmits<{
	(e: "update:search", value: string): void;
	(e: "update:modelValue", value: Record<string, string>): void;
}>();

const updateSelect = (key: string, value: string) => {
	emit("update:modelValue", {
		...props.modelValue,
		[key]: value,
	});
};
</script>

<template>
	<div
		class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-end mb-6">
		<!-- Search -->
		<div v-if="search !== undefined" class="flex-1 min-w-[220px]">
			<label class="text-xs font-bold text-slate-400 uppercase mb-1 block">
				Search
			</label>
			<div class="relative">
				<span
					class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
					<AiOutlineSearch />
				</span>
				<input
					:value="search"
					@input="
						emit('update:search', ($event.target as HTMLInputElement).value)
					"
					:placeholder="searchPlaceholder || 'Search...'"
					class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none"
					type="text" />
			</div>
		</div>

		<!-- Dynamic Select Filters -->
		<div v-for="filter in selects" :key="filter.key" class="w-full md:w-48">
			<label class="text-xs font-bold text-slate-400 uppercase mb-1 block">
				{{ filter.label }}
			</label>
			<select
				:value="modelValue?.[filter.key]"
				@change="
					updateSelect(filter.key, ($event.target as HTMLSelectElement).value)
				"
				class="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-primary outline-none">
				<option
					v-for="option in filter.options"
					:key="option.value"
					:value="option.value">
					{{ option.label }}
				</option>
			</select>
		</div>

		<!-- Extra Slot -->
		<slot />
	</div>
</template>
