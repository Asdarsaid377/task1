<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { MdWork } from "vue-icons-plus/md";
import { AiOutlineMenu } from "vue-icons-plus/ai";
import { BiBuildings, BiSolidDashboard } from "vue-icons-plus/bi";
import { HiMiniUserGroup } from "vue-icons-plus/hi2";

const route = useRoute();

const isOpen = ref(false);
const isDesktop = ref(false);

const checkScreen = () => {
    isDesktop.value = window.innerWidth >= 1024;
    if (isDesktop.value) {
        isOpen.value = true;
    } else {
        isOpen.value = false;
    }
};

onMounted(() => {
    checkScreen();
    window.addEventListener("resize", checkScreen);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", checkScreen);
});

const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
};

const closeMobile = () => {
    if (!isDesktop.value) {
        isOpen.value = false;
    }
};

/* Dynamic Menu */
const menus = [
    {
        name: "Dashboard",
        icon: BiSolidDashboard,
        path: "/dashboard",
    },
    {
        name: "Manage Jobs",
        icon: MdWork,
        path: "/dashboard/manage-job",
    },
    {
        name: "Manage Candidates",
        icon: HiMiniUserGroup,
        path: "/dashboard/candidates",
    },
    {
        name: "Company Profile",
        icon: BiBuildings,
        path: "/dashboard/company-profile",
    },
    {
        name: "Manage Users",
        icon: HiMiniUserGroup,
        path: "/dashboard/users",
    },
];

const isActive = (path: string) => {
    if (path === "/dashboard") {
        return route.path === "/dashboard";
    }
    return route.path.startsWith(path);
};
</script>

<template>
    <!-- Overlay (mobile only) -->
    <div
        v-if="isOpen && !isDesktop"
        class="fixed inset-0 bg-black/40 z-40"
        @click="closeMobile"
    />

    <!-- Sidebar -->
    <aside
        :class="[
            'fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300',
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ]"
    >
        <div class="flex h-full flex-col justify-between p-4">
            <!-- TOP -->
            <div class="flex flex-col gap-8">
                <!-- Brand -->
                <div class="flex items-center justify-between px-2">
                    <div class="flex items-center gap-3">
                        <div
                            class="flex size-10 items-center justify-center rounded-lg bg-primary text-white"
                        >
                            <MdWork class="text-2xl" />
                        </div>
                        <div>
                            <h1 class="text-lg font-bold text-primary">CWF</h1>
                            <p class="text-xs text-slate-500">
                                Recruiter Dashboard
                            </p>
                        </div>
                    </div>

                    <!-- Close button (mobile only) -->
                    <button
                        v-if="!isDesktop"
                        @click="closeMobile"
                        class="text-slate-500"
                    >
                        ✕
                    </button>
                </div>

                <!-- Navigation -->
                <nav class="flex flex-col gap-1">
                    <router-link
                        v-for="menu in menus"
                        :key="menu.path"
                        :to="menu.path"
                        @click="closeMobile"
                        :class="[
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors',
                            isActive(menu.path)
                                ? 'bg-primary text-white shadow-md'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary',
                        ]"
                    >
                        <component :is="menu.icon" class="text-xl" />
                        {{ menu.name }}
                    </router-link>
                </nav>
            </div>

            <!-- FOOTER -->
            <div class="pt-6 border-t border-slate-200 dark:border-slate-800">
                <div class="flex items-center gap-3">
                    <div class="size-10 rounded-full bg-slate-300" />
                    <div>
                        <p class="text-sm font-bold">Alex Morgan</p>
                        <p class="text-xs text-slate-500">Talent Manager</p>
                    </div>
                </div>
            </div>
        </div>
    </aside>

    <!-- Toggle Button (Global) -->
    <button
        class="fixed bottom-5 right-5 lg:hidden bg-primary text-white p-3 rounded-full shadow-lg z-50"
        @click="toggleSidebar"
    >
        <span class="material-symbols-outlined">
            <AiOutlineMenu />
        </span>
    </button>
</template>
