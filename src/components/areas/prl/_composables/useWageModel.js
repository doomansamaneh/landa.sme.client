import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchWrapper } from "src/helpers";
import { useFormActions } from "src/composables/useFormActions";
import { useFormItemsModel } from "src/composables/useFormItemsModel";
import { wageModel } from "src/models/areas/prl/wageModel";
import { useWageState } from "./useWageState";
import { insuranceType } from "src/constants";

export function useWageModel({ baseRoute, preview }) {
  const router = useRouter();
  const stateStore = useWageState();

  const model = ref(wageModel);

  const crudStore = useFormActions(baseRoute, model);
  const formItemStore = useFormItemsModel();

  async function getById(id, action) {
    let responseData = null;
    if (id) {
      if (preview) responseData = await crudStore.getPreviewById(id);
      else responseData = await crudStore.getById(id);
    } else responseData = await crudStore.getCreateModel(setItems);

    setItems();

    if (responseData) {
      if (action === "copy") {
        model.value.fiscalYearId = null;
      }
    }
  }

  async function exportTax(id) {
    const response = await fetchWrapper.download(
      `prl/wage/exportTax/${id}`
    );
    downloadFile(response);
  }

  async function exportInsurance(id) {
    const response = await fetchWrapper.download(
      `prl/wage/exportInsurance/${id}`
    );
    downloadFile(response);
  }

  function downloadFile(response) {
    // Get the filename from the Content-Disposition header
    const contentDisposition =
      response.headers["Content-Disposition"];
    let fileName = "downloaded-file.zip"; // Default filename

    console.log(contentDisposition);
    if (contentDisposition) {
      const fileNameMatch =
        contentDisposition.match(/filename="?(.+)"?/);
      if (fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }

    const link = document.createElement("a");
    // Create a Blob from the response data
    const blob = new Blob([response.data], {
      type: response.data.type,
    });
    // Create an object URL from the Blob
    const url = URL.createObjectURL(blob);

    // Set the download attribute to the filename
    link.href = url;
    link.setAttribute("download", fileName);

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the click event on the link
    link.click();

    // Clean up and remove the link
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function setItems() {
    if (!model.value.wageItems) {
      model.value.wageItems = [];
    }
    if (!model.value.subject) {
      model.value.subject = "wage";
    }
  }

  const addRow = (index, currentRow) => {
    const newRow = {
      ...currentRow,
      customerId: null,
      customerName: null,
      id: null,
      recordVersion: null,
    };
    formItemStore.addNewItem(model.value.wageItems, index, newRow);
  };

  const pushNewRow = (item) => {
    if (item) formItemStore.pushNewItem(model.value.wageItems, item);
    else
      pushNewRow({
        day: 30,
        salary: 0,
        food: 0,
        housing: 0,
        mission: 0,
        insurranceTypeId: insuranceType.normal,
        child: 0,
        leave: 0,
        bonus: 0,
        overtime: 0,
        addition: 0,
        deduction: 0,
        bonus: 0,
        reward: 0,
        serviceBenefit: 0,
      });
  };

  const deleteRow = (index) => {
    formItemStore.deleteItem(model.value.wageItems, index);
  };

  const editRow = (index, item) => {
    formItemStore.editItem(model.value.wageItems, index, item);
  };

  async function importItems(file) {
    if (!file?.value) {
      alert("pls select a file");
      return;
    }
    const formData = new FormData();
    formData.append("ImportFile", file.value);
    const responseData = await fetchWrapper.post(
      `prl/wage/importItems`,
      formData
    );
    addItemsFromResponse(responseData);
  }

  function addItemsFromResponse(responseData) {
    if (responseData?.data?.data) {
      responseData.data.data.forEach((item) => {
        const exists = model.value.wageItems.some(
          (c) => c.customerId === item.customerId
        );

        if (!exists) pushNewRow(item);
      });
    }
  }

  async function submitForm(form, action) {
    await crudStore.submitForm(form, action, saveCallBack);
    function saveCallBack(responseData) {
      stateStore.state.firstLoad.value = false;
      router.back();
    }
  }

  return {
    model,
    crudStore,
    newAddedItemIndex: formItemStore.newAddedItemIndex,

    getById,
    addRow,
    pushNewRow,
    editRow,
    exportTax,
    exportInsurance,
    deleteRow,
    importItems,
    submitForm,
  };
}
