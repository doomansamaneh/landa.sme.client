<template>
  <q-card class="bordered">
    <q-card-section class="q-pl-lg row items-center justify-between">
      <q-option-group
        style="gap: 8px"
        class="row text-body2"
        type="radio"
        size="40px"
        dense
        :options="dateRangeOptions"
        v-model="searchStore.searchModel.value.dateRange"
        @update:model-value="searchStore.applySearch"
      />
      <q-btn
        no-caps
        @click="expanded = !expanded"
        padding="6px 12px"
        rounded
        unelevated
        dense
        class="text-body2"
      >
        <q-icon
          :name="
            expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
          "
          class="q-mr-xs"
        />
        <span class="text-body2">
          {{ $t("shared.labels.advancedSearch") }}
        </span>
      </q-btn>
    </q-card-section>

    <q-slide-transition>
      <div v-show="expanded">
        <div class="q-px-lg">
          <div class="row items-center">
            <q-option-group
              style="gap: 8px"
              class="row items-center"
              inline
              dense
              size="44px"
              :options="
                helper.getEnumOptions(voucherType, 'voucherType')
              "
              type="checkbox"
              v-model="searchStore.searchModel.value.voucherTypeIds"
            />
          </div>

          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-2 col-sm-6 col-xs-12">
              <custom-input-number
                v-model="searchStore.searchModel.value.amountFrom"
                :placeholder="$t('shared.labels.amountFrom')"
                class="text-body2"
              />
            </div>

            <div class="col-md-2 col-sm-6 col-xs-12">
              <custom-input-number
                v-model="searchStore.searchModel.value.amountTo"
                :placeholder="$t('shared.labels.amountTo')"
                class="text-body2"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-2 col-sm-6 col-xs-12">
              <custom-input
                v-model="searchStore.searchModel.value.noFrom"
                :placeholder="$t('shared.labels.noFrom')"
              />
            </div>

            <div class="col-md-2 col-sm-6 col-xs-12">
              <custom-input
                v-model="searchStore.searchModel.value.noTo"
                :placeholder="$t('shared.labels.noTo')"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-2 col-sm-6 col-xs-12">
              <date-time
                v-model="searchStore.searchModel.value.dateFrom"
                :placeholder="$t('shared.labels.dateFrom')"
                class="text-body2"
              />
            </div>

            <div class="col-md-2 col-sm-6 col-xs-12">
              <date-time
                v-model="searchStore.searchModel.value.dateTo"
                :placeholder="$t('shared.labels.dateTo')"
                class="text-body2"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <contract-lookup
                v-model:selectedId="
                  searchStore.searchModel.value.contractId
                "
                v-model:selectedText="
                  searchStore.searchModel.value.contractTitle
                "
                :placeholder="$t('shared.labels.contractTitle')"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <custom-input
                v-model="searchStore.searchModel.value.comment"
                :placeholder="$t('shared.labels.comment')"
                class="text-body2"
              />
            </div>
          </div>

          <q-card-actions
            class="row q-col-gutter-md items-center q-px-none q-py-lg"
          >
            <div
              class="row items-center justify-end col-md-12 col-sm-12 col-xs-12"
            >
              <q-btn
                no-caps
                class="q-mr-sm text-body2 primary-gradient text-white"
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
  import { dateRange, voucherType } from "src/constants";
  import { useVoucherSearch } from "../../../_composables/useVoucherSearch";
  import { helper } from "src/helpers";

  import Chip from "src/components/shared/SearchChip.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";

  const expanded = ref(false);
  const searchStore = useVoucherSearch();

  const dateRangeOptions = computed(() =>
    helper.getEnumOptions(dateRange)
  );
</script>
