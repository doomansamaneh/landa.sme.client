import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { baseInfoModel } from "src/models/shared/baseInfoModel";

export function useBaseInfoModel({
  model,
  batchModel,
  baseRoute,
  loadCreateModel,
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
    else await getCreateModel();
  }

  async function getCreateModel() {
    if (loadCreateModel) await crudStore.getCreateModel();
    else localModel.value = model?.value ?? { ...baseInfoModel };
  }

  async function submitForm(form, action, callBack) {
    await crudStore.submitForm(form, action, saveCallBack);
    function saveCallBack(responseData) {
      if (resetCallback) resetCallback();
      else if (callBack) callBack(responseData);
      else router.back(responseData);
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
    getCreateModel,
  };
}
