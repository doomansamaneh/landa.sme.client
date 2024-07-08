import { ref, computed, watch } from "vue";
import { fetchWrapper } from "src/helpers";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { customerModel } from "src/models/areas/crm/customerModel";

import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";
import ResponseDialog from "src/components/areas/sls/invoice/shared/forms/ResponseDialog.vue";

export function useCustomerModel(config) {
  const $q = useQuasar();
  const router = useRouter();
  const { t } = useI18n();
  const model = config?.model ?? ref(customerModel);

  const crudStore = useFormActions(config.baseRoute, model);

  async function getById(id) {
    const responseData = await crudStore.getById(id);
    if (!model?.value?.person) model.value.person = {};
    return responseData;
  }

  async function getAddresses(id) {
    if (id) {
      const response = await fetchWrapper.get(
        `crm/customerAddress/getAddresses/${id}`
      );
      if (response.data.data)
        model.value.customerAddresses = response.data.data;
    }
  }

  async function getContacts(id) {
    if (id) {
      const response = await fetchWrapper.get(
        `crm/customerContact/getContacts/${id}`,
        false
      );
      if (response.data.data) {
        model.value.customerContactPhones = response.data.data.phones;
        model.value.customerContactMobiles =
          response.data.data.mobiles;
        model.value.customerContactEmails = response.data.data.emails;
        model.value.customerContactWebsites =
          response.data.data.websites;
      }
    }
  }

  const addItem = (arrayName, index) => {
    if (!model.value[arrayName]) model.value[arrayName] = [];
    const newItem = { isPrimary: false };
    if (index !== undefined) {
      model.value[arrayName].splice(index + 1, 0, newItem);
    } else {
      model.value[arrayName].push(newItem);
    }
  };

  const deleteItem = (arrayName, index) => {
    model.value[arrayName].splice(index, 1);
  };

  const addAddress = (index) => addItem("customerAddresses", index);
  const deleteAddress = (index) =>
    deleteItem("customerAddresses", index);

  const addPhone = (index) => addItem("customerContactPhones", index);
  const deletePhone = (index) =>
    deleteItem("customerContactPhones", index);

  const addMobile = (index) =>
    addItem("customerContactMobiles", index);
  const deleteMobile = (index) =>
    deleteItem("customerContactMobiles", index);

  const addEmail = (index) => addItem("customerContactEmails", index);
  const deleteEmail = (index) =>
    deleteItem("customerContactEmails", index);

  const addWebsite = (index) =>
    addItem("customerContactWebsites", index);
  const deleteWebsite = (index) =>
    deleteItem("customerContactWebsites", index);

  async function submitForm(form, action) {
    await crudStore.submitForm(form, action, saveCallBack);
    function saveCallBack(responseData) {
      if (responseData?.code === 200) {
        $q.dialog({
          component: ResponseDialog,
          componentProps: {
            responseData: responseData.data,
            baseRoute: config.baseRoute,
            //title: t("shared.labels.deleteConfirm"),
            //message: `${t("shared.labels.deleteMessage")}.`,
            // ok: t("shared.labels.delete"),
            // okColor: "deep-orange-7",
          },
        }).onOk(async () => {
          router.back();
        });
      }
    }
  }

  return {
    model,
    crudStore,
    addAddress,
    deleteAddress,
    addPhone,
    deletePhone,
    addMobile,
    deleteMobile,
    addEmail,
    deleteEmail,
    addWebsite,
    deleteWebsite,

    getById,
    getAddresses,
    getContacts,
    submitForm,
  };
}
