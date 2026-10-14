import type { ReactNode } from 'react';
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  Outlet,
} from "react-router";

import { MantineProvider } from '@mantine/core';
import "@mantine/core/styles.css";
import "./index.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { Route } from "./+types/root";
import {
  theme,
  cssVariablesResolver,
} from "./theme";

export function Layout({ children }: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <Meta />
      <Links />
    </head>
    <body>
    {children}
    <ScrollRestoration />
    <Scripts />
    </body>
    </html>
  );
}

export default function App() {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={cssVariablesResolver}
      defaultColorScheme="dark"
    >
      <Outlet />
    </MantineProvider>
  )
}

export function links(): Route.LinksFunction {
  return [
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.svg",
    },
  ];
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Data Studio" },
    {
      name: "description",
      content: "Explore, analyze and visualize your data.",
    },
    { name: "theme-color", content: "#0F0F0F" },
  ];
}