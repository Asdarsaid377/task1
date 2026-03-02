import type { Company, User } from "@/types/UserType";

export const jobsDummy = [
	{
		id: 1,
		title: "Senior Software Engineer",
		companyName: "TechCorp Solutions",
		companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
		location: "San Francisco, CA (Remote)",
		salary: "$140k - $180k",
		type: "Full-time",
		postedAt: "2 hours ago",
	},
	{
		id: 2,
		title: "UI/UX Designer",
		companyName: "Creative Pixel",
		companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=CP",
		location: "Jakarta, ID",
		salary: "Rp 15jt - 25jt",
		type: "Contract",
		postedAt: "5 hours ago",
	},
	{
		id: 3,
		title: "Senior Software Engineer",
		companyName: "TechCorp Solutions",
		companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
		location: "San Francisco, CA (Remote)",
		salary: "$140k - $180k",
		type: "Full-time",
		postedAt: "2 hours ago",
	},
	{
		id: 4,
		title: "UI/UX Designer",
		companyName: "Creative Pixel",
		companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=CP",
		location: "Jakarta, ID",
		salary: "Rp 15jt - 25jt",
		type: "Contract",
		postedAt: "5 hours ago",
	},
	{
		id: 5,
		title: "Senior Software Engineer",
		companyName: "TechCorp Solutions",

		companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
		location: "San Francisco, CA (Remote)",
		salary: "$140k - $180k",
		type: "Full-time",
		postedAt: "2 hours ago",
	},
	{
		id: 6,
		title: "UI/UX Designer",
		companyName: "Creative Pixel",
		companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=CP",
		location: "Jakarta, ID",
		salary: "Rp 15jt - 25jt",
		type: "Contract",
		postedAt: "5 hours ago",
	},
	{
		id: 7,
		title: "Senior Software Engineer",
		companyName: "TechCorp Solutions",
		companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
		location: "San Francisco, CA (Remote)",
		salary: "$140k - $180k",
		type: "Full-time",
		postedAt: "2 hours ago",
	},
	{
		id: 8,
		title: "UI/UX Designer",
		companyName: "Creative Pixel",
		companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=CP",
		location: "Jakarta, ID",
		salary: "Rp 15jt - 25jt",
		type: "Contract",
		postedAt: "5 hours ago",
	},
];

// Data Perusahaan yang sudah terdaftar
export const dummyCompanies: Company[] = [
	{
		id: "comp-101",
		name: "TechCorp Solutions",
		slug: "techcorp-solutions",
		logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
		industry: "Software Development",
		description: "Membangun masa depan digital dengan AI dan Cloud.",
		website: "https://techcorp.example.com",
		address: "Jakarta Selatan, Indonesia",
		verified: true,
		employeeCount: "201-500",
	},
	{
		id: "comp-102",
		name: "Creative Pixel Studio",
		slug: "creative-pixel",
		logo: "https://api.dicebear.com/7.x/initials/svg?seed=CP",
		industry: "Design & Multimedia",
		description: "Agensi desain pemenang penghargaan.",
		website: "https://creativepixel.example.com",
		address: "Bandung, Indonesia",
		verified: false,
		employeeCount: "11-50",
	},
];

// Data User yang sudah login (Mock Auth State)
export const currentUser: User = {
	id: "user-001",
	email: "hr.manager@techcorp.com",
	fullName: "Budi Raharjo",
	role: "employer",
	avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
	companyId: "comp-101", // User ini admin dari TechCorp
};
