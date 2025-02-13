<template>
  <q-card bordered>
    <q-card-section>
      <div
        class="row q-col-gutter-md justify-between items-center text-body3"
      >
        <div class="col-5">
          <div>
            ش سند:
            <span class="text-weight-500">
              {{ model?.voucherNo }}
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
      <div>
        از:
        <span v-if="model?.fromBankTitle">
          {{ model?.fromBankTitle }} /
          {{ model?.fromBankAccountTypeTitle }} /
          {{ model?.fromBankAccountTitle }}
        </span>
        <span v-else>
          {{ model?.fromCashTitle }}
        </span>
      </div>
      <div>
        به:
        <span v-if="model?.toBankTitle">
          {{ model?.toBankTitle }} /
          {{ model?.toBankAccountTypeTitle }} /
          {{ model?.toBankAccountTitle }}
        </span>
        <span v-else>
          {{ model?.toCashTitle }}
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
      <q-separator />
      <div v-if="model?.fromFee" class="text-right">
        کارمزد:
        <span class="text-weight-500">
          {{ helper.formatNumber(model?.fromFee) }}
        </span>
      </div>
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

  <detail-section class="q-mt-md" :model="model" />
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
  });
</script>
