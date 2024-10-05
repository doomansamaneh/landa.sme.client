<template>
  <q-card class="no-border q-pt-sm q-px-sm">
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-body1 no-letter-spacing">
          {{ title ?? $t("shared.labels.search") }}
        </div>
        <div>
          <q-btn
            size="8px"
            round
            unelevated
            text-color="white"
            class="red-gradient red-shadow col-1"
            v-close-popup
          >
            <q-icon size="16px" name="o_close" />
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <q-scroll-area
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
        style="height: calc(100vh - 180px)"
      >
        <div class="column q-col-gutter-lg">
          <div>
            <q-option-group
              style="gap: 8px"
              class="row text-body2 no-letter-spacing"
              type="radio"
              inline
              size="40px"
              dense
              :options="helper.getEnumOptions(dateRange)"
              v-model="searchStore.searchModel.value.dateRange"
            />
          </div>

          <div>
            <q-option-group
              style="gap: 8px"
              class="row text-body2 no-letter-spacing"
              type="radio"
              inline
              size="40px"
              dense
              :options="
                helper.getEnumOptions(depositType, 'depositType')
              "
              v-model="searchStore.searchModel.value.depositType"
            />
          </div>

          <div v-if="showTaxApi">
            <q-item-label caption class="q-mb-sm">
              {{ $t("shared.labels.taxStatus") }}
            </q-item-label>
            <q-option-group
              inline
              :options="
                helper.getEnumOptions(taxSentStatus, 'taxSentStatus')
              "
              type="radio"
              v-model="searchStore.searchModel.value.taxStatus"
            />
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                مبلغ از
              </q-item-label>
              <custom-input
                v-model="searchStore.searchModel.value.amountFrom"
                display-format="n0"
              />
            </div>
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                مبلغ تا
              </q-item-label>
              <custom-input
                v-model="searchStore.searchModel.value.amountTo"
                display-format="n0"
              />
            </div>
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                تاریخ از
              </q-item-label>
              <date-time
                v-model="searchStore.searchModel.value.dateFrom"
              />
            </div>
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                تاریخ تا
              </q-item-label>
              <date-time
                v-model="searchStore.searchModel.value.dateTo"
              />
            </div>
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              قرارداد
            </q-item-label>
            <contract-lookup
              v-model:selectedId="
                searchStore.searchModel.value.contractId
              "
              v-model:selectedText="
                searchStore.searchModel.value.contractTitle
              "
              style="width: 398px"
            />
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              بازاریاب
            </q-item-label>
            <customer-lookup
              v-model:selectedId="
                searchStore.searchModel.value.marketerId
              "
              v-model:selectedText="
                searchStore.searchModel.value.marketerName
              "
              style="width: 398px"
            />
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              نوع فروش
            </q-item-label>
            <sale-type-lookup
              v-model:selectedId="
                searchStore.searchModel.value.typeId
              "
              v-model:selectedText="
                searchStore.searchModel.value.typeTitle
              "
            />
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">
              کالا و خدمات
            </q-item-label>
            <product-lookup
              v-model:selectedId="
                searchStore.searchModel.value.productId
              "
              v-model:selectedText="
                searchStore.searchModel.value.productTitle
              "
              style="width: 398px"
            />
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">مشتری</q-item-label>
            <customer-lookup
              v-model:selectedId="
                searchStore.searchModel.value.marketerId
              "
              v-model:selectedText="
                searchStore.searchModel.value.marketerName
              "
              style="width: 398px"
            />
          </div>

          <div>
            <q-item-label caption class="q-mb-sm">شرح</q-item-label>
            <custom-input
              type="textarea"
              v-model="searchStore.searchModel.value.comment"
            />
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-section>
      <div class="row q-gutter-sm">
        <div class="col">
          <q-btn
            padding="10px 12px"
            rounded
            unelevated
            outline
            class="full-width"
            @click="searchStore.clearSearch"
            v-close-popup
          >
            <div class="row items-center">
              <q-icon size="xs" name="o_close" class="q-mr-xs" />
              <span>{{ $t("shared.labels.clearSearch") }}</span>
            </div>
          </q-btn>
        </div>

        <div class="col">
          <q-btn
            padding="10px 12px"
            rounded
            unelevated
            color="primary"
            class="full-width"
            v-close-popup
            @click="searchStore.applySearch()"
          >
            <div class="row items-center">
              <q-icon size="xs" name="o_search" class="q-mr-xs" />
              <span>{{ $t("shared.labels.search") }}</span>
            </div>
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import {
    dateRange,
    depositType,
    taxSentStatus,
  } from "src/constants";
  import { helper } from "src/helpers";
  import { useInvoiceSearch } from "src/components/areas/sls/_composables/useInvoiceSearch";

  import dateTime from "src/components/shared/forms/DateTimePicker.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import customInput from "src/components/shared/forms/CustomInput.vue";
  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";

  const props = defineProps({
    gridStore: Object,
    title: String,
    showTaxApi: Boolean,
  });

  const emit = defineEmits(["apply-search", "update-date-range"]);

  const searchStore = useInvoiceSearch();
</script>

<!-- <style lang="scss" scoped>
  .q-item__label--caption {
    font-size: 14px;
    letter-spacing: 0;
    color: #697588;
  }
</style> -->
