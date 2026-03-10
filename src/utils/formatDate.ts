export const formatDate = (date: any) => {
    if (!date) return "N/A";
    const d = date.toDate?.() || new Date(date);
    return new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(d);
};
