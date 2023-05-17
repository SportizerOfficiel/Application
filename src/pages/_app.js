/** @format */

import { WebSocketProvider } from "../Context/WebSocketContext";
import "../GlobalStyles/index.scss";
import { MantineProvider } from "@mantine/core";
import { GameProvider, SportProvider } from "@/Context/SportContext";
import { useRouter } from "next/router";

import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
      <SportProvider>
        <WebSocketProvider>
          <MantineProvider
            theme={{
              colorScheme: "light",
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
            <Component {...pageProps} />
          </MantineProvider>
        </WebSocketProvider>
      </SportProvider>
  );
}

export default appWithTranslation(App);