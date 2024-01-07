<template>
    <tool-bar>
        <template #header>
            <q-badge
                v-if="tableStore?.pagination.value.totalItems > 0"
                rounded
                outline
                :label="tableStore?.pagination.value.totalItems"
                class="q-mr-sm bg-dark text-on-dark text-body2"
            />
            <span class="text-h6">ایجاد گروه کالا</span>
            <q-btn
                padding="6px 12px"
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
                        v-model="productGroupStore.model.value.code"
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
                        v-model="productGroupStore.model.value.title"
                        outlined
                        lazy-rules
                        :rules="[(val) => val !== null && val !== '']"
                    />
                </div>
                <div class="q-mt-md">
                    <q-checkbox
                        v-model="productGroupStore.model.value.isActive"
                        label="فعال"
                    />
                </div>
            </q-form>
        </q-card-section>
    </q-card>
</template>
  
<script setup>
import { onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { fetchWrapper } from "src/helpers"
import { useProductGroupModel } from "../../../_composables/useProductGroupModel"

import ToolBar from "src/components/shared/ToolBar.vue"
import Actions from "src/components/shared/Forms/FormCardActions.vue"
import BackButton from "src/components/shared/Buttons/GoBackLink.vue"
import { data } from "autoprefixer"
import { getChartByID } from "apexcharts"

const props = defineProps({
    action: String
})
const form = ref(null)
const route = useRoute()
const productGroupStore = useProductGroupModel()

onMounted(() => {
    getById()
})

async function getById() {
    const id = route.params.id
    if (id) {
        await fetchWrapper
            .get(`cmn/productGroup/getById/${id}`)
            .then((response) => {
                console.log(response.data.data)
                productGroupStore.model.value = response.data.data
            })
    }
}

async function submitForm() {
    await form.value.validate().then((success) => {
        if (success) {
            create()
        } else {
            //todo: how to show validation message to user
            alert("validation error")
        }
    })
}

async function create() {
    await fetchWrapper
        .post(props.action, productGroupStore.model.value)
        .then((response) => {
            alert(response.message)
            console.log(response)
        })
        .finally(() => { })
}
</script>
