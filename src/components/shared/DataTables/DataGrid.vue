<template>
  <div :class="containerClass">
    <div class="q-table__middle scroll">
      <table class="q-table">
        <thead>
         <q-icon
              class="icon-hover dark-3 cursor-pointer q-ml-md q-mb-md"
              size="sm"
              name="o_refresh"
              @click="reloadData"
              clickable
            >
              <q-tooltip class="custom-tooltip" :delay="600">
                {{ $t("page.buttons.reload-data") }}
              </q-tooltip>
            </q-icon>
          <tr>
            <th
              v-if="numbered"
              style="width: 1px"
            >#</th>
            <th
              v-if="multiSelect"
              style="width: 1px"
            >
              <q-checkbox
                v-model="tableStore.checkedAll.value"
                @update:model-value="selectAll"
              />
            </th>
            <th
              v-for="col in gridColumns"
              :key="col.name"
              :style="col.style"
              :class="tableStore.getSortableClass(col)"
              @click="tableStore.sortColumn(col)"
            >
              <span class="q-icon q-table__sort-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"></path>
                </svg>
              </span>
              <span>{{ col.label }}</span>
            </th>
            <th
              v-if="expandable"
              style="width: 1px"
            ></th>
          </tr>
          <tr class="row-filter">
            <th
              v-if="numbered"
              class="filter"
            ></th>
            <th v-if="multiSelect"></th>
            <th
              v-for="col in gridColumns"
              :key="col.name"
              class="filter"
            >
              <slot
                v-if="col.showFilter"
                :name="`filter_${col.name}`"
                :col="col"
              >
                <q-input
                  outlined
                  dense
                  clearable
                  v-model="col.value"
                  debounce="500"
                  @update:model-value="reloadData"
                />
                <!--
                  @change="reloadData"
                  debounce="500"
                  @update:model-value="reloadData"
                -->
              </slot>
            </th>
            <th
              v-if="expandable"
              class="filter"
            ></th>
          </tr>
          <tr
            v-if="tableStore.showLoader"
            class="q-table__progress"
          >
            <th
              colspan="100%"
              class="relative-position"
            >
              <q-linear-progress
                indeterminate
                rounded
                color="negative"
                class="q-mt-sm"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <template
            v-for="(row, index) in tableStore.rows.value"
            :key="row.id"
          >
            <tr
              @click="setActiveRow(row)"
              :class="tableStore.getRowClass(row)"
            >
              <td v-if="numbered">
                <small class="text-grey_">{{ tableStore.rowIndex(index) }}</small>
              </td>
              <td v-if="multiSelect">
                <q-checkbox
                  v-model="row.selected"
                  @update:model-value="selectRow(row, $event)"
                />
              </td>
              <td
                v-for="col in gridColumns"
                :key="col.name"
                :class="col.cellClass"
                :style="col.cellStyle"
              >
                <slot
                  :name="`cell_${col.field}`"
                  :item="row"
                >
                  {{ row[col.field] }}
                </slot>
              </td>
              <td
                v-if="expandable"
                style="width: 1px"
              >
                <q-btn
                  size="md"
                  color="primary"
                  class="expand-icon"
                  flat
                  dense
                  round
                  @click="tableStore.toggleExpand(row)"
                  :icon="row.expanded ? 'expand_less' : 'chevron_left'"
                />
              </td>
            </tr>
            <tr
              class="expand"
              v-if="row.expanded"
            >
              <td colspan="100%">
                <slot
                  name="detail"
                  :item="row"
                > </slot>
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot class="table-total">
          <tr
            v-if="tableStore.selectedRows.value.length > 1"
            class="grid-subtotal"
          >
            <slot
              name="footer-subtotal"
              :selectedRows="tableStore.selectedRows.value"
            > </slot>
          </tr>
          <tr
            v-if="tableStore.rows.value.length > 1 && tableStore.summaryData != null"
            class="grid-total"
          >
            <slot
              name="footer-total"
              :summary="tableStore.summaryData.value"
            > </slot>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      v-if="!tableStore.loading && tableStore.rows.value.length == 0"
      class="q-table__bottom items-center q-table__bottom--nodata"
    >
      <slot name="noDataFound">
        <no-data-found />
      </slot>
    </div>
    <div
      v-if="tableStore.showPagebar"
      class="q-table__bottom"
    >
      <page-bar
        v-if="tableStore.showPagebar.value"
        class="page-bar_"
        :pagination="tableStore.pagination.value"
        @page-changed="reloadData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useQuasar } from "quasar"
import PageBar from "./PageBar.vue"
import NoDataFound from "./NoDataFound.vue"
import { useDataTable } from "src/composables/useDataTable"

const tableStore = useDataTable(props.dataSource, props.columns, props.gridStore)
const $q = useQuasar()

const props = defineProps({
  sortBy: String,
  columns: Array,
  dataSource: String,
  expandable: Boolean,
  numbered: Boolean,
  multiSelect: Boolean,
  separator: String,
  square: Boolean,
  bordered: Boolean,
  flat: Boolean,
  dense: Boolean,
  grid: Boolean,
  wrapCells: Boolean,
  gridStore: Object
})

const emit = defineEmits(["active-row-changed", "selected-rows-changed"])

const gridColumns = computed(() => {
  if (props.gridStore != null) return props.gridStore.columns.value
  return props.columns
})

onMounted(() => {
  reloadData()
})

// Todo: need a refresh button to reload data inside the data-grid itself
async function reloadData() {
  // alert("reloadData clicked");
  await tableStore.loadData()
}

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

const cardDefaultClass = computed(
  () =>
    " q-table__card" +
    ($q.dark.isActive === true ? " q-table__card--dark q-dark" : "") +
    (props.square === true ? " q-table--square" : "") +
    (props.flat === true ? " q-table--flat" : "") +
    (props.bordered === true ? " q-table--bordered" : "")
)

const __containerClass = computed(
  () =>
    `q-table__container q-table--${props.separator}-separator column no-wrap q-pt-md` +
    (props.grid === true ? " q-table--grid" : cardDefaultClass.value) +
    ($q.dark?.isActive === true ? " q-table--dark" : "") +
    (props.dense === true ? " q-table--dense" : "") +
    (props.wrapCells === false ? " q-table--no-wrap" : "")
  //+ (inFullscreen.value === true ? ' fullscreen scroll' : '')
)

const containerClass = computed(
  () =>
    __containerClass.value + (tableStore.loading === true ? " q-table--loading" : "")
)

defineExpose({
  reloadData,
  activeRow: tableStore.activeRow,
  selectedRows: tableStore.selectedRows,
  allSelectedIds: tableStore.allSelectedIds,
  rows: tableStore.rows
})
</script>
