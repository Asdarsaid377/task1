import { createRouter, createWebHistory } from "vue-router";

// Import halaman
import Home from "@/views/Home.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import { setupAuthGuards } from "@/lib/authguardfirebase";

const routes = [
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
		path: "/register",
		name: "Register",
		component: () => import("@/views/Register.vue"), // Lazy load Register view
		meta: { title: "Register - CWF Recruitment" },
	},
	{
		path: "/dashboard",
		component: DashboardLayout,
		meta: { requiresAuth: true },
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
				component: () => import("@/components/forms/CompanyProfile.vue"), // Lazy load CompanyProfile view
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
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("@/views/NotFound.vue"), // Lazy load NotFound view
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
