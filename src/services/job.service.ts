import { auth } from "@/lib/firebase";
import { jobRepository } from "@/repositories/job.repository";
import type { IJob } from "@/types/JobType";
import { alertService } from "@/components/alert/notif";

export const jobService = {
    async fetchJobs(): Promise<IJob[]> {
        const data = await jobRepository.getAll();
        return data;
    },

    async getJobsId(id: string): Promise<IJob | null> {
        const data = await jobRepository.getById(id);
        return data;
    },

    async addJob(job: Omit<IJob, "createdBy" | "id">) {
        if (!job.title || !job.description || !job.location) {
            throw new Error("Title, description, and location are required");
        }
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error("User not authenticated");
        }
        const jobData = {
            ...job,
            createdBy: currentUser.uid,
        };
        const newJob = await jobRepository.addData(jobData);

        alertService.success("Add Job Successfully", 2000);

        return newJob; // ⬅ sudah ada id dari repository
    },

    async deleteJob(id: string | number) {
        if (!id) throw new Error("Invalid job id");

        const { isConfirmed } = await alertService.confirm(
            "Delete this job?",
            "This action cannot be undone.",
        );

        if (!isConfirmed) return false;

        await jobRepository.deleteById(id);
        alertService.success("Job deleted successfully", 2000);

        return true;
    },

    async updateJob(id: string | number, updatedData: Partial<IJob>) {
        if (!id) throw new Error("Invalid job id");
        if (!updatedData) throw new Error("No data to update");
        const data = await jobRepository.updateById(id, updatedData);
        alertService.success("Job updated successfully", 2000);
        return data;
    },
};
