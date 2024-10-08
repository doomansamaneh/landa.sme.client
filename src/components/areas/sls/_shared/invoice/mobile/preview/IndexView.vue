<template>
  <q-card bordered>
    <q-card-section>
      <div
        class="row q-col-gutter-md justify-between items-center text-body3 no-letter-spacing"
      >
        <div class="col-5">
          <div>
            شماره:
            <span class="text-weight-500">
              {{ model.no }}
            </span>
          </div>
          <div>
            تاریخ:
            <span class="text-weight-500">
              {{ model.date?.substring(0, 10) }}
            </span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row q-mt-sm">
        <div>
          <span class="q-mr-sm">فروشنده:</span>
          <span class="text-weight-500">
            {{ appConfigStore.model.value.companySetting.name }}
          </span>
          <span
            v-if="appConfigStore.model.value.companySetting.address"
          >
            -
          </span>
          <span
            v-if="appConfigStore.model.value.companySetting.address"
            class="text-grey-6 text-body3 no-letter-spacing"
          >
            {{ appConfigStore.model.value.companySetting.address }}
          </span>
          <span
            v-if="appConfigStore.model.value.companySetting.phone"
          >
            -
          </span>
          <span
            v-if="appConfigStore.model.value.companySetting.phone"
            class="text-caption text-grey-6"
          >
            <q-icon name="o_phone" />
            {{ appConfigStore.model.value.companySetting.phone }}
          </span>
        </div>
      </div>
      <div class="row q-mt-sm">
        <div>
          <span class="q-mr-sm">خریدار:</span>
          <span class="text-weight-500">
            {{ model.customerName }}
          </span>
          <span v-if="model.customerSummary?.address?.address">
            -
          </span>
          <span
            v-if="model.customerSummary?.address?.address"
            class="text-grey-6 text-body3 no-letter-spacing"
          >
            {{ model.customerSummary?.address?.address }}
            <span v-if="model.customerSummary?.phone?.value">-</span>
            <span
              v-if="model.customerSummary?.phone?.value"
              class="text-caption text-grey-6"
            >
              <q-icon name="o_phone" />
              {{ model.customerSummary?.phone?.value }}
            </span>
          </span>
        </div>
      </div>
      <div class="row q-mt-lg" v-if="model.comment">
        <div class="full-width rounded-borders bordered q-pa-sm">
          <span class="q-mr-sm">شرح:</span>
          <span>
            {{ model.comment }}
          </span>
        </div>
      </div>
      <div class="row q-mt-lg q-gutter-xs">
        <status-badge :title="model.statusTitle" />
        <type-badge :title="model.typeTitle" />
        <contract-badge :title="model.contractTitle" />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div v-for="item in model.invoiceItems" :key="item.id">
        <div class="row q-mb-md q-col-gutter-lg">
          <div class="col">
            <div class="row items-center">
              <div>
                <div class="row">
                  <div class="">
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

    <q-card-section>
      <div
        class="q-gutter-sm border-radius text-dark q-px-md q-py-sm bg-orange-2"
      >
        <div class="row items-center justify-between">
          <div class="">{{ $t("shared.labels.price") }}</div>
          <div>
            {{ helper.formatNumber(model.totalNetPrice) }}
          </div>
        </div>
        <div
          v-if="model.totalDiscount"
          class="row items-center justify-between"
        >
          <div class="">
            <div>{{ $t("shared.labels.discount") }}</div>
          </div>
          <div class="text-negative">
            ({{ helper.formatNumber(model.totalDiscount) }})
          </div>
        </div>

        <div
          v-if="model.totalVat"
          class="row items-center justify-between"
        >
          <span>{{ $t("shared.labels.vat") }}</span>
          <span>
            {{ helper.formatNumber(model.totalVat) }}
          </span>
        </div>

        <q-separator />
        <div class="row items-center justify-between">
          <span class="">{{ $t("shared.labels.total") }}</span>

          <span class="text-weight-600">
            {{ helper.formatNumber(model.totalPrice) }}
          </span>
        </div>
        <div class="row items-center justify-end">
          <span class="q-px-xs">
            {{ numberToWords(model.totalPrice ?? 0) }}
          </span>
          <b>({{ model.currencyTitle }})</b>
        </div>
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
