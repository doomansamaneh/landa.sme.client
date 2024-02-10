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
                گروه کالا
            </q-item-label>
            <product-group-lookup
                v-model:selectedId="formStore.model.value.productGroupId"
                v-model:selectedText="formStore.model.value.productGroupTitle"
            />
        </div>

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
                بارکد
            </q-item-label>
            <custom-input v-model="formStore.model.value.barcode" />
        </div>

        <div>
            <q-item-label caption>
                شناسه مالیاتی
            </q-item-label>
            <custom-input v-model="formStore.model.value.taxCode" />
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
            <q-item-label caption>
                نوع
            </q-item-label>
            <custom-select
                v-model="formStore.model.value.typeId"
                :options="helper.getEnumOptions(productType, 'productType')"
            />
        </div>
        <div>
            <q-item-label caption>
                واحد سنجش
            </q-item-label>
            <product-unit-lookup
                v-model:selectedId="formStore.model.value.productUnitId"
                v-model:selectedText="formStore.model.value.productUnitTitle"
            />
        </div>

        <div>
            <q-item-label caption>
                قیمت خرید
            </q-item-label>
            <custom-input
                v-model="formStore.model.value.purchasePrice"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
            />
        </div>

        <div>
            <q-item-label caption>
                قیمت فروش
            </q-item-label>
            <custom-input
                v-model="formStore.model.value.price"
                lazy-rules
                :rules="[(val) => val !== null && val !== '']"
            />
        </div>

        <div>
            <q-item-label caption>
                شرح
            </q-item-label>
            <custom-input
                v-model="formStore.model.value.comment"
                type="textarea"
                autogrow
            />
        </div>

        <div>
            <q-checkbox
                v-model="formStore.model.value.isForPurchase"
                label="برای خرید"
            />
        </div>

        <div>
            <q-checkbox
                v-model="formStore.model.value.isForSale"
                label="برای فروش"
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
import { productType } from "src/constants"
import { helper } from "src/helpers"
import { useProductModel } from "../../../_composables/useProductModel"

import ToolBar from "src/components/shared/FormToolBar.vue"
import CustomInput from "src/components/shared/forms/CustomInput.vue"
import CustomSelect from "src/components/shared/forms/CustomSelect.vue"
import ProductGroupLookup from "src/components/shared/lookups/ProductGroupLookup.vue"
import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue"

const props = defineProps({
    action: String,
    title: String,
})

const form = ref(null)
const route = useRoute()
const formStore = useProductModel()

onMounted(() => {
    formStore.crudStore.getById(route.params.id)
})

async function submitForm() {
    await form.value.validate().then(async (success) => {
        if (success) {
            const response = await formStore.crudStore.createOrEdit(props.action)
            if (response?.data?.code === 200) router.go(-1)
        } else {
            //todo: how to show validation message to user
            alert("validation error")
        }
    })
}
</script>
