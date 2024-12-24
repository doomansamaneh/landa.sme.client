<template>
  <q-card class="no-border q-pt-sm q-px-sm">
    <q-card-section>
      <div class="row justify-between items-center">
        <div class="text-body1 no-letter-spacing">جستجو در اسناد</div>
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
        style="height: calc(100vh - 220px)"
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
              :options="
                helper.getEnumOptions(voucherType, 'voucherType')
              "
              type="checkbox"
              inline
              v-model="searchStore.searchModel.value.voucherTypeIds"
            />
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <custom-input-number
                label="مبلغ از"
                v-model="searchStore.searchModel.value.amountFrom"
                display-format="n0"
              />
            </div>
            <div class="col">
              <custom-input-number
                label="مبلغ تا"
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
      <div class="row q-pa-md q-gutter-sm">
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

  <q-dialog
    v-model="dialog"
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
      <q-card-section>
        <div class="row justify-between items-center">
          <span class="text-body1 no-letter-spacing">
            انتخاب نوع سند
          </span>
          <q-btn dense flat icon="close" v-close-popup />
        </div>
      </q-card-section>

      <q-card-section>
        <div class="colunm">
          <q-option-group
            :options="
              helper.getEnumOptions(voucherType, 'voucherType')
            "
            type="checkbox"
            v-model="group"
            @update:model-value="handleCheckboxChange"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref } from "vue";
  import { dateRange, voucherType } from "src/constants";
  import { helper } from "src/helpers";
  import { useVoucherSearch } from "../../../_composables/useVoucherSearch";

  import dateTime from "src/components/shared/forms/DateTimePicker.vue";
  import ContractLookup from "src/components/shared/lookups/ContractLookup.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const props = defineProps({
    gridStore: Object,
  });

  const searchStore = useVoucherSearch();
</script>

<style lang="scss" scoped>
  .q-item__label--caption {
    font-size: 14px;
    letter-spacing: 0;
    color: #697588;
  }
</style>
