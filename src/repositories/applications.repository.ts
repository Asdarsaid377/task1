import { db } from "@/lib/firebase";
import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	updateDoc,
	addDoc,
} from "firebase/firestore";

import type { IApplication } from "@/types/ApplicationType";

const applicationCollection = collection(db, "applications");

export const applicationRepository = {
	// Get data
	async getAll(): Promise<IApplication[]> {
		const snapshot = await getDocs(applicationCollection);
		return snapshot.docs.map((d) => ({
			id: d.id,
			...d.data(),
		})) as IApplication[];
	},

	async getByCandidateId(candidateId: string): Promise<IApplication[]> {
		const snapshot = await getDocs(applicationCollection);
		return snapshot.docs
			.map((d) => ({ id: d.id, ...d.data() }) as IApplication)
			.filter((app) => app.candidateId === candidateId);
	},

	async getByJobId(jobId: string): Promise<IApplication[]> {
		const snapshot = await getDocs(applicationCollection);
		return snapshot.docs
			.map((d) => ({ id: d.id, ...d.data() }) as IApplication)
			.filter((app) => app.jobId === jobId);
	},

	// Add data
	async addData(application: Omit<IApplication, "id">) {
		const docRef = await addDoc(applicationCollection, application);
		return { id: docRef.id, ...application } as IApplication;
	},

	// Delete data
	async deleteById(id: string | number) {
		const applicationRef = doc(db, "applications", String(id));
		return await deleteDoc(applicationRef);
	},

	// Update data
	async updateById(id: string | number, updatedData: Partial<IApplication>) {
		const applicationRef = doc(db, "applications", String(id));
		return await updateDoc(applicationRef, updatedData);
	},
};
