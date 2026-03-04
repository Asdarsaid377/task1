<script setup lang="ts">
import { AiFillCalendar, AiOutlineMore } from "vue-icons-plus/ai";
import { BiTrendingUp } from "vue-icons-plus/bi";
import { BsPalette, BsTerminal } from "vue-icons-plus/bs";
import { CgMoreAlt } from "vue-icons-plus/cg";
import { MdOutlineWork } from "vue-icons-plus/md";
import { TbBrandGoogleAnalytics } from "vue-icons-plus/tb";
</script>

<template>
    <main class="flex-1 flex flex-col">
        <!-- Dashboard Content -->
        <div class="p-6 space-y-8">
            <!-- Welcome -->
            <div>
                <h1 class="text-3xl font-black tracking-tight">
                    Dashboard Overview
                </h1>
                <p class="text-slate-500 mt-1">
                    Welcome back, here is what's happening with your job
                    listings today.
                </p>
            </div>
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm font-medium text-slate-500">
                                Total Lamaran
                            </p>
                            <p class="text-3xl font-bold mt-1">1,284</p>
                        </div>
                        <div
                            class="p-2 bg-green-50 dark:bg-green-500/10 rounded-lg text-green-600"
                        >
                            <span class="material-symbols-outlined"
                                ><BiTrendingUp
                            /></span>
                        </div>
                    </div>
                    <p class="text-sm font-medium text-green-600 mt-4">
                        +12%
                        <span class="text-slate-400 font-normal"
                            >from last month</span
                        >
                    </p>
                </div>
                <div
                    class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm font-medium text-slate-500">
                                Lowongan Aktif
                            </p>
                            <p class="text-3xl font-bold mt-1">12</p>
                        </div>
                        <div class="p-2 bg-primary/10 rounded-lg text-primary">
                            <span class="material-symbols-outlined"
                                ><MdOutlineWork
                            /></span>
                        </div>
                    </div>
                    <p class="text-sm font-medium text-slate-500 mt-4">
                        0%
                        <span class="text-slate-400 font-normal"
                            >no change</span
                        >
                    </p>
                </div>
                <div
                    class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="text-sm font-medium text-slate-500">
                                Wawancara Terjadwal
                            </p>
                            <p class="text-3xl font-bold mt-1">48</p>
                        </div>
                        <div
                            class="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600"
                        >
                            <span class="material-symbols-outlined"
                                ><AiFillCalendar
                            /></span>
                        </div>
                    </div>
                    <p class="text-sm font-medium text-orange-600 mt-4">
                        -5%
                        <span class="text-slate-400 font-normal"
                            >from last week</span
                        >
                    </p>
                </div>
            </div>
            <!-- Recent Applicants -->
            <div
                class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden"
            >
                <div
                    class="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center"
                >
                    <h2 class="text-xl font-bold">Recent Applicant Activity</h2>
                    <a
                        href="/dashboard/applicant"
                        class="text-primary text-sm font-bold hover:underline"
                    >
                        View All
                    </a>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left">
                        <thead class="bg-background-light dark:bg-slate-800/50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-xs font-bold text-slate-500 uppercase"
                                >
                                    Applicant
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-bold text-slate-500 uppercase"
                                >
                                    Role Applied
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-bold text-slate-500 uppercase"
                                >
                                    Applied Date
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-bold text-slate-500 uppercase"
                                >
                                    Status
                                </th>
                                <th
                                    class="px-6 py-3 text-xs font-bold text-slate-500 uppercase text-right"
                                >
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody
                            class="divide-y divide-slate-200 dark:divide-slate-800"
                        >
                            <tr
                                v-for="applicant in [1, 2, 3, 4]"
                                :key="applicant"
                                class="hover:bg-background-light dark:hover:bg-slate-800/30 transition-colors"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div
                                            class="size-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-primary"
                                        >
                                            JD
                                        </div>
                                        <div>
                                            <p class="text-sm font-bold">
                                                John Doe
                                            </p>
                                            <p class="text-xs text-slate-500">
                                                john.doe@email.com
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-sm font-medium">
                                        Senior Product Designer
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    <p class="text-sm text-slate-500">
                                        Oct 24, 2023
                                    </p>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                        >Reviewing</span
                                    >
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <button
                                        class="text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span class="material-symbols-outlined"
                                            ><AiOutlineMore
                                        /></span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Job Performance Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
                <div
                    class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="font-bold text-lg">Hiring Pipeline</h3>
                        <button class="text-slate-400">
                            <span class="material-symbols-outlined"
                                ><CgMoreAlt
                            /></span>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm">
                                <span class="font-medium">Applied</span>
                                <span class="text-slate-500"
                                    >1,284 candidates</span
                                >
                            </div>
                            <div
                                class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden"
                            >
                                <div
                                    class="bg-primary h-full w-[100%] rounded-full"
                                ></div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm">
                                <span class="font-medium">Screening</span>
                                <span class="text-slate-500"
                                    >452 candidates</span
                                >
                            </div>
                            <div
                                class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden"
                            >
                                <div
                                    class="bg-primary h-full w-[35%] rounded-full"
                                ></div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm">
                                <span class="font-medium">Interview</span>
                                <span class="text-slate-500"
                                    >128 candidates</span
                                >
                            </div>
                            <div
                                class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden"
                            >
                                <div
                                    class="bg-primary h-full w-[10%] rounded-full"
                                ></div>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <div class="flex justify-between text-sm">
                                <span class="font-medium">Final Selection</span>
                                <span class="text-slate-500"
                                    >32 candidates</span
                                >
                            </div>
                            <div
                                class="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden"
                            >
                                <div
                                    class="bg-primary h-full w-[4%] rounded-full"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="font-bold text-lg">
                            Recent Listings Performance
                        </h3>
                        <button class="text-slate-400">
                            <span class="material-symbols-outlined"
                                ><TbBrandGoogleAnalytics
                            /></span>
                        </button>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div
                            class="flex items-center gap-4 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-background-light dark:hover:bg-slate-800 transition-colors"
                        >
                            <div
                                class="size-12 rounded bg-primary/10 flex items-center justify-center text-primary"
                            >
                                <span class="material-symbols-outlined"
                                    ><BsTerminal
                                /></span>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-bold">
                                    Backend Engineer
                                </p>
                                <p class="text-xs text-slate-500">
                                    124 applications • 3 days left
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm font-bold text-primary">
                                    High
                                </p>
                                <p
                                    class="text-[10px] text-slate-400 uppercase tracking-wider"
                                >
                                    Engagement
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex items-center gap-4 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-background-light dark:hover:bg-slate-800 transition-colors"
                        >
                            <div
                                class="size-12 rounded bg-primary/10 flex items-center justify-center text-primary"
                            >
                                <span class="material-symbols-outlined"
                                    ><BsPalette
                                /></span>
                            </div>
                            <div class="flex-1">
                                <p class="text-sm font-bold">
                                    Senior UI/UX Designer
                                </p>
                                <p class="text-xs text-slate-500">
                                    89 applications • 5 days left
                                </p>
                            </div>
                            <div class="text-right">
                                <p
                                    class="text-sm font-bold text-slate-700 dark:text-slate-300"
                                >
                                    Medium
                                </p>
                                <p
                                    class="text-[10px] text-slate-400 uppercase tracking-wider"
                                >
                                    Engagement
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
