import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { baseInfoModel } from "src/models/shared/baseInfoModel";

export function useBaseInfoModel(config) {
  const route = useRoute();
  const model = ref(config.model ?? baseInfoModel);
  const editBatchModel = ref(config.batchModel);

  const crudStore = useFormActions(config.baseRoute, model);

  async function getById(id) {
    if (id) await crudStore.getById(id);
    else if (config.getCreateModel) await crudStore.getCreateModel();
  }

  onMounted(() => {
    getById(route.params.id);
  });

  return {
    model,
    editBatchModel,
    crudStore,
  };
}
