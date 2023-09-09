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
        :label='$t("shared.labels.waitToSendTax")'
      />

      <q-input
        outlined
        dense
        clearable
        v-model="searchModel.amountFrom"
        :label='$t("shared.labels.amountFrom")'
      />
      <q-input
        outlined
        dense
        clearable
        v-model="searchModel.amountTo"
        :label='$t("shared.labels.amountTo")'
      />
      <q-input
        outlined
        dense
        clearable
        v-model="searchModel.comment"
        :label='$t("shared.labels.comment")'
      />
    </q-card-section>

    <q-card-section>
      <chip
        :search-model="searchModel"
        :remove-item="removeItem"
      />
    </q-card-section>

    <!-- <q-card-actions align="right">
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
    </q-card-actions> -->
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
import { computed, onMounted, ref } from "vue"
import { dateRange } from "src/constants"
import { helper } from "src/helpers"
import chip from "src/components/shared/SearchChip.vue"

const props = defineProps({
  gridStore: Object
})

const searchModel = computed(() => props.gridStore.state.searchModel.value)

const dateRangeOptions = computed(() => helper.getEnumOptions(dateRange))

const emit = defineEmits(["apply-search"])

async function applySearch() {
  emit("apply-search", searchModel.value)
}

async function clearSearch() {
  props.gridStore.setDefaultSearchModel()
  await applySearch()
}

async function removeItem(item) {
  //todo: how to find field type and dynamically set to it's default value
  let value = "";
  switch (item.name) {
    case "dateRange":
      value = 0
      break
    case "waitToSendTax":
      value = false
      break
  }
  searchModel.value[item.name] = value
  await applySearch()
}
</script>
