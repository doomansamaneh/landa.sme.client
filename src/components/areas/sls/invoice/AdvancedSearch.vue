<template>
  <q-card class="q-pa-md">
    <q-card-section class="q-gutter-lg">
      <q-option-group
        class="row"
        type="radio"
        :options="dateRangeOptions"
        v-model="searchModel.dateRange"
        @update:model-value="applySearch"
      />
      <q-checkbox
        v-model="searchModel.waitToSendTax"
        label="منتظر ارسال به سامانه مودیان"
      />

      <q-input
        outlined
        dense
        v-model="searchModel.amountFrom"
        label="مبلغ از"
      />
      <q-input
        outlined
        dense
        v-model="searchModel.amountTo"
        label="مبلغ تا"
      />
      <q-input
        outlined
        dense
        v-model="searchModel.comment"
        label="شرح"
      />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        color="primary"
        label="Search"
        no-caps
        @click="applySearch"
      />
      <q-btn
        flat
        label="Clear Search"
        no-caps
        @click="clearSearch"
      />
    </q-card-actions>
  </q-card>
  <q-card-actions align="right">
    <q-btn
      color="primary"
      label="Search"
      no-caps
      @click="applySearch"
    />
    <q-btn
      flat
      label="Clear Search"
      no-caps
      @click="clearSearch"
    />
  </q-card-actions>
</template>

<script setup>
import { computed, ref } from "vue"
import { dateRange } from "src/constants"
import { helper } from "src/helpers"

const searchModel = ref({
  dateRange: 0,
  waitToSendTax: false
})

const dateRangeOptions = computed(() => helper.getEnumOptions(dateRange))

const emit = defineEmits(["apply-search"])

async function applySearch() {
  emit("apply-search", searchModel.value)
}

async function clearSearch() {
  searchModel.value = {
    dateRange: 0,
    waitToSendTax: false
  }
  await applySearch()
}
</script>
