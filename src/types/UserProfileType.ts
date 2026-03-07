// Role untuk membatasi akses

export type IUserProfile = {
    id?: string; // uid
    fullName: string;
    phoneNumber: string;
    portofolio: string;
    createdAt: Date;
    userId: string;
    email: string;
};
