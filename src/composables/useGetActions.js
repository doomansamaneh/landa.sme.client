import { fetchWrapper } from "src/helpers";

export function useGetActions(baseURL) {
  async function getById(id) {
    if (id) {
      const response = await fetchWrapper.get(`${baseURL}/getById/${id}`);
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

  return {
    getById,
    getPreviewById,
  };
}
