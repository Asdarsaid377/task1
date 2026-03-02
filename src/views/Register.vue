<script setup lang="ts">
import {
	AiFillEye,
	AiFillEyeInvisible,
	AiFillLock,
	AiOutlineArrowRight,
	AiOutlineMail,
	AiOutlineRight,
} from "vue-icons-plus/ai";
import { BsBuildingFill } from "vue-icons-plus/bs";
import { FiUsers } from "vue-icons-plus/fi";
import { LiaIndustrySolid } from "vue-icons-plus/lia";
import { MdWork } from "vue-icons-plus/md";
import { TbWorldWww } from "vue-icons-plus/tb";
</script>

<template>
	<body
		class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
		<div class="relative flex min-h-screen w-full flex-col">
			<!-- Navigation Header -->
			<header
				class="flex items-center justify-between border-b border-primary/10 bg-white dark:bg-background-dark px-6 md:px-20 py-4 sticky top-0 z-50">
				<div class="flex items-center gap-2 text-primary dark:text-slate-100">
					<div
						class="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
						<span class="material-symbols-outlined text-2xl"><MdWork /></span>
					</div>
					<h2 class="text-xl font-bold tracking-tight">JobSync</h2>
				</div>
			</header>
			<main class="flex-1 flex flex-col items-center py-12 px-4">
				<div
					class="max-w-[640px] w-full bg-white dark:bg-slate-900/50 rounded-xl border border-primary/10 shadow-sm p-8 md:p-12">
					<!-- Progress Indicator -->
					<div class="flex flex-col gap-4 mb-10">
						<div class="flex justify-between items-end">
							<div class="flex flex-col">
								<span
									class="text-primary font-bold text-xs uppercase tracking-widest"
									>Step 1 of 2</span
								>
								<h1 class="text-3xl font-black tracking-tight mt-1">
									Register Your Company
								</h1>
							</div>
							<span class="text-primary font-bold text-lg">50%</span>
						</div>
						<div class="w-full h-2 bg-primary/10 rounded-full overflow-hidden">
							<div
								class="h-full bg-primary rounded-full transition-all duration-500"
								style="width: 50%"></div>
						</div>
						<p
							class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
							Join JobSync's network of top-tier employers. Tell us a bit about
							your business to get started.
						</p>
					</div>
					<!-- Registration Form -->
					<form class="space-y-6">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<!-- Company Name -->
							<div class="flex flex-col gap-2">
								<label
									class="text-sm font-semibold text-slate-700 dark:text-slate-200"
									for="company-name"
									>Company Name</label
								>
								<div class="relative">
									<span
										class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
										><BsBuildingFill
									/></span>
									<input
										class="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
										id="company-name"
										placeholder="e.g. Acme Corp"
										type="text" />
								</div>
							</div>
							<!-- Business Email -->
							<div class="flex flex-col gap-2">
								<label
									class="text-sm font-semibold text-slate-700 dark:text-slate-200"
									for="email"
									>Business Email</label
								>
								<div class="relative">
									<span
										class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
										><AiOutlineMail
									/></span>
									<input
										class="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
										id="email"
										placeholder="name@company.com"
										type="email" />
								</div>
							</div>
							<!-- Industry -->
							<div class="flex flex-col gap-2">
								<label
									class="text-sm font-semibold text-slate-700 dark:text-slate-200"
									for="industry"
									>Industry</label
								>
								<div class="relative">
									<span
										class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
										><LiaIndustrySolid
									/></span>
									<select
										class="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
										id="industry">
										<option value="">Select Industry</option>
										<option>Technology</option>
										<option>Finance</option>
										<option>Healthcare</option>
										<option>Education</option>
										<option>Marketing</option>
									</select>
								</div>
							</div>
							<!-- Company Size -->
							<div class="flex flex-col gap-2">
								<label
									class="text-sm font-semibold text-slate-700 dark:text-slate-200"
									for="size"
									>Company Size</label
								>
								<div class="relative">
									<span
										class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
										><FiUsers
									/></span>
									<select
										class="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
										id="size">
										<option value="">Select Size</option>
										<option>1-10 employees</option>
										<option>11-50 employees</option>
										<option>51-200 employees</option>
										<option>201-500 employees</option>
										<option>500+ employees</option>
									</select>
								</div>
							</div>
							<!-- Website URL -->
							<div class="flex flex-col gap-2 md:col-span-2">
								<label
									class="text-sm font-semibold text-slate-700 dark:text-slate-200"
									for="url"
									>Website URL</label
								>
								<div class="relative">
									<span
										class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl"
										><TbWorldWww
									/></span>
									<input
										class="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
										id="url"
										placeholder="https://www.company.com"
										type="url" />
								</div>
							</div>
							<!-- Password -->
							<div class="flex flex-col gap-2 md:col-span-2">
								<label
									class="text-sm font-semibold text-slate-700 dark:text-slate-200"
									for="password"
									>Create Password</label
								>
								<div class="relative">
									<span
										class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
										<AiFillLock />
									</span>
									<input
										class="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
										id="password"
										placeholder="••••••••"
										type="password" />
									<button
										class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
										type="button">
										<span class="material-symbols-outlined text-xl">
											<AiFillEye />
											<AiFillEyeInvisible />
										</span>
									</button>
								</div>
								<p class="text-xs text-slate-400 mt-1">
									Must be at least 8 characters with a mix of letters and
									numbers.
								</p>
							</div>
						</div>
						<div class="flex items-center gap-2 py-2">
							<input
								class="rounded border-slate-300 text-primary focus:ring-primary"
								id="terms"
								type="checkbox" />
							<label class="text-sm text-slate-500" for="terms"
								>I agree to the
								<a class="text-primary font-medium hover:underline" href="#"
									>Terms of Service</a
								>
								and
								<a class="text-primary font-medium hover:underline" href="#"
									>Privacy Policy</a
								>.</label
							>
						</div>
						<div class="pt-4">
							<button
								class="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
								type="submit">
								Register Company
								<span class="material-symbols-outlined">
									<AiOutlineArrowRight />
								</span>
							</button>
						</div>
					</form>
				</div>
				<!-- Trust Badges / Footer Info -->
				<div class="mt-12 text-center max-w-2xl px-4">
					<p
						class="text-sm text-slate-500 mb-6 uppercase tracking-widest font-semibold">
						Trusted by industry leaders
					</p>
					<div
						class="flex flex-wrap justify-center gap-8 opacity-40 grayscale contrast-125">
						<div class="h-8 flex items-center font-black text-xl italic">
							TECHCORP
						</div>
						<div class="h-8 flex items-center font-black text-xl italic">
							GLOBALFLOW
						</div>
						<div class="h-8 flex items-center font-black text-xl italic">
							NEXTGEN
						</div>
						<div class="h-8 flex items-center font-black text-xl italic">
							INNOVATE
						</div>
					</div>
					<div
						class="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row justify-between items-center gap-4">
						<p>© 2024 JobSync Solutions Inc. All rights reserved.</p>
						<div class="flex gap-4">
							<a class="hover:text-primary transition-colors" href="#"
								>Help Center</a
							>
							<a class="hover:text-primary transition-colors" href="#"
								>Privacy</a
							>
							<a class="hover:text-primary transition-colors" href="#">Terms</a>
						</div>
					</div>
				</div>
			</main>
		</div>
	</body>
</template>
