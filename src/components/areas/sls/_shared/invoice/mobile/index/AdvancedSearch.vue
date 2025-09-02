<template>
  <q-card class="no-border">
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-body1">
          {{ title ?? $t("shared.labels.search") }}
        </div>
        <div>
          <q-btn
            no-caps
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

    <q-card-section class="q-pt-sm">
      <q-scroll-area
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
        style="height: 60px"
      >
        <div>
          <div class="row items-center q-gutter-sm no-wrap">
            <q-btn
              no-caps
              no-wrap
              rounded
              unelevated
              padding="6px 12px"
              class="text-body2 bordered text-on-dark"
              :class="
                searchStore.searchModel.value.dateRange > 0
                  ? 'active-shine text-white primary-gradient'
                  : ''
              "
              @click="openDateRangeDialog"
            >
              <template
                v-if="searchStore.searchModel.value.dateRange > 0"
              >
                {{ $t("shared.labels.dateRange") }}:
              </template>
              <template v-else>
                {{ $t("shared.labels.dateRange") }}
              </template>

              <div
                class="q-ml-xs"
                v-if="searchStore.searchModel.value.dateRange > 0"
              >
                {{
                  $t(
                    `shared.dateRange.${searchStore.searchModel.value.dateRange}`
                  )
                }}
              </div>
              <q-icon size="xs" name="o_expand_more" />
            </q-btn>

            <q-btn
              no-caps
              no-wrap
              rounded
              unelevated
              padding="6px 12px"
              class="text-body2 bordered text-on-dark"
              :class="
                searchStore.searchModel.value.depositType > 0
                  ? 'active-shine text-white primary-gradient'
                  : ''
              "
              @click="openDepositTypeDialog"
            >
              <template
                v-if="searchStore.searchModel.value.depositType > 0"
              >
                {{ $t("shared.labels.clearance") }}:
              </template>
              <template v-else>
                {{ $t("shared.labels.clearance") }}
              </template>

              <div
                class="q-ml-xs"
                v-if="searchStore.searchModel.value.depositType > 0"
              >
                {{
                  $t(
                    `shared.depositType.${searchStore.searchModel.value.depositType}`
                  )
                }}
              </div>
              <q-icon size="xs" name="o_expand_more" />
            </q-btn>

            <q-btn
              no-caps
              no-wrap
              rounded
              unelevated
              padding="6px 12px"
              class="text-body2 bordered text-on-dark"
              :class="
                searchStore.searchModel.value.taxStatus > 0
                  ? 'active-shine text-white primary-gradient'
                  : ''
              "
              @click="openTaxSentStatusDialog"
            >
              <template
                v-if="searchStore.searchModel.value.taxStatus > 0"
              >
                {{ $t("shared.labels.taxStatus") }}:
              </template>
              <template v-else>
                {{ $t("shared.labels.taxStatus") }}
              </template>

              <div
                class="q-ml-xs"
                v-if="searchStore.searchModel.value.taxStatus > 0"
              >
                {{
                  $t(
                    `shared.taxSentStatus.${searchStore.searchModel.value.taxStatus}`
                  )
                }}
              </div>
              <q-icon size="xs" name="o_expand_more" />
            </q-btn>
          </div>
        </div>
      </q-scroll-area>

      <q-scroll-area
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
        style="height: calc(100vh - 220px)"
      >
        <div class="column q-pb-lg q-col-gutter-lg">
          <div class="row q-col-gutter-sm">
            <div class="col">
              <div class="text-body2 q-mb-sm">
                {{ $t("shared.labels.amountFrom") }}
              </div>
              <custom-input-number
                v-model="searchStore.searchModel.value.amountFrom"
                display-format="n0"
              />
            </div>
            <div class="col">
              <div class="text-body2 q-mb-sm">
                {{ $t("shared.labels.amountTo") }}
              </div>
              <custom-input-number
                v-model="searchStore.searchModel.value.amountTo"
                display-format="n0"
              />
            </div>
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <div class="text-body2 q-mb-sm">
                {{ $t("shared.labels.dateFrom") }}
              </div>
              <date-time
                v-model="searchStore.searchModel.value.dateFrom"
              />
            </div>
            <div class="col">
              <div class="text-body2 q-mb-sm">
                {{ $t("shared.labels.dateTo") }}
              </div>
              <date-time
                v-model="searchStore.searchModel.value.dateTo"
              />
            </div>
          </div>

          <div>
            <div class="text-body2 q-mb-sm">
              {{ $t("shared.labels.no") }}
            </div>
            <custom-input-number
              v-model="searchStore.searchModel.value.no"
            />
          </div>

          <div>
            <div class="text-body2 q-mb-sm">
              {{ $t("shared.labels.typeTitle") }}
            </div>
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
            <div class="text-body2 q-mb-sm">
              {{ $t("shared.labels.customer") }}
            </div>
            <customer-lookup
              v-model:selectedId="
                searchStore.searchModel.value.customerId
              "
              v-model:selectedText="
                searchStore.searchModel.value.customerName
              "
              style="width: 398px"
            />
          </div>

          <div>
            <div class="text-body2 q-mb-sm">
              {{ $t("shared.accountDLType.product") }}
            </div>
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
            <div class="text-body2 q-mb-sm">
              {{ $t("shared.labels.contractTitle") }}
            </div>
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
            <div class="text-body2 q-mb-sm">
              {{ $t("shared.labels.marketerName") }}
            </div>
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
            <div class="text-body2 q-mb-sm">
              {{ $t("shared.labels.subject") }}
            </div>
            <custom-input
              type="textarea"
              v-model="searchStore.searchModel.value.comment"
            />
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-section class="bg-main absolute-bottom">
      <div class="row q-gutter-sm">
        <div class="col">
          <q-btn
            no-caps
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
            no-caps
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

  <q-dialog
    v-model="depositTypeDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class="no-border q-mt-xl"
      position="bottom"
      style="height: 100vh"
    >
      <q-card-section class="q-pb-none">
        <div class="row justify-between items-center">
          <span class="text-body1">
            {{ $t("shared.labels.select") }}
            {{ $t("shared.labels.clearance") }}
          </span>
          <q-btn no-caps dense flat icon="close" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <q-option-group
          class="text-body2"
          :options="helper.getEnumOptions(depositType, 'depositType')"
          v-model="searchStore.searchModel.value.depositType"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="dateRangeDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class="no-border q-mt-xl"
      position="bottom"
      style="height: 100vh"
    >
      <q-card-section class="q-pb-none">
        <div class="row justify-between items-center">
          <span class="text-body1">
            {{ $t("shared.labels.select") }}
            {{ $t("shared.labels.dateRange") }}
          </span>
          <q-btn no-caps dense flat icon="close" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <q-option-group
          class="text-body2"
          :options="helper.getEnumOptions(dateRange, 'dateRange')"
          v-model="searchStore.searchModel.value.dateRange"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="taxSentStatusDialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      class="no-border q-mt-xl"
      position="bottom"
      style="height: 100vh"
    >
      <q-card-section class="q-pb-none">
        <div class="row justify-between items-center">
          <span class="text-body1">
            {{ $t("shared.labels.taxStatus") }}
          </span>
          <q-btn no-caps dense flat icon="close" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <q-option-group
          class="text-body2"
          :options="
            helper.getEnumOptions(taxSentStatus, 'taxSentStatus')
          "
          v-model="searchStore.searchModel.value.taxStatus"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import {
    dateRange,
    depositType,
    taxSentStatus,
  } from "src/constants";
  import { helper } from "src/helpers";
  import { useInvoiceSearch } from "src/components/areas/sls/_composables/useInvoiceSearch";

  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";

  const props = defineProps({
    gridStore: Object,
    title: String,
    showTaxApi: Boolean,
  });

  const depositTypeDialog = ref(false);
  const taxSentStatusDialog = ref(false);
  const dateRangeDialog = ref(false);

  const emit = defineEmits(["apply-search", "update-date-range"]);

  const searchStore = useInvoiceSearch();

  const openDepositTypeDialog = () => {
    depositTypeDialog.value = true;
  };

  const openDateRangeDialog = () => {
    dateRangeDialog.value = true;
  };

  const openTaxSentStatusDialog = () => {
    taxSentStatusDialog.value = true;
  };

  watch(
    () => searchStore.searchModel.value.depositType,
    () => {
      depositTypeDialog.value = false;
    }
  );

  watch(
    () => searchStore.searchModel.value.taxStatus,
    () => {
      taxSentStatusDialog.value = false;
    }
  );

  watch(
    () => searchStore.searchModel.value.dateRange,
    () => {
      dateRangeDialog.value = false;
    }
  );
</script>
