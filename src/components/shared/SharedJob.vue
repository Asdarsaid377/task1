<script setup lang="ts">
import { ref } from "vue";
import { BsWhatsapp, BsInstagram, BsLink45Deg } from "vue-icons-plus/bs";
import { AiOutlineClose } from "vue-icons-plus/ai";

const props = defineProps<{
    modelValue: boolean;
    url: string;
    title: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const copied = ref(false);

const close = () => emit("update:modelValue", false);

const shareWhatsApp = () => {
    const text = `${props.title} - ${props.url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
};

const shareInstagram = async () => {
    await copyLink();
    window.open("https://www.instagram.com/", "_blank");
};

const copyLink = async () => {
    await navigator.clipboard.writeText(props.url);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
};

const nativeShare = async () => {
    if (navigator.share) {
        await navigator.share({
            title: props.title,
            url: props.url,
        });
    }
};
</script>

<template>
    <transition name="fade">
        <div
            v-if="modelValue"
            class="fixed inset-0 z-50 flex items-center justify-center"
        >
            <!-- Overlay -->
            <div
                class="absolute inset-0 bg-black/50 backdrop-blur-sm"
                @click="close"
            />

            <!-- Modal -->
            <div
                class="relative bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 z-10"
            >
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-lg font-bold">Share Job</h2>
                    <button @click="close">
                        <AiOutlineClose />
                    </button>
                </div>

                <!-- Native share (mobile only) -->
                <button
                    v-if="nativeShare"
                    @click="nativeShare"
                    class="w-full mb-4 bg-primary text-white py-2 rounded-lg"
                >
                    Share via Device
                </button>

                <!-- Social Buttons -->
                <div class="grid grid-cols-3 gap-4 mb-6">
                    <button
                        @click="shareWhatsApp"
                        class="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                    >
                        <BsWhatsapp class="text-2xl text-green-500" />
                        <span class="text-sm">WhatsApp</span>
                    </button>

                    <button
                        @click="shareInstagram"
                        class="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-pink-50 dark:hover:bg-pink-900/20 transition"
                    >
                        <BsInstagram class="text-2xl text-pink-500" />
                        <span class="text-sm">Instagram</span>
                    </button>

                    <button
                        @click="copyLink"
                        class="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    >
                        <BsLink45Deg class="text-2xl" />
                        <span class="text-sm">
                            {{ copied ? "Copied!" : "Copy Link" }}
                        </span>
                    </button>
                </div>

                <!-- URL Preview -->
                <div
                    class="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-xs break-all"
                >
                    {{ url }}
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
