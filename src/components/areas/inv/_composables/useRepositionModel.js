import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchWrapper } from "src/helpers";
import { useFormActions } from "src/composables/useFormActions";
import { repositionModel } from "src/models/areas/inv/repositionModel";
import { quantity } from "src/constants/columns";

export function useRepositionModel({ baseRoute }) {
  const router = useRouter();

  const model = ref(repositionModel);

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
    if (responseData?.data?.data) {
      responseData.data.data.forEach((item) => {
        const exists = model.value.repositionItems.some(
          (c) => c.productId === item.productId
        );

        if (!exists) {
          model.value.repositionItems.push({
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

  function deleteAllProducts() {
    model.value.repositionItems = [];
  }

  function setItems() {
    if (!model.value.repositionItems)
      model.value.repositionItems = [];
  }

  const addNewRow = (index) => {
    const newRow = { quantity: 0 };
    model.value.repositionItems.splice(index + 1, 0, newRow);
  };

  const pushNewRow = (item) => {
    if (item) model.value.repositionItems.push(item);
    else model.value.repositionItems.push({ quantity: 0 });
  };

  const deleteRow = (index) => {
    model.value.repositionItems.splice(index, 1);
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
    pushNewRow,
    addNewRow,
    deleteRow,
    addAllProducts,
    deleteAllProducts,

    submitForm,
  };
}
