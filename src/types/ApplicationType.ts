export type ApplicationStatus =
    | "pending"
    | "accepted"
    | "rejected"
    | "interview"
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
    coverLetter: string;
    status: ApplicationStatus;
    appliedAt: Date;
    updatedAt: Date;
};
