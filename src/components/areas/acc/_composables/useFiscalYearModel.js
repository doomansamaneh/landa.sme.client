import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFormActions } from "src/composables/useFormActions";

export function useFiscalYearModel() {
  const route = useRoute();

  const model = ref({
    isActive: true,
  });

  const crudStore = useFormActions("acc/fiscalYear", model);

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
