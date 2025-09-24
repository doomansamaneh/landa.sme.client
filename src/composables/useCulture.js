import { ref, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { cultures } from "src/constants/enums";
import { fetchWrapper } from "src/helpers/fetch-wrapper";

export function useCulture() {
  const GeneralStorageKey = "selectedLanguage";
  const cookieKey = ".Landa.SME.Culture";

  const $t = useI18n();
  const $q = useQuasar();

  const qLangList = import.meta.glob(
    "/node_modules/quasar/lang/(en-US|fa-IR|ar).js"
  );

  const defaultLanguage = "fa-IR";
  const lang = ref(
    localStorage.getItem(GeneralStorageKey) || defaultLanguage
  );

  const culture = computed(() =>
    cultures.find((culture) => culture.iso === lang.value)
  );

  const setCulture = async (iso) => {
    // Update the local language - applyCulture will handle the API call
    lang.value = iso;
  };

  const getCultureCode = (iso) => {
    // Map ISO codes to API culture codes
    const cultureMap = {
      "fa-IR": "fa",
      "en-US": "en",
      ar: "ar",
    };
    return cultureMap[iso] || "fa";
  };

  const changeLocale = async (cultureCode) => {
    return await fetchWrapper.post(
      `account/changeLocale/${cultureCode}`,
      null,
      true
    );
  };

  const applyCulture = async () => {
    try {
      const iso = culture.value.iso;
      const langModule = await qLangList[
        `/node_modules/quasar/lang/${iso}.js`
      ]();
      $q.lang.set(langModule.default);
      $t.locale.value = lang.value;

      localStorage.setItem(GeneralStorageKey, iso);

      document.body.classList.remove("persian", "english", "arabic");
      document.body.classList.add(culture.value.bodyClass);

      localStorage.setItem("Digits", culture.value.bodyClass);

      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      const cookieString = `${cookieKey}=${
        culture.value.iso
      }; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = cookieString;

      // Always call API to sync server-side culture
      const cultureCode = getCultureCode(iso);
      try {
        await changeLocale(cultureCode);
      } catch {
        // Don't throw error here as we want the UI to still work
      }
    } catch {
      // Error handling for culture setting
    }
  };

  if (!localStorage.getItem(GeneralStorageKey)) {
    document.body.classList.add("persian");
  }

  (async () => {
    await applyCulture();
  })();

  watch(lang, async () => {
    await applyCulture();
  });

  return {
    culture,
    setCulture,
  };
}
