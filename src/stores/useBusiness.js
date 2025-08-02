export function useBusiness() {
  const key = "selectedBusiness";

  const set = (business) => {
    localStorage.setItem(key, JSON.stringify(business));
  };

  const get = () => {
    const value = localStorage.getItem(key);
    if (!value) return null; // یا مقدار پیش‌فرض
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error("Failed to parse selectedBusiness:", e);
      return null;
    }
  };

  return {
    set,
    get,
  };
}
