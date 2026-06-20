import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import {AuthProvider} from "./context/AuthContext";

import "./styles/theme.css";

import {TaskProvider} from "./context/TaskContext";

import {
  ModuleRegistry,
  ClientSideRowModelModule,
  PaginationModule,
  AllCommunityModule
}
from "ag-grid-community";

ModuleRegistry.registerModules([
  AllCommunityModule
]);

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>

        <AuthProvider>

            <TaskProvider>

                <App />

            </TaskProvider>

        </AuthProvider>

    </React.StrictMode>
);