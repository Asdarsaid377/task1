<script setup lang="ts">
import { AiOutlineSetting } from "vue-icons-plus/ai";
import { BiSearch } from "vue-icons-plus/bi";
import { IoNotificationsOutline } from "vue-icons-plus/io";
</script>

<template>
    <header
        class="h-16 sticky top-0 flex items-center justify-between px-8 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
    >
        <div class="flex items-center gap-4 w-1/2">
            <label class="relative flex-1 max-w-md">
                <span
                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"
                >
                    <span class="material-symbols-outlined text-xl"
                        ><BiSearch
                    /></span>
                </span>
                <input
                    class="w-full h-10 pl-10 pr-4 bg-background-light dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="Search applications, jobs..."
                    type="text"
                />
            </label>
        </div>
        <div class="flex items-center gap-4">
            <button
                class="relative p-2 rounded-lg text-slate-500 hover:bg-background-light dark:hover:bg-slate-800 transition-colors"
            >
                <span class="material-symbols-outlined"
                    ><IoNotificationsOutline
                /></span>
                <span
                    class="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"
                ></span>
            </button>
            <button
                class="p-2 rounded-lg text-slate-500 hover:bg-background-light dark:hover:bg-slate-800 transition-colors"
            >
                <span class="material-symbols-outlined"
                    ><AiOutlineSetting
                /></span>
            </button>
        </div>
    </header>
</template>
