import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";
import "@fontsource-variable/noto-sans/wght.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import { store } from "./store";
import { theme } from "./theme";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html {...mantineHtmlProps}>
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
        <ColorSchemeScript />
      </head>
      <body>
        <Provider store={store}>
          <MantineProvider defaultColorScheme="auto" theme={theme}>
            <Notifications />
            <ModalsProvider>{children}</ModalsProvider>
          </MantineProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
