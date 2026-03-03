export type ApplicationStatus =
	| "pending"
	| "accepted"
	| "rejected"
	| "interview"
	| "offer"
	| "withdrawn";

export interface IApplication {
	id: string;
	jobId: string;
	applicantId: string;
	status: ApplicationStatus;
	appliedAt: Date;
}
