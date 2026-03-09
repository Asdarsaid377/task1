import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

// Import halaman
import Home from "@/views/Home.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { setupAuthGuards } from "@/lib/authguardfirebase";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: { title: "Home - CWF Recruitment" },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"), // Lazy load Login view
        meta: { title: "Login - CWF Recruitment" },
    },
    {
        path: "/details/:slug",
        name: "JobDetails",
        component: () => import("@/views/JobDetails.vue"), // Lazy load JobDetails view
        meta: { title: "Job Details - CWF Recruitment" },
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/Profile.vue"), // Lazy load Register view
        meta: { title: "Profile - CWF Recruitment", requiresAuth: true },
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/Register.vue"), // Lazy load Register view
        meta: { title: "Register - CWF Recruitment" },
    },
    {
        path: "/dashboard",
        component: DashboardLayout,
        // meta: { requiresAuth: true },
        meta: { requiresAuth: true, requiredRole: "admin" },
        children: [
            {
                path: "",
                component: () => import("@/views/Dashboard.vue"),
            },
            {
                path: "manage-job",
                component: () => import("@/views/ManageJobs.vue"), // Lazy load ManageJobs view
                meta: { requiresAuth: true },
            },
            {
                path: "add-job",
                component: () => import("@/components/forms/FormAddJob.vue"), // Lazy load FormAddJob view
                meta: { requiresAuth: true },
            },
            {
                path: "candidates",
                component: () => import("@/views/Candidate.vue"), // Lazy load Candidate view
                meta: { requiresAuth: true },
            },
            {
                path: "company-profile",
                component: () =>
                    import("@/components/forms/CompanyProfile.vue"), // Lazy load CompanyProfile view
                meta: { requiresAuth: true },
            },
            {
                path: "users",
                component: () => import("@/views/Users.vue"), // Lazy load Candidate view
                meta: { requiresAuth: true },
            },
            // {
            //   path: '/jobs',
            //   component: JobList
            // }
        ],
    },
    {
        path: "/unauthorized",
        name: "Forbidden",
        component: () => import("@/views/Forbidden.vue"),
        meta: { title: "403 - Forbidden" },
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"), // Lazy load NotFound view
        meta: { title: "404 - Notfound" },
    },
];

// Update document title

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.afterEach((to) => {
    document.title = (to.meta.title as string) || "CWF Recruitment";
});
setupAuthGuards(router);

export default router;
