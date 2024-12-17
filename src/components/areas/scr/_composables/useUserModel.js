import { ref } from "vue";
import { useFormActions } from "src/composables/useFormActions";
import { userModel } from "src/models/areas/scr/userModel";
import { fetchWrapper } from "src/helpers";

export function useUserModel({ baseRoute }) {
  const model = ref(userModel);
  const crudStore = useFormActions(baseRoute, model);

  async function getRoles() {
    const responseData = await fetchWrapper.get(
      `${baseRoute}/GetRoles`
    );
    return responseData.data.data;
  }

  async function submitForm(form) {
    await crudStore.submitForm(form, "addUser");
  }

  return {
    model,
    getRoles,
    crudStore,
    submitForm,
  };
}
