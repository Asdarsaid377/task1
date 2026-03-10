import { computed, type Ref } from "vue";

export function useTableFilter<T>(
    data: Ref<T[] | null | undefined>,
    search: Ref<string>,
    filters: Ref<Record<string, any>>,
    searchFields: (keyof T)[],
) {
    const filteredData = computed(() => {
        const query = search.value.toLowerCase();
        const list = data.value || [];
        return list.filter((item) => {
            // search
            const matchesSearch =
                !query ||
                searchFields.some((field) =>
                    String(item[field] ?? "")
                        .toLowerCase()
                        .includes(query),
                );

            // filter
            const matchesFilter = Object.entries(filters.value).every(
                ([key, value]) => {
                    if (value === "all") return true;
                    return item[key as keyof T] === value;
                },
            );

            return matchesSearch && matchesFilter;
        });
    });

    return {
        filteredData,
    };
}
