import { ref } from "vue";
import { fetchWrapper } from "src/helpers";
import { useComposables } from "src/stores/useComposables";

const firstLoad = ref(false);
const model = ref({});

export function usePublicApiModel() {
  const composablesStore = useComposables();

  const reloadData = async () => {
    firstLoad.value = true;
    const response = await fetchWrapper.get(
      "cmn/appConfig/getApiSetting",
      undefined,
      true
    );
    model.value = response?.data?.data;
  };

  const reset = () => {
    firstLoad.value = false;
    composablesStore.reset();
    reloadData();
  };

  const loadData = async () => {
    if (!firstLoad.value) {
      reloadData();
    }
  };

  const generateToken = async () => {
    const response = await fetchWrapper.post(
      "cmn/appConfig/generateToken",
      model.value
    );
    model.value.token = response?.data?.data;
  };

  const saveSetting = async () => {
    const response = await fetchWrapper.post(
      "cmn/AppConfig/publicApiSettingSave",
      model.value
    );
    return response;
  };

  return {
    model,

    reset,
    generateToken,
    loadData,
    reloadData,
    saveSetting,
  };
}
