import { db, storage } from "@/lib/firebase";
import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	updateDoc,
	addDoc,
	getDoc,
	query,
	where,
} from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import type { IApplication } from "@/types/ApplicationType";
import { alertService } from "@/components/alert/notif";
// import { ref } from "vue";
const applicationCollection = collection(db, "applications");

const uploadResumeToFirebase = async (file: File) => {
	const storageRef = ref(storage, `resumes/${Date.now()}_${file.name}`);
	const snapshot = await uploadBytes(storageRef, file);
	const downloadURL = await getDownloadURL(snapshot.ref);
	return downloadURL;
};

export const applicationRepository = {
	// Get All Data

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

	async getByIdApplicant(id: string): Promise<IApplication | null> {
		const applicationRef = doc(applicationCollection, id);
		const snapshot = await getDoc(applicationRef);
		if (!snapshot.exists()) {
			return null;
		}

		return {
			id: snapshot.id,
			...snapshot.data(),
		} as IApplication;
	},

	// Add data
	async addData(application: Omit<IApplication, "id">) {
		const q = query(
			applicationCollection,
			where("candidateId", "==", application.candidateId),
			where("jobId", "==", application.jobId),
		);
		const snapshot = await getDocs(q);
		if (!snapshot.empty) {
			alertService.error("You have already applied for this job", 2000);
			throw new Error("You have already applied for this job");
		}
		let resumeUrl = application.resumeUrl;
		if (application.resumeFile) {
			resumeUrl = await uploadResumeToFirebase(application.resumeFile);
		}
		// and to remove the File object before saving to Firestore
		const { resumeFile, ...dataToSave } = application;
		const finalData = {
			...dataToSave,
			resumeUrl,
		};
		const docRef = await addDoc(applicationCollection, finalData);
		console.log(docRef.id);
		return { id: docRef.id, ...finalData } as IApplication;
	},

	// Delete data
	async deleteById(id: string | number) {
		const applicationRef = doc(applicationCollection, String(id));
		return await deleteDoc(applicationRef);
	},

	// Update data
	async updateById(id: string | number, updatedData: Partial<IApplication>) {
		const applicationRef = doc(applicationCollection, String(id));
		return await updateDoc(applicationRef, updatedData);
	},
};
