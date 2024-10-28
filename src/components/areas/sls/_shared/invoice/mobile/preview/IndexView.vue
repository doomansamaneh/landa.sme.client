<template>
  <div
    class="row q-col-gutter-md justify-between items-center text-body3 no-letter-spacing"
  >
    <div>
      <div>
        <span class="text-body3 q-mr-xs caption-on-dark">
          خریدار:
        </span>
        <span class="text-body3 text-weight-500">
          {{ model.customerName }}
        </span>
      </div>
      <div>
        <span class="text-body3 q-mr-xs caption-on-dark">
          فروشنده:
        </span>
        <span class="text-body3 text-weight-500">
          {{ appConfigStore.model.value.companySetting.name }}
        </span>
      </div>
    </div>

    <div>
      <div class="row justify-end">
        <span class="caption-on-dark text-weight-500">
          {{ model.no }}
          <span class="caption-on-dark">#</span>
        </span>
      </div>
      <div>
        <span class="caption-on-dark text-weight-500">
          {{ model.date?.substring(0, 10) }}
        </span>
      </div>
    </div>
  </div>

  <!-- <q-separator class="q-my-sm" size="0.5px" /> -->

  <div class="row q-my-lg" v-if="model.comment">
    <div class="full-width rounded-borders bordered q-pa-sm">
      <span class="text-body3 q-mr-sm">شرح:</span>
      <span class="text-body3">
        {{ model.comment }}
      </span>
    </div>
  </div>

  <div class="row q-py-sm q-gutter-xs">
    <status-badge
      class="text-weight-500 text-caption"
      padding="0 8px"
      :title="model.statusTitle"
    />
    <type-badge
      class="text-weight-500 text-caption"
      padding="0 8px"
      :title="model.typeTitle"
    />
    <contract-badge
      class="text-weight-500 text-caption"
      padding="0 8px"
      :title="model.contractTitle"
    />
  </div>

  <q-separator class="q-my-sm" size="0.5px" />

  <div
    class="q-py-sm border-radius-sm text-body2 text-weight-500"
  >
    <q-icon size="20px" name="list" />
    اقلام
  </div>

  <q-card-section :class="$q.screen.xs ? 'no-padding' : ''">
    <div v-for="item in model.invoiceItems" :key="item.id">
      <div class="row q-mb-md q-col-gutter-lg">
        <div class="col">
          <div class="row items-center">
            <div>
              <div class="row">
                <div class="text-body3">
                  {{ item.productTitle }}

                  <q-badge color="red" round dense unelevated>
                    <div class="text-white text-body3">
                      {{ helper.formatNumber(item.quantity) }}
                    </div>
                  </q-badge>
                  ({{ item.productUnitTitle }})
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <div class="text-bold_">
            {{ helper.formatNumber(item.price) }}
          </div>
        </div>
      </div>
    </div>
  </q-card-section>

  <q-card-section :class="$q.screen.xs ? 'no-padding' : ''">
    <div class="q-gutter-y-sm border-radius text-on-dark">
      <div class="row items-center justify-between">
        <div class="text-body3">{{ $t("shared.labels.price") }}</div>
        <div>
          {{ helper.formatNumber(model.totalNetPrice) }}
        </div>
      </div>
      <div
        v-if="model.totalDiscount"
        class="row items-center justify-between"
      >
        <div class="">
          <div class="text-body3">{{ $t("shared.labels.discount") }}</div>
        </div>
        <div :class="$q.dark.isActive ? 'text-red-5' : 'text-negative'">
          ({{ helper.formatNumber(model.totalDiscount) }})
        </div>
      </div>

      <div
        v-if="model.totalVat"
        class="row items-center justify-between"
      >
        <span class="text-body3">{{ $t("shared.labels.vat") }}</span>
        <span>
          {{ helper.formatNumber(model.totalVat) }}
        </span>
      </div>


      <div class="row items-center justify-between">
        <span class="text-body3">{{ $t("shared.labels.total") }}</span>

        <span class="text-weight-600">
          {{ helper.formatNumber(model.totalPrice) }}
        </span>
      </div>
      <div class="row items-center justify-end">
        <span class="text-body3 q-px-xs">
          {{ numberToWords(model.totalPrice ?? 0) }}
        </span>
        <b class="text-body3">({{ model.currencyTitle }})</b>
      </div>
    </div>
  </q-card-section>

  <!-- <q-separator class="q-mt-md" size="0.5px" /> -->

  <!-- <div
    class="q-mt-sm q-py-sm border-radius-sm text-body2 text-weight-500"
  >
    <q-icon size="20px" name="o_description" />
    جزئیات فاکتور
  </div> -->

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
  import { numberToWords } from "@persian-tools/persian-tools";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import DetailSection from "../../shared/preview/_DetailSection.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import StatusBadge from "src/components/areas/_shared/badges/StatusBadge.vue";
  import TypeBadge from "src/components/areas/_shared/badges/TypeBadge.vue";

  const props = defineProps({
    model: Object,
    title: String,
    detailUrl: String,
    showSaleHeader: Boolean,
    showReceipt: Boolean,
    taxApi: Boolean,
  });
  const appConfigStore = useAppConfigModel();
</script>

<style lang="scss" scoped>
  .label {
    padding: 2px 12px;
  }
</style>
