// Role untuk membatasi akses

// Data Dasar User (Akun Login)
export type UserRole = "admin" | "candidate";

export type IUser = {
    id: string; // uid
    uid: string; // uid
    email: string;
    name: string;
    displayName: string;
    role: UserRole;
    createdAt: Date;
    photoURL?: string;
};

// Data Profil Perusahaan
export type Company = {
    id: string;
    name: string;
    slug: string; // Untuk URL seperti /company/techcorp-solutions
    logo: string;
    industry: string;
    description: string;
    website: string;
    address: string;
    verified: boolean;
    employeeCount: "1-10" | "11-50" | "51-200" | "201-500" | "500+";
};

// Type untuk Form Registrasi (Payload)
export type RegisterCompanyPayload = {
    // Akun User
    adminName: string;
    email: string;
    password: string;

    // Data Perusahaan
    companyName: string;
    businessRegistrationNumber: string; // NIB / UEN / Tax ID
    industry: string;
};
