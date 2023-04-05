import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "@mui/material";

import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import appTheme from "@config/themes/appTheme";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={appTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </StrictMode>
  );
}
