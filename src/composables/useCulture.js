import { ref, watch, computed } from "vue";
import { useQuasar, Quasar } from "quasar";
import { useI18n } from "vue-i18n";
import { cultures } from "src/constants/enums";

export function useCulture() {
  const storageKey = "selectedLanguage";
  const cookieKey = ".Landa.SME.Culture";

  const { locale } = useI18n();
  const $q = useQuasar();

  const qLangList = import.meta.glob(
    "/node_modules/quasar/lang/(en-US|fa-IR|ar).mjs"
  );

  const lang = ref(localStorage.getItem(storageKey) || $q.lang.isoName);

  const culture = computed(() =>
    cultures.find((culture) => culture.iso === lang.value)
  );

  const setCulture = (iso) => {
    lang.value = iso;
  };

  const applyCulture = async () => {
    try {
      const iso = culture.value.iso;
      const langModule = await qLangList[
        `/node_modules/quasar/lang/${iso}.mjs`
      ]();
      Quasar.lang.set(langModule.default);
      //$t.locale.value = lang.value;
      locale.value = iso;
      localStorage.setItem(storageKey, iso);

      document.body.classList.remove("persian", "english", "arabic");
      document.body.classList.add(culture.value.bodyClass);

      // Set cookie for the selected language with a one-year expiration
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      const cookieString = `${cookieKey}=${
        culture.value.iso
      }; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = cookieString;
    } catch (error) {
      console.log("error setLang", error);
    }
  };

  watch(lang, async () => {
    await applyCulture();
  });

  return {
    culture,
    setCulture,
  };
}
