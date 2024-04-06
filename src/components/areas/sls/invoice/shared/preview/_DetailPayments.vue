<template>
  <div class="row q-py-lg q-gutter-sm">
    <template v-if="model.value.invoiceRemained.remained">
      <q-btn color="primary" padding="4px 12px" unelevated>
        <q-icon name="o_add" size="xs" class="q-mr-xs" />
        <span>دریافت</span>
      </q-btn>

      <q-btn color="primary" padding="4px 12px" unelevated>
        <q-icon name="o_check" size="xs" class="q-mr-xs" />
        <span>تسویه حساب</span>
      </q-btn>
    </template>

    <q-btn color="primary" padding="4px 12px" unelevated flat>
      <q-icon name="o_description" size="xs" class="q-mr-xs" />
      <span>مشاهده سند حسابداری</span>
    </q-btn>
  </div>

  <div class="bordered" v-if="!model.value.invoiceRemained.remained">
    <div class="text-body3 text-bold q-pa-md">
      <q-icon name="o_arrow_downward" color="info" size="xs" />
      دریافتها
    </div>
    <data-grid class="q-mt-md" :invoice-id="model?.value.id"></data-grid>
    <q-separator size="2px" class="q-mt-lg" color="positive"></q-separator>
    <div class="row text-body3 q-gutter-x-sm q-mt-md">
      <div class="col-7 row items-center justify-end">
        <span class="text-body3">جمع دریافتی:</span>
      </div>
      <div class="col text-body3 text-bold">
        {{ model.value.invoiceRemained.payedAmount.toLocaleString() }}
      </div>
    </div>

    <div class="row text-body3 q-gutter-x-sm q-my-md">
      <div class="col-7 row items-center justify-end">
        <span class="text-body3">مانده:</span>
      </div>
      <div class="col text-body3 text-bold">
        {{ model.value.invoiceRemained.remained.toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script setup>
import DataGrid from "src/components/areas/trs/paymentInvoice/shared/index/DataGrid.vue";
const props = defineProps({
  model: Object,
  formStore: Object,
});
</script>
