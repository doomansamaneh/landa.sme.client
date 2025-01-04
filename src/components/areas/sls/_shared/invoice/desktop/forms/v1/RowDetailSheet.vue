<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <custom-input-number
        label="تخفیف"
        input-class="text-body2 no-letter-spacing"
        v-model="item.discount"
        placeholder="تخفیف"
      />
    </div>

    <div class="col-md-9 col-sm-9 col-xs-9">
      <vat-lookup
        label="مالیات"
        input-class="text-body2 no-letter-spacing"
        placeholder="مالیات بر ارزش افزوده"
        v-model:selectedId="item.vatId"
        v-model:selectedText="item.vatTitle"
        :filterExpression="vatFilter"
        @rowSelected="vatChanged($event, item)"
      />
    </div>
    <div class="col-md-3 col-sm-3 col-xs-3">
      <custom-input-number
        label="مبلغ مالیات"
        input-class="text-body2 no-letter-spacing"
        v-model="item.vatAmount"
        placeholder="مبلغ مالیات"
      />
    </div>

    <div class="col-md-12 col-sm-12 col-xs-12">
      <custom-input
        label="شرح ردیف"
        hide-bottom-space
        v-model="item.comment"
        type="textarea"
      />
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12">
      <custom-input
        label="شرح تخفیف"
        hide-bottom-space
        v-model="item.discountComment"
        type="textarea"
      />
    </div>
  </div>
</template>

<script setup>
  import {
    sqlOperator,
    vatType,
    invoiceFormType,
  } from "src/constants";

  import VatLookup from "src/components/shared/lookups/VatLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    item: Object,
    formType: invoiceFormType,
  });

  const vatFilter =
    props.formType == invoiceFormType.sales
      ? [
          {
            fieldName: "isForSale",
            operator: sqlOperator.in,
            value: `${vatType.sale},${vatType.purchaseAndSale}`,
          },
        ]
      : [
          {
            fieldName: "isForSale",
            operator: sqlOperator.in,
            value: `${vatType.purchase},${vatType.purchaseAndSale}`,
          },
        ];

  const vatChanged = (vat, item) => {
    item.vatPercent = vat?.rate ?? 0;
  };
</script>
