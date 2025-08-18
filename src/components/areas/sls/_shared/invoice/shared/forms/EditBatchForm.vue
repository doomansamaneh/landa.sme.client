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
          <sale-type-lookup
            v-model:selectedId="
              formStore.editBatchModel.value.invoiceType.fieldValue
            "
            :filterExpression="filterExpression"
            :label="$t('shared.labels.typeTitle')"
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="q-mt-lg"
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.invoiceType.isModified
            "
            :label="$t('shared.labels.isModified')"
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
          <contract-lookup
            v-model:selectedId="
              formStore.editBatchModel.value.contract.fieldValue
            "
            :label="$t('shared.labels.contract')"
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="q-mt-lg"
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.contract.isModified
            "
            :label="$t('shared.labels.isModified')"
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
          <customer-lookup
            v-model:selectedId="
              formStore.editBatchModel.value.customer.fieldValue
            "
            :label="$t('shared.labels.customerName')"
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="q-mt-lg"
            dense
            size="46px"
            v-model="
              formStore.editBatchModel.value.customer.isModified
            "
            :label="$t('shared.labels.isModified')"
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
          <date-time-picker
            v-model="formStore.editBatchModel.value.date.fieldValue"
            :label="$t('shared.labels.date')"
          />
        </div>

        <div class="col-md-3 col-sm-3 col-xs-12">
          <q-checkbox
            class="q-mt-lg"
            dense
            size="46px"
            v-model="formStore.editBatchModel.value.date.isModified"
            :label="$t('shared.labels.isModified')"
          />
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import {
    invoiceFormType,
    vatType,
    sqlOperator,
  } from "src/constants";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
  import { invoiceBatchModel } from "src/models/areas/sls/invoiceModel";

  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import DateTimePicker from "src/components/shared/forms/DateTimePicker.vue";

  const props = defineProps({
    selectedIds: Array,
    formType: invoiceFormType,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "sls/invoice",
    batchModel: invoiceBatchModel,
  });

  const filterExpression =
    props.formType == invoiceFormType.sales ||
    props.formType == invoiceFormType.salesReturn
      ? [
          {
            fieldName: "isForSale",
            operator: sqlOperator.equal,
            value: vatType.sale,
          },
        ]
      : [
          {
            fieldName: "isForSale",
            operator: sqlOperator.equal,
            value: vatType.purchase,
          },
        ];

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
