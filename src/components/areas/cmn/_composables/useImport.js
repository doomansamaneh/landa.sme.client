import { fetchWrapper } from "src/helpers";
import { useQuasar } from "quasar";
import { bus } from "src/helpers";

import ImportResultDialog from "../appConfig/ImportResultDialog.vue";

export function useImport() {
  const $q = useQuasar();

  const uploadImportFile = async (action, file) => {
    if (!file?.value) {
      alert("pls select a file");
      return;
    }
    const formData = new FormData();
    formData.append("ImportFile", file.value);
    bus.off("download-import-error", downloadErrorList);
    const response = await fetchWrapper.post(
      `import/${action}`,
      formData
    );
    if (response.data?.code === 200) {
      bus.on(
        "download-import-error",
        downloadErrorList,
        response.data.data
      );
      $q.dialog({
        component: ImportResultDialog,
        componentProps: {
          importResult: response.data.data,
        },
      }).onOk(() => {});
    }
    return response;
  };

  const downloadErrorList = (importResult) => {
    if (!importResult?.errorList) return;
    const errorList = importResult.errorList;
    const blob = new Blob([errorList.join("\n")], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ErrorList.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    uploadImportFile,
    downloadErrorList,
  };
}
