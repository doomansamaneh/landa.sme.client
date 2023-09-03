<template>
  <q-card>
    <q-card-section class="q-gutter-lg">
      <q-option-group
        :options="dateRangeOptions"
        type="radio"
        v-model="searchModel.dateRange"
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
import { ref } from "vue"

const props = defineProps({
  dataGrid: Object
})

const searchModel = ref({
  dateRange: 0,
  waitToSendTax: false
})

const dateRangeOptions = [
  {
    label: 'همه',
    value: 0
  },
  {
    label: 'امروز',
    value: 1
  },
  {
    label: 'این هفته',
    value: 2
  },
  {
    label: 'این ماه',
    value: 3
  }
]

async function applySearch() {
  props.dataGrid?.setSearchModel(searchModel.value)
  await props.dataGrid?.reloadData()
}

async function clearSearch() {
  searchModel.value = {
    dateRange: 0,
    waitToSendTax: false
  }
  await applySearch()
}

</script>
