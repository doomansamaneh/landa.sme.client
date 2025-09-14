<template>
  <q-card bordered>
    <q-card-section>
      <div class="row q-gutter-md justify-between no-wrap">
        <div class="row no-wrap col">
          <q-avatar size="42px" class="primary-gradient text-white">
            <div class="text-body2 text-bold">
              {{ helper.getFirstChar(model?.customerName) }}
            </div>
          </q-avatar>

          <div class="column justify-center q-ml-md">
            <div class="text-body2 text-weight-500">
              {{ model?.customerName }}
            </div>
            <div class="text-body3 caption-on-dark">
              {{ model?.customerSummary?.address?.address }}
            </div>
          </div>
        </div>

        <div>
          <div>
            <span
              class="flex justify-end text-body3 caption-on-dark text-weight-500"
            >
              {{ model.no }}
              <span class="caption-on-dark">#</span>
            </span>
          </div>

          <div>
            <span class="text-body3 caption-on-dark text-weight-500">
              {{ model.date?.substring(0, 10) }}
              <q-icon size="10px" name="o_calendar_today" />
            </span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator size="0.5px" class="q-my-sm" />

    <q-card-section>
      <q-scroll-area
        :bar-style="{ opacity: 0 }"
        :thumb-style="{ opacity: 0 }"
        style="height: 21px"
      >
        <div class="row no-wrap q-pr-xs items-center q-gutter-xs">
          <status-badge
            class="text-weight-500 text-caption"
            padding="0 8px"
            :title="model.statusTitle"
          />

          <type-badge
            class="text-weight-500 text-caption"
            padding="0 8px"
            :title="model.typeTitle"
            :type-id="model?.typeId"
          />

          <contract-badge
            class="text-weight-500 text-caption"
            padding="0 8px"
            :title="model.contractTitle"
          />
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-section>
      <template
        v-for="(item, index) in model.invoiceItems"
        :key="item.id"
      >
        <div class="row items-start q-gutter-sm">
          <span class="text-bold caption-on-dark text-body3">
            #{{ index + 1 }}
          </span>

          <div class="col">
            <span class="q-pa-xs_ text-grey_">
              <q-badge>
                {{ helper.formatNumber(item.quantity) }}
                {{ item.productUnitTitle }}
              </q-badge>
              {{ item.productCode }} - {{ item.productTitle }} /
              {{ helper.formatNumber(item.price) }}
              <span v-if="item.comment">
                /
                {{ item.comment }}
              </span>
            </span>

            <div class="text-right text-weight-500 q-mt-md">
              {{ helper.formatNumber(item.quantity * item.price) }}
              <span class="text-weight-300 text-body3">ریال</span>
            </div>
          </div>
        </div>
      </template>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div v-if="model.summary" class="q-mb-md">
        {{ model.summary }}
      </div>

      <div class="q-gutter-y-sm border-radius text-on-dark">
        <div class="row items-center justify-between">
          <div clenuass="text-body3">
            {{ $t("shared.labels.price") }}
          </div>
          <div class="text-weight-500_">
            {{ helper.formatNumber(model.totalNetPrice) }}
          </div>
        </div>
        <div
          v-if="model.totalDiscount"
          class="row items-center justify-between"
        >
          <div>
            {{ $t("shared.labels.discount") }}
          </div>
          <div
            :class="$q.dark.isActive ? 'text-red-5' : 'text-negative'"
          >
            ({{ helper.formatNumber(model.totalDiscount) }})
          </div>
        </div>

        <div
          v-if="model.totalVat"
          class="row items-center justify-between"
        >
          <span class="text-body3">
            {{ $t("shared.labels.vat") }}
          </span>
          <span class="text-weight-500_">
            {{ helper.formatNumber(model.totalVat) }}
          </span>
        </div>

        <div class="row items-center justify-between">
          <div>
            <span class="text-weight-600">
              {{ $t("shared.labels.total") }}
            </span>
            <span class="text-caption">
              ({{ model.currencyTitle }})
            </span>
          </div>

          <div class="text-weight-600">
            {{ helper.formatNumber(model.totalPrice) }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <slot name="detail-section" :model="model"></slot>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { numberToWords } from "src/helpers/numberToWords.js";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

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
  const detailSection = ref(true);

  const toggleDetailSection = () => {
    detailSection.value = !detailSection.value;
  };
</script>

<style lang="scss" scoped>
  .label {
    padding: 2px 12px;
  }
</style>
