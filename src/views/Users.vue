<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { IUser } from "@/types/UserType";
import { userService } from "@/services/user.service";
import FilterandSearch from "@/components/shared/FilterandSearch.vue";
import TitleDashboard from "@/components/shared/TitleDashboard.vue";
import { useDebounce } from "@/composable/useDebounce";
import BaseTable, { type TableColumn } from "@/components/table/BaseTable.vue";
import { useFetch } from "@/composable/useFetch";
import { useTableFilter } from "@/composable/useFilterTable";
import { formatDate } from "@/utils/formatDate";

// State
const deleting = ref(false);
const selectedUser = ref<IUser | null>(null);
const showDeleteModal = ref(false);
const showEditRoleModal = ref(false);
const newRole = ref<"admin" | "candidate">("candidate");
const deleteConfirmEmail = ref("");
const searchQuery = ref("");
const filters = ref({
    role: "all",
});
const debouncedSearch = useDebounce<string>(searchQuery, 1000);
const {
    data: users,
    error,
    loading,
    execute: fetchUsers,
} = useFetch<IUser[]>(() => userService.fetchUsers(), []);

const { filteredData: filteredUsers } = useTableFilter(
    users,
    debouncedSearch,
    filters,
    ["displayName", "email"],
);
// Computed

const canDeleteUser = computed(() => {
    return deleteConfirmEmail.value === selectedUser.value?.email;
});

// Methods

const openDeleteModal = (user: IUser) => {
    selectedUser.value = user;
    deleteConfirmEmail.value = "";
    showDeleteModal.value = true;
};

const closeDeleteModal = () => {
    showDeleteModal.value = false;
    selectedUser.value = null;
    deleteConfirmEmail.value = "";
};

const openEditRoleModal = (user: IUser) => {
    selectedUser.value = user;
    newRole.value = user.role;
    showEditRoleModal.value = true;
};

const closeEditRoleModal = () => {
    showEditRoleModal.value = false;
    selectedUser.value = null;
};

const handleDeleteUser = async () => {
    if (!selectedUser.value || !canDeleteUser.value) return;

    deleting.value = true;

    try {
        // Delete user from Firestore
        await userService.deleteUser(selectedUser.value.uid);
        // Remove from local list
        users.value = users.value!.filter(
            (u) => u.uid !== selectedUser.value?.uid,
        );
        closeDeleteModal();
        // Optional: Delete from Firebase Auth (requires custom claims or admin SDK)
        // This should be done on backend for security
    } catch (err: any) {
        console.error("Error deleting user:", err);
        error.value = err.message || "Failed to delete user";
    } finally {
        deleting.value = false;
    }
};

const handleEditRole = async () => {
    if (!selectedUser.value || !selectedUser.value.uid) return;
    try {
        deleting.value = true;
        error.value = null;
        // Update role in Firestore
        await userService.changeUserRole(selectedUser.value.uid, newRole.value);
        // Update local state
        const userIndex = users.value!.findIndex(
            (u) => u.uid === selectedUser.value?.uid,
        );
        if (userIndex !== -1 && users.value![userIndex]) {
            users.value![userIndex].role = newRole.value;
        }
        closeEditRoleModal();
    } catch (err: any) {
        console.error("Error updating role:", err);
        error.value = err.message || "Failed to update role";
    } finally {
        deleting.value = false;
    }
};

const dismissError = () => {
    error.value = null;
};

const columns: TableColumn[] = [
    { key: "user", label: "User" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "createdAt", label: "Joined Date" },
];

// Lifecycle
onMounted(() => {
    fetchUsers();
});
</script>

