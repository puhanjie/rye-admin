import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/reset.css";
import "@/locales";

const env = import.meta.env.MODE;

// 开发环境启用mock
if (env === "dev") {
  import("../mock/index");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App env={env} />
);
