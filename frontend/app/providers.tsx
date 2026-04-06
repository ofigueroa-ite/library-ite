"use client";

import { MantineProvider } from "@mantine/core";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { theme } from "./theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </Provider>
  );
}
