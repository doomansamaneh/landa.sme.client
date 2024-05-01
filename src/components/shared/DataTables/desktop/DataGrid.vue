<template>
  <q-card class="bordered" :class="containerClass">
    <div class="q-table__middle scroll">
      <table class="q-table">
        <thead>
          <tr v-if="!hideHeader">
            <th v-if="numbered" class="dense_">#</th>
            <th v-if="multiSelect" class="dense">
              <q-checkbox
                v-model="tableStore.checkedAll.value"
                @update:model-value="selectAll"
              />
            </th>
            <th
              v-for="col in tableStore?.columns.value"
              :key="col.name"
              :style="col.style"
              :class="tableStore.getSortableClass(col)"
              @click="tableStore.sortColumn(col)"
            >
              <span class="q-icon q-table__sort-icon">
                <q-icon name="arrow_drop_down" color="primary" size="20px" />
              </span>
              <span>{{ col.label }}</span>
            </th>
            <th v-if="expandable" style="width: 1px"></th>
          </tr>
          <tr v-if="!hideFilterRow" class="row-filter">
            <th v-if="numbered" class="dense"></th>
            <th v-if="multiSelect" class="dense"></th>
            <th
              v-for="col in tableStore?.columns.value"
              :key="col.name"
              class="filter"
            >
              <slot
                v-if="col.showFilter"
                :name="`filter-${col.name}`"
                :col="col"
              >
                <custom-input
                  v-model="col.value"
                  clearable
                  debounce="500"
                  @update:model-value="reloadData"
                />
                <!-- @keyup.enter="reloadData" -->
              </slot>
            </th>
            <th v-if="expandable" class="filter"></th>
          </tr>
          <tr v-if="tableStore.showLoader.value" class="q-table__progress">
            <th colspan="100%" class="relative-position">
              <q-linear-progress
                indeterminate
                rounded
                color="primary"
                class="q-mt-sm"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(row, index) in tableStore.rows.value" :key="row.id">
            <tr
              @click="setActiveRow(row)"
              @dblclick="goToPreview(row)"
              class="table-row"
              :class="tableStore.getRowClass(row)"
            >
              <td v-if="numbered" class="dense_">
                <small class="text-on-dark">{{
                  tableStore.rowIndex(index)
                }}</small>
              </td>
              <td v-if="multiSelect" class="dense">
                <q-checkbox
                  v-model="row.selected"
                  @update:model-value="selectRow(row, $event)"
                />
              </td>
              <td
                v-for="col in tableStore?.columns.value"
                :key="col.name"
                :class="col.cellClass"
                :style="col.cellStyle"
              >
                <slot :name="`cell-${col.name}`" :item="row">
                  <div v-html="getColText(row, col)"></div>
                </slot>
              </td>
              <td v-if="expandable" style="width: 1px">
                <q-btn
                  size="md"
                  color="primary"
                  class="expand-icon"
                  flat
                  dense
                  round
                  @click="toggleExpand(row)"
                  :icon="chevronIcon()"
                  :class="row.expanded ? 'expand-open' : 'expand-close'"
                />
              </td>
            </tr>
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <tr class="expand" v-if="row.expanded">
                <td colspan="100%">
                  <slot name="expand" :item="row"> </slot>
                </td>
              </tr>
            </transition>
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
            >
            </slot>
          </tr>
          <tr
            v-if="
              tableStore.rows.value.length > 1 && tableStore.summaryData != null
            "
            class="grid-total"
          >
            <slot name="footer-total" :summary="tableStore.summaryData.value">
            </slot>
          </tr>
        </tfoot>
      </table>
    </div>
    <div
      v-if="!tableStore.showLoader.value && tableStore.rows.value.length == 0"
      class="q-table__bottom items-center q-table__bottom--nodata"
    >
      <slot name="noDataFound">
        <no-data-found />
      </slot>
    </div>
    <div v-if="tableStore.showPagebar.value" class="q-table__bottom">
      <page-bar
        :pagination="tableStore.pagination.value"
        @page-changed="reloadData"
        max-pages="5"
        sizeSeletion
        show-page-count
      >
        <template #reload>
          <q-btn
            round
            dense
            unelevated
            class="text-on-dark q-mr-md"
            icon="o_refresh"
            @click="reloadData"
          >
            <q-tooltip class="custom-tooltip" :delay="600">
              {{ $t("shared.labels.refresh") }}
            </q-tooltip>
          </q-btn>
        </template>
      </page-bar>
    </div>
  </q-card>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter } from "vue-router"
