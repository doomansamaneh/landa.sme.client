<template>
  <q-card bordered>
    <q-card-section>
      <div
        class="row q-col-gutter-md justify-between items-center text-body3"
      >
        <div class="col-5">
          <div>
            شماره:
            <span class="text-weight-500">
              {{ model?.no }}
            </span>
          </div>
          <div>
            تاریخ:
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

    <q-card-section class="q-gutter-y-sm">
      <div v-if="model?.customerName">
        <span class="text-body3">
          {{ model?.customerName }}
        </span>
      </div>
      <div>
        <span class="text-body3">
          {{ model?.subject }}
        </span>
      </div>
      <div class="col no-wrap">
        <q-scroll-area
          :bar-style="{ opacity: 0 }"
          :thumb-style="{ opacity: 0 }"
          style="height: 21px"
        >
          <div class="row q-gutter-x-xs no-wrap">
            <contract-badge :title="model?.contractTitle" />
          </div>
        </q-scroll-area>
      </div>
    </q-card-section>

    <q-card-section class="q-gutter-md">
      <template
        v-for="(item, index) in model?.voucherItems"
        :key="item.id"
      >
        <div class="row items-start q-gutter-sm text-body_">
          <div
            class="col-1 text-white text-center rounded-borders bg-secondary"
          >
            <div>
              {{ index + 1 }}
            </div>
          </div>
          <div class="col">
            <span>
              {{ item.comment }}
            </span>
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
    tax-api
    :detail-url="detailUrl"
    :show-receipt="showReceipt"
  />
</template>

<script setup>
  import { helper } from "src/helpers";
  import { subSystem, voucherType } from "src/constants";

  import DetailSection from "../../shared/preview/_DetailSection.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import TypeBadge from "src/components/areas/_shared/badges/TypeBadge.vue";
  import SystemBadge from "src/components/areas/_shared/badges/SystemBadge.vue";
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
