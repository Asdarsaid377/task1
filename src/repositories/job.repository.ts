import { db } from "@/lib/firebase";
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    addDoc,
    getDoc,
} from "firebase/firestore";

import type { IJob } from "@/types/JobType";

const jobCollection = collection(db, "jobs");

export const jobRepository = {
    // Get data
    async getAll(): Promise<IJob[]> {
        const snapshot = await getDocs(jobCollection);
        console.log(
            snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            })) as IJob[],
        );

        return snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        })) as IJob[];
    },

    async getById(id: string | number): Promise<IJob | null> {
        const data = await getDoc(doc(jobCollection, String(id)));
        return data.data() as IJob;
        // const applicationRef = doc(db, "jobs", id);
        // const snapshot = await getDoc(applicationRef);
        // if (!snapshot.exists()) {
        // 	return null;
        // }
        // return {
        // 	id: snapshot.id,
        // 	...snapshot.data(),
        // } as IJob;
    },

    // Add data
    async addData(job: Omit<IJob, "id">) {
        const docRef = await addDoc(jobCollection, job);
        console.log(docRef.id);
        return { id: docRef.id, ...job } as IJob;
    },

    // Delete data
    async deleteById(id: string | number) {
        const jobRef = doc(jobCollection, String(id));
        return await deleteDoc(jobRef);
    },

    // Update data
    async updateById(id: string | number, updatedData: Partial<IJob>) {
        const jobRef = doc(jobCollection, String(id));
        return await updateDoc(jobRef, updatedData);
    },
};
