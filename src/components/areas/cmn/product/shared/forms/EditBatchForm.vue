<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-mb-md">
      <custom-label label="گروه کالا" />
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <product-group-lookup
            v-model:selectedId="
              formStore.editBatchModel.value.productGroup.fieldValue
            "
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.productGroup.isModified
            "
            label="اصلاح شود؟"
          />
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <custom-label label="شناسه مالیاتی" />
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <custom-input
            v-model="
              formStore.editBatchModel.value.taxCode.fieldValue
            "
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.taxCode.isModified
            "
            label="اصلاح شود؟"
          />
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <custom-label label="نوع" />
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <custom-select
            v-model="
              formStore.editBatchModel.value.productType.fieldValue
            "
            :options="
              helper.getEnumOptions(productType, 'productType')
            "
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.productType.isModified
            "
            label="اصلاح شود؟"
          />
        </div>
      </div>
    </div>

    <div class="q-mb-lg">
      <custom-label label="واحد سنجش" />

      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <product-unit-lookup
            v-model:selectedId="
              formStore.editBatchModel.value.productUnit.fieldValue
            "
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.productUnit.isModified
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
          <q-checkbox
            class="col-md-2 col-sm-2 col-xs-4"
            v-model="
              formStore.editBatchModel.value.isForPurchase.fieldValue
            "
            true-value="1"
            false-value="0"
            label="برای خرید"
            dense
            size="46px"
          />
        </div>
        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="col-md-2 col-sm-3 col-xs-6"
            v-model="
              formStore.editBatchModel.value.isForPurchase.isModified
            "
            label="اصلاح شود؟"
            dense
            size="46px"
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
          <q-checkbox
            class="col-md-2 col-sm-2 col-xs-4"
            v-model="
              formStore.editBatchModel.value.isForSale.fieldValue
            "
            true-value="1"
            dense
            size="46px"
            false-value="0"
            label="برای فروش"
          />
        </div>
        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="col-md-2 col-sm-3 col-xs-6"
            v-model="
              formStore.editBatchModel.value.isForSale.isModified
            "
            label="اصلاح شود؟"
            dense
            size="46px"
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
          <q-checkbox
            class="col-md-2 col-sm-2 col-xs-4"
            v-model="
              formStore.editBatchModel.value.isActive.fieldValue
            "
            true-value="1"
            false-value="0"
            label="فعال"
            dense
            size="46px"
          />
        </div>
        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="col-md-2 col-sm-3 col-xs-6"
            v-model="
              formStore.editBatchModel.value.isActive.isModified
            "
            label="اصلاح شود؟"
            dense
            size="46px"
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
    try {
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
    } catch (error) {
      console.error("Error during form submission:", error);
      return false;
    }
  }

  defineExpose({
    submitForm,
  });
</script>
