<template>
  <custom-label class="q-mb-sm" :label="label" />
  <q-input
    ref="search"
    v-model="selectedText"
    :type="type"
    :placeholder="placeholder"
    outlined
    dense
    color="primary"
    class="first input lookup"
    @keydown.enter.prevent.stop="selectRow"
    @keydown="handleKeyDown"
  >
    <template #append>
      <q-btn
        no-caps
        color="primary"
        unelevated
        round
        size="xs"
        class="primary-gradient primary-shadow text-white"
        @click="handlePopup"
        ref="addBtnRef"
      >
        <q-icon size="16px" name="o_add" />
      </q-btn>
    </template>
    <template #prepend v-if="tableStore.inputInnerLoader.value">
      <q-spinner
        v-if="tableStore.inputInnerLoader.value"
        size="18px"
        color="primary"
      />
    </template>
  </q-input>

  <q-menu
    v-model="isPopupOpen"
    no-parent-event
    transition-show="jump-down"
    transition-hide="jump-up"
    ref="popup"
    :context-menu="false"
    cover
    :target="addBtnRef?.value?.$el"
    @before-show="onBeforeShow"
    @show="onMenuShow"
    @hide="onMenuHide"
  >
    <q-inner-loading
      :showing="tableStore.showLoader.value"
      class="inner-loader_ q-mt-xl"
    >
      <q-spinner size="52px" color="primary" />
    </q-inner-loading>

    <div
      class="header text-caption text-bold q-pa-md bg-dark z-max"
      style="border-bottom: 1px solid var(--q-primary)"
    >
      <div
        class="row q-col-gutter-md items-center"
        style="width: 100%; margin-left: 0px"
      >
        <div class="col-1">#</div>
        <div class="col">
          <header-column
            fieldName="title"
            :title="$t('shared.labels.title') || 'شرح'"
            :table-store="tableStore"
            @click="sortTitle"
          />
        </div>
      </div>
    </div>
    <div class="q-px-md q-pb-md">
      <q-input
        ref="search"
        v-model="searchText"
        hide-bottom-space
        outlined
        color="primary"
        class="q-mt-md first input lookup"
        input-class="text-body2 "
        dense
        debounce="500"
        :placeholder="'جستجو...'"
        @update:model-value="onSearch"
        @keydown.enter.prevent.stop="selectRow"
        @keydown="handleKeyDown"
      >
        <template #append>
          <q-icon
            name="o_close"
            v-if="searchText"
            class="cursor-pointer q-field__focusable-action"
            @click="clearSearch"
          />
        </template>
      </q-input>
      <div
        v-for="(row, index) in tableStore.rows.value"
        :key="row.id"
        class="cursor-pointer q-my-sm rounded-borders"
        :class="{ 'row-active': index === selectedRowIndex }"
        @click="onRowClicked(row, index)"
      >
        <q-item
          class="rounded-borders"
          style="padding: 12px"
          clickable
        >
          <div
            class="row items-center q-gutter-lg_"
            style="width: 100%; margin-left: 0px"
          >
            <div class="col-1 text-caption">{{ index + 1 }}</div>
            <div class="col text-body2">{{ row.title }}</div>
          </div>
        </q-item>
      </div>
      <div
        v-if="
          !tableStore.showLoader.value &&
          tableStore.rows.value.length == 0
        "
        class="q-table__bottom items-center q-table__bottom--nodata"
      >
        <no-data-found />
      </div>
      <div
        v-if="tableStore.showPagebar.value"
        class="q-mt-md flex flex-center"
      >
        <page-bar
          :pagination="tableStore.pagination.value"
          @page-changed="reloadData"
        />
      </div>
    </div>
  </q-menu>

  <q-dialog
    ref="lookupDialog"
    v-model="isDialogOpen"
    @show="onDialogShow"
    maximized
    transition-duration="600"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="no-border">
      <q-card-section>
        <div class="row items-center q-col-gutter-md">
          <div class="col text-body2 text-bold">انتخاب شرح</div>
          <div class="flex flex-center">
            <q-btn
              no-caps
              round
              unelevated
              text-color="white"
              class="red-gradient red-shadow col-1"
              padding="5px"
              @click="isDialogOpen = false"
            >
              <q-icon size="16px" name="o_close" />
            </q-btn>
          </div>
        </div>
        <q-input
          ref="search"
          v-model="searchText"
          hide-bottom-space
          outlined
          color="primary"
          class="q-mt-md first input lookup"
          input-class="text-body2 "
          dense
          debounce="500"
          :placeholder="'جستجو...'"
          @update:model-value="onSearch"
          @keydown.enter.prevent.stop="selectRow"
          @keydown="handleKeyDown"
        >
          <template #append>
            <q-icon
              name="o_close"
              v-if="searchText"
              class="cursor-pointer q-field__focusable-action"
              @click="clearSearch"
            />
          </template>
        </q-input>
      </q-card-section>
      <div
        class="header text-caption text-bold q-pa-md bg-dark z-max"
        style="border-bottom: 1px solid var(--q-primary)"
      >
        <div
          class="row q-col-gutter-md items-center"
          style="width: 100%; margin-left: 0px"
        >
          <div class="col-1">#</div>
          <div class="col">
            <header-column
              fieldName="title"
              :title="$t('shared.labels.title') || 'شرح'"
              :table-store="tableStore"
              @click="sortTitle"
            />
          </div>
        </div>
      </div>
      <q-card-section class="q-py-none q-px-sm">
        <q-inner-loading :showing="tableStore.showLoader.value" />
        <div
          v-for="(row, index) in tableStore.rows.value"
          :key="row.id"
          class="cursor-pointer q-my-sm rounded-borders"
          :class="{ 'row-active': index === selectedRowIndex }"
          @click="onRowClicked(row, index)"
        >
          <q-item
            class="rounded-borders"
            style="padding: 12px"
            clickable
          >
            <div
              class="row items-center q-gutter-lg_"
              style="width: 100%; margin-left: 0px"
            >
              <div class="col-1 text-caption">{{ index + 1 }}</div>
              <div class="col text-body2">{{ row.title }}</div>
            </div>
          </q-item>
        </div>
        <div
          v-if="
            !tableStore.showLoader.value &&
            tableStore.rows.value.length == 0
          "
          class="q-table__bottom items-center q-table__bottom--nodata"
        >
          <no-data-found />
        </div>
        <div
          v-if="tableStore.showPagebar.value"
          class="q-mt-md flex flex-center"
        >
          <page-bar
            :pagination="tableStore.pagination.value"
            @page-changed="reloadData"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref, nextTick } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { defaultLookupPageSize, sortOrder } from "src/constants";
  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";
  import PageBar from "src/components/shared/dataTables/PageBar.vue";
  import CustomLabel from "../forms/CustomLabel.vue";

  const props = defineProps({
    type: String,
    placeholder: String,
    label: String,
  });

  const $q = useQuasar();
  const selectedText = defineModel("selectedText");
  const isPopupOpen = ref(false);
  const isDialogOpen = ref(false);
  const searchText = ref("");
  const selectedRowIndex = ref(-1);
  const isAscending = ref(true);
  const addBtnRef = ref(null);
  const popup = ref(null);
  const lookupDialog = ref(null);

  const store = {
    pagination: ref({
      currentPage: 1,
      pageSize: defaultLookupPageSize,
      columns: "title",
      sortColumn: undefined,
      sortOrder: sortOrder.ascending,
    }),
    state: {
      filterExpression: [],
      disableApplySearch: true,
      firstLoad: ref(true),
      rows: ref([]),
      searchField: ref(""),
      allSelectedIds: ref([]),
      activeRow: ref(null),
    },
  };

  const tableStore = useDataTable({
    dataSource: "cmn/commonKeyword/getGridData",
    store: store,
  });

  function handlePopup() {
    if ($q.screen.gt.xs) {
      tableStore.reloadData().then(() => {
        isPopupOpen.value = true;
        nextTick(() => {
          syncSelectedRowIndex();
        });
      });
    } else {
      tableStore.reloadData().then(() => {
        isDialogOpen.value = true;
        nextTick(() => {
          syncSelectedRowIndex();
        });
      });
    }
  }

  function syncSelectedRowIndex() {
    const idx = tableStore.rows.value.findIndex(
      (row) => row.title === selectedText.value
    );
    selectedRowIndex.value = idx;
  }

  function onBeforeShow() {
    // Optionally set menu width or position here if needed
  }

  function onMenuShow() {
    isPopupOpen.value = true;
    syncSelectedRowIndex();
  }

  function onMenuHide() {
    isPopupOpen.value = false;
  }

  function onDialogShow() {
    tableStore.reloadData().then(syncSelectedRowIndex);
  }

  function onRowClicked(row, index) {
    selectedRowIndex.value = index;
    selectRow(row);
  }

  function selectRow(row) {
    if (!row && tableStore.rows.value.length > 0) {
      row = tableStore.rows.value[0];
      selectedRowIndex.value = 0;
    }
    selectedText.value = row.title;
    isPopupOpen.value = false;
    isDialogOpen.value = false;
  }

  function reloadData() {
    tableStore.reloadData().then(syncSelectedRowIndex);
  }

  function onSearch(val) {
    tableStore.setSearchTerm(val);
    tableStore.pagination.value.currentPage = 1;
    tableStore.reloadData().then(syncSelectedRowIndex);
  }

  function clearSearch() {
    searchText.value = "";
    onSearch("");
  }

  function sortTitle() {
    isAscending.value = !isAscending.value;
    tableStore.pagination.value.sortOrder = isAscending.value
      ? sortOrder.ascending
      : sortOrder.descending;
    tableStore.pagination.value.sortColumn = "title";
    tableStore.reloadData();
    selectedRowIndex.value = -1;
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        if (
          selectedRowIndex.value <
          tableStore.rows.value.length - 1
        ) {
          selectedRowIndex.value++;
        }
        break;
      case "ArrowUp":
        if (selectedRowIndex.value > 0) {
          selectedRowIndex.value--;
        }
        break;
      case "Enter":
        selectRow(tableStore.rows.value[selectedRowIndex.value]);
        break;
    }
  }
</script>

<style scoped>
  .header {
    position: sticky;
    top: 0;
  }
  .footer {
    position: sticky;
    bottom: 0;
  }
  .row-active {
    background: #e3f2fd;
  }
</style>
