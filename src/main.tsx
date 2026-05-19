// import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import "./styles/index.css";
import "./styles/Main.css";
import "flowbite";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes";
import OpsiProvider from "./stores/OptionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalAudioPlayer } from "./components/fragments/GlobalAudioPlayer";
=======
import "./style/index.css";
import "./style/Main.css";
import "flowbite";
import { RouterProvider } from "react-router-dom";
import Routes from "./Routes";
import OpsiProvider from "./state/OptionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1

const queryClient: QueryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <OpsiProvider>
      <RouterProvider router={Routes} />
<<<<<<< HEAD
      <GlobalAudioPlayer />
    </OpsiProvider>
  </QueryClientProvider>,
=======
    </OpsiProvider>
  </QueryClientProvider>
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1
);
