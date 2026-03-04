import { userRepository } from "@/repositories/user.repository";
import type { IUser } from "@/types/UserType";

export const userService = {
    async fetchUsers(): Promise<IUser[]> {
        return await userRepository.getAll();
    },

    async deleteUser(uid: string) {
        if (!uid) throw new Error("Invalid user id");
        return await userRepository.deleteByUid(uid);
    },

    async changeUserRole(uid: string, role: "admin" | "candidate") {
        if (!uid) throw new Error("Invalid user id");
        return await userRepository.updateRole(uid, role);
    },
};
