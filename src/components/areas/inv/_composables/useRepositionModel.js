import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchWrapper } from "src/helpers";
import { useFormActions } from "src/composables/useFormActions";
import { repositionModel } from "src/models/areas/inv/repositionModel";
import { useFormItemsModel } from "src/composables/useFormItemsModel";

export function useRepositionModel({ baseRoute }) {
  const router = useRouter();

  const model = ref(repositionModel);
  const formItemStore = useFormItemsModel();

  const crudStore = useFormActions(baseRoute, model);

  async function getById(id, action) {
    let responseData = null;
    if (id) {
      responseData = await crudStore.getById(id);
    } else responseData = await crudStore.getCreateModel();

    if (responseData) {
      if (action === "copy") {
        model.value.fiscalYearId = null;
      }
    }

    setItems();
  }

  async function addAllProducts() {
    const responseData = await fetchWrapper.get(
      "inv/openingStock/getAllProducts"
    );
    addItemsFromResponse(responseData);
  }

  function addItemsFromResponse(responseData) {
    if (responseData?.data?.data) {
      responseData.data.data.forEach((item) => {
        const exists = model.value.repositionItems.some(
          (c) => c.productId === item.productId
        );

        if (!exists) {
          formItemStore.pushNewItem(model.value.repositionItems, {
            productId: item.productId,
            productCode: item.productCode,
            productTitle: item.productTitle,
            quantity: item.quantity,
            price: item.price,
          });
        }
      });
    }
  }

  async function importProduct(action, file) {
    if (!file?.value) {
      alert("pls select a file");
      return;
    }
    const formData = new FormData();
    formData.append("ImportFile", file.value);
    const responseData = await fetchWrapper.post(
      `{baseRoute}/${action}`,
      formData
    );
    addItemsFromResponse(responseData);
  }

  function deleteAllProducts() {
    model.value.repositionItems = [];
  }

  function setItems() {
    if (!model.value.repositionItems)
      model.value.repositionItems = [];
  }

  const addNewRow = (index) => {
    const newRow = { quantity: 0 };
    formItemStore.addNewItem(
      model.value.repositionItems,
      index,
      newRow
    );
  };

  const pushNewRow = (item) => {
    if (item)
      formItemStore.pushNewItem(model.value.repositionItems, item);
    else
      formItemStore.pushNewItem(model.value.repositionItems, {
        quantity: 0,
      });
  };

  const deleteRow = (index) => {
    formItemStore.deleteItem(model.value.repositionItems, index);
  };

  async function submitForm(form, action) {
    await crudStore.submitForm(form, action, saveCallBack);
    function saveCallBack(responseData) {
      //stateStore.state.firstLoad.value = false;
      router.back();
    }
  }

  return {
    model,
    crudStore,

    getById,
    newAddedItemIndex: formItemStore.newAddedItemIndex,
    pushNewRow,
    addNewRow,
    deleteRow,
    addAllProducts,
    deleteAllProducts,
    importProduct,

    submitForm,
  };
}
