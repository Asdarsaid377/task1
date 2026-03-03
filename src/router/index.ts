import { createRouter, createWebHistory } from "vue-router";

// Import halaman
import Home from "@/views/Home.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/Login.vue"), // Lazy load Login view
	},
	{
		path: "/details/:slug",
		name: "JobDetails",
		component: () => import("@/views/JobDetails.vue"), // Lazy load JobDetails view
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("@/views/Register.vue"), // Lazy load Register view
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

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
