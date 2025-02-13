<template>
  <div class="q-mt-lg">
    <div class="row items-center no-wrap q-gutter-md">
      <div class="row no-wrap items-center col">
        <q-avatar size="42px" class="primary-gradient text-white">
          <div class="text-body2 text-bold">
            {{ helper.getFirstChar(model?.customerName) }}
          </div>
        </q-avatar>

        <div class="q-ml-md">
          <div class="ellipsis text-body2 text-weight-500">
            {{ model?.customerName }}
          </div>
          <div class="text-body3 caption-on-dark ellipsis">
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

    <q-separator size="0.5px" class="q-my-sm" />

    <div class="col no-wrap">
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
          />

          <contract-badge
            class="text-weight-500 text-caption"
            padding="0 8px"
            :title="model.contractTitle"
          />
        </div>
      </q-scroll-area>
    </div>
  </div>

  <div class="row items-center q-gutter-sm q-pt-lg q-pb-sm">
    <div class="caption-on-dark text-weight-500 text-body2">
      جزییات اقلام
    </div>
  </div>

  <div v-for="(item, index) in model.invoiceItems" :key="item.id">
    <div class="row q-col-gutter-xl items-center q-py-sm">
      <div class="row col no-wrap items-center q-gutter-md">
        <q-avatar
          size="32px"
          text-color="white"
          :style="helper.generateAvatarStyle(item.id)"
        >
          <div class="text-caption-sm text-bold">
            {{ helper.getFirstChar(item.productTitle) }}
          </div>
        </q-avatar>

        <div>
          <div class="text-body3 ellipsis text-weight-500">
            {{ item.productTitle }}
          </div>

          <div class="caption-on-dark q-mt-xs">
            <span>
              {{ helper.formatNumber(item.quantity) }}
              {{ item.productUnitTitle }}
            </span>
            ×
            <span>
              {{ helper.formatNumber(item.price) }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <div class="text-weight-500">
          {{ helper.formatNumber(item.price) }}
        </div>
      </div>
    </div>
    <q-separator
      v-if="index < model.invoiceItems.length - 1"
      size="0.5px"
    />
  </div>

  <div class="q-pt-sm caption-on-dark text-body2 text-weight-500">
    خلاصه کل
  </div>

  <div class="q-pt-md q-gutter-y-sm border-radius text-on-dark">
    <div class="row items-center justify-between">
      <div class="text-body3">{{ $t("shared.labels.price") }}</div>
      <div class="text-weight-500">
        {{ helper.formatNumber(model.totalNetPrice) }}
      </div>
    </div>
    <div
      v-if="model.totalDiscount"
      class="row items-center justify-between"
    >
      <div class="">
        <div class="text-body3">
          {{ $t("shared.labels.discount") }}
        </div>
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
      <span class="text-weight-500">
        {{ helper.formatNumber(model.totalVat) }}
      </span>
    </div>

    <div class="q-mt-md bg-on-dark q-pa-sm border-radius-sm">
      <div class="row items-center justify-between">
        <span class="text-body3">
          {{ $t("shared.labels.total") }}
        </span>

        <span class="text-weight-600">
          {{ helper.formatNumber(model.totalPrice) }}
        </span>
      </div>
      <div class="row q-gutter-xs items-center">
        <span class="text-body3">
          {{ numberToWords(model.totalPrice ?? 0) }}
        </span>
        <span class="text-caption text-weight-500">
          ({{ model.currencyTitle }})
        </span>
      </div>
    </div>
  </div>
  <div class="row q-gutter-sm items-center justify-center q-my-md">
    <hr class="col" />
    <q-btn
      class="bordered"
      round
      dense
      unelevated
      @click="toggleDetailSection"
    >
      <q-icon size="24px" name="o_expand_more" />
    </q-btn>
    <hr class="col" />
  </div>

  <q-slide-transition>
    <div v-show="detailSection">
      <detail-section
        :model="model"
        tax-api
        :detail-url="detailUrl"
        :show-receipt="showReceipt"
      />
    </div>
  </q-slide-transition>
</template>

<script setup>
  import { ref } from "vue";
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
