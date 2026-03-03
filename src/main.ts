import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
const pinia = createPinia();
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

createApp(App)
	.use(router)
	.use(pinia)
	.component("QuillEditor", QuillEditor)
	.mount("#app");
