import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/userContext.jsx";
import "flowbite";
import "./index.css";
const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
