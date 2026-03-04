import { ref, computed } from "vue";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export type UserRole = "admin" | "candidate";

export type UserProfile = {
	uid: string;
	email: string;
	displayName?: string;
	photoURL?: string;
	role: UserRole;
	createdAt: Date;
};

const user = ref<UserProfile | null>(null);
const authUser = ref<any>(null);
const isLoading = ref(true);
const isAuthenticated = computed(() => !!authUser.value);

// ✅ initialize hanya sekali
let initialized = false;
let unsubscribeAuth: (() => void) | null = null;

export function useAuth() {
	const initializeAuth = () => {
		if (initialized) return;
		initialized = true;
		unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				try {
					const userDocRef = doc(db, "users", currentUser.uid);
					const userDocSnap = await getDoc(userDocRef);

					if (userDocSnap.exists()) {
						const userData = userDocSnap.data() as UserProfile;

						user.value = {
							...userData,
							createdAt: new Date(),
						};
					}

					authUser.value = currentUser;
				} catch (error) {
					console.error("Error fetching user profile:", error);
				}
			} else {
				user.value = null;
				authUser.value = null;
			}

			isLoading.value = false;
		});
	};

	const destroyAuthListener = () => {
		if (unsubscribeAuth) {
			unsubscribeAuth();
			unsubscribeAuth = null;
			initialized = false;
		}
	};

	const logout = async () => {
		await signOut(auth);
		user.value = null;
		authUser.value = null;
	};

	const updateUserProfile = async (updatedData: Partial<UserProfile>) => {
		if (!authUser.value) return;

		const userDocRef = doc(db, "users", authUser.value.uid);
		await updateDoc(userDocRef, updatedData);

		if (user.value) {
			user.value = {
				...user.value,
				...updatedData,
			};
		}
	};

	const changeUserRole = async (userId: string, newRole: UserRole) => {
		const userDocRef = doc(db, "users", userId);
		await updateDoc(userDocRef, { role: newRole });
	};

	return {
		user: computed(() => user.value),
		authUser: computed(() => authUser.value),
		isAuthenticated,
		isLoading: computed(() => isLoading.value),
		initializeAuth,
		logout,
		updateUserProfile,
		changeUserRole,
		destroyAuthListener,
	};
}
