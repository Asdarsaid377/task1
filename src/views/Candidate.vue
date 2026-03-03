<script setup lang="ts">
import { AiOutlineSearch } from "vue-icons-plus/ai";
</script>

<template>
	<main class="flex-1 p-6 overflow-y-auto">
		<!-- Page Header -->
		<div
			class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
			<div>
				<h1
					class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
					Applicant Tracking
				</h1>
				<p class="text-slate-500 text-base mt-1">
					Manage and track candidate progress across 12 active roles.
				</p>
			</div>
			<!-- <button
				class="bg-primary text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors">
				<span class="material-symbols-outlined text-xl">person_add</span>
				Add Candidate
			</button> -->
		</div>
		<!-- Filters Section -->
		<div
			class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center mb-6">
			<div class="flex-1 min-w-[200px]">
				<label class="text-xs font-bold text-slate-400 uppercase mb-1 block"
					>Search</label
				>
				<div class="relative">
					<span
						class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg"
						><AiOutlineSearch
					/></span>
					<input
						class="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm"
						placeholder="Name or email..."
						type="text" />
				</div>
			</div>
			<div class="w-full md:w-48">
				<label class="text-xs font-bold text-slate-400 uppercase mb-1 block"
					>Job Role</label
				>
				<select
					class="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-700 dark:text-slate-300">
					<option>All Roles</option>
					<option>Senior Developer</option>
					<option>Product Designer</option>
					<option>Marketing Lead</option>
				</select>
			</div>
			<div class="w-full md:w-48">
				<label class="text-xs font-bold text-slate-400 uppercase mb-1 block"
					>Status</label
				>
				<select
					class="w-full py-2 px-3 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-700 dark:text-slate-300">
					<option>All Statuses</option>
					<option>New</option>
					<option>Interview</option>
					<option>Hired</option>
					<option>Rejected</option>
				</select>
			</div>
			<div class="flex items-end self-end h-full">
				<button
					class="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium px-2 py-2">
					<span class="material-symbols-outlined text-lg">filter_list</span>
					More Filters
				</button>
			</div>
		</div>
		<!-- Candidates Table -->
		<div
			class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
			<div class="overflow-x-auto">
				<table class="w-full text-left border-collapse">
					<thead>
						<tr
							class="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
							<th
								class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
								Candidate
							</th>
							<th
								class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
								Applied Role
							</th>
							<th
								class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
								Status
							</th>
							<th
								class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
								Applied Date
							</th>
							<th
								class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
								Actions
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-slate-100 dark:divide-slate-800">
						<!-- Candidate Row 1 -->
						<tr
							class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
							<td class="px-6 py-4">
								<div class="flex items-center gap-3">
									<div
										class="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
										<img
											class="w-full h-full object-cover"
											data-alt="Candidate profile picture"
											src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvGlEqm4OjXDhYnLHSnYsovRe_ff8cAbs8Q_WMUlWbcyiiPnNB5dTpSnv1XQNur-u11Ee3PsbP-XYqlVtjeCH5NM1rC7acH3wqm3jvIC59M8_BaUJ5j4YJ5eGSeWvD7qEPUDXxgKrRHXX9zSdOtILYU-LaBXJ5N1XoXoOkkOMUbfmmzUAkxJploEhSFm9LS6IwkClf7YJrxy43FNa2HvbznPD1IyTCY0474MttOlmu2o4PV6O2EqmxQV9Y5sFBrYDLwcziECk_7Ws" />
									</div>
									<div>
										<p class="font-semibold text-slate-900 dark:text-white">
											Alex Johnson
										</p>
										<p class="text-xs text-slate-500">alex.j@example.com</p>
									</div>
								</div>
							</td>
							<td class="px-6 py-4">
								<p
									class="text-sm font-medium text-slate-700 dark:text-slate-300">
									Senior React Developer
								</p>
								<p class="text-xs text-slate-400 italic">Engineering</p>
							</td>
							<td class="px-6 py-4">
								<span
									class="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
									>Interview</span
								>
							</td>
							<td class="px-6 py-4 text-sm text-slate-500">Oct 24, 2023</td>
							<td class="px-6 py-4">
								<div class="flex items-center justify-end gap-2">
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="Message">
										<span class="material-symbols-outlined text-xl">mail</span>
									</button>
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="View Profile">
										<span class="material-symbols-outlined text-xl"
											>visibility</span
										>
									</button>
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="More Actions">
										<span class="material-symbols-outlined text-xl"
											>more_vert</span
										>
									</button>
								</div>
							</td>
						</tr>
						<!-- Candidate Row 2 -->
						<tr
							class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
							<td class="px-6 py-4">
								<div class="flex items-center gap-3">
									<div
										class="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
										<img
											class="w-full h-full object-cover"
											data-alt="Candidate profile picture"
											src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6jmlW8U1GqOvfwkeugmgvJkKIgQT2ksnn5cBFpb68u7qU1nII-lyT8OTMAXchpUlfBWMU3Te4a_1SwuEZapyJcZ3YKArItqz5lwgMjgWtDRBFVQKcrIWf7jQebtlJBHJ-WI68GnatqQ2XVrkizuOTFKpTUMFPmEzuuAxTRoabUCSAW7jBqqtGSh62WbF5f5eUWr0pNrAcZMvXnRddElGIdSH6FGlEafsaHW8zahGhIHfRXwOOUqYYWcHCGqCqZv4EHOVOG1UdE9M" />
									</div>
									<div>
										<p class="font-semibold text-slate-900 dark:text-white">
											Sarah Williams
										</p>
										<p class="text-xs text-slate-500">s.williams@ux.design</p>
									</div>
								</div>
							</td>
							<td class="px-6 py-4">
								<p
									class="text-sm font-medium text-slate-700 dark:text-slate-300">
									Lead UX Designer
								</p>
								<p class="text-xs text-slate-400 italic">Design</p>
							</td>
							<td class="px-6 py-4">
								<span
									class="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
									>Hired</span
								>
							</td>
							<td class="px-6 py-4 text-sm text-slate-500">Oct 22, 2023</td>
							<td class="px-6 py-4">
								<div class="flex items-center justify-end gap-2">
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="Message">
										<span class="material-symbols-outlined text-xl">mail</span>
									</button>
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="View Profile">
										<span class="material-symbols-outlined text-xl"
											>visibility</span
										>
									</button>
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="More Actions">
										<span class="material-symbols-outlined text-xl"
											>more_vert</span
										>
									</button>
								</div>
							</td>
						</tr>
						<!-- Candidate Row 3 -->
						<tr
							class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
							<td class="px-6 py-4">
								<div class="flex items-center gap-3">
									<div
										class="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
										<img
											class="w-full h-full object-cover"
											data-alt="Candidate profile picture"
											src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPB5hth2Y5Igi_WRJHB5zVI7SofFH7j4N5oDtg16up5lOU9Xk2g3o3yBlFDnzZMJXvHOaUvOnD5tICRkFOSw8xeVgeCpjrTdkzb4yKSQKlqZkU_YtpBGLLNRxq6iHt7c0nJbox_LL3FJUuNnKhk68jyyRVbbU_BUDTXV1vSHdCsbFvRoxj46D-5wzXz5J7w4NmElyLkfbDyBIM-rQx2OGAnOjMdvixUa8jOBcQsndaGREULCNycTtmUPAtKB8WbznYgbobW6YySd8" />
									</div>
									<div>
										<p class="font-semibold text-slate-900 dark:text-white">
											Michael Chen
										</p>
										<p class="text-xs text-slate-500">m.chen@techcorp.com</p>
									</div>
								</div>
							</td>
							<td class="px-6 py-4">
								<p
									class="text-sm font-medium text-slate-700 dark:text-slate-300">
									Product Manager
								</p>
								<p class="text-xs text-slate-400 italic">Product</p>
							</td>
							<td class="px-6 py-4">
								<span
									class="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
									>New</span
								>
							</td>
							<td class="px-6 py-4 text-sm text-slate-500">Oct 25, 2023</td>
							<td class="px-6 py-4">
								<div class="flex items-center justify-end gap-2">
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="Message">
										<span class="material-symbols-outlined text-xl">mail</span>
									</button>
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="View Profile">
										<span class="material-symbols-outlined text-xl"
											>visibility</span
										>
									</button>
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="More Actions">
										<span class="material-symbols-outlined text-xl"
											>more_vert</span
										>
									</button>
								</div>
							</td>
						</tr>
						<!-- Candidate Row 4 -->
						<tr
							class="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
							<td class="px-6 py-4">
								<div class="flex items-center gap-3">
									<div
										class="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
										<img
											class="w-full h-full object-cover"
											data-alt="Candidate profile picture"
											src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI2XCIBoEuEoPQYEvitdC1FlE5qC_Db2Q-zuuT7eGiah2mo4k0FK3h9AuoiMMlYzMKaChlAucl0M8bDi6dpAjMw3I4U0utGzgLKvtXjSgdNgL48MDGrKzmOkkWPG2gf9565fMHuKuI-qtgSF2K7SCABHnwpQYLbLKQgJ4eD8HmZfVXj4J_2KUEuUikLiertjMCo_JC1vsGbWtI5rC-UhhKg0I86NRR5wrKz3rDGnh7NdTwiOYI9g20y4z-oJ3Sn3rf2IrMV4XwmfM" />
									</div>
									<div>
										<p class="font-semibold text-slate-900 dark:text-white">
											Emily Davis
										</p>
										<p class="text-xs text-slate-500">emily.d@freemail.net</p>
									</div>
								</div>
							</td>
							<td class="px-6 py-4">
								<p
									class="text-sm font-medium text-slate-700 dark:text-slate-300">
									DevOps Engineer
								</p>
								<p class="text-xs text-slate-400 italic">Engineering</p>
							</td>
							<td class="px-6 py-4">
								<span
									class="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
									>Rejected</span
								>
							</td>
							<td class="px-6 py-4 text-sm text-slate-500">Oct 19, 2023</td>
							<td class="px-6 py-4">
								<div class="flex items-center justify-end gap-2">
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="Message">
										<span class="material-symbols-outlined text-xl">mail</span>
									</button>
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="View Profile">
										<span class="material-symbols-outlined text-xl"
											>visibility</span
										>
									</button>
									<button
										class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
										title="More Actions">
										<span class="material-symbols-outlined text-xl"
											>more_vert</span
										>
									</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- Pagination -->
			<div
				class="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
				<p class="text-sm text-slate-500">
					Showing
					<span class="font-semibold text-slate-900 dark:text-white">1</span>
					to
					<span class="font-semibold text-slate-900 dark:text-white">4</span>
					of
					<span class="font-semibold text-slate-900 dark:text-white">42</span>
					candidates
				</p>
				<div class="flex gap-2">
					<button
						class="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50"
						disabled="false">
						Previous
					</button>
					<button
						class="px-3 py-1 bg-primary text-white rounded-lg text-sm font-medium">
						1
					</button>
					<button
						class="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
						2
					</button>
					<button
						class="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
						3
					</button>
					<button
						class="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
						Next
					</button>
				</div>
			</div>
		</div>
	</main>
</template>
