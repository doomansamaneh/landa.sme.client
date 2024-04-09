import { ref } from "vue";
import { fetchWrapper } from "src/helpers";

export function useTaxApiLogModel() {
  const apiResult = ref("");
  const sendToTax = async (invoiceId, callback) => {
    const response = await fetchWrapper.post(
      `sls/InvoiceTaxApiLog/SendToTaxApi/${invoiceId}`
    );
    if (callback) await callback();
    //console.log(response);
  };

  const isSentApiSuccessfully = async (invoiceId) => {
    const response = await fetchWrapper.get(
      `sls/InvoiceTaxApiLog/IsSentApiSuccessfully/${invoiceId}`
    );
    apiResult.value = response.data;
    return response.data;
  };

  const inquery = async (id, callBack) => {
    await fetchWrapper.get(`sls/InvoiceTaxApiLog/Inquery/${id}`);
    if (callBack) callBack();
  };

  return {
    apiResult,

    sendToTax,
    inquery,
    isSentApiSuccessfully,
  };
}
