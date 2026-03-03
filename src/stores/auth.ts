import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null as any,
		loading: false,
	}),

	actions: {
		init() {
			onAuthStateChanged(auth, (user) => {
				this.user = user;
			});
		},

		setLoading(value: boolean) {
			this.loading = value;
		},
	},

	getters: {
		isAuthenticated: (state) => !!state.user,
	},
});
