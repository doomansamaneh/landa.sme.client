import { defineConfig } from "#q-app/wrappers";
import { fileURLToPath } from "node:url";

export default defineConfig((ctx) => {
  return {
    boot: ["i18n", "axios", "quasar-lang-pack"],

    css: ["app.scss"],

    extras: [
      "roboto-font",
      "material-icons",
      "material-icons-outlined",
    ],

    build: {
      target: {
        browser: ["es2022", "firefox115", "chrome115", "safari14"],
        node: "node20",
      },

      vueRouterMode: "history",
      rebuildCache: true,

      env: {
        APP_VERSION: require("./package.json").version,
      },

      vitePlugins: [
        [
          "@intlify/unplugin-vue-i18n/vite",
          {
            ssr: ctx.modeName === "ssr",
            include: [
              fileURLToPath(new URL("./src/i18n", import.meta.url)),
            ],
          },
        ],
      ],
    },

    devServer: {
      port: 9000,
      open: true,
    },

    framework: {
      config: {},
      plugins: ["Loading", "Dialog", "Notify", "BottomSheet"],
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: ["render"],
      pwa: false,
      pwaOfflineHtmlFilename: "offline.html",
    },

    pwa: {
      //disable: true,
      workboxMode: "InjectManifest",
      injectManifest: {
        swSrc: "src-pwa/custom-service-worker.js",
      },

      extendPWACustomSWConf(esbuildConf) {
        esbuildConf.define = {
          ...esbuildConf.define,
          "process.env.APP_VERSION": JSON.stringify(
            require("./package.json").version
          ),
        };
      },

      extendInjectManifestOptions(cfg) {
        cfg.additionalManifestEntries =
          cfg.additionalManifestEntries || [];
      },
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      preloadScripts: ["electron-preload"],
      inspectPort: 5858,
      bundler: "packager",

      builder: {
        appId: "landa-sme-client",
      },
    },

    bex: {
      extraScripts: [],
    },
  };
});
