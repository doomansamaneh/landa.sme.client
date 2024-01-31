<template>
    <tool-bar>
        <template #header>
            <span class="text-h6 q-mr-md">
                {{ title }} /
                گروه کالا
            </span>
            <q-btn
                padding="6px"
                flat
                @click="$router.go(-1)"
            >
                <q-icon
                    name="arrow_back"
                    size="sm"
                />
            </q-btn>
        </template>
        <template #buttons>
            <q-btn
                class="bg-info text-white text-caption"
                no-caps
                @click="submitForm"
            >
                <q-icon
                    name="save"
                    class="q-mr-xs"
                />
                {{ $t("shared.labels.save") }}
            </q-btn>
            <q-btn
                class="text-white text-caption"
                no-caps
            >
                <q-icon
                    name="cancel"
                    class="q-mr-xs"
                />
                {{ $t("shared.labels.cancel") }}
            </q-btn>
        </template>
    </tool-bar>

    <q-card
        class="bordered q-pa-md fit"
        style="margin-top: 54px;"
    >
        <q-card-section>
            <q-form
                ref="form"
                autofocus
                class="q-px-sm"
            >
                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        کد
                    </q-item-label>
                    <q-input
                        v-model="formStore.model.value.code"
                        outlined
                        lazy-rules
                        :rules="[(val) => val !== null && val !== '']"
                    />
                </div>
                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        عنوان
                    </q-item-label>
                    <q-input
                        v-model="formStore.model.value.title"
                        outlined
                        lazy-rules
                        :rules="[(val) => val !== null && val !== '']"
                    />
                </div>
                <div class="q-mt-md">
                    <q-checkbox
                        v-model="formStore.model.value.isActive"
                        label="فعال"
                    />
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>
  
<script setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useProductGroupModel } from "../../../_composables/useProductGroupModel"

import ToolBar from "src/components/shared/ToolBar.vue"
import Actions from "src/components/shared/Forms/FormCardActions.vue"
import BackButton from "src/components/shared/Buttons/GoBackLink.vue"

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
    await form.value.validate().then((success) => {
        if (success) {
            formStore.crudStore.createOrEdit(props.action)
        } else {
            //todo: how to show validation message to user
            alert("validation error")
        }
    })
}
</script>
