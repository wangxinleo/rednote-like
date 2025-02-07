import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// 判断是否为开发环境且启用 mock
const useMock = import.meta.env.MODE === 'development' && import.meta.env.VITE_ENABLE_MOCK === 'true'
if (useMock) {
  const mock = await import('./mock/user')
  const feedsMock = await import('./mock/feeds')
  console.log('Mock 已启用')
}

const app = createApp(App);

import router from "./router/index";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

app.use(router);
app.use(ElementPlus);

app.mount("#app");
