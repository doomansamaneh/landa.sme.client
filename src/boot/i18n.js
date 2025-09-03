import { createI18n } from "vue-i18n";
import messages from "src/i18n";

export let i18nInstance;

export default ({ app }) => {
  // Create I18n instance
  i18nInstance = createI18n({
    legacy: false,
    useGlobal: true,
    locale: localStorage.getItem("selectedLanguage") || "fa-IR",
    Injection: true,
    messages,
  });

  // Tell app to use the I18n instance
  app.use(i18nInstance);
};
