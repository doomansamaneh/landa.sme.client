import { ref, watch } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { fetchWrapper, helper, bus } from "src/helpers";
import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";

export function useFormActions(baseURL, model, diableDirtyCheck) {
  const isDirty = ref(false);
  const $q = useQuasar();
  const router = useRouter();
  const { t } = useI18n();

  async function getById(id, url) {
    const response = await onGetById(url ?? `${baseURL}/getById`, id);
    if (!diableDirtyCheck) await resetIsDirty();
    return response;
  }

  async function getCreateModel(callBack) {
    const response = await fetchWrapper.get(
      `${baseURL}/getCreateModel`
    );
    model.value = response.data.data;
    if (callBack) callBack();
    await resetIsDirty();
    return model.value;
  }

  async function getPreviewById(id) {
    return await onGetById(`${baseURL}/getPreviewById`, id);
  }

  async function onGetById(url, id) {
    if (id) {
      const response = await fetchWrapper.get(`${url}/${id}`);
      model.value = response.data.data;
      return response.data.data;
    }
    return null;
  }

  async function createOrEdit(action) {
    if (action === "create") model.value.id = null;
    const response = await fetchWrapper.post(
      `${baseURL}/${action}`,
      model.value
    );
    notifyResponse(response.data);
    if (response.data.data) {
      model.value.id = response.data.data.id;
      model.value.recordVersion = response.data.data.recordVersion;
    }
    await resetIsDirty();
    return response.data;
  }

  async function customPostAction(actionUrl, actionModel) {
    const response = await fetchWrapper.post(
      `${baseURL}/${actionUrl}`,
      actionModel
    );
    notifyResponse(response.data);
    return response.data;
  }

  async function resetIsDirty() {
    await helper.sleep(0);
    isDirty.value = false;
    addWatch();
  }

  async function deleteById(id, callBack, action) {
    if (id) {
      $q.dialog({
        component: ConfirmDialog,
        componentProps: {
          title: t("shared.labels.deleteConfirm"),
          message: `${t("shared.labels.deleteMessage")}.`,
          ok: t("shared.labels.delete"),
          okColor: "deep-orange-7",
        },
      }).onOk(async () => {
        const deleteAction = action ?? "delete";
        const response = await fetchWrapper.post(
          `${baseURL}/${deleteAction}/${id}`
        );
        notifyResponse(response.data);
        if (callBack) callBack();
        else bus.emit("apply-search");
      });
    } else notify("no row selected", "negative");
  }

  async function deleteBatch(idList, callBack) {
    if (validateIdList(idList)) {
      $q.dialog({
        component: ConfirmDialog,
        componentProps: {
          title: t("shared.labels.deleteConfirm"),
          message: `${t("shared.labels.deleteMessage")}. ${t(
            "shared.labels.selectedRows"
          )}: ${idList.length}`,
          ok: t("shared.labels.delete"),
          okColor: "deep-orange-7",
        },
      }).onOk(async () => {
        const response = await fetchWrapper.post(
          `${baseURL}/deleteBatch`,
          idList
        );
        notifyResponse(response.data);
        if (callBack) callBack();
        else bus.emit("apply-search");
      });
    } else notify("no row selected", "negative");
  }

  async function activate(idList, callBack) {
    if (validateIdList(idList)) {
      const response = await fetchWrapper.post(
        `${baseURL}/activate`,
        idList
      );
      notifyResponse(response.data);
      if (callBack) callBack();
      else bus.emit("apply-search");
    } else notify("no row selected", "negative");
  }

  async function deactivate(idList, callBack) {
    if (validateIdList(idList)) {
      const response = await fetchWrapper.post(
        `${baseURL}/deactivate`,
        idList
      );
      notifyResponse(response.data);
      if (callBack) callBack();
      else bus.emit("apply-search");
    } else notify("no row selected", "negative");
  }

  async function editBatch(idList, editBatchModel, callBack) {
    if (validateIdList(idList)) {
      const response = await fetchWrapper.post(
        `${baseURL}/editBatch`,
        {
          selectedIds: idList,
          model: Object.values(editBatchModel).filter(
            (item) => item.isModified === true
          ),
        }
      );
      notifyResponse(response.data);
      if (callBack) callBack();
      else bus.emit("apply-search");
    } else notify("no row selected", "negative");
  }

  async function submitForm(form, action, callBack) {
    const success = await form.validate();
    if (success) {
      const responseData = await createOrEdit(action);
      if (callBack) callBack(responseData);
      responseData.model = model.value;
      return responseData;
      //else if (responseData?.code === 200) router.back();
    } else {
      //todo: how to show validation message to user
      // alert("Validation error");
      return null;
    }
  }

  function validateIdList(idList) {
    return idList && idList.length > 0;
  }

  function notifyResponse(data) {
    notify(data.message);
  }

  function notify(message, type = "positive") {
    $q.notify({
      type: type,
      message: t(`messages.${message}`),
    });
  }

  const addWatch = () => {
    watch(
      model,
      async () => {
        isDirty.value = true;
      },
      { deep: true }
    );
  };

  onBeforeRouteLeave((to, from) => {
    if (isDirty.value) {
      $q.dialog({
        component: ConfirmDialog,
        componentProps: {
          title: t("shared.labels.warning"),
          message: t("shared.labels.dirtyMessage"),
          ok: t("shared.labels.discard"),
          cancel: t("shared.labels.stayInForm"),
          okColor: "deep-orange-7",
        },
      }).onOk(() => {
        isDirty.value = false;
        router.push(to);
      });

      return false;
    } else {
      return true;
    }
  });

  return {
    getById,
    getCreateModel,
    getPreviewById,
    createOrEdit,
    editBatch,
    deleteById,
    deleteBatch,
    activate,
    deactivate,
    customPostAction,
    submitForm,
    validateIdList,
  };
}
