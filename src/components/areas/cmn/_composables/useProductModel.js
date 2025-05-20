import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { productModel } from "src/models/areas/cmn/productModel";

import ResponseDialog from "src/components/areas/cmn/product/shared/forms/ResponseDialog.vue";

export function useProductModel(config) {
  const $q = useQuasar();
  const router = useRouter();
  const model = config?.model ?? ref(productModel);

  const crudStore = useFormActions(config.baseRoute, model);

  async function getById(id) {
    return await crudStore.getById(id);
  }

  async function submitForm(form, action, callBack) {
    await crudStore.submitForm(form, action, saveCallBack);

    function saveCallBack(responseData) {
      if (responseData?.code === 200 && config?.resetCallback)
        config.resetCallback();

      if (callBack) callBack(responseData);
      else if (responseData?.code === 200) {
        $q.dialog({
          component: ResponseDialog,
          componentProps: {
            responseData: responseData.data,
            baseRoute: config.baseRoute,
          },
        }).onOk(async () => {
          router.back();
        });
      }
    }
  }

  return {
    model,
    crudStore,
    getById,
    submitForm,
  };
}
