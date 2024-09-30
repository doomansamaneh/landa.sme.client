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

    <q-card-section class="q-pt-sm q-pb-none hidden">
      <q-scroll-area
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
        style="height: 60px"
      >
        <div>
          <div class="row items-center q-gutter-md no-wrap">
            <q-btn
              v-for="option in dateRangeOptions"
              :key="option.value"
              rounded
              unelevated
              padding="8px 12px"
              :color="isActive(option.value) ? 'primary' : ''"
              :text-color="
                !isActive(option.value) && !$q.dark.isActive
                  ? 'grey-10'
                  : 'white'
              "
              class="text-on-dark text-body2 bordered-btn"
              :class="{ 'bordered-btn': !isActive(option.value) }"
              style="min-width: 82px"
            >
              <span>{{ option.label }}</span>
            </q-btn>

            <q-btn
              rounded
              unelevated
              padding="8px 12px"
              class="bordered-btn text-on-dark text-body2"
              style="min-width: 105px"
              @click="openCheckoutModal"
            >
              <span>نوع سند</span>
              <q-icon
                size="xs"
                class="q-ml-sm"
                name="o_expand_more"
              />
            </q-btn>
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-section>
      <q-scroll-area
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
        style="height: calc(100vh - 340px)"
      >
        <div class="column q-col-gutter-lg">
          <div class="row q-col-gutter-sm">
            <div class="col">
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
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-option-group
                :options="
                  helper.getEnumOptions(voucherType, 'voucherType')
                "
                type="checkbox"
                inline
                v-model="searchStore.searchModel.value.voucherTypeIds"
              />
            </div>
          </div>

          <div class="row q-col-gutter-sm">
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                مبلغ از
              </q-item-label>
              <custom-input-number
                v-model="searchStore.searchModel.value.amountFrom"
                display-format="n0"
              />
            </div>
            <div class="col">
              <q-item-label caption class="q-mb-sm">
                مبلغ تا
              </q-item-label>
              <custom-input-number
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

    <div class="row q-my-lg q-mx-lg">
      <q-btn
        padding="10px 12px"
        rounded
        unelevated
        outline
        class="q-mb-sm full-width"
        @click="searchStore.clearSearch"
        v-close-popup
      >
        <div class="row items-center">
          <q-icon size="xs" name="o_close" class="q-mr-xs" />
          <span>حذف فیلتر</span>
        </div>
      </q-btn>

      <q-btn
        padding="10px 12px"
        rounded
        unelevated
        color="primary"
        class="q-mb-sm full-width"
        v-close-popup
        @click="searchStore.applySearch()"
      >
        <div class="row items-center">
          <q-icon size="xs" name="o_search" class="q-mr-xs" />
          <span>جستجو</span>
        </div>
      </q-btn>
    </div>
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
