export function useBusiness() {
  const key = "selectedBusiness";
  const businessLanguagesKey = "businessLanguages";

  const set = (business) => {
    localStorage.setItem(key, JSON.stringify(business));
  };

  const get = () => {
    const value = localStorage.getItem(key);
    if (!value) return null;
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error("Failed to parse selectedBusiness:", e);
      return null;
    }
  };

  const getBusinessLanguages = () => {
    const value = localStorage.getItem(businessLanguagesKey);
    if (!value) return {};
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error("Failed to parse businessLanguages:", e);
      return {};
    }
  };

  const setBusinessLanguages = (languages) => {
    localStorage.setItem(businessLanguagesKey, JSON.stringify(languages));
  };

  const getLanguage = (businessId = null) => {
    if (!businessId) {
      const business = get();
      businessId = business?.id;
    }
    if (!businessId) return null;
    
    const languages = getBusinessLanguages();
    return languages[businessId] || null;
  };

  const setLanguage = (language, businessId = null) => {
    if (!businessId) {
      const business = get();
      businessId = business?.id;
    }
    if (!businessId) return;

    const languages = getBusinessLanguages();
    languages[businessId] = language;
    setBusinessLanguages(languages);

    const currentBusiness = get();
    if (currentBusiness?.id === businessId) {
      set({
        ...currentBusiness,
        language: language,
      });
    }
  };

  return {
    set,
    get,
    getLanguage,
    setLanguage,
  };
}
