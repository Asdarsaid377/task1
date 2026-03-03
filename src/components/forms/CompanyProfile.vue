<script setup lang="ts">
import {
	AiFillEdit,
	AiFillInfoCircle,
	AiFillLinkedin,
	AiOutlineMail,
} from "vue-icons-plus/ai";
import { BsFillCameraFill, BsFillShareFill } from "vue-icons-plus/bs";
import { Fa6LocationCrosshairs  } from "vue-icons-plus/fa6";
import { FiPhoneCall } from "vue-icons-plus/fi";
import { MdOutlineCorporateFare } from "vue-icons-plus/md";
import { TbWorldWww } from "vue-icons-plus/tb";
</script>

<template>
	<main class="flex-1 overflow-y-auto">
		<div class="p-6 space-y-8">
			<div class="mb-8">
				<h1
					class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
					Company Profile
				</h1>
				<p class="text-slate-500 mt-2">
					Update your company information and how it appears to candidates.
				</p>
			</div>
			<div class="grid grid-cols-1 xl:grid-cols-3 gap-8">
				<div class="col-span-2 space-y-8">
					<section
						class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
						<h2 class="text-lg font-bold mb-6 flex items-center gap-2">
							<span class="material-symbols-outlined text-primary"
								><AiFillInfoCircle
							/></span>
							Basic Info
						</h2>
						<div class="space-y-6">
							<div
								class="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
								<div class="relative group">
									<div
										class="size-24 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center overflow-hidden">
										<img
											class="w-full h-full object-cover hidden"
											data-alt="Company logo upload preview"
											src="https://lh3.googleusercontent.com/aida-public/AB6AXuChAMkZ2CS9RXynCNpByeE7CQOwKQyyO1zho7Amqf9V85-G0hTC0O5im3BKOwr1rxeIZ1GStLoyBKkf91mLRqXiqyh7j9yrj3LyoqRWdhzhCSbj94seI711Q63PDlwLzwQM-h8fw9IghlbRq9OLhnVxbx3ewxIRDUODn1Niui_DWMYfeXK7WAYrCaQl2R0zWheUv3XGndTJ20TcSM4o_NYKDL5faXN-vN3D9ystdR-GUpK8eNYnk5DX9AbcfHrs65JXjL7bEsnmpZQ" />
										<span
											class="material-symbols-outlined text-slate-400 text-3xl"
											><BsFillCameraFill
										/></span>
									</div>
									<button
										class="absolute -bottom-2 -right-2 size-8 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
										<span class="material-symbols-outlined text-sm"
											><AiFillEdit
										/></span>
									</button>
								</div>
								<div>
									<p class="font-semibold text-slate-900 dark:text-white">
										Company Logo
									</p>
									<p class="text-sm text-slate-500 mt-1">
										PNG, JPG or SVG. Recommended size 400x400px.
									</p>
									<div class="flex gap-2 mt-3">
										<button
											class="text-xs font-bold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200">
											Upload New
										</button>
										<button
											class="text-xs font-bold px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg">
											Remove
										</button>
									</div>
								</div>
							</div>
							<div class="grid grid-cols-1 gap-4">
								<div class="flex flex-col gap-1.5">
									<label
										class="text-sm font-bold text-slate-700 dark:text-slate-300"
										>Company Name</label
									>
									<input
										class="w-full p-3 rounded-lg border-slate-200 border dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm"
										type="text"
										value="Cwf Analytics" />
								</div>
								<div class="flex flex-col gap-1.5">
									<label
										class="text-sm font-bold text-slate-700 dark:text-slate-300"
										>Bio / About Us</label
									>
									<textarea
										class="w-full rounded-lg p-3 border-slate-200 border dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm"
										rows="4">
