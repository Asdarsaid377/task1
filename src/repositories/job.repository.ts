import { db } from "@/lib/firebase";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    addDoc,
} from "firebase/firestore";

import type { IJob } from "@/types/JobType";

const jobCollection = collection(db, "jobs");

export const jobRepository = {
    // Get data
    async getAll(): Promise<IJob[]> {
        const snapshot = await getDocs(jobCollection);
        return snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        })) as IJob[];
    },

    // Add data
    async addData(job: Omit<IJob, "id">) {
        const docRef = await addDoc(jobCollection, job);
        return { id: docRef.id, ...job } as IJob;
    },

    // Delete data
    async deleteById(id: string | number) {
        const jobRef = doc(db, "jobs", String(id));
        return await deleteDoc(jobRef);
    },

    // Update data
    async updateById(id: string | number, updatedData: Partial<IJob>) {
        const jobRef = doc(db, "jobs", String(id));
        return await updateDoc(jobRef, updatedData);
    },
};
