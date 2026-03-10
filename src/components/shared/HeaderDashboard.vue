<script setup lang="ts">
import { useAuth } from "@/lib/authfirebase";
import { getAuth, signOut } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { user, isLoading } = useAuth();
const router = useRouter();
const auth = getAuth();
const isMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);

const closeProfileMenu = () => {
    isProfileMenuOpen.value = false;
};

const toggleProfileMenu = () => {
    isProfileMenuOpen.value = !isProfileMenuOpen.value;
};
const handleLogout = async () => {
    try {
        await signOut(auth);
        router.push("/");
    } catch (error) {
        console.error("Logout error:", error);
    }
};
</script>

<template>
    <header
        class="h-16 sticky top-0 flex items-center justify-end px-8 bg-white border-b border-slate-200 darksss:border-slate-800"
    >
        <div class="flex items-center justify-end gap-4 w-1/2">
            <div v-if="!isLoading" class="relative profile-menu-wrapper">
                <button
                    @click="toggleProfileMenu"
                    class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all duration-300"
                >
                    <!-- User Avatar -->
                    <div
                        v-if="user?.photoURL"
                        class="w-8 h-8 rounded-full overflow-hidden bg-gray-300"
                    >
                        <img
                            :src="user.photoURL"
                            :alt="user.displayName || 'User'"
                            class="w-full h-full object-cover"
                        />
                    </div>
                    <div
                        v-else
                        class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold"
                    >
                        {{ user?.displayName?.charAt(0).toUpperCase() || "U" }}
                    </div>
                    <!-- Down Arrow Icon -->
                    <span
                        class="material-symbols-outlined text-lg text-slate-600 transition-transform duration-300"
                        :class="{ 'rotate-180': isProfileMenuOpen }"
                    >
                        expand_more
                    </span>
                </button>

                <!-- Profile Dropdown Menu -->
                <transition
                    enter-active-class="transition-all duration-200"
                    leave-active-class="transition-all duration-200"
                    enter-from-class="opacity-0 scale-95 -translate-y-2"
                    leave-to-class="opacity-0 scale-95 -translate-y-2"
                >
                    <div
                        v-if="isProfileMenuOpen"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50"
                    >
                        <!-- User Info -->
                        <div class="px-4 py-3 border-b border-slate-200">
                            <p class="text-sm font-semibold text-slate-900">
                                {{ user?.displayName || "User" }}
                            </p>
                            <p class="text-xs text-slate-500">
                                {{ user?.email }}
                            </p>
                            <p
                                class="text-xs font-semibold text-primary mt-1 uppercase tracking-wide"
                            >
                                {{ user?.role }}
                            </p>
                        </div>

                        <!-- Dashboard Link -->
                        <router-link
                            :to="'/'"
                            @click="closeProfileMenu"
                            class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-300"
                        >
                            <span class="material-symbols-outlined text-lg"
                                >home</span
                            >
                            Homepage
                        </router-link>

                        <!-- Profile Settings -->
                        <router-link
                            :to="
                                user?.role === 'admin'
                                    ? '/admin/profile'
                                    : '/profile'
                            "
                            @click="closeProfileMenu"
                            class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-100 transition-colors duration-300"
                            :class="user?.role === 'admin' ? 'hidden' : ''"
                        >
                            <span class="material-symbols-outlined text-lg"
                                >person</span
                            >
                            Profile
                        </router-link>

                        <!-- Divider -->
                        <div class="h-px bg-slate-200 my-2"></div>

                        <!-- Logout Button -->
                        <button
                            @click="handleLogout"
                            class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-300"
                        >
                            <span class="material-symbols-outlined text-lg"
                                >logout</span
                            >
                            Logout
                        </button>
                    </div>
                </transition>
            </div>
        </div>
    </header>
</template>
