<template>
  <q-card flat_ bordered>
    <q-card-section class="q-ml-sm row items-center justify-between">
      <q-option-group
        style="gap: 8px"
        class="row text-body2 no-letter-spacing"
        type="radio"
        dense
        size="40px"
        :options="dateRangeOptions"
        v-model="searchStore.searchModel.value.dateRange"
        @update:model-value="searchStore.applySearch"
      />
      <q-btn
        @click="expanded = !expanded"
        padding="6px 12px"
        rounded
        unelevated
        dense
        class="text-body2 no-letter-spacing"
      >
        <q-icon
          :name="
            expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
          "
          class="q-mr-xs"
        />
        <span class="text-body2 no-letter-spacing">
          {{ $t("shared.labels.advancedSearch") }}
        </span>
      </q-btn>
    </q-card-section>

    <q-slide-transition>
      <div v-show="expanded">
        <div class="q-px-lg">
          <div class="row q-mb-md">
            <q-checkbox
              dense
              size="44px"
              class="q-pt-sm text-body2 no-letter-spacing"
              v-model="searchStore.searchModel.value.waitToSendTax"
              :label="$t('shared.labels.waitToSendTax')"
            />
          </div>

          <div
            :style="$q.screen.gt.sm ? 'width: 1024px;' : ''"
            class="row"
            :class="$q.screen.gt.sm ? 'q-col-gutter-xl' : ''"
          >
            <div
              class="col-md col-sm-12"
              :class="$q.screen.gt.sm ? 'q-mr-xl' : ''"
            >
              <div class="row items-center q-mt-md">
                <div
                  class="col-md-3 col-sm-2 text-bold text-body2 no-letter-spacing text-on-caption"
                >
                  {{ $t("shared.labels.typeTitle") }}
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

              <div class="row items-center q-mt-md">
                <div
                  class="col-md-3 col-sm-2 text-bold text-body2 no-letter-spacing text-on-caption"
                >
                  {{ $t("shared.labels.inventoryTitle") }}
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

              <div class="row items-center q-mt-md">
                <div
                  class="col-md-3 col-sm-2 text-bold text-body2 no-letter-spacing text-on-caption"
                >
                  {{ $t("shared.labels.productTitle") }}
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

              <div class="row items-center q-mt-md">
                <div
                  class="text-bold col-md-3 col-sm-2 text-body2no-letter-spacing text-on-caption"
                >
                  {{ $t("shared.labels.contractTitle") }}
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

              <div class="row items-center q-mt-md">
                <div
                  class="col-md-3 col-sm-2 text-bold text-body2 no-letter-spacing text-on-caption"
                >
                  {{ $t("shared.labels.marketerName") }}
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

              <div class="row items-center q-mt-md">
                <div
                  class="text-bold col-md-3 col-sm-2 text-body2 no-letter-spacing text-on-caption"
                >
                  {{ $t("shared.labels.comment") }}
                </div>
                <div class="col-md col-sm-7 col-xs-12">
                  <custom-input
                    v-model="searchStore.searchModel.value.comment"
                    class="text-body2 no-letter-spacing"
                  />
                </div>
              </div>
            </div>

            <div class="col-md col-sm-12">
              <div class="row items-center q-mt-md">
                <div class="col-md-3 col-sm-2 text-bold text-body2">
                  {{ $t("shared.labels.amountFrom") }}
                </div>
                <div class="col-md-6 col-sm-4 col-xs-12">
                  <custom-input-number
                    v-model="searchStore.searchModel.value.amountFrom"
                    class="text-body2 no-letter-spacing"
                  />
                </div>
              </div>

              <div class="row items-center q-mt-md">
                <div class="col-md-3 col-sm-2 text-bold text-body2">
                  {{ $t("shared.labels.amountTo") }}
                </div>
                <div class="col-md-6 col-sm-4 col-xs-12">
                  <custom-input-number
                    v-model="searchStore.searchModel.value.amountTo"
                    class="text-body2 no-letter-spacing"
                  />
                </div>
              </div>

              <div class="row items-center q-mt-md">
                <div class="col-md-3 col-sm-2 text-bold text-body2">
                  {{ $t("shared.labels.dateFrom") }}
                </div>
                <div class="col-md-6 col-sm-4 col-xs-12">
                  <date-time
                    v-model="searchStore.searchModel.value.dateFrom"
                    class="text-body2 no-letter-spacing"
                  />
                </div>
              </div>

              <div class="row items-center q-mt-md">
                <div class="col-md-3 col-sm-2 text-bold text-body2">
                  {{ $t("shared.labels.dateTo") }}
                </div>
                <div class="col-md-6 col-sm-4 col-xs-12">
                  <date-time
                    v-model="searchStore.searchModel.value.dateTo"
                    class="text-body2 no-letter-spacing"
                  />
                </div>
              </div>
            </div>
          </div>

          <q-card-actions
            class="row q-col-gutter-md items-center q-px-none q-py-lg"
          >
            <div
              class="row items-center justify-end col-md-12 col-sm-12 col-xs-12"
            >
              <q-btn
                class="q-mr-sm text-body2 no-letter-spacing primary-gradient primary-shadow text-white"
                rounded
                padding="8px 16px"
                unelevated
                @click="searchStore.applySearch"
              >
                <q-icon name="search" class="q-mr-xs" size="20px" />
                جستجو
              </q-btn>
              <q-btn
                class="text-body2 no-letter-spacing"
                rounded
                unelevated
                padding="8px 16px"
                flat
                @click="searchStore.clearSearch"
              >
                <q-icon name="clear" class="q-mr-xs" size="20px" />
                حذف فیلتر
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
  import { dateRange } from "src/constants";
  import { helper } from "src/helpers";
  import { useInvoiceSearch } from "src/components/areas/sls/_composables/useInvoiceSearch";

  import Chip from "src/components/shared/SearchChip.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import CustomerLookup from "src/components/shared/lookups/CustomerLookup.vue";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";
  import SaleTypeLookup from "src/components/shared/lookups/SaleTypeLookup.vue";
  import ProductLookup from "src/components/shared/lookups/ProductLookup.vue";

  const props = defineProps({
    gridStore: Object,
  });

  const expanded = ref(false);
  const searchStore = useInvoiceSearch();

  const dateRangeOptions = computed(() =>
    helper.getEnumOptions(dateRange)
  );
</script>
