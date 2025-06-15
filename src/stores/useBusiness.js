export function useBusiness() {
  const key = "selectedBusiness";

  const set = (business) => {
    localStorage.setItem(key, JSON.stringify(business));
  };
  const get = () => {
    return JSON.parse(localStorage.getItem(key) ?? "");
  };
  return {
    set,
    get,
  };
}
