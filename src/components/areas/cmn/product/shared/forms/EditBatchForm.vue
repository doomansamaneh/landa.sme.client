<template>
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
            <product-group-lookup v-model:selectedId="formStore.editBatchModel.value.productGroup.fieldValue" />
            <q-checkbox
                v-model="formStore.editBatchModel.value.productGroup.isModified"
                label="اصلاح شود؟"
            />
        </div>

        <div class="q-mt-md">
            <q-item-label
                caption
                class="q-mb-sm"
            >
                شناسه مالیاتی
            </q-item-label>
            <custom-input v-model="formStore.editBatchModel.value.taxCode.fieldValue" />
            <q-checkbox
                v-model="formStore.editBatchModel.value.taxCode.isModified"
                label="اصلاح شود؟"
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
                v-model="formStore.editBatchModel.value.productType.fieldValue"
                :options="helper.getEnumOptions(productType, 'productType')"
            />
            <q-checkbox
                v-model="formStore.editBatchModel.value.productType.isModified"
                label="اصلاح شود؟"
            />
        </div>

        <div class="q-mt-md">
            <q-item-label
                caption
                class="q-mb-sm"
            >
                واحد سنجش
            </q-item-label>
            <product-unit-lookup v-model:selectedId="formStore.editBatchModel.value.productUnit.fieldValue" />
            <q-checkbox
                v-model="formStore.editBatchModel.value.productUnit.isModified"
                label="اصلاح شود؟"
            />
        </div>

        <div class="q-mt-md">
            <q-checkbox
                v-model="formStore.editBatchModel.value.isForPurchase.fieldValue"
                true-value="1"
                false-value="0"
                label="برای خرید"
            />
            <q-checkbox
                v-model="formStore.editBatchModel.value.isForPurchase.isModified"
                label="اصلاح شود؟"
            />
        </div>

        <div class="q-mt-md">
            <q-checkbox
                v-model="formStore.editBatchModel.value.isForSale.fieldValue"
                true-value="1"
                false-value="0"
                label="برای فروش"
            />
            <q-checkbox
                v-model="formStore.editBatchModel.value.isForSale.isModified"
                label="اصلاح شود؟"
            />
        </div>

        <div class="q-mt-md">
            <q-checkbox
                v-model="formStore.editBatchModel.value.isActive.fieldValue"
                true-value="1"
                false-value="0"
                label="فعال"
            />
            <q-checkbox
                v-model="formStore.editBatchModel.value.isActive.isModified"
                label="اصلاح شود؟"
            />
        </div>
    </q-form>
</template>
  
<script setup>
import { ref } from "vue"
import { productType } from "src/constants"
import { helper } from "src/helpers"
import { useProductModel } from "../../../_composables/useProductModel"

import CustomInput from "src/components/shared/Forms/CustomInput.vue"
import CustomSelect from "src/components/shared/Forms/CustomSelect.vue"
import ProductGroupLookup from "src/components/shared/lookups/ProductGroupLookup.vue"
import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue"

const props = defineProps({
    selectedIds: Array
})

const form = ref(null)
const formStore = useProductModel()

async function submitForm() {
    try {
        const isValid = await form.value.validate();

        if (isValid) {
            await formStore.crudStore.editBatch(props.selectedIds, formStore.editBatchModel.value);
            return true;
        } else {
            alert("Validation error");
            return false;
        }
    } catch (error) {
        console.error("Error during form submission:", error);
        return false;
    }
}

defineExpose({
    submitForm
})
</script>
