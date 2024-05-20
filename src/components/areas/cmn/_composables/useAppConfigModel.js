import { ref } from "vue";
import { fetchWrapper } from "src/helpers";

const firstLoad = ref(false);
const model = ref({
  companySetting: {
    taxApiSetting: {},
    payrollTaxSetting: {},
    payrollInsurranceSetting: {},
  },
});

export function useAppConfigModel() {
  const reloadData = async () => {
    firstLoad.value = true;
    const response = await fetchWrapper.get(
      "cmn/AppConfig/GetAppConfig"
    );
    model.value = response?.data?.data;
  };

  const reset = () => {
    firstLoad.value = false;
  };

  const loadData = async () => {
    if (!firstLoad.value) {
      reloadData();
    }
  };

  loadData();

  const uploadFile = async (file, fieldId) => {
    const formData = new FormData();
    formData.append("file", file);
    //formData.append("entityName", "Cmn.AppConfig");

    const response = await fetchWrapper.post(
      "cmn/UploadMedia/SaveMedia",
      formData
    );
    model.value[fieldId] = response?.data?.data.id;
  };

  return {
    model,
    reset,
    uploadFile,
  };
}
