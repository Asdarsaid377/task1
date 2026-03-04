import { ref, computed } from "vue";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export type UserRole = "admin" | "candidate";

export interface UserProfile {
	uid: string;
	email: string;
	displayName?: string;
	photoURL?: string;
	role: UserRole;
	createdAt: Date;
}

const firebaseUser = ref<User | null>(null);
const profile = ref<UserProfile | null>(null);
const loading = ref(true);

let initPromise: Promise<void> | null = null;

async function fetchUserProfile(uid: string) {
	const snapshot = await getDoc(doc(db, "users", uid));
	if (!snapshot.exists()) return null;
	const data = snapshot.data();

	return {
		...(data as UserProfile),
		createdAt: data.createdAt?.toDate?.() ?? new Date(),
	} as UserProfile;
}

function initAuth(): Promise<void> {
	if (initPromise) return initPromise;
	initPromise = new Promise((resolve) => {
		onAuthStateChanged(auth, async (user) => {
			firebaseUser.value = user;
			if (user) {
				profile.value = await fetchUserProfile(user.uid);
			} else {
				profile.value = null;
			}
			loading.value = false;
			resolve();
		});
	});

	return initPromise;
}

export function useAuth() {
	const logout = async () => {
		await signOut(auth);
	};

	const updateProfile = async (data: Partial<UserProfile>) => {
		if (!firebaseUser.value) return;

		await updateDoc(doc(db, "users", firebaseUser.value.uid), data);

		if (profile.value) {
			profile.value = { ...profile.value, ...data };
		}
	};

	const changeUserRole = async (userId: string, role: UserRole) => {
		await updateDoc(doc(db, "users", userId), { role });
	};

	return {
		/* state perubahan*/
		user: computed(() => profile.value),
		firebaseUser: computed(() => firebaseUser.value),
		isAuthenticated: computed(() => !!firebaseUser.value),
		isLoading: computed(() => loading.value),
		initialize: initAuth,

		/* Action User*/
		logout,
		updateProfile,
		changeUserRole,
	};
}
