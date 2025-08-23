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
  afterGetByIdCallback,
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
    await crudStore.submitForm(form, action, (responseData) => {
      if (resetCallback) resetCallback();

      if (callBack) callBack(responseData);
      else router.back(responseData);
    });
  }

<<<<<<< HEAD
  // onMounted(() => {
  //   const selectedId = id ?? route.params.id;
  //   getById(selectedId);
  // });
=======
  onMounted(async () => {
    const selectedId = id ?? route.params.id;
    await getById(selectedId);

    if (afterGetByIdCallback)
      await afterGetByIdCallback(localModel.value);
  });
>>>>>>> be6b812978456eae930a2d9aee097e7a5ce25e4f

  return {
    model: localModel,
    editBatchModel,
    submitForm,
    crudStore,
    getById,
    getCreateModel,
  };
}
