<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { FcGoogle } from "vue-icons-plus/fc";
// import { auth, db }
// Enums
type UserRole = "admin" | "candidate";

export type UserProfile = {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    role: UserRole;
    createdAt: Date;
};

// Reactive data
const router = useRouter();
const loading = ref(false);
const error = ref<string | null>(null);
const isLoginMode = ref(true);
const email = ref("");
const password = ref("");
const displayName = ref("");

// Methods
const signInWithGoogle = async () => {
    loading.value = true;
    error.value = null;

    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        // Check if user profile exists in Firestore
        const userDocRef = doc(db, "users", result.user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            // Create new user profile as CANDIDATE (default)
            const userProfile: UserProfile = {
                uid: result.user.uid,
                email: result.user.email || "",
                displayName: result.user.displayName || "",
                photoURL: result.user.photoURL || "",
                role: "candidate",
                createdAt: new Date(),
            };
            await setDoc(userDocRef, userProfile);
        }

        // Redirect ke dashboard
        const userProfile = (await getDoc(userDocRef)).data() as UserProfile;
        if (userProfile.role === "admin") {
            router.push("/admin/dashboard");
        } else {
            router.push("/");
        }
    } catch (err: any) {
        console.error("Google Sign In Error:", err);
        error.value =
            err.message || "Terjadi kesalahan saat login dengan Google";
    } finally {
        loading.value = false;
    }
};

const handleEmailSignUp = async () => {
    if (!email.value || !password.value || !displayName.value) {
        error.value = "Mohon isi semua field";
        return;
    }

    loading.value = true;
    error.value = null;

    try {
        // Create user with email and password
        const result = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value,
        );

        // Create user profile in Firestore as CANDIDATE (default)
        const userProfile: UserProfile = {
            uid: result.user.uid,
            email: result.user.email || "",
            displayName: displayName.value,
            photoURL: "",
            role: "candidate",
            createdAt: new Date(),
        };

        await setDoc(doc(db, "users", result.user.uid), userProfile);
        router.push("/candidate/dashboard");
    } catch (err: any) {
        console.error("Sign Up Error:", err);
        if (err.code === "auth/email-already-in-use") {
            error.value = "Email sudah terdaftar";
        } else if (err.code === "auth/weak-password") {
            error.value = "Password terlalu lemah (minimal 6 karakter)";
        } else {
            error.value = err.message || "Terjadi kesalahan";
        }
    } finally {
        loading.value = false;
    }
};

const handleEmailSignIn = async () => {
    if (!email.value || !password.value) {
        error.value = "Mohon isi email dan password";
        return;
    }

    loading.value = true;
    error.value = null;

    try {
        const result = await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value,
        );

        // Get user profile
        const userDocRef = doc(db, "users", result.user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userProfile = userDocSnap.data() as UserProfile;
            if (userProfile.role === "admin") {
                router.push("/admin/dashboard");
            } else {
                router.push("/candidate/dashboard");
            }
        }
    } catch (err: any) {
        console.error("Sign In Error:", err);
        if (err.code === "auth/user-not-found") {
            error.value = "Email tidak terdaftar";
        } else if (err.code === "auth/wrong-password") {
            error.value = "Password salah";
        } else {
            error.value = err.message || "Terjadi kesalahan";
        }
    } finally {
        loading.value = false;
    }
};

const toggleMode = () => {
    isLoginMode.value = !isLoginMode.value;
    error.value = null;
    email.value = "";
    password.value = "";
    displayName.value = "";
};

const dismissError = () => {
    error.value = null;
};
</script>

<template>
    <main
        class="flex flex-1 justify-center items-center min-h-screen py-12 px-6"
    >
        <div
            class="layout-content-container flex flex-col max-w-[480px] w-full bg-white dark:bg-slate-900/50 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800"
        >
            <div class="flex flex-col items-center text-center gap-6 mb-8">
                <div
                    class="w-full h-48 bg-primary/5 rounded-lg flex items-center justify-center overflow-hidden"
                >
                    <div
                        class="w-full h-full bg-cover bg-center"
                        data-alt="Professional office environment with diverse team members working"
                        style="
                            background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuCW_Gum_A64SncYkI9CaD4JFUom9RIVgdx5nD42F4gSJaQpm3tgMnmDC8KIJN7GhqaW-v-_EV7kHhNzslwyMJiEXzkBmBjDVO9ipHRWll9xZfpss2SnQct7iD7lbH3JTYzMHCBxxihpIXehlLYjGjoRm33SRYoBF7XNYsfAwk0lsGDhN7XSHKYFheL0w--VJv3AcuojtNHhvSIqoXUOrwZW3rsrPQZZZd9VFNbmEUW_j0UeEN7tG3m38u1635APzD3ZvIkRb52ek40&quot;);
                        "
                    ></div>
                </div>
                <div class="flex flex-col gap-2">
                    <h1
                        class="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight"
                    >
                        Join CWF today
                    </h1>
                    <p
                        class="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal"
                    >
                        The professional bridge to your next career move.
                    </p>
                </div>
            </div>
            <div @click="signInWithGoogle" class="flex flex-col gap-4">
                <button
                    class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-primary text-white hover:bg-primary/90 transition-colors gap-3 text-base font-bold leading-normal"
                >
                    <div
                        class="bg-white rounded-full p-1 flex items-center justify-center"
                    >
                        <FcGoogle />
                    </div>
                    <span class="truncate">Sign up with Google</span>
                </button>
            </div>
            <div
                class="mt-8 text-center border-t border-slate-100 dark:border-slate-800 pt-6"
            >
                <p class="text-slate-600 dark:text-slate-400 text-sm">
                    Already have an account?
                    <a
                        class="text-primary dark:text-primary font-bold hover:underline"
                        href="#"
                        >Log in</a
                    >
                </p>
            </div>
            <div class="mt-6">
                <p
                    class="text-slate-400 dark:text-slate-500 text-xs font-normal leading-relaxed text-center"
                >
                    By signing up, you agree to our
                    <a
                        class="underline hover:text-slate-600 dark:hover:text-slate-300"
                        href="#"
                        >Terms of Service</a
                    >
                    and
                    <a
                        class="underline hover:text-slate-600 dark:hover:text-slate-300"
                        href="#"
                        >Privacy Policy</a
                    >
                </p>
            </div>
        </div>
    </main>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shake {
    0%,
    100% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-10px);
    }
    75% {
        transform: translateX(10px);
    }
}

.animate-fade-up {
    animation: fadeInUp 0.6s ease-out forwards;
}

.animate-slide-up {
    animation: slideUp 0.6s ease-out forwards;
}

.animate-shake {
    animation: shake 0.4s ease-in-out;
}

.material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-variation-settings:
        "FILL" 0,
        "wght" 300,
        "GRAD" 0,
        "opsz" 24;
}

/* Smooth transitions */
button,
input {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
