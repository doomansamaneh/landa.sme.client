<template>
  <q-card bordered>
    <q-card-section class="row items-center justify-between">
      <q-option-group
        class="row text-body2 no-letter-spacing"
        type="radio"
        size="md"
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

    <q-card-section class="row q-pa-none">
      <q-slide-transition v-show="expanded">
        <div class="q-px-md">
          <div class="q-gutter-y-sm">
            <div class="row">
              <q-option-group
                inline
                :options="
                  helper.getEnumOptions(voucherType, 'voucherType')
                "
                type="checkbox"
                v-model="searchStore.searchModel.value.voucherTypeIds"
              />
            </div>

            <div class="row q-gutter-x-sm items-center">
              <custom-input-number
                v-model="searchStore.searchModel.value.amountFrom"
                :placeholder="$t('shared.labels.amountFrom')"
                style="width: 200px"
                class="text-body2 no-letter-spacing"
              />

              <custom-input-number
                v-model="searchStore.searchModel.value.amountTo"
                display-format="n0"
                :placeholder="$t('shared.labels.amountTo')"
                style="width: 200px"
                class="text-body2 no-letter-spacing"
              />
            </div>

            <div class="row q-gutter-x-sm items-center">
              <date-time
                v-model="searchStore.searchModel.value.dateFrom"
                :placeholder="$t('shared.labels.dateFrom')"
                style="width: 200px"
                class="text-body2 no-letter-spacing"
              />
              <date-time
                v-model="searchStore.searchModel.value.dateTo"
                :placeholder="$t('shared.labels.dateTo')"
                style="width: 200px"
                class="text-body2 no-letter-spacing"
              />
            </div>

            <div class="row q-gutter-x-sm items-center">
              <contract-lookup
                v-model:selectedId="
                  searchStore.searchModel.value.contractId
                "
                v-model:selectedText="
                  searchStore.searchModel.value.contractTitle
                "
                style="width: 408px"
                :placeholder="$t('shared.labels.contractTitle')"
              />
            </div>

            <div class="row q-gutter-x-sm items-center">
              <custom-input
                v-model="searchStore.searchModel.value.comment"
                :placeholder="$t('shared.labels.comment')"
                style="width: 408px"
                class="text-body2 no-letter-spacing"
              />
            </div>
          </div>

          <div class="row justify-end q-gutter-x-sm q-pt-md q-pb-lg">
            <q-btn
              class="text-body2 no-letter-spacing bg-primary text-white"
              rounded
              padding="8px 16px"
              unelevated
              @click="searchStore.applySearch"
            >
              <q-icon name="search" class="q-mr-xs" size="20px" />
              {{ $t("shared.labels.search") }}
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
              {{ $t("shared.labels.clearSearch") }}
            </q-btn>
          </div>
        </div>
      </q-slide-transition>
    </q-card-section>
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

  const props = defineProps({
    searchModel: Object,
  });

  const expanded = ref(false);
  const searchStore = useVoucherSearch();

  const dateRangeOptions = computed(() =>
    helper.getEnumOptions(dateRange)
  );
</script>
