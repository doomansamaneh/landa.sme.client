import { fetchWrapper } from "src/helpers"

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
        await fetchWrapper
            .post(`${baseURL}/${action}`, model.value)
            .then((response) => {
                alert(response.data.message)
                model.value.id = response.data.data.id
            })
    }

    async function deleteById(id) {
        if (id)
            await fetchWrapper
                .post(`${baseURL}/delete/${id}`)
                .then((response) => {
                    alert(response.data.message)
                })
        else alert("no row selected")
    }

    async function deleteBatch(idList) {
        if (validateIdList(idList))
            await fetchWrapper
                .post(`${baseURL}/deleteBatch`, idList)
                .then((response) => {
                    alert(response.data.message)
                })
        else alert("no row selected")
    }

    async function activate(idList) {
        if (validateIdList(idList))
            await fetchWrapper
                .post(`${baseURL}/activate`, idList)
                .then((response) => {
                    alert(response.data.message)
                })
        else alert("no row selected")
    }

    async function deactivate(idList) {
        if (validateIdList(idList))
            await fetchWrapper
                .post(`${baseURL}/deactivate`, idList)
                .then((response) => {
                    alert(response.data.message)
                })
        else alert("no row selected")
    }

    function validateIdList(idList) {
        return idList && idList.length > 0
    }

    return {
        getById,
        createOrEdit,
        deleteById,
        deleteBatch,
        activate,
        deactivate
    }
}