<template>
  <q-card class="q-mb-md overflow-hidden bordered">
    <q-card-section class="row items-center justify-between">
      <q-option-group
        style="gap: 8px"
        class="row text-body2"
        type="radio"
        dense
        size="40px"
        :options="dateRangeOptions"
        v-model="searchStore.searchModel.value.dateRange"
        @update:model-value="searchStore.applySearch"
      />
      <q-option-group
        v-if="showDepositType"
        style="gap: 8px"
        class="row text-body2"
        type="radio"
        dense
        size="40px"
        :options="depositTypeOptions"
        v-model="searchStore.searchModel.value.depositType"
        @update:model-value="searchStore.applySearch"
      />
    </q-card-section>

    <q-card-section
      class="cursor-pointer q-pa-sm flex items-center justify-between bg-on-dark"
      @click="expanded = !expanded"
    >
      <div class="flex items-center q-gutter-sm">
        <q-icon name="o_search" size="24px" />
        <div class="text-body2">
          {{ $t("shared.labels.advancedSearch") }}
        </div>
      </div>
      <q-btn
        no-caps
        @click.stop="expanded = !expanded"
        round
        unelevated
        dense
        class="text-body2"
      >
        <q-icon
          :name="
            expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
          "
        />
      </q-btn>
    </q-card-section>

    <q-slide-transition duration="500">
      <div v-show="expanded">
        <div class="q-mt-sm q-px-lg">
          <div class="col-md-12 col-sm-12">
            <div
              class="row q-gutter-md items-center justify-center q-pt-lg"
            >
              <div class="col-md-auto col-sm-auto">
                <custom-label
                  class="text-bold"
                  :label="$t('shared.labels.taxStatus')"
                />
              </div>
              <div class="col-md-auto col-sm-auto col-xs-12">
                <q-option-group
                  inline
                  :options="
                    helper.getEnumOptions(
                      taxSentStatus,
                      'taxSentStatus'
                    )
                  "
                  style="gap: 8px"
                  class="row text-body2"
                  type="radio"
                  dense
                  size="40px"
                  v-model="searchStore.searchModel.value.taxStatus"
                />
              </div>
            </div>
          </div>

          <q-card-section class="row justify-center items-center">
            <div
              :style="$q.screen.gt.sm ? 'width: 1300px;' : ''"
              class="row justify-center"
            >
              <div
                class="col-md col-sm-12"
                :class="$q.screen.gt.sm ? 'q-mr-xl' : ''"
              >
                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.typeTitle')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
                    <sale-type-lookup
                      v-model:selectedId="
                        searchStore.searchModel.value.typeId
                      "
                      v-model:selectedText="
                        searchStore.searchModel.value.typeTitle
                      "
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.inventoryTitle')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
                    <inventory-lookup
                      v-model:selectedId="
                        searchStore.searchModel.value.inventoryId
                      "
                      v-model:selectedText="
                        searchStore.searchModel.value.inventoryTitle
                      "
                      style="width: 398px"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.productGroupTitle')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
                    <product-group-lookup
                      v-model:selectedId="
                        searchStore.searchModel.value.productGroupId
                      "
                      v-model:selectedText="
                        searchStore.searchModel.value
                          .productGroupTitle
                      "
                      style="width: 398px"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.productTitle')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
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
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.contractTitle')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
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
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.marketerName')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
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
                </div>
              </div>

              <div class="col-md col-sm-12">
                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.columns.taxId')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
                    <custom-input
                      v-model="searchStore.searchModel.value.taxId"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.amountFrom')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
                    <custom-input-number
                      v-model="
                        searchStore.searchModel.value.amountFrom
                      "
                      class="text-body2"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.amountTo')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
                    <custom-input-number
                      v-model="searchStore.searchModel.value.amountTo"
                      class="text-body2"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.noFrom')"
                    />
                  </div>
                  <div class="col-md-4 col-sm-7 col-xs-12">
                    <custom-input
                      v-model="searchStore.searchModel.value.noFrom"
                    />
                  </div>
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.noTo')"
                    />
                  </div>
                  <div class="col-md-4 col-sm-7 col-xs-12">
                    <custom-input
                      v-model="searchStore.searchModel.value.noTo"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.dateFrom')"
                    />
                  </div>
                  <div class="col-md-4 col-sm-7 col-xs-12">
                    <date-time
                      v-model="searchStore.searchModel.value.dateFrom"
                      class="text-body2"
                    />
                  </div>
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.dateTo')"
                    />
                  </div>
                  <div class="col-md-4 col-sm-7 col-xs-12">
                    <date-time
                      v-model="searchStore.searchModel.value.dateTo"
                      class="text-body2"
                    />
                  </div>
                </div>

                <div class="row q-col-gutter-lg items-center q-pt-md">
                  <div class="col-md-2 col-sm-2">
                    <custom-label
                      class="text-bold"
                      :label="$t('shared.labels.comment')"
                    />
                  </div>
                  <div class="col-md col-sm-7 col-xs-12">
                    <custom-input
                      v-model="searchStore.searchModel.value.comment"
                      class="text-body2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions
            class="row q-col-gutter-md items-center q-px-none q-py-lg"
            :class="$q.screen.sm ? 'q-pt-xl' : ''"
          >
            <div
              class="row items-center justify-end col-md-12 col-sm-12 col-xs-12"
            >
              <q-btn
                no-caps
                class="q-mr-sm text-body2 primary-gradient primary-shadow text-white"
                rounded
                padding="8px 16px"
                unelevated
                @click="searchStore.applySearch"
              >
                <q-icon name="search" class="q-mr-xs" size="20px" />
                {{ $t("shared.labels.search") }}
              </q-btn>
              <q-btn
                no-caps
                class="text-body2"
                rounded
                unelevated
                padding="8px 16px"
                flat
                @click="searchStore.clearSearch"
              >
                <q-icon name="clear" class="q-mr-xs" size="20px" />
                {{ $t("shared.labels.clearSearch") }}
              </q-btn>
            </div>
          </q-card-actions>
        </div>
      </div>
    </q-slide-transition>
  </q-card>
  <chip
    class="q-my-md"
    :search-model="searchStore.searchModel.value"
    :remove-item="searchStore.removeItem"
  />
</template>

<script setup>
  import { computed, ref } from "vue";
  import {
    dateRange,
    depositType,
    taxSentStatus,
  } from "src/constants";
  import { helper } from "src/helpers";
  import { useInvoiceSearch } from "src/components/areas/sls/_composables/useInvoiceSearch";

  import Chip from "src/components/shared/SearchChip.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomLabel from "src/components/shared/forms/CustomLabel.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import ProductGroupLookup from "src/components/shared/lookups/ProductGroupLookup.vue";
  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";

  const props = defineProps({
    showDepositType: {
      type: Boolean,
      default: true,
    },
  });

  const expanded = ref(false);
  const searchStore = useInvoiceSearch();

  const dateRangeOptions = computed(() =>
    helper.getEnumOptions(dateRange)
  );

  const depositTypeOptions = computed(() =>
    helper.getEnumOptions(depositType)
  );
</script>
