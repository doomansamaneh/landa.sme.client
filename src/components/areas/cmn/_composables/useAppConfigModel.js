import { ref } from "vue";
import { fetchWrapper } from "src/helpers";
import { useFiscalYear } from "src/components/areas/acc/_composables/useFiscalYear";
import { useComposables } from "src/stores/useComposables";
import { useMenuBar } from "src/composables/useMenuBar";
import { useCulture } from "src/composables/useCulture";

const firstLoad = ref(false);
const model = ref({
  companySetting: {
    taxApiSetting: {},
    payrollTaxSetting: {},
    payrollInsurranceSetting: {},
  },
});

const userSetting = ref({});

export function useAppConfigModel(disableLoad) {
  const composablesStore = useComposables();
  const menuStore = useMenuBar();
  const fiscalYearStore = useFiscalYear();
  const cultureStore = useCulture();

  const reloadData = async () => {
    firstLoad.value = true;
    const response = await fetchWrapper.get(
      "cmn/AppConfig/GetAppConfig"
    );
    model.value = response?.data?.data.appConfig;
    userSetting.value = response?.data?.data.userSetting;
    if (userSetting?.value) {
      cultureStore.setCulture(userSetting.value.currentCulture);
      fiscalYearStore.setFiscalYear({
        id: userSetting.value.fiscalYearId,
        title: userSetting.value.fiscalYear,
        selected: true,
      });
    }
  };

  const reset = () => {
    firstLoad.value = false;
    composablesStore.reset();
    menuStore.reset();
    fiscalYearStore.reset();
    reloadData();
  };

  const loadData = async () => {
    if (!firstLoad.value) {
      reloadData();
    }
  };

  if (!disableLoad) loadData();

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
    userSetting,
    reset,
    uploadFile,
  };
}
