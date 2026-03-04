import { applicationRepository } from "@/repositories/applications.repository";

import type { IApplication } from "@/types/ApplicationType";

export const applicationService = {
    async fetchApplications(): Promise<IApplication[]> {
        return await applicationRepository.getAll();
    },
    async fetchApplicationsByCandidateId(
        candidateId: string,
    ): Promise<IApplication[]> {
        return await applicationRepository.getByCandidateId(candidateId);
    },
    async fetchApplicationsByJobId(jobId: string): Promise<IApplication[]> {
        return await applicationRepository.getByJobId(jobId);
    },
    async addApplication(application: Omit<IApplication, "id">) {
        if (
            !application.candidateId ||
            !application.jobId ||
            !application.status
        ) {
            throw new Error("Candidate ID, Job ID, and status are required");
        }
        return await applicationRepository.addData(application);
    },
    async deleteApplication(id: string | number) {
        if (!id) throw new Error("Invalid application id");
        return await applicationRepository.deleteById(id);
    },
    async updateApplication(
        id: string | number,
        updatedData: Partial<IApplication>,
    ) {
        if (!id) throw new Error("Invalid application id");
        return await applicationRepository.updateById(id, updatedData);
    },
};
