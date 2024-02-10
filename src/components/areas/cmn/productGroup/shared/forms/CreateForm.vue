<template>
    <tool-bar
        :title="title"
        :submit-call-back="submitForm"
    >
    </tool-bar>

    <q-form
        ref="form"
        autofocus
        class="q-gutter-y-md q-px-md"
    >
        <div>
            <q-item-label caption>
                کد
            </q-item-label>
            <custom-input
                v-model="formStore.model.value.code"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
            />
        </div>
        <div>
            <q-item-label caption>
                عنوان
            </q-item-label>
            <custom-input
                v-model="formStore.model.value.title"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
            />
        </div>
        <div>
            <q-checkbox
                v-model="formStore.model.value.isActive"
                label="فعال"
            />
        </div>
    </q-form>
</template>
  
<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useProductGroupModel } from "components/areas/cmn/_composables/useProductGroupModel"

import ToolBar from "src/components/shared/FormToolBar.vue"
import CustomInput from "src/components/shared/forms/CustomInput.vue"

const props = defineProps({
    action: String,
    title: String
})

const form = ref(null)
const route = useRoute()
const formStore = useProductGroupModel()

onMounted(() => {
    formStore.crudStore.getById(route.params.id)
})

async function submitForm() {
    const success = await form.value.validate()
    if (success) {
        return await formStore.crudStore.createOrEdit(props.action)
    } else {
        //todo: how to show validation message to user
        alert("validation error")
    }
}
</script>
