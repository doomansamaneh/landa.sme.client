<template>
    <tool-bar>
        <template #header>
            <span class="text-h6 q-mr-md">
                {{ title }} /
                کالا و خدمات
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
                        گروه کالا
                    </q-item-label>
                    <product-group-lookup
                        v-model:selectedId="formStore.model.value.productGroupId"
                        v-model:selectedText="formStore.model.value.productGroupTitle"
                    />
                </div>

                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        کد
                    </q-item-label>
                    <custom-input
                        v-model="formStore.model.value.code"
                        lazy-rules
                        :rules="[(val) => val !== null && val !== '']"
                    />
                </div>

                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        بارکد
                    </q-item-label>
                    <custom-input v-model="formStore.model.value.barcode" />
                </div>

                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        شناسه مالیاتی
                    </q-item-label>
                    <custom-input v-model="formStore.model.value.taxCode" />
                </div>

                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        عنوان
                    </q-item-label>
                    <custom-input
                        v-model="formStore.model.value.title"
                        lazy-rules
                        :rules="[(val) => val !== null && val !== '']"
                    />
                </div>

                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        نوع
                    </q-item-label>
                    <custom-select
                        v-model="formStore.model.value.typeId"
                        :options="helper.getEnumOptions(productType, 'productType')"
                    />
                </div>
                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        واحد سنجش
                    </q-item-label>
                    <product-unit-lookup
                        v-model:selectedId="formStore.model.value.productUnitId"
                        v-model:selectedText="formStore.model.value.productUnitTitle"
                    />
                </div>

                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        قیمت خرید
                    </q-item-label>
                    <custom-input
                        v-model="formStore.model.value.purchasePrice"
                        lazy-rules
                        :rules="[(val) => val !== null && val !== '']"
                    />
                </div>

                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        قیمت فروش
                    </q-item-label>
                    <custom-input
                        v-model="formStore.model.value.price"
                        lazy-rules
                        :rules="[(val) => val !== null && val !== '']"
                    />
                </div>

                <div class="q-mt-md">
                    <q-item-label
                        caption
                        class="q-mb-sm"
                    >
                        شرح
                    </q-item-label>
                    <custom-input
                        v-model="formStore.model.value.comment"
                        type="textarea"
                        autogrow
                    />
                </div>

                <div class="q-mt-md">
                    <q-checkbox
                        v-model="formStore.model.value.isForPurchase"
                        label="برای خرید"
                    />
                </div>

                <div class="q-mt-md">
                    <q-checkbox
                        v-model="formStore.model.value.isForSale"
                        label="برای فروش"
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
import { productType } from "src/constants"
import { helper } from "src/helpers"
import { useProductModel } from "../../../_composables/useProductModel"

import ToolBar from "src/components/shared/ToolBar.vue"
import CustomInput from "src/components/shared/Forms/CustomInput.vue"
import CustomSelect from "src/components/shared/Forms/CustomSelect.vue"
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
