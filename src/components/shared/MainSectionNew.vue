<script setup lang="ts">
import { BiBuildingHouse, BiTrendingUp } from "vue-icons-plus/bi";
import { GiHealingShield } from "vue-icons-plus/gi";
import { MdSavings } from "vue-icons-plus/md";
type Benefit = {
    icon: any;
    title: string;
    description: string;
};
const benefits: Benefit[] = [
    {
        icon: BiBuildingHouse,
        title: "Remote Work",
        description:
            "Flexibility to work from anywhere in the world or our modern hub offices.",
    },
    {
        icon: GiHealingShield,
        title: "Health Insurance",
        description:
            "Comprehensive health, dental, and vision plans for you and your family.",
    },
    {
        icon: BiTrendingUp,
        title: "Career Growth",
        description:
            "Annual learning stipend and clear pathways for internal promotion.",
    },
    {
        icon: MdSavings,
        title: "Retirement Plan",
        description:
            "Competitive 401k matching to help you plan for a secure future.",
    },
];
</script>

<template>
    <div class="w-full bg-white">
        <section class="py-20 px-6 lg:px-20 max-w-7xl mx-auto">
            <!-- Section Title -->
            <div class="mb-16 text-center animate-slide-up">
                <h2 class="text-3xl font-extrabold text-slate-900 mb-4">
                    Our Culture &amp; Benefits
                </h2>
                <p class="text-slate-600 max-w-2xl mx-auto">
                    We believe that happy employees create the best products.
                    Here's what you can expect when you join the CWF family.
                </p>
            </div>

            <!-- Benefits Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div
                    v-for="(benefit, index) in benefits"
                    :key="index"
                    class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:border-primary/50 hover:scale-105 transition-all opacity-0 duration-300 cursor-pointer group animate-fade-in-up"
                    :style="{ animationDelay: `${index * 0.8}s` }"
                >
                    <!-- Icon -->
                    <div
                        class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300"
                    >
                        <span class="material-symbols-outlined text-3xl">
                            <component :is="benefit.icon" />
                        </span>
                    </div>

                    <!-- Content -->
                    <h3
                        class="text-lg font-bold mb-2 text-primary transition-colors duration-300"
                    >
                        {{ benefit.title }}
                    </h3>
                    <p class="text-sm text-slate-600">
                        {{ benefit.description }}
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

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

.animate-fade-in-up {
    animation: fadeInUp 1s ease-out forwards;
}

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

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-up {
    animation: slideUp 1.5s ease-out forwards;
}

.material-symbols-outlined {
    font-family: "Material Symbols Outlined";
    font-variation-settings:
        "FILL" 0,
        "wght" 300,
        "GRAD" 0,
        "opsz" 24;
}
</style>
