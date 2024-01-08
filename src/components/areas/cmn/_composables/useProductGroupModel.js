import { ref } from "vue"
import { fetchWrapper } from "src/helpers"

export function useProductGroupModel() {
    const model = ref({
        isActive: true,
    })

    async function getById(id) {
        if (id) {
            await fetchWrapper
                .get(`cmn/productGroup/getById/${id}`)
                .then((response) => {
                    model.value = response.data.data
                    model.value.recordVersion = BigInt(response.data.data.recordVersion).toString()
                })
        }
    }

    async function createOrEdit(action) {
        await fetchWrapper
            .post(`cmn/productGroup/${action}`, model.value)
            .then((response) => {
                alert(response.data.message)
                model.value.id = response.data.data.id
            })
    }

    async function deleteById(id) {
        if (id)
            await fetchWrapper
                .post(`cmn/productGroup/delete/${id}`)
                .then((response) => {
                    alert(response.data.message)
                })
        else alert("no row selected")
    }

    async function deleteBatch(idList) {
        if (validateIdList(idList))
            await fetchWrapper
                .post(`cmn/productGroup/deleteBatch`, idList)
                .then((response) => {
                    alert(response.data.message)
                })
        else alert("no row selected")
    }

    async function activate(idList) {
        if (validateIdList(idList))
            await fetchWrapper
                .post(`cmn/productGroup/activate`, idList)
                .then((response) => {
                    alert(response.data.message)
                })
        else alert("no row selected")
    }

    async function deactivate(idList) {
        if (validateIdList(idList))
            await fetchWrapper
                .post(`cmn/productGroup/deactivate`, idList)
                .then((response) => {
                    alert(response.data.message)
                })
        else alert("no row selected")
    }

    function validateIdList(idList) {
        return idList && idList.length > 0
    }

    return {
        model,

        getById,
        createOrEdit,
        deleteById,
        deleteBatch,
        activate,
        deactivate
    }
}