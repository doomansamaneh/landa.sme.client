export function useBusiness() {
  const key = "selectedBusiness";

  const set = (business) => {
    localStorage.setItem(key, JSON.stringify(business));
    //const cookieKey = ".Landa.SME.SelectedBusiness";
    // const expirationDate = new Date();
    // expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    // const cookieString = `${cookieKey}=${
    //   business.id
    // }; expires=${expirationDate.toUTCString()}; path=/`;
    // document.cookie = cookieString;
  };
  const get = () => {
    return JSON.parse(localStorage.getItem(key) ?? "");
  };
  return {
    set,
    get,
  };
}
