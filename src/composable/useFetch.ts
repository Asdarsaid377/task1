import { ref } from "vue";

export function useFetch<T>(
    apiFunction: (...args: any[]) => Promise<T>,
    initialValue: T,
) {
    const data = ref<T | null>(initialValue);
    const loading = ref(false);
    const error = ref<string | null>(null);

    const execute = async (...args: any[]) => {
        loading.value = true;
        error.value = null;

        try {
            const result = await apiFunction(...args);
            data.value = result;
            return result;
        } catch (err: any) {
            console.error("❌ Fetch error:", err);
            error.value = err?.message || "Something went wrong";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        data,
        loading,
        error,
        execute,
    };
}
