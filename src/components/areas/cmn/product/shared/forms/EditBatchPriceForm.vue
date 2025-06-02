<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-mb-lg">
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <custom-input
            label="قیمت خرید"
            v-model="
              formStore.editBatchModel.value.purchasePrice.fieldValue
            "
            type="number"
          >
            <template #append>
              <q-btn-toggle
                rounded
                unelevated
                padding="0 12px"
                v-model="
                  formStore.editBatchModel.value.purchasePrice
                    .isIncrease
                "
                :options="[
                  { label: 'افزایش', value: true },
                  { label: 'کاهش', value: false },
                ]"
                dense
              />
            </template>
          </custom-input>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="q-mt-lg"
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.purchasePrice.isModified
            "
            label="اصلاح شود؟"
          />
        </div>
      </div>
    </div>

    <div class="q-mb-lg">
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <custom-input
            label="قیمت فروش"
            v-model="formStore.editBatchModel.value.price.fieldValue"
            type="number"
          >
            <template #append>
              <q-btn-toggle
                rounded
                unelevated
                padding="0 12px"
                v-model="
                  formStore.editBatchModel.value.price.isIncrease
                "
                :options="[
                  { label: 'افزایش', value: true },
                  { label: 'کاهش', value: false },
                ]"
                dense
              />
            </template>
          </custom-input>
        </div>
        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="q-mt-lg"
            dense
            size="46px"
            v-model="formStore.editBatchModel.value.price.isModified"
            label="اصلاح شود؟"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { productType } from "src/constants";
  import { helper } from "src/helpers";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { productBatchModel } from "src/models/areas/cmn/productModel";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomLabel from "src/components/shared/forms/CustomLabel.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import ProductGroupLookup from "src/components/shared/lookups/ProductGroupLookup.vue";
  import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";

  const props = defineProps({
    selectedIds: Array,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "cmn/product",
    batchModel: productBatchModel,
  });

  async function submitForm() {
    const isValid = await form.value.validate();

    if (isValid) {
      await formStore.crudStore.editBatch(
        props.selectedIds,
        formStore.editBatchModel.value
      );
      return true;
    } else {
      // alert("Validation error");
      return false;
    }
  }

  defineExpose({
    submitForm,
  });
</script>