import { useQuasar } from "quasar";
import { useDataTable } from "src/composables/useDataTable";

import CustomInput from "src/components/shared/forms/CustomInput.vue";
import PageBar from "src/components/shared/dataTables/PageBar.vue";
import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

const props = defineProps({
  sortBy: String,
  columns: Array,
  hideFilterRow: Boolean,
  hideHeader: Boolean,
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
  gridStore: Object,
});

const $q = useQuasar();
const router = useRouter()
const tableStore = useDataTable(
  props.dataSource,
  props.columns,
  props.gridStore
);

const emit = defineEmits([
  "active-row-changed",
  "selected-rows-changed",
  "row-dbl-click",
]);

onMounted(() => {
  tableStore.loadData();
});

function getColText(row, col) {
  if (row && col) {
    if (col.template) {
      return col.template.replace(
        /{{\s*([\w.]+)\s*}}/g,
        (_, key) => row[key] ?? ""
      );
    } else if (col.field) return row[col.field];
  }
  return "";
}

async function reloadData() {
  await tableStore.reloadData();
}

function selectAll(checked) {
  tableStore.selectAll(checked);
  emitselectedRows();
}

function selectRow(row, checked) {
  tableStore.selectRow(row, checked);
  emitselectedRows();
}

function emitselectedRows() {
  emit("selected-rows-changed", tableStore.selectedRows.value);
}

function setActiveRow(row) {
  tableStore.setActiveRow(row);
  emit("active-row-changed", row);
}

const cardDefaultClass = computed(
  () =>
    " q-table__card" +
    ($q.dark.isActive === true ? " q-table__card--dark q-dark" : "") +
    (props.square === true ? " q-table--square" : "") +
    (props.flat === true ? " q-table--flat" : " border-radius-lg") +
    (props.bordered === true ? " q-table--bordered" : "")
);

const __containerClass = computed(
  () =>
    `q-table__container q-table--${props.separator}-separator column no-wrap` +
    (props.grid === true ? "q-table--grid" : cardDefaultClass.value) +
    ($q.dark?.isActive === true ? " q-table--dark" : "") +
    (props.dense === true ? " q-table--dense" : "") +
    (props.wrapCells === false ? " q-table--no-wrap" : "")
  //(inFullscreen.value === true ? " fullscreen scroll" : "")
);

const containerClass = computed(
  () =>
    __containerClass.value +
    (tableStore.showLoader.value === true ? " q-table--loading" : "")
);

const goToPreview = (row) => {
  emit("row-dbl-click", row);
};

const chevronIcon = () => {
  return $q.lang.rtl ? 'chevron_left' : 'chevron_right'
}

//Todo: How move to expand page dynamically
const toggleExpand = (row) => {
  if($q.screen.gt.xs) {
    tableStore.toggleExpand(row)
  } else {
    router.push("/Sls/Report/ProductStock/items/123")
  }
}

defineExpose({
  tableStore,
});

</script>

<style lang="scss" scoped>
.expand-open {
  transform: rotate(-90deg);
  transition-duration: 300ms;
}

.expand-close {
  transform: rotate(0);
  transition-duration: 300ms;
}

.dense {
  width: 1px;
  padding-right: 5px;
  padding-left: 5px;
}
</style>
