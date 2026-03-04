import { jobRepository } from "@/repositories/job.repository";

import type { IJob } from "@/types/JobType";

export const jobService = {
    async fetchJobs(): Promise<IJob[]> {
        return await jobRepository.getAll();
    },

    async addJob(job: Omit<IJob, "id">) {
        if (!job.title || !job.description || !job.location) {
            throw new Error("Title, description, and location are required");
        }
        return await jobRepository.addData(job);
    },

    async deleteJob(id: string | number) {
        if (!id) throw new Error("Invalid job id");
        return await jobRepository.deleteById(id);
    },

    async updateJob(id: string | number, updatedData: Partial<IJob>) {
        if (!id) throw new Error("Invalid job id");
        return await jobRepository.updateById(id, updatedData);
    },
};
