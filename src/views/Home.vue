<script setup lang="ts">
import HomePageLayout from "../layouts/HomePageLayout.vue";
import HeroSection from "../components/shared/HeroSection.vue";
import MainSection from "@/components/shared/MainSection.vue";
import HeroSectionNew from "@/components/shared/HeroSectionNew.vue";
import MainSectionNew from "@/components/shared/MainSectionNew.vue";
import JobSection from "@/components/shared/JobSection.vue";
import Footer from "@/components/shared/Footer.vue";
</script>

<template>
	<HomePageLayout> </HomePageLayout>
	<!-- <HeroSection /> -->
	<HeroSectionNew />
	<!-- <MainSection /> -->
	<MainSectionNew />
	<JobSection />
	<Footer />
</template>
