<script setup lang="ts">
import HeaderDashboard from "@/components/shared/HeaderDashboard.vue";
import Sidebar from "@/components/shared/Sidebar.vue";
</script>

<template>
    <div class="h-screen overflow-hidden bg-background-light dark:bg-slate-900">
        <Sidebar />

        <main class="lg:ml-64 h-full flex flex-col overflow-hidden">
            <HeaderDashboard />

            <div class="flex-1 overflow-y-auto p-6">
                <router-view />
            </div>
        </main>
    </div>
</template>
