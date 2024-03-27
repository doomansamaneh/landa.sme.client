import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";
import { baseInfoModel } from "src/models/shared/baseInfoModel";

export function useBaseInfoModel(baseRoute, defaultModel, getCreateModel) {
  const route = useRoute();
  const model = ref(defaultModel ?? baseInfoModel);

  const crudStore = useFormActions(baseRoute, model);

  async function getById(id) {
    if (id) await crudStore.getById(id);
    else if (getCreateModel) await crudStore.getCreateModel();
  }

  onMounted(() => {
    getById(route.params.id);
  });

  return {
    model,
    crudStore,
  };
}
