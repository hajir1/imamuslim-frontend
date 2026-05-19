// import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/Main.css";
import "flowbite";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes";
import OpsiProvider from "./stores/OptionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalAudioPlayer } from "./components/fragments/GlobalAudioPlayer";

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <OpsiProvider>
      <RouterProvider router={Routes} />
      <GlobalAudioPlayer />
    </OpsiProvider>
  </QueryClientProvider>,
);
