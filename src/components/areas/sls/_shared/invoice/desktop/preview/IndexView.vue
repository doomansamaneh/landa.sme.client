<template>
  <div class="row q-col-gutter-lg" style="margin-top: -16px">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <slot name="master-section">
        <master-section
          :model="model"
          :title="title"
          :show-sale-header="showSaleHeader"
        />
      </slot>
    </div>

    <div class="col-md-4 col-sm-12 col-xs-12">
      <slot name="detail-section">
        <detail-section
          :model="model"
          :tax-api="taxApi"
          :detail-url="detailUrl"
          :show-receipt="showReceipt"
        />
      </slot>
    </div>
  </div>
</template>

<script setup>
  import MasterSection from "./_MasterSection.vue";
  import DetailSection from "../../shared/preview/_DetailSection.vue";

  const props = defineProps({
    model: Object,
    purchaseHeader: Boolean,
    title: String,
    inside: Boolean,
    margin: Boolean,
    detailUrl: String,
    showSaleHeader: Boolean,
    showReceipt: Boolean,
    taxApi: Boolean,
  });

  // const invoiceStore = useInvoiceState();

  // function deleteCallBack() {
  //   invoiceStore.state.firstLoad.value = false;
  //   router.back();
  // }
</script>
