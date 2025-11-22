import { ref } from "vue";
import { fetchWrapper } from "src/helpers";
import { useFiscalYear } from "src/components/areas/acc/_composables/useFiscalYear";
import { useComposables } from "src/stores/useComposables";
import { useMenuBar } from "src/composables/useMenuBar";
import { useCulture } from "src/composables/useCulture";
import { useBusiness } from "src/stores/useBusiness";
import { mediaType } from "src/constants";

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
  const businessStore = useBusiness();

  const reloadData = async () => {
    firstLoad.value = true;
    const response = await fetchWrapper.get(
      "cmn/appConfig/getAppConfig",
      undefined,
      true
    );
    model.value = response?.data?.data.appConfig;
    userSetting.value = response?.data?.data.userSetting;
    if (userSetting?.value) {
      const business = businessStore.get();
      const storedBusinessLanguage = business?.id
        ? businessStore.getLanguage()
        : null;

      const languageToSet =
        storedBusinessLanguage || userSetting.value.currentCulture;
      cultureStore.setCulture(languageToSet);

      if (business?.id && !storedBusinessLanguage) {
        businessStore.setLanguage(userSetting.value.currentCulture);
      }

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

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetchWrapper.post(
      "cmn/UploadMedia/Upload",
      formData
    );
    return response;
  };

  const uploadLogo = async (file) => {
    const response = await uploadFile(file);
    model.value.companySetting.tempLogo = response?.data?.data;
  };

  const uploadSignature = async (file) => {
    const response = await uploadFile(file);
    model.value.companySetting.tempSignature = response?.data?.data;
  };

  const resetAvatars = () => {
    if (model.value?.companySetting?.tempLogo)
      model.value.companySetting.tempLogo.changed = false;
    if (model.value?.companySetting?.tempSignature)
      model.value.companySetting.tempSignature.changed = false;
  };

  const saveAppConfig = async () => {
    const response = await fetchWrapper.post(
      "cmn/AppConfig/SaveAppConfig",
      model.value.companySetting
    );
    resetAvatars();
    return response;
  };

  const getAvatar = async (typeId, width, height) => {
    const id = model.value.companySetting.id;
    if (!id) return "";

    const url = `cmn/uploadMedia/GetAvatar/${id}/${
      typeId ?? mediaType.avatar
    }/${width ?? 30}/${height ?? 30}`;
    const response = await fetchWrapper.get(url, null, true);
    if (response.data.data)
      return `data:image/jpeg;base64, ${response.data.data}`;
    return "";
  };

  return {
    model,
    userSetting,
    getAvatar,

    reset,
    reloadData,
    resetAvatars,
    uploadLogo,
    uploadSignature,
    saveAppConfig,
  };
}
