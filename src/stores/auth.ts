// import { defineStore } from "pinia";
// import axios from "axios";

// export const useAuthStore = defineStore("auth", {
// 	state: () => ({
// 		user: null,
// 		token: null,
// 		loading: false,
// 		error: null,
// 	}),

// 	getters: {
// 		isAuthenticated: (state) => !!state.token,
// 	},

// 	actions: {
// 		async login(payload) {
// 			this.loading = true;
// 			this.error = null;

// 			try {
// 				const response = await axios.post("/api/login", payload);

// 				this.token = response.data.token;
// 				this.user = response.data.user;

// 				localStorage.setItem("token", this.token);
// 			} catch (err) {
// 				this.error = err.response?.data?.message || "Login failed";
// 			} finally {
// 				this.loading = false;
// 			}
// 		},

// 		logout() {
// 			this.user = null;
// 			this.token = null;
// 			localStorage.removeItem("token");
// 		},
// 	},
// });
