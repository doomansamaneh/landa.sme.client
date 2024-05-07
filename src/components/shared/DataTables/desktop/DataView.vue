<template>
  <q-card class="bordered card-desktop">
    <slot name="header"> </slot>
    <q-separator />
    <q-linear-progress
      class="progress"
      indeterminate
      size="xs"
      v-if="tableStore.showLoader.value"
    />

    <q-card-section class="q-pb-xs">
      <slot name="search-bar">
        <div class="search-bar">
          <q-input
            outlined
            rounded
            dense
            class="text-body2"
            v-model="tableStore.pagination.value.searchTerm"
            :placeholder="$t('page.card-searchbar')"
            @keydown.enter="tableStore?.reloadData"
          >
            <template v-slot:prepend>
              <q-icon
                name="search"
                class="search-icon cursor-pointer"
                size="sm"
                color="primary"
                @click="reloadData"
              />
            </template>
            <template v-slot:append>
              <q-icon
                name="clear"
                class="cursor-pointer"
                size="16px"
                color="primary"
                @click="clearSearch"
                v-if="!isSearchEmpty"
              />
            </template>
          </q-input>
        </div>
      </slot>
    </q-card-section>

    <q-card-section v-if="tableStore.rows.value.length > 0">
      <div
        class="row justify-between items-center q-py-md q-px-md cursor-pointer"
        v-for="(row) in tableStore.rows.value"
        :key="row.id"
        @click="setActiveRow(row)"
        :class="tableStore.getRowClass(row)"
      >
        <slot
          name="body"
          :item="row"
        ></slot>
      </div>
    </q-card-section>

    <q-card-section v-if="!tableStore.showLoader.value && tableStore.rows.value.length == 0">
      <no-data-found />
    </q-card-section>

    <page-bar
      v-if="tableStore.dataViewShowPagebar.value"
      class="q-pa-md dark-1"
      :pagination="tableStore.pagination.value"
      @page-changed="tableStore.reloadData"
      size-seletion
      show-page-count
    />
  </q-card>
</template>

<script setup>
import { computed, onMounted } from "vue"
import { useDataTable } from "src/composables/useDataTable"

import PageBar from "components/shared/dataTables/PageBar.vue"
import NoDataFound from "components/shared/dataTables/NoDataFound.vue"

const props = defineProps({
  dataSource: String,
  sortColumn: String,
  searchField: String,
  columns: Array,
  gridStore: Object
})

const tableStore = useDataTable({dataSource: props.dataSource, dataColumns: props.columns, store: props.gridStore})

const emit = defineEmits(["active-row-changed", "selected-rows-changed"])

async function clearSearch() {
  tableStore.pagination.value.searchTerm = ""
  await reloadData()
}

onMounted(() => {
  if (!props.gridStore) {
    tableStore.pagination.value.sortColumn = props.sortColumn
    tableStore.pagination.value.searchField = props.searchField
  }
  tableStore.loadData()
})

async function reloadData() {
  await tableStore.reloadData()
}

const isSearchEmpty = computed(() =>
  !tableStore.pagination.value.searchTerm || tableStore.pagination.value.searchTerm.trim().length === 0
)

function setActiveRow(row) {
  tableStore.setActiveRow(row)
  emit("active-row-changed", row)
}

defineExpose({
  reloadData
})

</script>

<style lang="scss" scoped>
.card-desktop {
  width: 700px !important;
}
</style>
