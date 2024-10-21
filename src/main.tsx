// import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import "./style/Main.css";
import "flowbite";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes";
import OpsiProvider from "./state/OptionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <OpsiProvider>
      <RouterProvider router={Routes} />
    </OpsiProvider>
  </QueryClientProvider>
);
