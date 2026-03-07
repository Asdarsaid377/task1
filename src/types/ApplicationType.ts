import type { IJob } from "./JobType";
import type { IUser } from "./UserType";

export type ApplicationStatus =
    | "pending"
    | "reviewed"
    | "interviewed"
    | "accepted"
    | "rejected"
    | "offer"
    | "withdrawn";

export type IApplication = {
    id: string;
    jobId: string;
    // applicantId: string;
    candidateId: string; // uid kandidat
    candidateName: string;
    candidateEmail: string;
    resumeUrl: string;
    resumeFile?: File | null;
    coverLetter: string;
    status: ApplicationStatus;
    appliedAt: Date;
    updatedAt: Date;
    portfolio?: string;
    additionalInfo?: string;
    noWhatsapp?: string;
    createdAt?: Date;
};

export type GetApplication = {
    id: string;
    jobId: string;
    // applicantId: string;
    candidateId: string; // uid kandidat
    candidateName: string;
    candidateEmail: string;
    resumeUrl: string;
    resumeFile?: File | null;
    coverLetter: string;
    status: ApplicationStatus;
    appliedAt: Date;
    updatedAt: Date;
    portfolio?: string;
    additionalInfo?: string;
    noWhatsapp?: string;
    user: IUser;
    job: IJob;
};
