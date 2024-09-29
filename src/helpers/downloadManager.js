import { fetchWrapper } from "./fetch-wrapper";

export const downloadManager = (() => {
  // Private method: download file
  function downloadFile(response, defaultFileName) {
    const disposition = response.headers["content-disposition"];
    const fileName = getFileName(disposition) || defaultFileName;
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Private method: extract file name from content-disposition header
  function getFileName(disposition) {
    if (!disposition) return null;
    const matches = disposition.match(
      /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    );
    return matches && matches[1]
      ? matches[1].replace(/['"]/g, "")
      : null;
  }

  async function downloadGet(url, defaultFileName) {
    const response = await fetchWrapper.downloadGet(url);
    downloadFile(response, defaultFileName);
  }

  async function downloadPost(url, page, defaultFileName) {
    page.pageSize = -1;
    const response = await fetchWrapper.downloadPost(url, page);
    downloadFile(response, defaultFileName);
  }

  return {
    downloadGet,
    downloadPost,
  };
})();
