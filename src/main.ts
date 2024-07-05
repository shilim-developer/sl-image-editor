import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "virtual:uno.css";
import { createPinia } from "pinia";
import { setupRouter } from "./router";
import { installWidgets } from "@/components/widgets/install";
import ColorPickerGradient from "vue3-color-picker-gradient";

const store = createPinia();

const app = createApp(App);
app.use(ColorPickerGradient);
app.use(store);
installWidgets(app);
setupRouter(app);
app.mount("#app");
