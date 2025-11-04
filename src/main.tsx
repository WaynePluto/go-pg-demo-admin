import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { initRouteModules } from "./router";
import "@ant-design/v5-patch-for-react-19";
import "./styles/reset.css";
import "uno.css";
import "./styles/ant-table-body.scss";
async function start() {
  try {
    const router = await initRouteModules();

    ReactDOM.createRoot(document.getElementById("app")!).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    );
  } catch (error) {
    //
  }
}

start();
