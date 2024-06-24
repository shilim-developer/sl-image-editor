import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "virtual:uno.css";
import { createPinia } from "pinia";
import { setupRouter } from "./router";
import { installWidgets } from "@/components/widgets/install";

const store = createPinia();

const app = createApp(App);
app.use(store);
installWidgets(app);
setupRouter(app);
app.mount("#app");
