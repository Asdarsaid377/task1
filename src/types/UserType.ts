// Role untuk membatasi akses
export type UserRole = "employer" | "admin" | "candidate";

// Data Dasar User (Akun Login)
export interface User {
	id: string;
	email: string;
	fullName: string;
	role: UserRole;
	avatarUrl?: string;
	companyId?: string; // Terhubung ke perusahaan jika role-nya 'employer'
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
