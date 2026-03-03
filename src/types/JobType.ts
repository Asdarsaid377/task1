export type JobType = "full-time" | "part-time" | "contract";

export interface IJob {
	id: string;
	title: string;
	description: string;
	location: string;
	salaryMin: number;
	salaryMax: number;
	jobType: JobType;
	companyLogo: string;
	companyName: string;
	createdBy: string; // uid HRD
	createdAt: Date;
}
