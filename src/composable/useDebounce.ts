import { ref, watch } from "vue";

export function useDebounce<T>(source: any, delay = 300) {
    const debounced = ref<T>(source.value);
    let timer: ReturnType<typeof setTimeout>;
    watch(source, (value) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            debounced.value = value;
        }, delay);
    });

    return debounced;
}
