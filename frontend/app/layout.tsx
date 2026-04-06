import "@mantine/core/styles.css";
import "./globals.css";
import "@fontsource-variable/noto-sans/wght.css";

import { mantineHtmlProps } from "@mantine/core";
import Providers from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" {...mantineHtmlProps}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
