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

        const requiresAuth = to.matched.some(
            (record) => record.meta.requiresAuth,
        );

        const requiredRole = to.matched
            .map((record) => record.meta.requiredRole)
            .find((role) => role);

        const isAuthRoute = ["/register"].includes(to.path);

        // user belum login
        if (requiresAuth && !isAuthenticated.value) {
            return {
                path: "/login",
                query: { redirect: to.fullPath },
            };
        }

        // role tidak sesuai
        if (requiredRole && user.value?.role !== requiredRole) {
            return "/unauthorized";
        }

        // user sudah login tapi buka login page
        if (isAuthRoute && isAuthenticated.value) {
            return user.value?.role === "admin" ? "/dashboard" : "/";
        }

        return true;
    });
}