<template>
    <main class="flex-1 p-6 overflow-y-auto">
        <!-- Page Header -->
        <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
            <TitleDashboard
                title="Manage Users"
                subtitle="View, edit roles, and manage system users."
                class="text-zinc-900 darkssstext-zinc-100"
            />
            <button
                @click="fetchUsers"
                class="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
                <span class="material-symbols-outlined text-xl">refresh</span>
                Refresh
            </button>
        </div>

        <!-- Error Message -->
        <div
            v-if="error"
            class="mb-6 p-4 rounded-lg bg-red-50 darksssbg-red-900/20 border border-red-200 darksssborder-red-800"
        >
            <div class="flex items-start gap-3">
                <span
                    class="material-symbols-outlined text-red-600 darkssstext-red-400"
                >
                    error
                </span>
                <div class="flex-1">
                    <p
                        class="text-sm font-medium text-red-800 darkssstext-red-200"
                    >
                        {{ error }}
                    </p>
                </div>
                <button
                    @click="dismissError"
                    class="text-red-400 hover:text-red-600 darkssstext-red-400 darkssshover:text-red-300"
                >
                    <span class="material-symbols-outlined text-xl">close</span>
                </button>
            </div>
        </div>

        <FilterandSearch
            v-model:search="searchQuery"
            v-model="filters"
            :selects="[
                {
                    key: 'role',
                    label: 'Role',
                    options: [
                        { label: 'All Roles', value: 'all' },
                        { label: 'Admin', value: 'admin' },
                        { label: 'Candidate', value: 'candidate' },
                    ],
                },
            ]"
            search-placeholder="Name or email..."
        />

        <!-- Users Table -->
        <div
            class="bg-white rounded-xl border border-slate-200 darksssborder-slate-800 overflow-hidden shadow-sm"
        >
            <!-- Loading State -->
            <div v-if="loading" class="p-8 text-center">
                <div class="inline-block">
                    <div class="animate-spin">
                        <span
                            class="material-symbols-outlined text-4xl text-primary"
                        >
                            loading
                        </span>
                    </div>
                </div>
                <p class="text-slate-500 mt-4">Loading users...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="filteredUsers.length === 0" class="p-8 text-center">
                <span
                    class="material-symbols-outlined text-5xl text-slate-300 darkssstext-slate-600 inline-block mb-3"
                >
                    person_off
                </span>
                <p class="text-slate-500 mt-2">No users found</p>
            </div>

            <!-- Table -->
            <BaseTable
                v-else
                :columns="columns"
                :items="filteredUsers"
                :loading="loading"
            >
                <template #user="{ item }">
                    <div class="flex items-center gap-3">
                        <div
                            class="size-10 rounded-full bg-slate-200 darksssbg-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0"
                        >
                            <img
                                v-if="item.photoURL"
                                :src="item.photoURL"
                                :alt="item.displayName"
                                class="w-full h-full object-cover"
                            />
                            <span
                                v-else
                                class="material-symbols-outlined text-lg text-slate-500"
                            >
                                account_circle
                            </span>
                        </div>
                        <div>
                            <p
                                class="font-semibold text-slate-900 darkssstext-white"
                            >
                                {{ item.displayName }}
                            </p>
                            <p class="text-xs text-slate-500">
                                ID:
                                {{ item.uid.substring(0, 8) }}...
                            </p>
                        </div>
                    </div>
                </template>
                <template #role="{ item }">
                    <span
                        class="px-2.5 py-1 rounded-full text-xs font-bold"
                        :class="
                            item.role === 'admin'
                                ? 'bg-purple-100 text-purple-700 darksssbg-purple-900/30 darkssstext-purple-400'
                                : 'bg-blue-100 text-blue-700 darksssbg-blue-900/30 darkssstext-blue-400'
                        "
                    >
                        {{ item.role }}
                    </span>
                </template>
                <template #createdAt="{ item }">
                    {{ formatDate(item.createdAt) }}
                </template>
                <template #actions="{ item }">
                    <div class="flex items-center justify-end gap-2">
                        <!-- Edit Role Button -->
                        <button
                            @click="openEditRoleModal(item)"
                            class="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                            title="Edit Role"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >edit</span
                            >
                        </button>

                        <!-- Delete Button -->
                        <button
                            @click="openDeleteModal(item)"
                            class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 darkssshover:bg-red-900/20 rounded-lg transition-all"
                            title="Delete User"
                        >
                            <span class="material-symbols-outlined text-xl"
                                >delete</span
                            >
                        </button>
                    </div>
                </template>
            </BaseTable>
        </div>
    </main>

    <!-- Edit Role Modal -->
    <teleport to="body">
        <transition
            enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                v-if="showEditRoleModal"
                class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                @click.self="closeEditRoleModal"
            >
                <div
                    class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-in"
                    @click.stop
                >
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-4">
                        <h2
                            class="text-xl font-bold text-slate-900 darkssstext-white"
                        >
                            Edit User Role
                        </h2>
                        <button
                            @click="closeEditRoleModal"
                            class="text-slate-400 hover:text-slate-600 darkssshover:text-slate-300"
                        >
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <!-- User Info -->
                    <div
                        class="bg-slate-50 darksssbg-slate-800 p-4 rounded-lg mb-6"
                    >
                        <p class="text-sm text-slate-500 darkssstext-slate-400">
                            User
                        </p>
                        <p
                            class="font-semibold text-slate-900 darkssstext-white"
                        >
                            {{ selectedUser?.displayName }}
                        </p>
                        <p class="text-xs text-slate-500 darkssstext-slate-400">
                            {{ selectedUser?.email }}
                        </p>
                    </div>

                    <!-- Role Selection -->
                    <div class="mb-6">
                        <label
                            class="block text-sm font-semibold text-slate-700 darkssstext-slate-300 mb-3"
                        >
                            New Role
                        </label>
                        <div class="space-y-2">
                            <label
                                class="flex items-center gap-3 p-3 border border-slate-200 darksssborder-slate-700 rounded-lg hover:bg-slate-50 darkssshover:bg-slate-800 cursor-pointer transition-colors"
                                :class="{
                                    'border-primary bg-primary/5 darksssbg-primary/10':
                                        newRole === 'admin',
                                }"
                            >
                                <input
                                    v-model="newRole"
                                    type="radio"
                                    value="admin"
                                    class="w-4 h-4 cursor-pointer"
                                />
                                <div>
                                    <p
                                        class="font-medium text-slate-900 darkssstext-white"
                                    >
                                        Admin
                                    </p>
                                    <p
                                        class="text-xs text-slate-500 darkssstext-slate-400"
                                    >
                                        Full access to manage jobs and
                                        candidates
                                    </p>
                                </div>
                            </label>

                            <label
                                class="flex items-center gap-3 p-3 border border-slate-200 darksssborder-slate-700 rounded-lg hover:bg-slate-50 darkssshover:bg-slate-800 cursor-pointer transition-colors"
                                :class="{
                                    'border-primary bg-primary/5 darksssbg-primary/10':
                                        newRole === 'candidate',
                                }"
                            >
                                <input
                                    v-model="newRole"
                                    type="radio"
                                    value="candidate"
                                    class="w-4 h-4 cursor-pointer"
                                />
                                <div>
                                    <p
                                        class="font-medium text-slate-900 darkssstext-white"
                                    >
                                        Candidate
                                    </p>
                                    <p
                                        class="text-xs text-slate-500 darkssstext-slate-400"
                                    >
                                        Can browse jobs and apply
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-3">
                        <button
                            @click="closeEditRoleModal"
                            class="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 darksssborder-slate-700 text-slate-700 darkssstext-slate-300 font-semibold hover:bg-slate-50 darkssshover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            @click="handleEditRole"
                            :disabled="
                                deleting || newRole === selectedUser?.role
                            "
                            class="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ deleting ? "Updating..." : "Update Role" }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>

    <!-- Delete User Modal -->
    <teleport to="body">
        <transition
            enter-active-class="transition-opacity duration-300"
            leave-active-class="transition-opacity duration-300"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >
            <div
                v-if="showDeleteModal"
                class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                @click.self="closeDeleteModal"
            >
                <div
                    class="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
                    @click.stop
                >
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-4">
                        <h2
                            class="text-xl font-bold text-slate-900 darkssstext-white"
                        >
                            Delete User
                        </h2>
                        <button
                            @click="closeDeleteModal"
                            class="text-slate-400 hover:text-slate-600 darkssshover:text-slate-300"
                        >
                            <span class="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    <!-- Warning -->
                    <div
                        class="bg-red-50 darksssbg-red-900/20 border border-red-200 darksssborder-red-800 p-4 rounded-lg mb-6"
                    >
                        <div class="flex gap-3">
                            <span
                                class="material-symbols-outlined text-red-600 darkssstext-red-400 flex-shrink-0"
                            >
                                warning
                            </span>
                            <div>
                                <p
                                    class="font-semibold text-red-800 darkssstext-red-200 text-sm"
                                >
                                    This action cannot be undone
                                </p>
                                <p
                                    class="text-xs text-red-700 darkssstext-red-300 mt-1"
                                >
                                    The user and all their data will be
                                    permanently deleted from the system.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- User Info -->
                    <div
                        class="bg-slate-50 darksssbg-slate-800 p-4 rounded-lg mb-6"
                    >
                        <p class="text-sm text-slate-500 darkssstext-slate-400">
                            User to delete
                        </p>
                        <p
                            class="font-semibold text-slate-900 darkssstext-white"
                        >
                            {{ selectedUser?.displayName }}
                        </p>
                        <p class="text-xs text-slate-500 darkssstext-slate-400">
                            {{ selectedUser?.email }}
                        </p>
                    </div>

                    <!-- Confirmation Input -->
                    <div class="mb-6">
                        <label
                            class="block text-sm font-semibold text-slate-700 darkssstext-slate-300 mb-2"
                        >
                            Type email to confirm deletion:
                        </label>
                        <input
                            v-model="deleteConfirmEmail"
                            :placeholder="selectedUser?.email"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-lg border border-slate-200 darksssborder-slate-700 bg-white darksssbg-slate-800 text-slate-900 darkssstext-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                        />
                        <p
                            class="text-xs text-slate-500 darkssstext-slate-400 mt-2"
                        >
                            This is a safety measure to prevent accidental
                            deletion.
                        </p>
                    </div>

                    <!-- Buttons -->
                    <div class="flex gap-3">
                        <button
                            @click="closeDeleteModal"
                            class="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 darksssborder-slate-700 text-slate-700 darkssstext-slate-300 font-semibold hover:bg-slate-50 darkssshover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            @click="handleDeleteUser"
                            :disabled="!canDeleteUser || deleting"
                            class="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {{ deleting ? "Deleting..." : "Delete User" }}
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

.material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-variation-settings:
        "FILL" 0,
        "wght" 300,
        "GRAD" 0,
        "opsz" 24;
}

.animate-in {
    animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
