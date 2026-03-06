import { applicationRepository } from "@/repositories/applications.repository";
import { jobRepository } from "@/repositories/job.repository";
import { userRepository } from "@/repositories/user.repository";

import type { GetApplication, IApplication } from "@/types/ApplicationType";

export const applicationService = {
	async fetchApplicationsWithJob(): Promise<GetApplication[]> {
		const apps = await applicationRepository.getAll();
		const results = await Promise.all(
			apps.map(async (app) => {
				const job = await jobRepository.getById(app.jobId);
				const user = await userRepository.getByUid(app.candidateId);
				if (!job || !user) return null;
				return {
					...app,
					job,
					user,
				};
			}),
		);
		return results.filter((res): res is GetApplication => res !== null);
	},

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
		if (!application.candidateId || !application.jobId || !application.status) {
			throw new Error("Candidate ID, Job ID, and status are required");
		}
		const data = await applicationRepository.addData(application);
		console.log(data);
		return data;
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
