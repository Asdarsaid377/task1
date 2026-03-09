<template>
    <div class="max-w-2xl mx-auto p-8">
        <h1 class="text-3xl font-bold text-slate-900 mb-6">
            Tambah Lowongan Baru
        </h1>

        <form
            @submit.prevent="submitJob"
            class="space-y-4 bg-white p-6 rounded-xl border shadow-sm"
        >
            <div>
                <label class="block text-sm font-medium mb-1"
                    >Tajuk Pekerjaan</label
                >
                <input
                    v-model="form.title"
                    type="text"
                    class="w-full p-2 border rounded-lg"
                    placeholder="Contoh: Senior Developer"
                />
            </div>

            <div>
                <label class="block text-sm font-medium mb-1"
                    >Gaji (Range)</label
                >
                <input
                    v-model="form.salary"
                    type="text"
                    class="w-full p-2 border rounded-lg"
                    placeholder="Contoh: RM5,000 - RM8,000"
                />
            </div>

            <button
                type="submit"
                class="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary/90 transition"
            >
                Terbitkan Lowongan
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref({
    title: "",
    salary: "",
});

const submitJob = () => {
    // console.log("Data dihantar:", form.value);
    alert("Lowongan berjaya diterbitkan!");
};
</script>
