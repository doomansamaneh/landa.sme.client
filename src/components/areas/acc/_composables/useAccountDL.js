import { fetchWrapper } from "src/helpers";

export function useAccountDL() {
  async function getDlBalance(dlId) {
    const response = await fetchWrapper.get(
      `acc/report/getDlBalance/${dlId}`,
      null,
      true
    );
    return response.data?.data;
  }

  return {
    getDlBalance,
  };
}
