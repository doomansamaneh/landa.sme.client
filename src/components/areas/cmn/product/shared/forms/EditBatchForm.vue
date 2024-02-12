<template>
  <q-form
    ref="form"
    autofocus
    class="q-px-sm"
    :class="{ 'q-mb-md': $q.screen.sm }"
  >
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <q-item-label class="caption-on-dark text-body2 no-letter-spacing q-mb-sm">
          گروه کالا
        </q-item-label>
        <product-group-lookup v-model:selectedId="formStore.editBatchModel.value.productGroup.fieldValue" />

      </div>
      <q-checkbox
        dense
        size="46px"
        v-model="formStore.editBatchModel.value.productGroup.isModified"
        label="اصلاح شود؟"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-6">
        <q-item-label class="caption-on-dark text-body2 no-letter-spacing q-mb-sm">
          شناسه مالیاتی
        </q-item-label>
        <custom-input v-model="formStore.editBatchModel.value.taxCode.fieldValue" />

      </div>
      <q-checkbox
        v-model="formStore.editBatchModel.value.taxCode.isModified"
        label="اصلاح شود؟"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-6">
        <q-item-label class="caption-on-dark text-body2 no-letter-spacing q-mb-sm">
          نوع
        </q-item-label>

        <custom-select
          v-model="formStore.editBatchModel.value.productType.fieldValue"
          :options="helper.getEnumOptions(productType, 'productType')"
        />
      </div>
      <q-checkbox
        v-model="formStore.editBatchModel.value.productType.isModified"
        label="اصلاح شود؟"
      />
    </div>

    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-6">
        <q-item-label class="caption-on-dark text-body2 no-letter-spacing q-mb-sm">
          واحد سنجش
        </q-item-label>
        <product-unit-lookup v-model:selectedId="formStore.editBatchModel.value.productUnit.fieldValue" />
      </div>
      <q-checkbox
        v-model="formStore.editBatchModel.value.productUnit.isModified"
        label="اصلاح شود؟"
      />
    </div>

    <div class="row q-col-gutter-md">

      <div
        class="row q-gutter-md"
        :class="{ 'col-sm-12': $q.screen.sm }"
      >
        <q-checkbox
          :class="{ 'col-sm-3': $q.screen.sm }"
          v-model="formStore.editBatchModel.value.isForPurchase.fieldValue"
          true-value="1"
          false-value="0"
          label="برای خرید"
          dense
          size="46px"
        />
        <q-checkbox
          :class="{ 'col-sm-3': $q.screen.sm }"
          v-model="formStore.editBatchModel.value.isForPurchase.isModified"
          label="اصلاح شود؟"
          dense
          size="46px"
        />
      </div>

      <div
        v-if="$q.screen.gt.sm"
        class="row justify-center"
      >
        <q-separator
          vertical
          :color="$q.dark.isActive ? 'secondary' : 'grey-4'"
        />
      </div>

      <div
        class="row q-gutter-md"
        :class="{ 'col-sm-12': $q.screen.sm }"
      >
        <q-checkbox
          :class="{ 'col-sm-3': $q.screen.sm }"
          v-model="formStore.editBatchModel.value.isForSale.fieldValue"
          true-value="1"
          dense
          size="46px"
          false-value="0"
          label="برای فروش"
        />
        <q-checkbox
          :class="{ 'col-sm-3': $q.screen.sm }"
          v-model="formStore.editBatchModel.value.isForSale.isModified"
          label="اصلاح شود؟"
          dense
          size="46px"
        />
      </div>

      <div
        v-if="$q.screen.gt.sm"
        class="row justify-center"
      >
        <q-separator
          vertical
          :color="$q.dark.isActive ? 'secondary' : 'grey-4'"
        />
      </div>

      <div
        class="row q-gutter-md"
        :class="{ 'col-sm-12': $q.screen.sm }"
      >
        <q-checkbox
          :class="{ 'col-sm-3': $q.screen.sm }"
          v-model="formStore.editBatchModel.value.isActive.fieldValue"
          true-value="1"
          false-value="0"
          label="فعال"
          dense
          size="46px"
        />
        <q-checkbox
          :class="{ 'col-sm-3': $q.screen.sm }"
          v-model="formStore.editBatchModel.value.isActive.isModified"
          label="اصلاح شود؟"
          dense
          size="46px"
        />
      </div>

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
