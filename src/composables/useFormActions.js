import { ref, watch } from "vue";
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { fetchWrapper, helper, bus } from "src/helpers";

import ConfirmDialog from "src/components/shared/ConfirmDialog.vue";

const showLoader = ref(false);

export function useFormActions(baseURL, model, diableDirtyCheck) {
  const isDirty = ref(false);
  const $q = useQuasar();
  const router = useRouter();
  const { t } = useI18n();

  const addWatch = () => {
    watch(
      model,
      () => {
        isDirty.value = true;
      },
      { deep: true }
    );
  };

  const resetIsDirty = () =>
    helper.sleep(0).then(() => {
      isDirty.value = false;
      addWatch();
    });

  if (!diableDirtyCheck && model) resetIsDirty();

  const notifyResponse = (data) => notify(data.message);

  const notify = (message, type = "positive") => {
    if (message) {
      $q.notify({
        type: type,
        message: t(`messages.${message}`),
      });
    }
  };

  const validateIdList = (idList) => idList && idList.length > 0;

  const onGetById = async (url, id) => {
    if (!id) return Promise.resolve(null);

    const response = await fetchWrapper.get(`${url}/${id}`);
    if (response.data.data) model.value = response.data.data;
    return response.data.data;
  };

  // const getById = (id, url) =>
  //   onGetById(url ?? `${baseURL}/getById`, id).then(
  //     (responseData) => {
  //       if (!diableDirtyCheck) resetIsDirty();
  //       return responseData;
  //     }
  //   );

  const getById = async (id, url) => {
    showLoader.value = true;
    try {
      const responseData = await onGetById(
        url ?? `${baseURL}/getById`,
        id
      );
      if (!diableDirtyCheck) resetIsDirty();
      return responseData;
    } finally {
      showLoader.value = false;
    }
  };

  const getCreateModel = (callBack) =>
    fetchWrapper
      .get(`${baseURL}/getCreateModel`)
      .then(async (response) => {
        model.value = response.data.data;
        if (callBack) callBack();
        await resetIsDirty();
        return model.value;
      });

  const getPreviewById = (id) =>
    onGetById(`${baseURL}/getPreviewById`, id);

  const createOrEdit = async (action) => {
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
  };

  const customPostAction = async (actionUrl, actionModel) => {
    return fetchWrapper
      .post(`${baseURL}/${actionUrl}`, actionModel)
      .then((response) => {
        notifyResponse(response.data);
        return response.data;
      });
  };

  const customGetAction = async (actionUrl) => {
    const url = baseURL ? `${baseURL}/${actionUrl}` : actionUrl;
    return fetchWrapper.get(url).then((response) => {
      return response.data;
    });
  };

  const deleteById = async (id, callBack, action) => {
    if (!id) return notify("no row selected", "negative");

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
  };

  const deleteBatch = (idList, callBack) => {
    if (!validateIdList(idList))
      return notify("no row selected", "negative");

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
  };

  const activate = (idList, callBack) =>
    batchAction("activate", idList, callBack);

  const deactivate = (idList, callBack) =>
    batchAction("deactivate", idList, callBack);

  const batchAction = (action, idList, callBack) => {
    if (!validateIdList(idList))
      return notify("no row selected", "negative");

    return fetchWrapper
      .post(`${baseURL}/${action}`, idList)
      .then((response) => {
        notifyResponse(response.data);
        if (callBack) callBack();
        else bus.emit("apply-search");
      });
  };

  const editBatch = (idList, editBatchModel, callBack) => {
    if (!validateIdList(idList))
      return notify("noRowSelected", "negative");

    return fetchWrapper
      .post(`${baseURL}/editBatch`, {
        selectedIds: idList,
        model: Object.values(editBatchModel).filter(
          (item) => item.isModified === true
        ),
      })
      .then((response) => {
        notifyResponse(response.data);
        if (callBack) callBack();
        else bus.emit("apply-search");
      });
  };

  const merge = (idList, mergeModel, callBack) => {
    if (!validateIdList(idList))
      return notify("noRowSelected", "negative");

    return fetchWrapper
      .post(`${baseURL}/merge`, {
        selectedIds: idList,
        ...mergeModel,
      })
      .then((response) => {
        notifyResponse(response.data);
        if (callBack) callBack();
        else bus.emit("apply-search");
      });
  };

  const submitForm = (form, action, callBack) =>
    form.validate().then(async (success) => {
      if (success) {
        const responseData = await createOrEdit(action);
        if (responseData && model) responseData.model = model.value;
        if (callBack) callBack(responseData);
        return responseData;
      }
      return null; // Validation failed
    });

  if (!diableDirtyCheck) {
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
      }
      return true;
    });
  }

  return {
    getById,
    showLoader,
    getCreateModel,
    getPreviewById,
    createOrEdit,
    editBatch,
    merge,
    deleteById,
    deleteBatch,
    activate,
    deactivate,
    customPostAction,
    customGetAction,
    submitForm,
    validateIdList,
  };
}
