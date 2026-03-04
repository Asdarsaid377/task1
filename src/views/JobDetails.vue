<script setup lang="ts">
import Footer from "@/components/shared/Footer.vue";
import Navbar from "@/components/shared/Navbar.vue";
import SharedJob from "@/components/shared/SharedJob.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { dummyJobs } from "@/common/dummyData";
import { AiFillSchedule, AiOutlineShareAlt } from "vue-icons-plus/ai";
import { BiMoneyWithdraw } from "vue-icons-plus/bi";
import { EpLocation } from "vue-icons-plus/ep";
import { IpUploadLogs } from "vue-icons-plus/ip";
import { TbWorldWww } from "vue-icons-plus/tb";
import { useAuth } from "@/lib/authfirebase";

const route = useRoute();
const { user, isLoading } = useAuth();
const isLoggedIn = computed(() => !!user.value);

const isShareOpen = ref(false);
const openShare = () => (isShareOpen.value = true);

const slugify = (text: string) => {
	return text
		.toLowerCase()
		.replace(/\s+/g, "-")
		.replace(/[^\w-]+/g, "")
		.replace(/--+/g, "-")
		.trim();
};

const slugParam = computed(() => route.params.slug as string);

const job = computed(() => {
	return dummyJobs.find((j) => {
		const generatedSlug = `${slugify(j.title)}-${j.id}`;
		return generatedSlug === slugParam.value;
	});
});
</script>
<template>
	<Navbar />
	<main class="flex-1 bg-white flex justify-center py-10 px-4 md:px-10">
		<div class="layout-content-container flex flex-col max-w-7xl flex-1 gap-8">
			<div
				class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
				<div class="flex flex-wrap justify-between items-start gap-4 mb-6">
					<div class="flex flex-col gap-2">
						<div
							class="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
							<!-- <span class="material-symbols-outlined text-sm">apartment</span> -->
							<span>CWF</span>
						</div>
						<h1
							class="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-black leading-tight tracking-tight">
							{{ job?.title }}
						</h1>

						<div
							class="flex flex-wrap items-center gap-4 text-slate-500 dark:text-slate-400 text-sm md:text-base">
							<div class="flex items-center gap-1">
								<span class="material-symbols-outlined text-lg"
									><EpLocation
								/></span>
								<span>Remote</span>
							</div>
							<div class="flex items-center gap-1">
								<span class="material-symbols-outlined text-lg"
									><AiFillSchedule
								/></span>
								<span>Full-time</span>
							</div>
							<div class="flex items-center gap-1">
								<span class="material-symbols-outlined text-lg">
									<BiMoneyWithdraw />
								</span>
								<span>
									Rp. {{ job?.salaryMin }} - Rp. {{ job?.salaryMax }}</span
								>
							</div>
						</div>
					</div>
					<button
						@click="openShare"
						class="bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/20 transition-all">
						<AiOutlineShareAlt />
						Share Job
					</button>

					<SharedJob
						v-model="isShareOpen"
						:url="`https://cwf.com/details/${slugParam}`"
						title="Frontend Developer Needed" />
					<!-- <button
						class="bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/20 transition-all">
						<span class="material-symbols-outlined"><AiOutlineShareAlt /></span>
						Share Job
					</button> -->
				</div>
				<div class="border-t border-slate-100 dark:border-slate-800 pt-6">
					<h2
						class="text-slate-900 dark:text-slate-100 text-xl font-bold leading-tight mb-4">
						Job Description
					</h2>
					<div
						class="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
						<p>
							We are looking for a passionate Senior Product Designer to join
							our team. You will be responsible for creating beautiful and
							intuitive user experiences for our core platform, shaping the
							future of how people find and manage their professional
							opportunities.
						</p>
						<p>
							As a key member of our design team, you'll collaborate closely
							with engineers, product managers, and stakeholders to translate
							complex requirements into elegant, simple solutions. We value
							designers who are systems-thinkers and have a keen eye for visual
							craft.
						</p>
						<h3 class="text-slate-900 dark:text-slate-100 font-bold mt-6 mb-2">
							Key Responsibilities
						</h3>
						<ul class="list-disc pl-5 space-y-2">
							<li>
								Lead design initiatives from discovery through to final
								hand-off.
							</li>
							<li>
								Create high-fidelity prototypes and design specifications.
							</li>
							<li>Maintain and contribute to our global design system.</li>
							<li>
								Conduct user research and usability testing to validate design
								decisions.
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div
				v-if="isLoggedIn"
				class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
				<div class="mb-8">
					<h2
						class="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight mb-2">
						Apply for this position
					</h2>
					<p class="text-slate-500 dark:text-slate-400">
						Complete the form below to submit your application. We'll review
						your profile and get back to you within 3-5 business days.
					</p>
				</div>
				<form class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="flex flex-col gap-2">
						<label
							class="text-sm font-semibold text-slate-700 dark:text-slate-300"
							>Full Name</label
						>
						<input
							class="w-full border p-2 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
							placeholder="John Doe"
							type="text" />
					</div>
					<div class="flex flex-col gap-2">
						<label
							class="text-sm font-semibold text-slate-700 dark:text-slate-300"
							>Email Address</label
						>
						<input
							class="w-full border p-2 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
							placeholder="john@example.com"
							type="email" />
					</div>
					<div class="flex flex-col gap-2 md:col-span-2">
						<label
							class="text-sm font-semibold text-slate-700 dark:text-slate-300"
							>Resume / CV</label
						>
						<div
							class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
							<span class="material-symbols-outlined text-4xl text-slate-400"
								><IpUploadLogs
							/></span>
							<div class="text-center">
								<p class="text-slate-900 dark:text-slate-100 font-medium">
									Click to upload or drag and drop
								</p>
								<p class="text-slate-500 dark:text-slate-400 text-xs">
									PDF, DOCX up to 10MB
								</p>
							</div>
						</div>
					</div>
					<div class="flex flex-col gap-2 md:col-span-2">
						<label
							class="text-sm font-semibold text-slate-700 dark:text-slate-300"
							>Portfolio Link</label
						>
						<div class="relative">
							<span
								class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
								><TbWorldWww />
							</span>
							<input
								class="w-full pl-10 border p-2 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
								placeholder="https://portfolio.com"
								type="url" />
						</div>
					</div>
					<div class="flex flex-col gap-2 md:col-span-2">
						<label
							class="text-sm font-semibold text-slate-700 dark:text-slate-300"
							>Additional Information (Optional)</label
						>
						<textarea
							class="w-full border p-2 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
							placeholder="Tell us why you are a great fit..."
							rows="4"></textarea>
					</div>
					<div class="md:col-span-2 flex items-center gap-3 py-2">
						<input
							class="rounded text-primary focus:ring-primary h-5 w-5"
							id="consent"
							type="checkbox" />
						<label
							class="text-sm text-slate-600 dark:text-slate-400"
							for="consent"
							>I agree to the processing of my personal data for recruitment
							purposes.</label
						>
					</div>
					<div class="md:col-span-2 pt-4">
						<button
							class="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20"
							type="submit">
							Submit Application
						</button>
					</div>
				</form>
			</div>
			<div
				v-else
				class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 text-center">
				<h2
					class="text-slate-900 dark:text-slate-100 text-2xl font-bold leading-tight mb-2">
					Please log in to apply for this job
				</h2>
				<p class="text-slate-500 dark:text-slate-400 mb-6">
					You need to be logged in to submit your application. Please Sign in to
					continue.
				</p>
				<router-link
					to="/register"
					class="inline-block px-6 py-3 bg-primary text-white rounded-lg font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
					Sign In
				</router-link>
			</div>
		</div>
	</main>
	<Footer />
</template>
