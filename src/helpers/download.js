import { fetchWrapper } from "./fetch-wrapper";

export const download = {
  downloadFile(response, defaultFileName) {
    const disposition = response.headers["content-disposition"];
    const fileName = this.getFileName(disposition) || defaultFileName;
    // Create a Blob from the response data
    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName; // Use the file name from the header
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  },

  getFileName(disposition) {
    if (!disposition) return null;
    const matches = disposition.match(
      /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    );
    return matches && matches[1]
      ? matches[1].replace(/['"]/g, "")
      : null;
  },

  async downloadGet(url, defaultFileName) {
    const response = await fetchWrapper.downloadGet(url);
    this.downloadFile(response, defaultFileName);
  },

  async downloadPost(url, page, defaultFileName) {
    page.pageSize = -1;

    const response = await fetchWrapper.downloadPost(url, page);
    this.downloadFile(response, defaultFileName);
  },
};
