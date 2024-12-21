<template>
  <div
    class="row q-gutter-sm"
    :class="$q.screen.gt.xs ? 'q-pb-md' : 'q-py-md'"
  >
    <template v-if="remainedAmount">
      <q-btn
        v-if="showReceipt"
        class="primary-shadow"
        rounded
        color="primary"
        padding="4px 12px"
        unelevated
        :to="`/trs/receipt/createFromInvoice/${model.id}`"
      >
        <q-icon name="o_add" size="xs" />
        <span>دریافت</span>
      </q-btn>
      <q-btn
        v-else
        class="primary-shadow q-mr-xs"
        rounded
        color="primary"
        padding="4px 12px"
        unelevated
        :to="`/trs/payment/createFromInvoice/${model.id}`"
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
        @click="settlement"
      >
        <q-icon name="o_done_all" size="xs" class="q-mr-xs" />
        <span>
          {{ $t("shared.labels.settlement") }}
        </span>
      </q-btn>
    </template>
  </div>

  <div class="border-radius-sm bordered">
    <div
      class="text-body1 no-letter-spacing text-weight-500 text-center q-pa-md"
    >
      فهرست دریافت، پرداخت
    </div>
    <invoice-payment
      ref="paymentsGrid"
      class="q-mt-md"
      :detail-url="detailUrl"
      :invoice-id="model.id"
    />

    <q-separator class="q-my-sm" />

    <div class="row text-body3 q-gutter-x-sm">
      <div class="col-7 row items-center justify-end">
        <span class="text-body3">جمع کل:</span>
      </div>
      <div class="col text-body3 text-bold">
        {{ helper.formatNumber(model.amount) }}
      </div>
    </div>

    <div class="row text-body3 q-gutter-x-sm q-mt-md">
      <div class="col-7 row items-center justify-end">
        <span class="text-body3">جمع دریافتی:</span>
      </div>
      <div class="col text-body3 text-bold">
        {{ helper.formatNumber(payedAmount) }}
      </div>
    </div>

    <q-separator class="q-my-sm" size="2px" />

    <div class="row text-body3 q-gutter-x-sm q-mb-md">
      <div class="col-7 row items-center justify-end">
        <span class="text-body3">مانده:</span>
      </div>
      <div class="col text-body2 text-bold">
        {{ helper.formatNumber(remainedAmount) }}
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";

  import InvoicePayment from "src/components/areas/trs/paymentInvoice/shared/index/InvoicePayment.vue";
  import PaymentInvoiceDialog from "src/components/areas/trs/paymentInvoice/shared/forms/PaymentInvoiceDialog.vue";
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
    detailUrl: String,
    showReceipt: Boolean,
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
    () => props.model.amount - payedAmount.value
  );

  function settlement() {
    $q.dialog({
      component: PaymentInvoiceDialog,
      componentProps: {
        invoiceId: props.model.id,
      },
    }).onOk(async () => {
      await reloadData();
    });
  }
</script>
