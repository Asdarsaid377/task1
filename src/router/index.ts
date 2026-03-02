import { createRouter, createWebHistory } from "vue-router";

// Import halaman
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";
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
				component: Home,
			},
			{
				path: "jobs",
				component: () => import("@/views/Login.vue"), // Lazy load JobList view
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
