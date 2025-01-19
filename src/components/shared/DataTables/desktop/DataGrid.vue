<template>
  <div :class="containerClass">
    <slot name="title"></slot>

    <div class="q-table__middle scroll">
     
      <slot name="toolbar" :tableStore="tableStore">

        <toolbar
          v-if="toolbar"
          class="q-pa-md"
          :table-store="tableStore"
          :title="title"
        />
      </slot>

      <table class="q-table data-table">
        <thead>
          <tr v-if="!hideHeader">
            <th v-if="numbered" style="width: 1px" class="dense_">
              #
            </th>
            <th v-if="multiSelect" style="width: 5px" class="dense">
              <q-checkbox
                v-model="tableStore.checkedAll.value"
                @update:model-value="selectAll"
              />
            </th>
            <th
              v-for="col in tableStore?.columns.value"
              :key="col.name"
              :style="`${col.style}; font-size: ${tableStore.thFontSize.value}px`"
              :class="tableStore.getSortableClass(col)"
              @click="tableStore.sortColumn(col)"
            >
              <span class="q-icon q-table__sort-icon">
                <q-icon
                  name="arrow_drop_down"
                  color="primary"
                  size="20px"
                />
              </span>
              <span>{{ col.label }}</span>
            </th>
            <th v-if="expandable" style="width: 1px"></th>
          </tr>
          <tr v-if="!hideFilterRow" class="row-filter">
            <!-- <th v-if="numbered" class="dense"></th> -->
            <!-- <th v-if="multiSelect" class="dense"></th> -->
            <th
              v-if="multiSelect || numbered"
              class="dense"
              :colspan="multiSelect + numbered"
            >
              <q-icon
                :color="$q.dark.isActive ? 'white' : 'grey-6'"
                size="32px"
                :style="
                  dense
                    ? 'margin-right: 16px;'
                    : 'margin-right: 32px;'
                "
                name="o_search"
              />
            </th>
            <th
              v-for="col in tableStore?.columns.value"
              :key="col.name"
              class="filter"
            >
              <slot
                v-if="col.showFilter"
                :name="`filter-${col.name}`"
                :item="col"
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
          <tr
            v-if="tableStore.showLoader.value"
            class="q-table__progress"
          >
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
          <template
            v-for="(row, index) in tableStore?.rows.value"
            :key="row.id"
          >
            <tr
              @click="setActiveRow(row)"
              @dblclick="goToPreview(row)"
              class="table-row"
              :class="tableStore.getRowClass(row)"
            >
              <td v-if="numbered" class="dense_">
                <div
                  class="text-caption no-letter-spacing text-on-dark"
                >
                  {{ tableStore.rowIndex(index) }}
                </div>
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
                :style="`${col.cellStyle}; font-size: ${tableStore.tdFontSize.value}px`"
              >
                <!-- :style="col.cellStyle" -->
                <slot :name="`cell-${col.name}`" :item="row">
                  <div v-html="getColText(row, col)"></div>
                </slot>
              </td>
              <td v-if="expandable">
                <slot name="expandable" :item="row">
                  <q-btn
                    size="md"
                    class="expand-icon"
                    :color="$q.dark.isActive ? 'white' : 'grey-8'"
                    flat
                    dense
                    round
                    @click="toggleExpand(row)"
                    icon="keyboard_arrow_up"
                    :class="
                      row.expanded ? 'expand-open' : 'expand-close'
                    "
                  />
                </slot>
              </td>
            </tr>
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <tr class="expand" v-if="row.expanded">
                <td colspan="100%">
                  <div class="expand">
                    <slot name="expand" :item="row"></slot>
                  </div>
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
            ></slot>
          </tr>
          <tr
            v-if="
              tableStore.rows.value.length > 1 &&
              tableStore.summaryData != null
            "
            class="grid-total"
          >
            <slot
              name="footer-total"
              :summary="tableStore.summaryData.value"
            ></slot>
          </tr>
        </tfoot>
      </table>
    </div>

    <div
      v-if="
        !tableStore.showLoader.value &&
        tableStore.rows.value.length == 0
      "
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
  </div>
