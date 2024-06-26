<template>
  <div class="row">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">کالا/خدمت</q-item-label>
      <product-lookup
        placeholder="انتخاب کالا/خدمت"
        v-model:selectedId="row.productId"
        v-model:selectedText="row.productTitle"
        :filterExpression="productFilter"
        @rowSelected="productChanged($event)"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-2 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">مقدار</q-item-label>
      <custom-input-number v-model="row.quantity" placeholder="مقدار" />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">واحد سنجش</q-item-label>
      <product-unit-lookup
        placeholder="واحد سنجش"
        v-model:selectedId="row.productUnitId"
        v-model:selectedText="row.productUnitTitle"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-2 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">مبلغ واحد</q-item-label>
      <custom-input-number v-model="row.price" placeholder="مبلغ واحد" />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شرح ردیف</q-item-label>
      <custom-input hide-bottom-space v-model="row.comment" autogrow />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-2 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">تخفیف</q-item-label>
      <custom-input-number v-model="row.discount" placeholder="تخفیف" />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شرح تخفیف</q-item-label>
      <custom-input hide-bottom-space v-model="row.discountComment" autogrow />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-6 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">مالیات بر ارزش افزوده</q-item-label>
      <vat-lookup
        placeholder="مالیات بر ارزش افزوده"
        v-model:selectedId="row.vatId"
        v-model:selectedText="row.vatTitle"
        :filterExpression="vatFilter"
        @rowSelected="vatChanged($event)"
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-2 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">مبلغ مالیات</q-item-label>
      <custom-input-number v-model="row.vatAmount" placeholder="مبلغ مالیات" />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-2 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">جمع کل</q-item-label>
      <q-field outlined dense disable>
        <template v-slot:control>
          <div
            class="self-center full-width no-outline text-right"
            tabindex="0"
          >
            {{ row.totalPrice?.toLocaleString() }}
          </div>
        </template>
      </q-field>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { sqlOperator } from "src/constants";
import { useInvoiceItemModel } from "src/components/areas/sls/_composables/useInvoiceItemModel";

import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
import ProductUnitLookup from "src/components/shared/lookups/ProductUnitLookup.vue";
import VatLookup from "src/components/shared/lookups/VatLookup.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

const props = defineProps({
  item: Object,
});

const itemStore = useInvoiceItemModel(props.item);

const row = computed(() => itemStore.model.value);

const vatFilter = [
  { fieldName: "isForSale", operator: sqlOperator.in, value: "1,2" },
];

const productFilter = [
  { fieldName: "isForSale", operator: sqlOperator.equal, value: "1" },
];

const vatChanged = (vat) => {
  row.value.vatPercent = vat?.rate ?? 0;
};

const productChanged = (product) => {
  row.value.price = product?.price ?? 0;
  row.value.productCode = product?.code;
  row.value.productTitle = product?.title;
  row.value.productUnitId = product?.productUnitId ?? null;
  row.value.productUnitTitle = product?.productUnitTitle ?? null;
};

defineExpose({
  model: itemStore.model.value,
});
</script>
