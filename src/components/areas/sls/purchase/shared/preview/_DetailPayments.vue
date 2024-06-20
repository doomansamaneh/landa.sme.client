<template>
  <div class="row q-py-lg q-gutter-sm">
    <template v-if="model.value.invoiceRemained.remained">
      <q-btn
        class="primary-shadow q-mr-xs"
        rounded
        color="primary"
        padding="4px 12px"
        unelevated
        :to="`/trs/payment/createFromInvoice/${model?.value.id}`"
      >
        <q-icon name="o_add" size="xs" />
        <span>پرداخت</span>
      </q-btn>

      <q-btn
        class="primary-shadow"
        rounded
        color="primary"
        padding="4px 12px"
        unelevated
      >
        <q-icon name="o_check" size="xs" class="q-mr-xs" />
        <span>تسویه حساب</span>
      </q-btn>
    </template>
  </div>

  <div
    class="bordered_"
    v-if="model.value.invoiceRemained.payedAmount"
  >
    <data-grid
      class="q-mt-md"
      :invoice-id="model?.value.id"
    ></data-grid>
    <div class="row text-body3 q-gutter-x-sm q-mt-md">
      <div class="col-7 row items-center justify-end">
        <span class="text-body3">جمع پرداختی:</span>
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
