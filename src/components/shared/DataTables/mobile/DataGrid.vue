<template>
  <!-- <q-scroll-area
    class="q-px-md"
    :style="$q.screen.gt.xs ? 'height: calc(100vh - 180px);' : 'height: calc(100vh - 180px);'"
    :thumb-style="helper.thumbStyle"
    :bar-style="helper.barStyle"
  > -->
  <slot name="header">
    <q-input
      outlined
      rounded
      dense
      class="business-searchbox-mobile text-body2 q-my-md"
      v-model="tableStore.pagination.value.searchTerm"
      :placeholder="$t('page.card-searchbar')"
      @keydown.enter="resetPage"
    >
      <template v-slot:prepend>
        <q-icon
          name="search"
          class="search-icon cursor-pointer"
          size="sm"
          color="primary"
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
        <q-btn
          round
          unelevated
          class="text-on-dark"
          dense
          icon="o_refresh"
          size="12px"
          @click="resetPage"
        />

        <slot name="header-guide">
        </slot>
      </template>
    </q-input>
  </slot>

  <div class="q-my-lg q-gutter-y-md">
    <template
      v-for="(row, index) in gridStore?.rows?.value"
      :key="row.id"
    >
      <slot
        name="body"
        :item="row"
      >
        <q-card class="q-my-md">
          <q-card-section>
            <span class="text-on-dark">{{ index + startIndex }}</span>
            <div
              v-for="col in gridStore?.columns.value"
              :key="col.name"
            >
              <slot
                :name="`cell-${col.name}`"
                :item="row"
              >
                <template v-if="col.field">
                  {{ col.label }}: {{ row[col.field] }}
                </template>
              </slot>
            </div>
          </q-card-section>
        </q-card>
      </slot>
    </template>
  </div>

  <slot name="footer"></slot>

  <div
    v-if="!tableStore.showLoader.value && gridStore.rows.value.length === 0"
    class="text-on-dark"
  >
    <no-data-found />
  </div>

  <div
    class="row justify-center"
    v-if="hasMoreData"
  >
    <q-btn
      rounded
      unelevated
      @click="gotoNext"
      class="primary-shadow q-ma-lg bg-primary text-white"
    >
      <span class="text-body3">
        {{ $t("shared.labels.loadMore") }}
      </span>
    </q-btn>
  </div>
  <!-- </q-scroll-area> -->
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useDataTable } from "src/composables/useDataTable"
import { helper } from "src/helpers"

import NoDataFound from "src/components/shared/DataTables/NoDataFound.vue"

const props = defineProps({
  dataSource: String,
  gridStore: Object
})

const startIndex = ref(1)

const tableStore = useDataTable(props.dataSource, null, props.gridStore)

const thisGridStore = computed(() => {
  return props.gridStore
})

onMounted(() => {
  loadData()
})

async function gotoNext() {
  if (hasMoreData.value) {
    tableStore.pagination.value.currentPage += 1
    await reloadData()
  }
}

async function reloadData() {
  await tableStore.reloadData()
  thisGridStore.value.rows.value = [...thisGridStore.value.rows.value, ...tableStore.rows.value]
}

async function loadData() {
  await tableStore.loadData()
  thisGridStore.value.rows.value = tableStore.rows.value
}

async function resetPage() {
  tableStore.pagination.value.currentPage = 1
  await tableStore.reloadData()
  thisGridStore.value.rows.value = tableStore.rows.value
}

const hasMoreData = computed(() => {
  return tableStore.pagination.value.currentPage < tableStore.pagination.value.totalPages
})

const emit = defineEmits(["active-row-changed", "selected-rows-changed"])

onMounted(() => {
  tableStore.loadData()
})

function selectAll(checked) {
  tableStore.selectAll(checked)
  emitselectedRows()
}

function selectRow(row, checked) {
  tableStore.selectRow(row, checked)
  emitselectedRows()
}

function emitselectedRows() {
  emit("selected-rows-changed", tableStore.selectedRows.value)
}

function setActiveRow(row) {
  tableStore.setActiveRow(row)
  emit("active-row-changed", row)
}

async function clearSearch() {
  tableStore.pagination.value.searchTerm = ""
  await reloadData()
}

const isSearchEmpty = computed(() =>
  !tableStore.pagination.value.searchTerm || tableStore.pagination.value.searchTerm.trim().length === 0
)

defineExpose({
  tableStore,
  resetPage
})

</script>

<style lang="scss" scoped></style>
