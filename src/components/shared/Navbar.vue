<script setup lang="ts">
import { PiFishFill } from "vue-icons-plus/pi";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
// import { useAuth } from "@/composables/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/lib/authfirebase";

const router = useRouter();
const { user, isLoading } = useAuth();
const auth = getAuth();


const isScrolled = ref(false);
const isMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);

// Computed untuk check user sudah login
const isLoggedIn = computed(() => !!user.value);

const onScroll = () => {
	isScrolled.value = window.scrollY > 10;
};

const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
	document.body.style.overflow = isMenuOpen.value ? "hidden" : "unset";
};

const closeMenu = () => {
	isMenuOpen.value = false;
	document.body.style.overflow = "unset";
};

const closeProfileMenu = () => {
	isProfileMenuOpen.value = false;
};

const toggleProfileMenu = () => {
	isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const scrollToSection = (sectionId: string) => {
	closeMenu();
	const element = document.querySelector(sectionId);
	element?.scrollIntoView({ behavior: "smooth" });
};

const handleLogout = async () => {
	try {
		await signOut(auth);
		closeProfileMenu();
		router.push("/");
	} catch (error) {
		console.error("Logout error:", error);
	}
};

onMounted(() => {
	window.addEventListener("scroll", onScroll);
	document.addEventListener("click", (e) => {
		const profileMenuEl = document.querySelector(".profile-menu-wrapper");
		if (profileMenuEl && !profileMenuEl.contains(e.target as Node)) {
			closeProfileMenu();
		}
	});
});

onUnmounted(() => {
	window.removeEventListener("scroll", onScroll);
	document.body.style.overflow = "unset";
});
</script>

<template>
	<header
		class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 lg:px-20 py-4 transition-all duration-300"
		:class="{ 'shadow-lg': isScrolled }">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between gap-4">
				<!-- Logo -->
				<router-link
					to="/"
					class="flex items-center gap-2 hover:scale-105 transition-transform duration-300"
					@click="closeMenu">
					<div
						class="flex items-center justify-center size-10 rounded-lg bg-primary text-white hover:shadow-lg transition-shadow duration-300">
						<span class="material-symbols-outlined text-5xl">
							<PiFishFill />
						</span>
					</div>
					<h1
						class="font-bold tracking-tight text-primary dark:text-white text-lg">
						CWF
					</h1>
				</router-link>

				<!-- Desktop Navigation -->
				<nav class="hidden md:flex items-center gap-8">
					<button
						@click="scrollToSection('#benefits')"
						class="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 relative group">
						Benefits
						<span
							class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
					</button>
					<button
						@click="scrollToSection('#jobs')"
						class="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 relative group">
						Openings
						<span
							class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
					</button>
				</nav>

				<!-- Desktop Register/Profile Button -->
				<div class="hidden md:flex items-center gap-3">
					<!-- Show Register Button jika belum login -->
					<router-link
						v-if="!isLoggedIn && !isLoading"
						to="/register"
						class="inline-flex items-center justify-center px-5 py-2 text-sm font-bold bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-all duration-300 text-white hover:shadow-lg hover:scale-105">
						Signin
					</router-link>

					<!-- Show User Profile Menu jika sudah login -->
					<div
						v-if="isLoggedIn && !isLoading"
						class="relative profile-menu-wrapper">
						<button
							@click="toggleProfileMenu"
							class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
							<!-- User Avatar -->
							<div
								v-if="user?.photoURL"
								class="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
								<img
									:src="user.photoURL"
									:alt="user.displayName || 'User'"
									class="w-full h-full object-cover" />
							</div>
							<div
								v-else
								class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
								{{ user?.displayName?.charAt(0).toUpperCase() || "U" }}
							</div>
							<!-- Down Arrow Icon -->
							<span
								class="material-symbols-outlined text-lg text-slate-600 dark:text-slate-400 transition-transform duration-300"
								:class="{ 'rotate-180': isProfileMenuOpen }">
								expand_more
							</span>
						</button>

						<!-- Profile Dropdown Menu -->
						<transition
							enter-active-class="transition-all duration-200"
							leave-active-class="transition-all duration-200"
							enter-from-class="opacity-0 scale-95 -translate-y-2"
							leave-to-class="opacity-0 scale-95 -translate-y-2">
							<div
								v-if="isProfileMenuOpen"
								class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
								<!-- User Info -->
								<div
									class="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
									<p
										class="text-sm font-semibold text-slate-900 dark:text-white">
										{{ user?.displayName || "User" }}
									</p>
									<p class="text-xs text-slate-500 dark:text-slate-400">
										{{ user?.email }}
									</p>
									<p
										class="text-xs font-semibold text-primary mt-1 uppercase tracking-wide">
										{{ user?.role }}
									</p>
								</div>

								<!-- Dashboard Link -->
								<router-link
									:to="
										user?.role === 'admin'
											? '/admin/dashboard'
											: '/candidate/dashboard'
									"
									@click="closeProfileMenu"
									class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300">
									<span class="material-symbols-outlined text-lg"
										>dashboard</span
									>
									Dashboard
								</router-link>

								<!-- Profile Settings -->
								<router-link
									:to="
										user?.role === 'admin'
											? '/admin/profile'
											: '/candidate/profile'
									"
									@click="closeProfileMenu"
									class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300">
									<span class="material-symbols-outlined text-lg">person</span>
									Profile
								</router-link>

								<!-- Divider -->
								<div class="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>

								<!-- Logout Button -->
								<button
									@click="handleLogout"
									class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300">
									<span class="material-symbols-outlined text-lg">logout</span>
									Logout
								</button>
							</div>
						</transition>
					</div>

					<!-- Loading Skeleton -->
					<div
						v-if="isLoading"
						class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
				</div>

				<!-- Mobile Menu Button -->
				<div class="md:hidden flex items-center gap-2">
					<!-- Hamburger Menu Button -->
					<button
						@click="toggleMenu"
						class="inline-flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
						:aria-expanded="isMenuOpen"
						aria-label="Toggle menu">
						<!-- Hamburger Icon -->
						<div class="flex flex-col gap-1.5 w-6 h-5">
							<span
								class="block w-full h-0.5 bg-slate-900 dark:bg-slate-100 rounded-full transition-all duration-300"
								:class="{
									'rotate-45 translate-y-2': isMenuOpen,
								}"></span>
							<span
								class="block w-full h-0.5 bg-slate-900 dark:bg-slate-100 rounded-full transition-all duration-300"
								:class="{
									'opacity-0': isMenuOpen,
								}"></span>
							<span
								class="block w-full h-0.5 bg-slate-900 dark:bg-slate-100 rounded-full transition-all duration-300"
								:class="{
									'-rotate-45 -translate-y-2': isMenuOpen,
								}"></span>
						</div>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Menu Overlay -->
		<transition
			enter-active-class="transition-opacity duration-300"
			leave-active-class="transition-opacity duration-300"
			enter-from-class="opacity-0"
			leave-to-class="opacity-0">
			<div
				v-if="isMenuOpen"
				class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
				@click="closeMenu"></div>
		</transition>

		<!-- Mobile Menu -->
		<transition
			enter-active-class="transition-all duration-300"
			leave-active-class="transition-all duration-300"
			enter-from-class="opacity-0 translate-y-2"
			leave-to-class="opacity-0 translate-y-2">
			<div
				v-if="isMenuOpen"
				class="absolute top-full left-0 right-0 md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-lg z-50">
				<nav class="flex flex-col px-6 py-4 space-y-2">
					<!-- Benefits Link -->
					<button
						@click="scrollToSection('#benefits')"
						class="w-full text-left px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-all duration-300 flex items-center gap-3">
						<span class="material-symbols-outlined text-xl">star</span>
						Benefits
					</button>

					<!-- Openings Link -->
					<button
						@click="scrollToSection('#jobs')"
						class="w-full text-left px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-all duration-300 flex items-center gap-3">
						<span class="material-symbols-outlined text-xl">work</span>
						Openings
					</button>

					<!-- Divider -->
					<div class="h-px bg-slate-200 dark:bg-slate-800 my-2"></div>

					<!-- Register Button (Mobile) - Show jika belum login -->
					<router-link
						v-if="!isLoggedIn && !isLoading"
						to="/register"
						@click="closeMenu"
						class="w-full flex items-center justify-center px-4 py-3 text-sm font-bold bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-all duration-300 text-white">
						Signin
					</router-link>

					<!-- Mobile User Menu - Show jika sudah login -->
					<div v-if="isLoggedIn && !isLoading" class="space-y-2">
						<!-- User Info Card -->
						<div class="px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-800">
							<p class="text-sm font-semibold text-slate-900 dark:text-white">
								{{ user?.displayName || "User" }}
							</p>
							<p class="text-xs text-slate-500 dark:text-slate-400">
								{{ user?.email }}
							</p>
							<p
								class="text-xs font-semibold text-primary mt-1 uppercase tracking-wide">
								{{ user?.role }}
							</p>
						</div>

						<!-- Dashboard Link -->
						<router-link
							:to="
								user?.role === 'admin'
									? '/admin/dashboard'
									: '/candidate/dashboard'
							"
							@click="closeMenu"
							class="flex items-center gap-3 w-full px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-all duration-300">
							<span class="material-symbols-outlined text-xl">dashboard</span>
							Dashboard
						</router-link>

						<!-- Profile Link -->
						<router-link
							:to="
								user?.role === 'admin' ? '/admin/profile' : '/candidate/profile'
							"
							@click="closeMenu"
							class="flex items-center gap-3 w-full px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-all duration-300">
							<span class="material-symbols-outlined text-xl">person</span>
							Profile
						</router-link>

						<!-- Logout Button -->
						<button
							@click="handleLogout"
							class="flex items-center gap-3 w-full px-4 py-3 text-base font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300">
							<span class="material-symbols-outlined text-xl">logout</span>
							Logout
						</button>
					</div>
				</nav>
			</div>
		</transition>
	</header>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

.material-symbols-outlined {
	font-family: "Material Symbols Outlined";
	font-variation-settings:
		"FILL" 0,
		"wght" 300,
		"GRAD" 0,
		"opsz" 24;
}

/* Smooth transitions for menu items */
button {
	transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
