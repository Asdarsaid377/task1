import type { Router } from "vue-router";
import { useAuth } from "./authfirebase";
import "vue-router";

declare module "vue-router" {
	interface RouteMeta {
		requiresAuth?: boolean;
		requiredRole?: "admin" | "candidate";
	}
}

export function setupAuthGuards(router: Router) {
	const { initialize, isAuthenticated, user } = useAuth();

	router.beforeEach(async (to) => {
		await initialize();
		const isAuthRoute = to.path.startsWith("/auth");
		const requiresAuth = to.meta.requiresAuth;
		const requiredRole = to.meta.requiredRole;

		if (requiresAuth && !isAuthenticated.value) {
			return {
				path: "/auth",
				query: { redirect: to.fullPath }, // optional nice UX
			};
		}

		if (requiresAuth && !isAuthenticated.value) {
			return "/register";
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
