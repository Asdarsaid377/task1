import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null as any,
		role: null as string | null,
		loading: false,
	}),

	actions: {
		async init() {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					this.user = user;

					const snap = await getDoc(doc(db, "users", user.uid));
					if (snap.exists()) {
						this.role = snap.data().role;
					}
				} else {
					this.user = null;
					this.role = null;
				}
			});
		},
	},

	getters: {
		isAuthenticated: (state) => !!state.user,
		isHRD: (state) => state.role === "hrd",
		isApplicant: (state) => state.role === "applicant",
	},
});
