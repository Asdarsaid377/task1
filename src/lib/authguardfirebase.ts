import type { Router } from "vue-router";
import { useAuth } from "./authfirebase";

export function setupAuthGuards(router: Router) {
	const { isAuthenticated, isLoading, user, initializeAuth } = useAuth();

	// 🔥 pastikan auth start
	initializeAuth();

	router.beforeEach(async (to) => {
		// wait until auth loaded
		if (isLoading.value) {
			await new Promise((resolve) => {
				const unwatch = setInterval(() => {
					if (!isLoading.value) {
						clearInterval(unwatch);
						resolve(true);
					}
				}, 50);
			});
		}

		const isAuthRoute = to.path.startsWith("/auth");
		const isProtectedRoute = to.meta.requiresAuth === true;
		const requiredRole = to.meta.requiredRole as string | undefined;

		if (isProtectedRoute && !isAuthenticated.value) {
			return "/auth";
		}

		if (requiredRole && user.value?.role !== requiredRole) {
			return "/unauthorized";
		}

		if (isAuthRoute && isAuthenticated.value) {
			return user.value?.role === "admin"
				? "/admin/dashboard"
				: "/candidate/dashboard";
		}

		return true;
	});
}
