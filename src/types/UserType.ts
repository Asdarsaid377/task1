// Role untuk membatasi akses

// Data Dasar User (Akun Login)
export type UserRole = "hrd" | "applicant";

export interface IUser {
	id: string; // uid
	email: string;
	name: string;
	role: UserRole;
	createdAt: Date;
}

// Data Profil Perusahaan
export interface Company {
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
}

// Type untuk Form Registrasi (Payload)
export interface RegisterCompanyPayload {
	// Akun User
	adminName: string;
	email: string;
	password: string;

	// Data Perusahaan
	companyName: string;
	businessRegistrationNumber: string; // NIB / UEN / Tax ID
	industry: string;
}
