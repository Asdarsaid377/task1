import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const createUserProfile = async (
	uid: string,
	email: string,
	role: string,
) => {
	await setDoc(doc(db, "users", uid), {
		email,
		role,
		createdAt: new Date(),
	});
};
