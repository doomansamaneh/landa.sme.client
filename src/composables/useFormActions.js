import { ref, watch } from "vue"
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useQuasar } from "quasar"
import { useI18n } from 'vue-i18n';
import { fetchWrapper, helper } from "src/helpers"
import ConfirmDialog from "src/components/shared/ConfirmDialog.vue"

export function useFormActions(baseURL, model) {
    const isDirty = ref(false)
    const $q = useQuasar()
    const router = useRouter()
    const { t } = useI18n()

    async function getById(id) {
        if (id) {
            const response = await fetchWrapper.get(`${baseURL}/getById/${id}`);
            model.value = response.data.data
            model.value.recordVersion = BigInt(response.data.data.recordVersion).toString()
            await resetIsDirty()
        }
    }

    async function createOrEdit(action) {
        if (action === "create") model.value.id = null
        const response = await fetchWrapper.post(`${baseURL}/${action}`, model.value)
        notifyResponse(response.data)
        model.value.id = response.data.data.id
        await resetIsDirty()
        return response
    }

    async function resetIsDirty() {
        await helper.sleep(0)
        isDirty.value = false
    }

    async function deleteById(id, callBack) {
        if (id) {
            $q.dialog({
                component: ConfirmDialog,
                componentProps: {
                    title: t("shared.labels.deleteConfirm"),
                    message: `${t("shared.labels.deleteMessage")}.`,
                    ok: t("shared.labels.delete"),
                    okColor: "deep-orange-7"
                }
            }).onOk(async () => {
                const response = await fetchWrapper.post(`${baseURL}/delete/${id}`)
                notifyResponse(response.data)
                if (callBack) callBack()
            })
        }
        else notify("no row selected", 'negative')
    }

    async function deleteBatch(idList, callBack) {
        if (validateIdList(idList)) {
            $q.dialog({
                component: ConfirmDialog,
                componentProps: {
                    title: t("shared.labels.deleteConfirm"),
                    message: `${t("shared.labels.deleteMessage")}. ${t("shared.labels.selectedRows")}: ${idList.length}`,
                    ok: t("shared.labels.delete"),
                    okColor: "deep-orange-7"
                }
            }).onOk(async () => {
                const response = await fetchWrapper.post(`${baseURL}/deleteBatch`, idList)
                notifyResponse(response.data)
                if (callBack) callBack()
            })
        }
        else notify("no row selected", 'negative')
    }

    async function activate(idList, callBack) {
        if (validateIdList(idList)) {
            const response = await fetchWrapper.post(`${baseURL}/activate`, idList)
            notifyResponse(response.data)
            if (callBack) callBack()
        }
        else notify("no row selected", 'negative')
    }

    async function deactivate(idList, callBack) {
        if (validateIdList(idList)) {
            const response = await fetchWrapper.post(`${baseURL}/deactivate`, idList)
            notifyResponse(response.data)
            if (callBack) callBack()
        }
        else notify("no row selected", 'negative')
    }

    async function editBatch(idList, editBatchModel, callBack) {
        if (validateIdList(idList)) {
            const response = await fetchWrapper.post(`${baseURL}/editBatch`, {
                selectedIds: idList,
                model: Object.values(editBatchModel)
                    .filter(item => item.isModified === true)
            })
            notifyResponse(response.data)
            if (callBack) callBack()
        }
        else notify("no row selected", 'negative')
    }

    function validateIdList(idList) {
        return idList && idList.length > 0
    }

    function notifyResponse(data) {
        notify(data.message)
    }

    function notify(message, type = 'positive') {
        $q.notify({
            type: type,
            message: message,
        });
    }

    if (model) {
        watch(model, async () => {
            isDirty.value = true
        }, { deep: true })
    }

    onBeforeRouteLeave((to, from) => {
        if (isDirty.value) {
            $q.dialog({
                component: ConfirmDialog,
                componentProps: {
                    title: 'Save Data',
                    message: `You have unsaved changes. Do you really want to leave?`,
                    ok: `Discard and leave`,
                    cancel: `stay in this form`
                }
            }).onOk(() => {
                isDirty.value = false
                router.push(to)
            })

            return false
        }
        else {
            return true
        }
    })

    return {
        getById,
        createOrEdit,
        editBatch,
        deleteById,
        deleteBatch,
        activate,
        deactivate
    }
}