We are a leading data analytics firm specializing in workforce optimization and recruitment technology solutions for the modern era.</textarea
									>
									<p class="text-[10px] text-slate-400 text-right">
										0 / 500 characters
									</p>
								</div>
							</div>
						</div>
					</section>
					<section
						class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 border dark:border-slate-800 p-6">
						<h2 class="text-lg font-bold mb-6 flex items-center gap-2">
							<span class="material-symbols-outlined text-primary"
								><AiOutlineMail
							/></span>
							Contact Info
						</h2>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div class="flex flex-col gap-1.5 md:col-span-2">
								<label
									class="text-sm font-bold text-slate-700 dark:text-slate-300"
									>Office Address</label
								>
								<div class="relative">
									<span
										class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl"
										><Fa6LocationCrosshairs 
									/></span>
									<input
										class="w-full pl-10 p-3 rounded-lg border-slate-200 border dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm"
										placeholder="123 Tech Plaza, San Francisco, CA"
										type="text" />
								</div>
							</div>
							<div class="flex flex-col gap-1.5">
								<label
									class="text-sm font-bold text-slate-700 dark:text-slate-300"
									>Phone Number</label
								>
								<div class="relative">
									<span
										class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl"
										><FiPhoneCall
									/></span>
									<input
										class="w-full pl-10 p-3 rounded-lg border-slate-200 border dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm"
										placeholder="+1 (555) 000-0000"
										type="tel" />
								</div>
							</div>
							<div class="flex flex-col gap-1.5">
								<label
									class="text-sm font-bold text-slate-700 dark:text-slate-300"
									>Website</label
								>
								<div class="relative">
									<span
										class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-xl"
										><TbWorldWww
									/></span>
									<input
										class="w-full pl-10 p-3 rounded-lg border-slate-200 border dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm"
										placeholder="https://www.jobsync.com"
										type="url" />
								</div>
							</div>
						</div>
					</section>
					<section
						class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 border dark:border-slate-800 p-6">
						<h2 class="text-lg font-bold mb-6 flex items-center gap-2">
							<span class="material-symbols-outlined text-primary"
								><BsFillShareFill
							/></span>
							Social Links
						</h2>
						<div class="space-y-4">
							<div class="flex items-center gap-4">
								<div
									class="size-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
									<span class="material-symbols-outlined text-primary"
										><AiFillLinkedin
									/></span>
								</div>
								<input
									class="flex-1 rounded-lg p-3 border-slate-200 border dark:border-slate-700 dark:bg-slate-800 focus:border-primary focus:ring-primary text-sm"
									placeholder="LinkedIn URL"
									type="text" />
							</div>
						</div>
					</section>
					<div class="flex justify-end gap-3 pb-10">
						<button
							class="px-6 py-2.5 rounded-lg border border-slate-200 border dark:border-slate-700 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
							Discard Changes
						</button>
						<button
							class="px-8 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-md hover:opacity-90 transition-opacity">
							Save Profile
						</button>
					</div>
				</div>
				<div class="xl:col-span-1">
					<div class="sticky top-24">
						<p
							class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-1">
							Applicant Preview
						</p>
						<div
							class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 border dark:border-slate-800 overflow-hidden shadow-sm">
							<div class="h-24 bg-primary relative">
								<div
									class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"
									data-alt="Abstract geometric blue pattern bg"></div>
							</div>
							<div class="px-5 pb-6">
								<div class="relative -mt-10 mb-4">
									<div
										class="size-20 rounded-xl bg-white dark:bg-slate-900 p-1 shadow-md border border-slate-100 dark:border-slate-800">
										<div
											class="w-full h-full rounded-lg bg-primary/10 flex items-center justify-center">
											<span
												class="material-symbols-outlined text-primary text-3xl"
												><MdOutlineCorporateFare
											/></span>
										</div>
									</div>
								</div>
								<h3 class="text-xl font-bold text-slate-900 dark:text-white">
									JobSync Analytics
								</h3>
								<p
									class="text-xs text-primary font-bold mt-1 uppercase tracking-tight">
									Software &amp; Data
								</p>
								<p
									class="text-sm text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
									We are a leading data analytics firm specializing in workforce
									optimization and recruitment technology...
								</p>
								<div class="mt-6 space-y-3">
									<div
										class="flex items-center gap-3 text-slate-500 dark:text-slate-400">
										<span class="material-symbols-outlined text-lg"
											><Fa6LocationCrosshairs 
										/></span>
										<span class="text-xs">San Francisco, CA</span>
									</div>
									<div
										class="flex items-center gap-3 text-slate-500 dark:text-slate-400">
										<span class="material-symbols-outlined text-lg"
											><AiFillLinkedin
										/></span>
										<span
											class="text-xs text-primary hover:underline cursor-pointer"
											>jobsync.com</span
										>
									</div>
								</div>
								<div
									class="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
									<button
										class="w-full py-2.5 bg-primary/10 text-primary font-bold text-sm rounded-lg hover:bg-primary/20 transition-colors">
										View 12 Openings
									</button>
								</div>
							</div>
						</div>
						<div
							class="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-primary/10 border border-blue-100 dark:border-primary/20">
							<div class="flex gap-3">
								<span
									class="material-symbols-outlined text-blue-600 dark:text-primary"
									>visibility</span
								>
								<p
									class="text-xs text-blue-800 dark:text-slate-300 leading-normal">
									This is how your company card appears to candidates in search
									results.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
