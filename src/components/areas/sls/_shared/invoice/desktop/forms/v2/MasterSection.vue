<template>
  <div class="row q-col-gutter-sm">
    <div class="col-md-5 col-sm-12 col-xs-12">
      <customer-lookup
        ref="customerLookup"
        :label="customerTitle"
        v-model:selectedId="model.customerId"
        v-model:selectedText="model.customerName"
        required
        dl-balance
      />
    </div>

    <div class="col-md-3 col-sm-6 col-xs-12">
      <cash-lookup
        label="صندوق"
        v-model:selectedId="model.cashId"
        v-model:selectedText="model.cashTitle"
      />
    </div>

    <div class="col-md-3 col-sm-6 col-xs-12">
      <date-time label="تاریخ" v-model="model.date" required />
    </div>

    <div class="flex q-mt-lg items-center justify-center col">
      <q-btn
        v-if="$q.screen.gt.xs"
        :text-color="$q.dark.isActive ? 'white' : 'grey-9'"
        round
        padding="4px"
        unelevated
        class="text-body2"
        @click="toggleMoreInfo"
      >
        <q-icon size="24px" name="keyboard_arrow_down" />
      </q-btn>

      <q-btn
        v-if="$q.screen.xs"
        round
        size="11px"
        unelevated
        @click="toggleMoreInfo"
      >
        <q-icon size="20px" name="keyboard_arrow_down" />
      </q-btn>
    </div>
  </div>

  <q-slide-transition>
    <div v-show="moreInfo">
      <div class="row q-col-gutter-sm q-pt-sm">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <custom-label label="شماره فاکتور" class="q-mb-sm" />
          <q-input
            type="number"
            hide-bottom-space
            v-model="model.no"
            outlined
            dense
            :disable="!model.manualNo"
          >
            <template #append>
              <q-icon
                size="sm"
                :name="invoiceNo ? 'o_no_encryption' : 'o_lock'"
                class="cursor-pointer all-pointer-events"
                @click="toggleInvocieNo"
              />
            </template>
          </q-input>
        </div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <date-time label="سررسید" v-model="model.dueDate" />
        </div>

        <div class="col-md-6 col-sm-12 col-xs-12">
          <sale-type-lookup
            :label="saleTypeTitle"
            v-model:selectedId="model.typeId"
            v-model:selectedText="model.typeTitle"
            :filter-expression="filterExpression"
          />
        </div>

        <div class="col-md-6 col-sm-6 col-xs-12">
          <inventory-lookup
            label="انبار"
            v-model:selectedId="model.inventoryId"
            v-model:selectedText="model.inventoryTitle"
            required
          />
        </div>
        <div class="col-md-6 col-sm-6 col-xs-12">
          <contract-lookup
            label="قرارداد"
            v-model:selectedId="model.contractId"
            v-model:selectedText="model.contractTitle"
          />
        </div>

        <div class="col-md-6 col-sm-12 col-xs-12">
          <customer-lookup
            label="بازاریاب"
            v-model:selectedId="model.contactId"
            v-model:selectedText="model.contactName"
          />
        </div>
        <div
          v-if="showOriginalDoc"
          class="col-md-6 col-sm-12 col-xs-12"
        >
          <invoice-lookup
            v-model:selectedId="model.originalDocument.parentId"
            v-model:selectedText="model.originalDocument.no"
            :filter-expression="originalFilterExpression"
            label="سند مرجع"
          />
        </div>

        <div class="col-md-12 col-sm-12 col-xs-12">
          <q-item-label caption class="q-mb-sm">شرح</q-item-label>
          <custom-input
            v-model="model.summary"
            hide-bottom-space
            type="textarea"
          />
        </div>
      </div>
    </div>
  </q-slide-transition>
</template>

<script setup>
  import { computed, ref, watch } from "vue";
  import {
    sqlOperator,
    vatType,
    invoiceFormType,
    documentType,
  } from "src/constants";
  import { invoiceModel } from "src/models/areas/sls/invoiceModel";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";

  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import CashLookup from "src/components/shared/lookups/CashLookup.vue";
  import InvoiceLookup from "src/components/shared/lookups/InvoiceLookup.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomLabel from "src/components/shared/forms/CustomLabel.vue";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";

  const props = defineProps({
    formStore: useInvoiceModel,
    formType: invoiceFormType,
    model: invoiceModel,
  });

  const contractLookup = ref(null);
  const invoiceNo = ref(false);
  const customerLookup = ref(null);

  // Watch for model changes to reset balance
  watch(
    () => props.model,
    () => {
      customerLookup.value?.resetBalance();
    }
  );

  const moreInfo = ref(false);

  const customerTitle =
    props.formType == invoiceFormType.sales ? "مشتری" : "فروشنده";

  const saleTypeTitle =
    props.formType == invoiceFormType.sales ? "نوع فروش" : "نوع خرید";

  const originalFilterExpression = [
    {
      fieldName: "d.typeId",
      operator: sqlOperator.in,
      value: `${documentType.invoice},${documentType.salesReturn}`,
    },
  ];

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

  const toggleInvocieNo = () => {
    props.model.manualNo = !props.model.manualNo;
  };

  const showOriginalDoc = computed(
    () =>
      props.model.originalDocument &&
      (props.formType === invoiceFormType.sales ||
        props.formType === invoiceFormType.salesReturn)
  );

  const toggleMoreInfo = () => {
    moreInfo.value = !moreInfo.value;
  };
</script>

<style lang="scss" scoped>
  .q-item__label--caption {
    font-size: 14px;
    letter-spacing: 0;
    color: #697588;
  }
</style>
