import { db } from "@/lib/firebase";
import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	updateDoc,
	getDoc,
} from "firebase/firestore";
import type { IUser } from "@/types/UserType";

const userCollection = collection(db, "users");

export const userRepository = {
	async getAll(): Promise<IUser[]> {
		const snapshot = await getDocs(userCollection);
		return snapshot.docs.map((d) => ({
			id: d.id,
			...d.data(),
		})) as IUser[];
	},

	async getByUid(uid: string): Promise<IUser | null> {
		const userDocRef = doc(db, "users", uid);
		const userDocSnap = await getDoc(userDocRef);
		if (userDocSnap.exists()) {
			return { id: userDocSnap.id, ...userDocSnap.data() } as IUser;
		}
		return null;
	},

	async deleteByUid(uid: string) {
		const userRef = doc(db, "users", uid);
		return await deleteDoc(userRef);
	},

	async updateRole(uid: string, role: "admin" | "candidate") {
		const userRef = doc(db, "users", uid);
		return await updateDoc(userRef, { role });
	},
};
