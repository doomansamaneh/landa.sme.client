<template>
  <div class="row q-py-lg q-gutter-sm">
    <template v-if="remainedAmount">
      <q-btn
        class="primary-shadow q-mr-xs"
        rounded
        color="primary"
        padding="4px 12px"
        unelevated
        :to="`/trs/receipt/createFromInvoice/${model?.value.id}`"
      >
        <q-icon name="o_add" size="xs" />
        <span>دریافت</span>
      </q-btn>

      <q-btn
        class="primary-shadow"
        rounded
        color="primary"
        padding="4px 12px"
        unelevated
        @click="settlement"
      >
        <q-icon name="o_done_all" size="xs" class="q-mr-xs" />
        <span>
          {{ $t("shared.labels.settlement") }}
        </span>
      </q-btn>
    </template>
  </div>

  <div class="bordered">
    <div class="text-body1 text-weight-500 text-center q-pa-md">
      فهرست دریافت، پرداخت
    </div>
    <invoice-payment
      ref="paymentsGrid"
      class="q-mt-md"
      :detail-url="detailUrl"
      :invoice-id="model?.value.id"
    />

    <q-separator class="q-my-sm" />

    <div class="row text-body3 q-gutter-x-sm">
      <div class="col-7 row items-center justify-end">
        <span class="text-body3">جمع کل:</span>
      </div>
      <div class="col text-body3 text-bold">
        {{ model.value.amount.toLocaleString() }}
      </div>
    </div>

    <div class="row text-body3 q-gutter-x-sm q-mt-md">
      <div class="col-7 row items-center justify-end">
        <span class="text-body3">جمع دریافتی:</span>
      </div>
      <div class="col text-body3 text-bold">
        {{ payedAmount?.toLocaleString() }}
      </div>
    </div>

    <q-separator class="q-my-sm" size="2px" />

    <div class="row text-body3 q-gutter-x-sm q-mb-md">
      <div class="col-7 row items-center justify-end">
        <span class="text-body3">مانده:</span>
      </div>
      <div class="col text-body2 text-bold">
        {{ remainedAmount?.toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";

  import InvoicePayment from "src/components/areas/trs/paymentInvoice/shared/index/InvoicePayment.vue";
  import PaymentInvoiceDialog from "src/components/areas/trs/paymentInvoice/shared/forms/PaymentInvoiceDialog.vue";

  const props = defineProps({
    model: Object,
    detailUrl: String,
  });

  const $q = useQuasar();
  const paymentsGrid = ref(null);

  const reloadData = async () => {
    paymentsGrid.value.reloadData();
  };

  const payedAmount = computed(
    () =>
      paymentsGrid?.value?.dataGrid.tableStore.summaryData?.value
        ?.amount ?? 0
  );

  const remainedAmount = computed(
    () => props.model?.value?.amount - payedAmount.value
  );

  function settlement() {
    $q.dialog({
      component: PaymentInvoiceDialog,
      componentProps: {
        invoiceId: props.model?.value?.id,
      },
    }).onOk(async () => {
      await reloadData();
    });
  }
</script>
