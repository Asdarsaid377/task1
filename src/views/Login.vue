<script setup lang="ts">
import { reactive } from "vue";
import { AiOutlineEye, AiOutlineEyeInvisible } from "vue-icons-plus/ai";
import { MdWork } from "vue-icons-plus/md";
import { useRouter } from "vue-router";
const router = useRouter();

const form = reactive({
	email: "",
	password: "",
	remember_me: false,
});

const seePassword = reactive({
	visible: false,
});

const submit = async () => {
	if (form.email == "admin@jobsync.com" && form.password == "admin123") {
		router.push("/dashboard");
	}
};
</script>

<template>
	<body
		class="bg-background-light dark:bg-background-dark font-display antialiased">
		<div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
			<div class="layout-container flex h-full grow flex-col">
				<!-- Top Navigation Bar -->
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
				<main class="flex-1 flex items-center justify-center p-6">
					<div class="w-full max-w-[480px] space-y-8">
						<!-- Welcome Header -->
						<div class="flex flex-col gap-2">
							<h1
								class="text-slate-900 dark:text-slate-100 text-4xl font-black leading-tight tracking-[-0.033em]">
								Welcome Back
							</h1>
							<p
								class="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
								Log in to manage your hiring process and candidates.
							</p>
						</div>
						<!-- Login Form Card -->
						<div
							class="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
							<form
								action="#"
								class="space-y-6"
								method="POST"
								@submit.prevent="submit">
								<!-- Email Input -->
								<div class="flex flex-col gap-2">
									<label
										class="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal"
										for="email"
										>Email Address</label
									>
									<input
										class="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 p-4 text-base font-normal transition-all"
										id="email"
										placeholder="e.g. hr@company.com"
										required="true"
										v-model="form.email"
										type="email" />
								</div>
								<!-- Password Input -->
								<div class="flex flex-col gap-2">
									<div class="flex items-center justify-between">
										<label
											class="text-slate-900 dark:text-slate-100 text-sm font-semibold leading-normal"
											for="password"
											>Password</label
										>
										<a
											class="text-primary text-sm font-semibold hover:underline"
											href="#"
											>Forgot password?</a
										>
									</div>
									<div class="relative flex w-full items-stretch">
										<input
											class="form-input flex w-full rounded-lg text-slate-900 dark:text-slate-100 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 h-12 placeholder:text-slate-400 p-4 pr-12 text-base font-normal transition-all"
											id="password"
											placeholder="Enter your password"
											required="true"
											v-model="form.password"
											:type="seePassword.visible ? 'text' : 'password'" />
										<button
											class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
											type="button"
											@click="seePassword.visible = !seePassword.visible">
											<AiOutlineEye
												v-if="seePassword.visible"
												class="text-slate-400 hover:text-slate-600" />
											<AiOutlineEyeInvisible
												v-else
												class="text-slate-400 hover:text-slate-600" />
										</button>
									</div>
								</div>
								<!-- Remember Me Checkbox -->
								<div class="flex items-center">
									<label class="flex items-center gap-3 cursor-pointer group">
										<input
											class="h-5 w-5 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary focus:ring-offset-0 bg-transparent"
											type="checkbox" />
										<span
											class="text-slate-600 dark:text-slate-400 text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors"
											>Remember this device</span
										>
									</label>
								</div>
								<!-- Submit Button -->
								<button
									class="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all shadow-md active:scale-[0.98]"
									type="submit">
									Sign In
								</button>
							</form>
						</div>
						<!-- Footer Registration Link -->
						<p class="text-center text-slate-500 dark:text-slate-400 text-sm">
							New to JobSync? Register your companydsa
							<a
								class="text-primary font-semibold hover:underline"
								href="/register">
								Create an account</a
							>.
						</p>
					</div>
				</main>
				<!-- Footer Small -->
				<footer class="p-6 text-center">
					<p
						class="text-slate-400 text-xs font-medium uppercase tracking-widest">
						© 2024 JobSync Inc. All rights reserved.
					</p>
				</footer>
			</div>
		</div>
	</body>
</template>
