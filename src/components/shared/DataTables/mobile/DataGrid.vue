<template>
  <slot name="title"></slot>
  <slot name="header">
    <q-input
      outlined
      rounded
      dense
      class="searchbox text-body2"
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

        <slot name="header-guide"></slot>
      </template>
    </q-input>
  </slot>

  <div class="q-pt-md q-col-gutter-md">
    <template v-for="(row, index) in rows?.value" :key="row.id">
      <div
        @click="setActiveRow(row)"
        v-touch-hold.capture="() => selectRow(row)"
      >
        <slot name="body" :item="row">
          <q-card
            flat
            class="bordered grid-body"
            :class="tableStore.getRowClass(row)"
          >
            <slot name="row-header" :item="row"></slot>

            <q-card-section class="q-px-xs">
              <slot name="row-body" :item="row">
                <span v-if="numbered" class="text-on-dark">
                  {{ tableStore.rowIndex(index) }}
                </span>

                <div
                  v-for="col in gridStore?.columns.value"
                  :key="col.name"
                >
                  <slot :name="`cell-${col.name}`" :item="row">
                    <div
                      v-if="col.field && col.label && row[col.field]"
                      class="q-pa-xs"
                    >
                      {{ col.label }}:
                      <span v-html="getColText(row, col)"></span>
                    </div>
                  </slot>
                </div>
              </slot>
            </q-card-section>

            <q-separator size="0.5px" />

            <q-card-actions class="dark-1_ q-pa-md" align="between">
              <slot name="row-actions" :item="row"></slot>

              <slot name="row-more-menus" :item="row"></slot>
            </q-card-actions>
          </q-card>
        </slot>
      </div>
    </template>
  </div>

  <slot name="footer"></slot>

  <div
    v-if="
      !tableStore.showLoader.value &&
      tableStore?.rows.value.length === 0
    "
    class="text-on-dark"
  >
    <no-data-found />
  </div>

  <q-inner-loading
    :showing="tableStore.showLoader.value"
    class="transparent z-max"
  >
    <q-spinner size="52px" color="primary" />
  </q-inner-loading>

  <div
    v-if="showPagebar"
    class="row items-center justify-center q-gutter-sm q-mt-md q-mb-xl"
  >
    <q-btn
      :disable="previousAction"
      unelevated
      rounded
      dense
      padding="6px 16px"
      text-color="white"
      class="primary-gradient primary-shadow"
      @click="previous"
    >
      <span class="text-body2 no-letter-spacing">
        {{ $t("shared.labels.previous") }}
      </span>
    </q-btn>
    <q-btn
      :disable="nextAction"
      unelevated
      rounded
      dense
      padding="6px 16px"
      text-color="white"
      class="primary-gradient primary-shadow"
      @click="next"
    >
      <span class="text-body2 no-letter-spacing">
        {{ $t("shared.labels.next") }}
      </span>
    </q-btn>
  </div>

  <template v-if="createUrl">
    <q-page-sticky position="bottom-right z-1" :offset="[18, 18]">
      <slot name="create-label">
        <q-btn
          v-if="showCreate"
          text-color="white"
          rounded
          unelevated
          padding="8px 16px"
          :to="createUrl"
          dense
          class="text-body1 no-letter-spacing primary-gradient primary-shadow"
        >
          <div class="row items-center q-gutter-x-xs">
            <q-icon name="o_add" size="20px" />
            <span>
              {{ $t("shared.labels.create") }}
            </span>
          </div>
        </q-btn>
      </slot>
    </q-page-sticky>
  </template>
</template>

<script setup>
  import { ref, onMounted, onUnmounted, computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";
  import { dataViewDefaultPageSize } from "src/constants";

  const props = defineProps({
    dataSource: String,
    columns: Array,
    createUrl: String,
    gridStore: Object,
    numbered: Boolean,
    multiSelect: Boolean,
    dataTableStore: useDataTable,
  });

  const emit = defineEmits([
    "active-row-changed",
    "selected-rows-changed",
  ]);

  const showCreate = ref(true);
  let previousScrollPosition = 0;

  const tableStore = computed(
    () =>
      props.dataTableStore ??
      useDataTable({
        dataSource: props.dataSource,
        dataColumns: props.columns,
        store: props.gridStore,
      })
  );

  const thisGridStore = computed(() => tableStore.value.state);

  const rows = computed(() => {
    if (thisGridStore.value?.rows) {
      return thisGridStore.value.rows;
    }
    return tableStore.value.rows;
  });

  const nextAction = computed(
    () =>
      tableStore.value.pagination.value.currentPage >=
      tableStore.value.pagination.value.totalPages
  );

  const previousAction = computed(
    () => tableStore.value.pagination.value.currentPage <= 1
  );

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

  async function loadData() {
    await tableStore.value.loadData();
    if (thisGridStore.value?.rows) {
      thisGridStore.value.rows.value = tableStore.value.rows.value;
    }
  }

  async function reloadData() {
    await tableStore.value.reloadData();
    if (thisGridStore.value?.rows)
      thisGridStore.value.rows.value = tableStore.value.rows.value;
  }

  async function resetPage() {
    //tableStore.value.pagination.value.currentPage = 1
    await reloadData();
  }

  const handleScroll = () => {
    const currentPosition =
      window.scrollY || document.documentElement.scrollTop;
    showCreate.value =
      currentPosition <= 0 ||
      currentPosition < previousScrollPosition;
    previousScrollPosition = currentPosition;
  };

  function selectAll(checked) {
    tableStore.value.selectAll(checked);
    emitselectedRows();
  }

  function selectRow(row) {
    tableStore.value.selectRow(row, !row.selected);
    emitselectedRows();
  }

  function emitselectedRows() {
    emit(
      "selected-rows-changed",
      tableStore.value.selectedRows.value
    );
  }

  function setActiveRow(row) {
    if (tableStore.value.selectedRows.value.length > 0) {
      selectRow(row);
      tableStore.value.setActiveRow(row);
    } else {
      if (tableStore.value.activeRow.value === row) {
        tableStore.value.setActiveRow(null);
      } else tableStore.value.setActiveRow(row);
    }
    emit("active-row-changed", row);
  }

  async function clearSearch() {
    tableStore.value.pagination.value.searchTerm = "";
    await reloadData();
  }

  const isSearchEmpty = computed(
    () =>
      !tableStore.value.pagination.value.searchTerm ||
      tableStore.value.pagination.value.searchTerm.trim().length === 0
  );

  const showPagebar = computed(
    () =>
      tableStore.value.pagination.value.totalItems >
      dataViewDefaultPageSize
  );

  async function previous(e) {
    tableStore.value.pagination.value.currentPage -= 1;
    await reloadData();
  }
  async function next(e) {
    tableStore.value.pagination.value.currentPage += 1;
    await reloadData();
  }

  onMounted(() => {
    loadData();
    window.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });

  defineExpose({
    tableStore,
    resetPage,
    loadData,
  });
</script>
