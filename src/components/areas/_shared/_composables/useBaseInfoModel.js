import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";

export function useBaseInfoModel(baseRoute) {
  const route = useRoute();
  const model = ref({
    isActive: true,
  });

  const crudStore = useFormActions(baseRoute, model);

  async function getById(id) {
    return await crudStore.getById(id);
  }

  onMounted(() => {
    getById(route.params.id);
  });

  return {
    model,
    crudStore,
  };
}
