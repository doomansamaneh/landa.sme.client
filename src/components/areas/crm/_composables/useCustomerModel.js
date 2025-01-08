import { ref } from "vue";
import { fetchWrapper } from "src/helpers";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useFormActions } from "src/composables/useFormActions";
import { customerModel } from "src/models/areas/crm/customerModel";

import ResponseDialog from "src/components/areas/crm/customer/shared/forms/ResponseDialog.vue";

export function useCustomerModel(config) {
  const $q = useQuasar();
  const router = useRouter();
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

  async function submitForm(form, action, callBack) {
    if (
      !model.value.name &&
      (model.value.person?.name || model.value.person?.lastName)
    )
      model.value.name = `${model.value.person.name ?? ""} ${
        model.value.person.lastName ?? ""
      }`;

    await crudStore.submitForm(form, action, saveCallBack);

    function saveCallBack(responseData) {
      if (responseData?.code === 200 && config?.resetCallback)
        config.resetCallback();

      if (callBack) callBack(responseData);
      else if (responseData?.code === 200) {
        $q.dialog({
          component: ResponseDialog,
          componentProps: {
            responseData: responseData.data,
            baseRoute: config.baseRoute,
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
