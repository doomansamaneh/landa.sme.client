import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { baseInfoModel } from "src/models/shared/baseInfoModel";

export function useBaseInfoModel({
  model,
  batchModel,
  baseRoute,
  getCreateModel,
}) {
  const route = useRoute();
  const localModel = ref(model ?? baseInfoModel);
  const editBatchModel = ref(batchModel);

  const crudStore = useFormActions(baseRoute, localModel);

  async function getById(id) {
    if (id) await crudStore.getById(id);
    else if (getCreateModel) await crudStore.getCreateModel();
  }

  onMounted(() => {
    getById(route.params.id);
  });

  return {
    model: localModel,
    editBatchModel,
    crudStore,
  };
}
