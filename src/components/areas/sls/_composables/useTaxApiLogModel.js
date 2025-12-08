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

  const sendToTaxBatch = async (invoiceIds, callback) => {
    const response = await fetchWrapper.post(
      `sls/InvoiceTaxApiLog/SendToTaxApiBatch`,
      invoiceIds
    );
    if (callback) await callback();
  };

  const sendCancelToTax = async (invoiceId, callback) => {
    const response = await fetchWrapper.post(
      `sls/InvoiceTaxApiLog/CancelInvoiceByDocNo/${invoiceId}`
    );
    if (callback) await callback();
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

  const inqueryBatch = async (invoiceIds, callBack) => {
    await fetchWrapper.post(
      `sls/InvoiceTaxApiLog/InqueryTaxBatch`,
      invoiceIds
    );
    if (callBack) callBack();
  };

  return {
    apiResult,

    sendToTax,
    sendToTaxBatch,
    sendCancelToTax,
    inquery,
    inqueryBatch,
    isSentApiSuccessfully,
  };
}
