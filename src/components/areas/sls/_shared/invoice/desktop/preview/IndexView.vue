<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <slot name="master-section">
        <master-section-standard
          v-if="
            appConfigStore.model.value.companySetting
              .invoiceTemplate === invoiceTemplate.standard
          "
          :model="model"
          :title="title"
          :show-sale-header="showSaleHeader"
          :comment="comment"
        />
        <master-section-simple
          v-else
          :model="model"
          :title="title"
          :show-sale-header="showSaleHeader"
          :comment="comment"
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
  import { invoiceTemplate } from "src/constants";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import MasterSectionStandard from "./standard/_MasterSection.vue";
  import MasterSectionSimple from "./simple/_MasterSection.vue";
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
    comment: String,
  });

  const appConfigStore = useAppConfigModel();
</script>
