<script setup lang="ts">
import Sidebar from "@/components/shared/Sidebar.vue";
</script>

<template>
    <div class="h-screen overflow-hidden bg-background-light">
        <Sidebar />
        <main class="lg:ml-64 h-full flex flex-col overflow-hidden">
            <!-- <HeaderDashboard /> -->
            <div class="flex-1 bg-white overflow-y-auto p-6">
                <router-view />
            </div>
        </main>
    </div>
</template>
