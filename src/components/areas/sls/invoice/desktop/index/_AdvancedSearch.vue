<template>
  <q-card class="bordered">
    <q-card-section class="row items-center justify-between">
      <q-option-group
        class="row text-body2 no-letter-spacing"
        type="radio"
        size="md"
        :options="dateRangeOptions"
        v-model="searchModel.dateRange"
        @update:model-value="applySearch"
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
          :name="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
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
          <q-checkbox
            class="q-pt-sm text-body2 no-letter-spacing"
            v-model="searchModel.waitToSendTax"
            :label="$t('shared.labels.waitToSendTax')"
          />
          <div class="q-gutter-y-sm q-pl-sm q-my-md">
            <div class="row q-gutter-x-sm items-center">
              <custom-input
                v-model="searchModel.amountFrom"
                display-format="n0"
                :placeholder="$t('shared.labels.amountFrom')"
                style="width: 195px"
                class="text-body2 no-letter-spacing"
              />

              <custom-input
                v-model="searchModel.amountTo"
                display-format="n0"
                :placeholder="$t('shared.labels.amountTo')"
                style="width: 195px"
                class="text-body2 no-letter-spacing"
              />
            </div>
            <div class="row q-gutter-x-sm items-center">
              <date-time
                v-model="searchModel.dateFrom"
                :placeholder="$t('shared.labels.dateFrom')"
                style="width: 195px"
                class="text-body2 no-letter-spacing"
              />
              <date-time
                v-model="searchModel.dateTo"
                :placeholder="$t('shared.labels.dateTo')"
                style="width: 195px"
                class="text-body2 no-letter-spacing"
              />
            </div>
            <div class="row q-gutter-x-sm items-center">
              <custom-input
                v-model="searchModel.comment"
                :placeholder="$t('shared.labels.comment')"
                style="width: 398px"
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
              @click="applySearch"
            >
              <q-icon name="search" class="q-mr-xs" size="20px" />جستجو
            </q-btn>
            <q-btn
              class="text-body2 no-letter-spacing"
              rounded
              unelevated
              padding="8px 16px"
              flat
              @click="clearSearch"
            >
              <q-icon name="clear" class="q-mr-xs" size="20px" />
              حذف فیلتر
            </q-btn>
          </div>
        </div>
      </q-slide-transition>
    </q-card-section>
  </q-card>
  <chip class="q-my-md" :search-model="searchModel" :remove-item="removeItem" />
</template>

<script setup>
import { computed, ref } from "vue";
import { dateRange } from "src/constants";
import { helper } from "src/helpers";

import chip from "src/components/shared/SearchChip.vue";
import dateTime from "src/components/shared/forms/DateTimePicker.vue";
import customInput from "src/components/shared/forms/CustomInput.vue";

const props = defineProps({
  gridStore: Object,
});

const expanded = ref(false);

const searchModel = computed(() => props.gridStore.state.searchModel.value);

const dateRangeOptions = computed(() => helper.getEnumOptions(dateRange));

const emit = defineEmits(["apply-search"]);

async function applySearch() {
  emit("apply-search", searchModel.value);
}

async function clearSearch() {
  props.gridStore.setDefaultSearchModel();
  await applySearch();
}

async function removeItem(item) {
  //todo: how to find field type and dynamically set to it's default value
  let value = "";
  switch (item.name) {
    case "dateRange":
      value = 0;
      break;
    case "waitToSendTax":
      value = false;
      break;
  }
  searchModel.value[item.name] = value;
  await applySearch();
}
</script>