</template>

<script setup>
  import { onMounted, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import PageBar from "src/components/shared/dataTables/PageBar.vue";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";
  import Toolbar from "./DataGridToolbar.vue";

  const props = defineProps({
    sortBy: String,
    columns: Array,
    hideFilterRow: Boolean,
    hideHeader: Boolean,
    dataSource: String,
    expandable: Boolean,
    numbered: Boolean,
    multiSelect: Boolean,
    // separator: String,
    square: Boolean,
    bordered: Boolean,
    flat: Boolean,
    dense: Boolean,
    grid: Boolean,
    wrapCells: Boolean,
    gridStore: Object,
    toolbar: Boolean,
    title: String,
    dataTableStore: Object,
    noFullscreen: Boolean,
  });

  const $q = useQuasar();

  const tableStore = computed(
    () =>
      props.dataTableStore ??
      useDataTable({
        dataSource: props.dataSource,
        dataColumns: props.columns,
        store: props.gridStore,
      })
  );

  const emit = defineEmits([
    "active-row-changed",
    "selected-rows-changed",
    "row-dbl-click",
  ]);

  onMounted(() => {
    tableStore.value.loadData();
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
    await tableStore.value.reloadData();
  }

  function selectAll(checked) {
    tableStore.value.selectAll(checked);
    emitselectedRows();
  }

  function selectRow(row, checked) {
    tableStore.value.selectRow(row, checked);
    emitselectedRows();
  }

  function emitselectedRows() {
    emit(
      "selected-rows-changed",
      tableStore.value.selectedRows.value
    );
  }

  function setActiveRow(row) {
    tableStore.value.setActiveRow(row);
    emit("active-row-changed", row);
  }

  const cardDefaultClass = computed(
    () =>
      " q-table__card" +
      ($q.dark.isActive === true
        ? " q-table__card--dark q-dark"
        : "") +
      (props.square === true ? " q-table--square" : "") +
      (props.flat === true ? " q-table--flat" : " border-radius-lg") +
      (props.bordered === true ? " q-table--bordered" : "")
  );

  const __containerClass = computed(
    () =>
      `q-table__container q-table--${tableStore.value.separator.value}-separator column no-wrap` +
      (props.grid === true
        ? "q-table--grid"
        : cardDefaultClass.value) +
      ($q.dark?.isActive === true ? " q-table--dark" : "") +
      (props.dense ? " q-table--dense" : "") +
      (props.wrapCells === false ? " q-table--no-wrap_" : "") +
      (props.bordered === true ? " bordered" : "") +
      (props.noFullscreen
        ? " scroll"
        : tableStore.value.inFullscreen.value === true
        ? " fullscreen scroll"
        : "")
  );

  const containerClass = computed(
    () =>
      __containerClass.value +
      (tableStore.value.showLoader.value === true
        ? " q-table--loading"
        : "")
  );

  const goToPreview = (row) => {
    emit("row-dbl-click", row);
  };

  // const chevronIcon = () => {
  //   return $q.lang.rtl ? "keyboard_arrow_down" : "keyboard_arrow_up";
  // };

  //Todo: How to move to expand page dynamically
  const toggleExpand = (row) => {
    tableStore.value.toggleExpand(row);
  };

  // onMounted(() => {
  //   bus.on("apply-search", reloadData);
  // });

  // onUnmounted(() => {
  //   bus.off("apply-search", reloadData);
  // });

  defineExpose({
    tableStore,
  });
</script>

<style lang="scss" scoped>
  .expand-open {
    transform: rotate(-180deg);
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

  .data-table {
    th {
      font-weight: bold !important;
      font-size: 13px !important;
    }

    td {
      letter-spacing: 0 !important;
      font-size: 14px !important;
    }
  }
</style>
