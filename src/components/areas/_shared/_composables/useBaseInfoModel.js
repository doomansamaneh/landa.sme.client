import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { baseInfoModel } from "src/models/shared/baseInfoModel";

export function useBaseInfoModel({
  model,
  batchModel,
  baseRoute,
  getCreateModel,
  id,
  resetCallback,
}) {
  const route = useRoute();
  const router = useRouter();
  const localModel = model ?? ref({ ...baseInfoModel });
  const editBatchModel = ref(batchModel);

  const crudStore = useFormActions(baseRoute, localModel);

  async function getById(id) {
    if (id) await crudStore.getById(id);
    else if (getCreateModel) await crudStore.getCreateModel();
  }

  async function submitForm(
    form,
    action,
    callBack = () => router.back()
  ) {
    await crudStore.submitForm(form, action, saveCallBack);
    function saveCallBack(responseData) {
      if (resetCallback) resetCallback();
      callBack(responseData);
    }
  }

  onMounted(() => {
    const selectedId = id ?? route.params.id;
    getById(selectedId);
  });

  return {
    model: localModel,
    editBatchModel,
    submitForm,
    crudStore,
  };
}
