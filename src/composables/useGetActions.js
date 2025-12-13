import { fetchWrapper } from "src/helpers";

export function useGetActions(baseURL) {
  async function getById(id) {
    if (id) {
      const response = await fetchWrapper.get(
        `${baseURL}/getById/${id}`
      );
      return response.data.data;
    }
    return null;
  }

  async function getPreviewById(id) {
    if (id) {
      const response = await fetchWrapper.get(
        `${baseURL}/getPreviewById/${id}`
      );
      return response.data.data;
    }
    return null;
  }

  const getCustomApi = async (actionUrl, silent = false) => {
    const url = baseURL ? `${baseURL}/${actionUrl}` : actionUrl;
    return fetchWrapper
      .get(url, undefined, silent)
      .then((response) => {
        return response.data;
      });
  };

  return {
    getById,
    getPreviewById,
    getCustomApi,
  };
}
