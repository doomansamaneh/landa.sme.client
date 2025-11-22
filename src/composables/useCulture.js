import { ref, watch, computed } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { cultures } from "src/constants/enums";
import { fetchWrapper } from "src/helpers/fetch-wrapper";
import { useBusiness } from "src/stores/useBusiness";

export function useCulture() {
  const GeneralStorageKey = "selectedLanguage";
  const cookieKey = ".Landa.SME.Culture";
  const businessStore = useBusiness();

  const $t = useI18n();
  const $q = useQuasar();

  const qLangList = import.meta.glob(
    "/node_modules/quasar/lang/(en-US|fa-IR|ar).js"
  );

  const defaultLanguage = "fa-IR";

  const getLanguageForBusiness = () => {
    const business = businessStore.get();
    if (business?.id) {
      const businessLanguage = businessStore.getLanguage();
      return businessLanguage || defaultLanguage;
    }
    return localStorage.getItem(GeneralStorageKey) || defaultLanguage;
  };

  const lang = ref(getLanguageForBusiness());

  const culture = computed(() => {
    const found = cultures.find(
      (culture) => culture.iso === lang.value
    );
    return (
      found ||
      cultures.find((culture) => culture.iso === defaultLanguage) ||
      cultures[0]
    );
  });

  const setCulture = async (iso) => {
    lang.value = iso;
  };

  const reloadLanguageForCurrentBusiness = () => {
    const newLang = getLanguageForBusiness();
    if (newLang !== lang.value) {
      lang.value = newLang;
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", (e) => {
      if (e.key === "selectedBusiness") {
        reloadLanguageForCurrentBusiness();
      }
    });
  }

  const getCultureCode = (iso) => {
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
      if (!culture.value) return;
      const iso = culture.value.iso;
      const langModule = await qLangList[
        `/node_modules/quasar/lang/${iso}.js`
      ]();
      $q.lang.set(langModule.default);
      $t.locale.value = lang.value;

      const business = businessStore.get();
      if (business?.id) {
        businessStore.setLanguage(iso);
      } else {
        localStorage.setItem(GeneralStorageKey, iso);
      }

      document.body.classList.remove("persian", "english", "arabic");
      document.body.classList.add(culture.value.bodyClass);

      localStorage.setItem("Digits", culture.value.bodyClass);

      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      const cookieString = `${cookieKey}=${
        culture.value.iso
      }; expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = cookieString;

      const cultureCode = getCultureCode(iso);
      try {
        await changeLocale(cultureCode);
      } catch {}
    } catch {}
  };

  if (
    !businessStore.getLanguage() &&
    !localStorage.getItem(GeneralStorageKey)
  ) {
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
    reloadLanguageForCurrentBusiness,
  };
}
