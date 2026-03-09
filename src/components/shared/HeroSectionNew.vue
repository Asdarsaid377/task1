<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const parallaxOffset = ref(0);

const onScroll = () => {
    parallaxOffset.value = window.scrollY;
};

const onMouseMove = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    (e.clientX - rect.left) / rect.width;
    (e.clientY - rect.top) / rect.height;
    // Bisa digunakan untuk advanced effects di masa depan
};

const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
};

onMounted(() => {
    window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
});
</script>

<template>
    <section
        class="relative h-[600px] w-full overflow-hidden"
        @mousemove="onMouseMove"
    >
        <!-- Overlay Dark -->
        <div class="absolute inset-0 bg-slate-900/40 z-10"></div>

        <!-- Gradient Overlay -->
        <div
            class="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-20"
        ></div>

        <!-- Parallax Background Image -->
        <div
            class="h-full w-full bg-cover bg-center absolute inset-0"
            :style="{
                backgroundImage:
                    'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBb6g-l9t3BFk9ZvapQ9dMYEoo1QJcTiXzZOXMWR_aIhNKFEPS5XgYCfMP4WCfGqwIcNNiTSfD3xeUxRZAwlYLo_D9qbb1GK1HPG-6UJ7EJeA6k1eWL5BDw9CZrm5aSGGw4-LOBF-DJ_llhwwNLpjwupKpO7iWT6OmFRhx-TII7xItvKgp6RRF5uXuI508H0adRjwXnbFMnJ4v1J5wYMyBMo-f1bX8tHsY6Kng37Hb5MXnnGFsJiSJTR0yHxoev_ZJAdkeXExW3vEU)',
                transform: `translateY(${parallaxOffset * 0.5}px)`,
            }"
        ></div>

        <!-- Hero Content -->
        <div
            class="absolute inset-0 flex flex-col items-center justify-center z-30 px-6 text-center"
        >
            <h2
                class="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-md opacity-0 animate-fade-up"
                style="animation-delay: 0.2s"
            >
                Join Our Team
            </h2>
            <p
                class="max-w-2xl text-lg md:text-xl text-white/90 font-medium mb-8 opacity-0 animate-fade-up"
                style="animation-delay: 0.4s"
            >
                At CWF, we're on a mission to bridge the gap between talent and
                opportunity. Come build the future of work with us in a
                collaborative environment designed for growth.
            </p>
            <button
                @click="scrollToSection('#jobs')"
                class="rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-xl hover:scale-110 hover:shadow-2xl hover:bg-primary/90 transition-all duration-300 opacity-0 animate-fade-up inline-block"
                style="animation-delay: 0.6s"
            >
                Explore Open Positions
            </button>
        </div>
    </section>
</template>

<style scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-up {
    animation: fadeInUp 0.6s ease-out forwards;
}
</style>
