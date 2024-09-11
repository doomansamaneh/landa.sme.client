<template>
  <q-card class="bordered shadow form-container_">
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
        <div class="col row justify-end q-gutter-sm">
          <div v-if="model.typeTitle">
            <span
              class="border-radius-sm primary-gradient text-caption text-white label"
            >
              {{ model.typeTitle }}
            </span>
          </div>
          <div v-if="model.contractTitle">
            <span
              class="border-radius-sm bluegrey-gradient text-caption text-white label"
            >
              {{ model.contractTitle }}
            </span>
          </div>
          <div v-if="model.statusTitle">
            <span
              class="border-radius-sm orange-gradient text-caption text-white label"
            >
              {{ model.statusTitle }}
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
      <div class="row q-mt-lg">
        <div
          v-if="model.comment"
          class="full-width rounded-borders bordered q-pa-sm"
        >
          <span class="q-mr-sm">شرح:</span>
          <span>
            {{ model.comment }}
          </span>
        </div>
      </div>
      <div class="q-mt-lg overflow-hidden border-radius-xs">
        <div class="bg-grey-2 text-dark q-pa-md">
          <div class="column q-gutter-md">
            <div v-for="item in model.invoiceItems" :key="item.id">
              <div class="row q-col-gutter-lg">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end">
                  <div class="text-bold">
                    {{ helper.formatNumber(item.price) }}
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="model.totalVat"
              class="row items-center justify-between"
            >
              <div class="row items-center q-gutter-sm">
                <div class="">جمع مالیات و عوارض</div>
                <div class="text-green text-bold text-body3">
                  (9%)
                </div>
              </div>
              <div class="text-bold">
                {{ helper.formatNumber(model.totalVat) }}
              </div>
            </div>
            <div
              v-if="model.totalDiscount"
              class="row items-center justify-between"
            >
              <div class="row items-center q-gutter-sm">
                <div>تخفیف</div>
              </div>
              <div class="text-negative text-bold">
                {{ helper.formatNumber(model.totalDiscount) }} -
              </div>
            </div>
          </div>
        </div>
        <div class="row text-dark q-px-md q-py-sm bg-orange-2">
          <div class="col-xs text-body3">
            {{ numberToWords(model.totalPrice ?? 0) }}
            <b>{{ model.currencyTitle }}</b>
          </div>

          <div class="row justify-end col-xs text-bold">
            {{ helper.formatNumber(model.totalPrice) }}
          </div>
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

  const props = defineProps({
    model: Object,
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
