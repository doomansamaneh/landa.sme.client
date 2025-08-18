<template>
  <q-card bordered>
    <q-card-section>
      <div
        class="row q-col-gutter-md justify-between items-center text-body3"
      >
        <div class="col-5">
          <div>
            {{ $t("shared.labels.docNo") }}:
            <span class="text-weight-500">
              {{ model?.voucherNo }}
            </span>
          </div>
          <div>
            {{ $t("shared.labels.date") }}:
            <span class="text-weight-500">
              {{ model?.date?.substring(0, 10) }}
            </span>
          </div>
        </div>
        <div class="row col justify-end q-gutter-sm">
          <row-no-badge :no="model?.rowNo" />
        </div>
      </div>
    </q-card-section>

    <q-separator size="1px" />

    <q-card-section class="q-gutter-y-xs">
      <div>
        <span class="text-body3">
          انبار: {{ model?.inventoryTitle }}
        </span>
      </div>
      <div>
        <span class="text-body3">
          {{ model?.subject }}
        </span>
      </div>
      <div class="row q-gutter-xs">
        <contract-badge :title="model?.contractTitle" />
      </div>
    </q-card-section>

    <q-card-section class="q-gutter-md">
      <template
        v-for="(item, index) in model?.repositionItems"
        :key="item.id"
      >
        <div class="row items-start q-gutter-sm">
          <div
            class="col-1 text-white text-center rounded-borders bg-secondary"
          >
            <div>
              {{ index + 1 }}
            </div>
          </div>
          <div class="col">
            <div>
              {{ item.productCode }} / {{ item.productTitle }}
            </div>
            <div>
              {{ helper.formatNumber(item.quantity) }}
              {{ item.productUnitTitle }}
              {{ helper.formatNumber(item.price) }}
              {{ item.cuurencyTitle ?? "ریال" }}
            </div>
          </div>
        </div>
      </template>
      <q-separator />
      <div class="text-right">
        <span class="text-weight-600">
          {{ helper.formatNumber(model?.amount) }}
          <span class="text-caption">
            {{ model?.currencyTitle }}
          </span>
        </span>
      </div>
    </q-card-section>
  </q-card>

  <detail-section
    class="q-mt-md"
    :model="model"
    :detail-url="detailUrl"
  />
</template>

<script setup>
  import { helper } from "src/helpers";

  import DetailSection from "../../shared/preview/_DetailSection.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import RowNoBadge from "src/components/areas/_shared/badges/RowNoBadge.vue";

  const props = defineProps({
    model: Object,
    title: String,
    detailUrl: String,
    showSaleHeader: Boolean,
    showReceipt: Boolean,
    taxApi: Boolean,
  });
</script>
