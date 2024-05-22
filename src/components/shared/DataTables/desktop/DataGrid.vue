<template>
  <q-card class="bordered" :class="containerClass">
    <div class="q-table__middle scroll">
      <div class="row items-center justify-between q-pa-md">
        <div class="row items-center q-gutter-xs">
          <q-btn
            size="11px"
            round
            unelevated
            @click="toggleFullscreen"
          >
            <q-icon
              size="24px"
              :name="inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            />
            <q-tooltip
              :delay="700"
              class="bordered"
              :anchor="inFullscreen ? 'bottom end' : 'bottom middle'"
              :self="inFullscreen ? 'top end' : 'top middle'"
              :class="
                $q.dark.isActive
                  ? 'bg-dark text-white'
                  : 'bg-white text-black'
              "
            >
              <div class="text-body2 no-letter-spacing">
                <template v-if="inFullscreen">
                  خروج از تمام صفحه
                </template>
                <template v-else>تمام صفحه</template>
              </div>
            </q-tooltip>
          </q-btn>

          <q-btn size="11px" round unelevated @click="toggleDesne">
            <q-icon
              size="21px"
              :name="dense ? 'o_height' : 'o_zoom_in_map'"
            />
            <q-tooltip
              :delay="700"
              class="bordered"
              :anchor="dense ? 'bottom end' : 'bottom middle'"
              :self="dense ? 'top end' : 'top middle'"
              :class="
                $q.dark.isActive
                  ? 'bg-dark text-white'
                  : 'bg-white text-black'
              "
            >
              <div class="text-body2 no-letter-spacing">
                <template v-if="dense">استاندارد</template>
                <template v-else>فشرده</template>
              </div>
            </q-tooltip>
          </q-btn>

          <q-btn padding="6px 16px" size="11px" unelevated rounded>
            <div class="row items-center">
              <q-icon class="q-mr-sm" name="o_visibility_off" />
              <div class="text-body2 no-letter-spacing">
                خاموش کردن
              </div>
            </div>

            <q-tooltip
              :delay="700"
              class="bordered"
              :class="
                $q.dark.isActive
                  ? 'bg-dark text-white'
                  : 'bg-white text-black'
              "
            >
              <div class="text-body2 no-letter-spacing">
                مخفی کردن ستون‌ها
              </div>
            </q-tooltip>
            <q-menu
              :offset="[0, 10]"
              style="width: 300px"
              class="border-radius-md"
            >
              <q-card class="bordered border-radius-md">
                <q-card-section>
                  <div
                    class="q-mb-md text-body2 no-letter-spacing text-weight-500"
                  >
                    نمایش ستون‌ها
                  </div>

                  <q-input
                    inputmode="search"
                    color="grey-5"
                    outlined
                    v-model="searchInCloumns"
                    placeholder="جستجو"
                    dense
                    rounded
                    clearable
                    clear-icon="o_close"
                    class="full-width text-body2 no-letter-spacing"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="o_search"
                        color="primary"
                        size="24px"
                      />
                    </template>
                  </q-input>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="row items-center">
                    <q-checkbox dense size="40px" class="q-mr-sm" />
                    <div class="text-body2 no-letter-spacing">
                      انتخاب همه
                    </div>
                  </div>

                  <div
                    :class="
                      $q.dark.isActive ? 'text-grey-5' : 'text-grey-7'
                    "
                    class="q-ml-sm q-my-md text-body2 no-letter-spacing"
                  >
                    ستون‌ها
                  </div>
                  <div class="column">
                    <q-item
                      class="rounded-borders"
                      style="min-height: 38px; padding: 0 6px"
                      clickable
                    >
                      <div class="row items-center">
                        <div>
                          <q-checkbox class="q-mr-sm" dense />
                        </div>
                        <div class="text-body2 no-letter-spacing">
                          #
                        </div>
                      </div>
                    </q-item>
                    <q-item
                      class="rounded-borders"
                      style="min-height: 38px; padding: 0 6px"
                      clickable
                    >
                      <div class="row items-center">
                        <div>
                          <q-checkbox class="q-mr-sm" dense />
                        </div>
                        <div class="text-body2 no-letter-spacing">
                          شماره
                        </div>
                      </div>
                    </q-item>
                    <q-item
                      class="rounded-borders"
                      style="min-height: 38px; padding: 0 6px"
                      clickable
                    >
                      <div class="row items-center">
                        <div>
                          <q-checkbox class="q-mr-sm" dense />
                        </div>
                        <div class="text-body2 no-letter-spacing">
                          تاریخ
                        </div>
                      </div>
                    </q-item>
                    <q-item
                      class="rounded-borders"
                      style="min-height: 38px; padding: 0 6px"
                      clickable
                    >
                      <div class="row items-center">
                        <div>
                          <q-checkbox class="q-mr-sm" dense />
                        </div>
                        <div class="text-body2 no-letter-spacing">
                          مشتری
                        </div>
                      </div>
                    </q-item>
                  </div>
                </q-card-section>
              </q-card>
            </q-menu>
          </q-btn>
        </div>

        <q-select
          v-model="separator"
          :options="separatorTypes"
          style="width: 120px"
          dropdown-icon="expand_more"
          popup-content-class="text-body2 no-letter-spacing"
          input-class="text-body2 no-letter-spacing"
          class="text-body2 no-letter-spacing select"
          emit-value
          map-options
          transition-show="flip-up"
          transition-hide="flip-down"
          dense
          outlined
        />
      </div>
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
              :style="col.style"
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
            v-for="(row, index) in tableStore.rows.value"
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
                :style="col.cellStyle"
              >
                <slot :name="`cell-${col.name}`" :item="row">
                  <div v-html="getColText(row, col)"></div>
                </slot>
              </td>
              <td v-if="expandable" style="width: 1px">
                <q-btn
                  size="md"
                  class="expand-icon"
                  :color="$q.dark.isActive ? 'white' : 'grey-8'"
                  flat
                  dense
                  round
                  @click="toggleExpand(row)"
                  :icon="chevronIcon()"
                  :class="
                    row.expanded ? 'expand-open' : 'expand-close'
                  "
                />
              </td>
            </tr>
            <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
            >
              <tr class="expand" v-if="row.expanded">
                <td colspan="100%">
                  <slot name="expand" :item="row"></slot>
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
  </q-card>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useQuasar } from "quasar";
  import { bus } from "src/helpers";
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
    // separator: String,
    square: Boolean,
    bordered: Boolean,
    flat: Boolean,
    // dense: Boolean,
    grid: Boolean,
    wrapCells: Boolean,
    gridStore: Object,
  });

  const $q = useQuasar();
  const router = useRouter();
  const tableStore = useDataTable({
    dataSource: props.dataSource,
    dataColumns: props.columns,
    store: props.gridStore,
  });

  const emit = defineEmits([
    "active-row-changed",
    "selected-rows-changed",
    "row-dbl-click",
  ]);

  const inFullscreen = ref(false);
  const separator = ref("horizontal");
  const separatorTypes = [
    {
      label: "خط دار",
      value: "horizontal",
    },
    {
      label: "بدون خط",
      value: "none",
    },
  ];

  const dense = ref(true);

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
      ($q.dark.isActive === true
        ? " q-table__card--dark q-dark"
        : "") +
      (props.square === true ? " q-table--square" : "") +
      (props.flat === true ? " q-table--flat" : " border-radius-lg") +
      (props.bordered === true ? " q-table--bordered" : "")
  );

  const __containerClass = computed(
    () =>
      `q-table__container q-table--${separator.value}-separator column no-wrap` +
      (props.grid === true
        ? "q-table--grid"
        : cardDefaultClass.value) +
      ($q.dark?.isActive === true ? " q-table--dark" : "") +
      (dense.value === true ? " q-table--dense" : "") +
      (props.wrapCells === false ? " q-table--no-wrap" : "") +
      (inFullscreen.value === true ? " fullscreen scroll" : "")
  );

  const containerClass = computed(
    () =>
      __containerClass.value +
      (tableStore.showLoader.value === true
        ? " q-table--loading"
        : "")
  );

  const goToPreview = (row) => {
    emit("row-dbl-click", row);
  };

  const chevronIcon = () => {
    return $q.lang.rtl ? "keyboard_arrow_down" : "keyboard_arrow_up";
  };

  //Todo: How move to expand page dynamically
  const toggleExpand = (row) => {
    if ($q.screen.gt.xs) {
      tableStore.toggleExpand(row);
    } else {
      router.push("/Sls/Report/ProductStock/items/123");
    }
  };

  const toggleFullscreen = () => {
    inFullscreen.value = !inFullscreen.value;
  };

  const toggleDesne = () => {
    dense.value = !dense.value;
  };

  onMounted(() => {
    bus.on("apply-search", reloadData);
  });

  onUnmounted(() => {
    bus.off("apply-search", reloadData);
  });

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

  .data-table th {
    font-weight: bold;
  }
</style>
