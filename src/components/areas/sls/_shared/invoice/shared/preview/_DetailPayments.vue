<template>
  <div class="row q-py-lg q-gutter-sm">
    <template v-if="model.value.invoiceRemained.remained">
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
      >
        <q-icon name="o_check" size="xs" class="q-mr-xs" />
        <span>تسویه حساب</span>
      </q-btn>
    </template>

    <!-- <router-link class="q-mt-lg no-decoration row items-center" to="">
      <q-icon name="o_description" size="xs" class="q-mr-xs" :class="color()" />
      <span class="decoration-on-hover" :class="color()"
        >مشاهده سند حسابداری</span
      >
    </router-link> -->
  </div>

  <div
    class="bordered_"
    v-if="model.value.invoiceRemained.payedAmount"
  >
    <!-- <div class="text-body3 text-bold q-pa-md">
      <q-icon name="o_arrow_downward" color="accent" size="xs" />
      دریافتها
    </div> -->
    <data-grid
      class="q-mt-md"
      :invoice-id="model?.value.id"
    ></data-grid>
    <!-- <q-separator size="2px" class="q-mt-lg" color="positive"></q-separator> -->
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
  import { useQuasar } from "quasar";

  const $q = useQuasar();

  import DataGrid from "src/components/areas/trs/paymentInvoice/shared/index/DataGrid.vue";

  const props = defineProps({
    model: Object,
    formStore: Object,
  });

  const color = () => {
    return $q.dark.isActive ? "text-yellow" : "text-primary";
  };
</script>
