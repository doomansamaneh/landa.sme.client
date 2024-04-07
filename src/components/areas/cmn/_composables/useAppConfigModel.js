import { ref } from "vue";
import { fetchWrapper } from "src/helpers";

const firstLoad = ref(true);
const model = ref(null);

export function useAppConfigModel() {
  const loadData = async () => {
    firstLoad.value = false;
    const response = await fetchWrapper.get("cmn/AppConfig/GetAppConfig");
    model.value = response?.data?.data;
  };

  const reset = () => {
    firstLoad.value = true;
  };

  if (firstLoad.value) {
    loadData();
  }

  return {
    model,
    reset,
  };
}
