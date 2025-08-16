<template>
  <q-form ref="form" autofocus :class="{ 'q-mb-md': $q.screen.sm }">
    <div class="q-mb-md">
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
            :label="$t('shared.labels.productGroup')"
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="q-mt-lg"
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.productGroup.isModified
            "
            :label="$t('shared.labels.shouldBeModified')"
          />
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <custom-input
            :label="$t('shared.labels.taxId')"
            v-model="
              formStore.editBatchModel.value.taxCode.fieldValue
            "
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="q-mt-lg"
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.taxCode.isModified
            "
            :label="$t('shared.labels.shouldBeModified')"
          />
        </div>
      </div>
    </div>

    <div class="q-mb-md">
      <div
        class="row items-center"
        :class="
          $q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-sm'
        "
      >
        <div class="col-md-9 col-sm-9 col-xs-12">
          <custom-select
            :label="$t('shared.labels.typeTitle')"
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
            class="q-mt-lg"
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.productType.isModified
            "
            :label="$t('shared.labels.shouldBeModified')"
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
          <product-unit-lookup
            :label="$t('shared.labels.productUnitTitle')"
            v-model:selectedId="
              formStore.editBatchModel.value.productUnit.fieldValue
            "
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="q-mt-lg"
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.productUnit.isModified
            "
            :label="$t('shared.labels.shouldBeModified')"
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
            :label="$t('shared.labels.forPurchase')"
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
            :label="$t('shared.labels.shouldBeModified')"
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
            :label="$t('shared.labels.forSale')"
          />
        </div>
        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="col-md-2 col-sm-3 col-xs-6"
            v-model="
              formStore.editBatchModel.value.isForSale.isModified
            "
            :label="$t('shared.labels.shouldBeModified')"
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
            :label="$t('shared.columns.isActive')"
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
            :label="$t('shared.labels.shouldBeModified')"
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
