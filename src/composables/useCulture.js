import { ref, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { cultures } from "src/constants/enums";

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

  const setCulture = (iso) => {
    lang.value = iso;
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
    } catch (error) {
      console.log("error setLang", error);
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
