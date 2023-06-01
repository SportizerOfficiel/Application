/** @format */

import { useWebSocket, WebSocketProvider } from "../Context/WebSocketContext";
import "../GlobalStyles/index.scss";
import { MantineProvider } from "@mantine/core";
import { GameProvider, SportProvider } from "@/Context/SportContext";
import { useRouter } from "next/router";
import { ModalsProvider } from "@mantine/modals";

import { appWithTranslation } from "next-i18next";
import { TimerProvider } from "@/Context/TimerContext";

function App({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <WebSocketProvider>
      <SportProvider>
        <TimerProvider>
          <AppTheme Component={Component} pageProps={pageProps}></AppTheme>
        </TimerProvider>
      </SportProvider>
    </WebSocketProvider>
  );
}

const AppTheme = ({ Component, pageProps }) => {
  const WebSocketContext = useWebSocket()
  return (
    <MantineProvider
      theme={{
        colorScheme: WebSocketContext.IsScreen ? "dark" : "light",
        colors: {
          brand: [
            "#E3DFD5",
            "#D6CEBA",
            "#CDC09E",
            "#C8B582",
            "#CAAE63",
            "#D1AA40",
            "#DBA81D",
            "#B48F2B",
            "#967B33",
            "#7E6B37",
            "#6B5D38",
            "#5C5237",
            "#4F4835",
          ],
        },
        primaryColor: "brand",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <ModalsProvider>
        <Component {...pageProps} />
      </ModalsProvider>
    </MantineProvider>
  );
};

export default appWithTranslation(App);
