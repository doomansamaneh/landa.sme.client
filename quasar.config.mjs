import { configure } from "quasar/wrappers";
import path from "path";

export default configure(function (/* ctx */) {
  return {
    eslint: {
      warnings: true,
      errors: true,
    },

    boot: ["axios", "i18n", "quasar-lang-pack"],

    css: ["app.scss"],

    extras: [
      "roboto-font",
      "material-icons",
      "material-icons-outlined",
    ],

    build: {
      extendViteConf(config) {
        config.build.chunkSizeWarningLimit = 1600;
      },
      publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
      target: {
        browser: [
          "es2019",
          "edge88",
          "firefox78",
          "chrome87",
          "safari13.1",
        ],
        node: "node16",
      },
      rtl: true,
      vueRouterMode: "history",
      rebuildCache: true,
      vitePlugins: [
        [
          "@intlify/vite-plugin-vue-i18n",
          {
            compositionOnly: false,
            runtimeOnly: false,
            include: path.resolve(__dirname, "./src/i18n/**"),
          },
        ],
      ],
    },

    devServer: {
      open: true,
    },

    framework: {
      config: {
        screen: { bodyClasses: true },
        capacitor: { backButton: true },
      },
      iconSet: "material-icons",
      lang: "fa-IR",
      plugins: [
        "LocalStorage",
        "Loading",
        "Notify",
        "Dialog",
        "BottomSheet",
      ],
    },

    animations: "all",
  };
});
