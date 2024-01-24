import { fetchWrapper } from "src/helpers"
import { useQuasar } from "quasar"
import ConfirmDialog from "src/components/shared/ConfirmDialog.vue"

export function useFormActions(baseURL, model) {

    async function getById(id) {
        if (id) {
            await fetchWrapper
                .get(`${baseURL}/getById/${id}`)
                .then((response) => {
                    model.value = response.data.data
                    model.value.recordVersion = BigInt(response.data.data.recordVersion).toString()
                })
        }
    }

    async function createOrEdit(action) {
        if (action === "create") model.value.id = null
        await fetchWrapper
            .post(`${baseURL}/${action}`, model.value)
            .then((response) => {
                notifyResponse(response.data)
                model.value.id = response.data.data.id
            })
    }

    async function deleteById(id, callBack) {
        if (id) {
            $q.dialog({
                component: ConfirmDialog,
                componentProps: {
                    title: 'Delete Confirm',
                    message: `Are you sure to delete this entity...?`,
                    ok: `Yes, I'm sure`,
                }
            }).onOk(async () => {
                await fetchWrapper
                    .post(`${baseURL}/delete/${id}`)
                    .then((response) => {
                        notifyResponse(response.data)
                        if (callBack) callBack()
                    })
            })
        }
        else notify("no row selected", 'negative')
    }

    async function deleteBatch(idList, callBack) {
        if (validateIdList(idList)) {
            $q.dialog({
                component: ConfirmDialog,
                componentProps: {
                    title: 'Delete Confirm',
                    message: `Are you sure to delete ${idList.length} rows?`,
                    ok: `Yes, I'm sure`,
                }
            }).onOk(async () => {
                await fetchWrapper
                    .post(`${baseURL}/deleteBatch`, idList)
                    .then((response) => {
                        notifyResponse(response.data)
                        if (callBack) callBack()
                    })
            })
        }
        else notify("no row selected", 'negative')
    }

    async function activate(idList, callBack) {
        if (validateIdList(idList)) {
            await fetchWrapper
                .post(`${baseURL}/activate`, idList)
                .then((response) => {
                    notifyResponse(response.data)
                    if (callBack) callBack()
                })
        }
        else notify("no row selected", 'negative')
    }

    async function deactivate(idList, callBack) {
        if (validateIdList(idList))
            await fetchWrapper
                .post(`${baseURL}/deactivate`, idList)
                .then((response) => {
                    notifyResponse(response.data)
                    if (callBack) callBack()
                })
        else notify("no row selected", 'negative')
    }

    async function editBatch(idList, editBatchModel, callBack) {
        if (validateIdList(idList)) {
            await fetchWrapper
                .post(`${baseURL}/editBatch`, {
                    selectedIds: idList,
                    model: Object.values(editBatchModel)
                        .filter(item => item.isModified === true)
                })
                .then((response) => {
                    notifyResponse(response.data)
                    if (callBack) callBack()
                })
        }
        else notify("no row selected", 'negative')
    }

    function validateIdList(idList) {
        return idList && idList.length > 0
    }

    function notifyResponse(data) {
        notify(data.message)
    }

    const $q = useQuasar()
    function notify(message, type = 'positive') {
        $q.notify({
            type: type,
            message: message,
        });
    }

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
