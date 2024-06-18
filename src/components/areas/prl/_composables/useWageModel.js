import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchWrapper } from "src/helpers";
import { useFormActions } from "src/composables/useFormActions";
import { wageModel } from "src/models/areas/prl/wageModel";
import { useWageState } from "./useWageState";
import { insurranceType } from "src/constants";

export function useWageModel({ baseRoute, preview }) {
  const router = useRouter();
  const stateStore = useWageState();

  const model = ref(wageModel);

  const crudStore = useFormActions(baseRoute, model);

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
    };
    model.value.wageItems.splice(index + 1, 0, newRow);
  };

  const pushNewRow = (item) => {
    if (item) model.value.wageItems.push(item);
    else
      model.value.wageItems.push({
        day: 30,
        salary: 0,
        food: 0,
        housing: 0,
        mission: 0,
        insurranceTypeId: insurranceType.normal,
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
    model.value.wageItems.splice(index, 1);
  };

  const editRow = (index, item) => {
    const row = model.value.wageItems[index];
    Object.assign(row, item);
  };

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

    getById,
    addRow,
    pushNewRow,
    editRow,
    exportTax,
    exportInsurance,
    deleteRow,
    submitForm,
  };
}
