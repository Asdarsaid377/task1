<script setup lang="ts">
import HeaderDashboard from "@/components/shared/HeaderDashboard.vue";
import Sidebar from "@/components/shared/Sidebar.vue";
import { AiOutlineSetting } from "vue-icons-plus/ai";
import { BiSearch } from "vue-icons-plus/bi";
import { IoNotificationsOutline } from "vue-icons-plus/io";
</script>

<template>
	<div class="flex min-h-screen bg-background-light dark:bg-slate-900">
		<Sidebar />
		<main class="flex-1 flex flex-col main-content">
			<HeaderDashboard />

			<router-view />
			<!-- Content loaded here via Vue Router -->
		</main>
	</div>
</template>

<style scoped>
.dashboard-layout {
	display: flex; /* Use Flexbox for side-by-side layout */
	min-height: 100vh; /* Full viewport height */
}

.main-content {
	flex: 1; /* Allows main content to grow and fill remaining space */
	padding: 2rem;
	/* Add transition for smooth sidebar collapse/expand */
	transition: margin-left 0.3s;
}

/* Example for a collapsible sidebar */
/* Add logic in Vue to toggle a class on the main-content to adjust margin/width */
</style>
