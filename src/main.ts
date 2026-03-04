import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

// ✅ IMPORTANT: force firebase initialization
import "@/lib/firebase";

const app = createApp(App);

app
	.use(router)
	.use(createPinia())
	.component("QuillEditor", QuillEditor)
	.mount("#app");
