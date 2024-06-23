<template>
  <q-input
    ref="search"
    v-model="selectedText"
    hide-bottom-space
    outlined
    :required="required"
    :rules="rules"
    color="primary"
    class="first input lookup"
    input-class="text-body2 no-letter-spacing"
    dense
    debounce="1000"
    :placeholder="placeholder"
    @update:model-value="searchInLookup"
    @keydown.enter.prevent.stop="selectRow"
    @keydown="handleKeyDown"
  >
    <template #loading>
      <q-spinner size="18px" color="primary" />
    </template>

    <template #append>
      <q-icon
        name="o_close"
        v-if="!isSearchEmpty"
        class="cursor-pointer q-field__focusable-action"
        @click="clearSearch"
      />
      <q-icon
        @click="handlePopup"
        name="o_expand_more"
        id="expand-more-icon"
        class="show-lookup-icon cursor-pointer"
        size="sm"
      />
    </template>

    <template #prepend>
      <q-spinner
        v-if="tableStore.inputInnerLoader.value"
        size="18px"
        color="primary"
      />
    </template>

    <q-menu
      fit
      v-if="$q.screen.gt.xs"
      no-parent-event
      v-model="isPopupOpen"
      @show="onMenuShow"
      @hide="onMenuHide"
      ref="popup"
      transition-show="jump-down"
      transition-hide="jump-up"
      :anchor="$q.screen.lt.sm ? 'bottom middle' : ''"
      :self="$q.screen.lt.sm ? 'top middle' : ''"
      no-focus
      no-refocus
      :style="`width: ${width}`"
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
        <slot name="thead">
          <div
            class="row q-gutter-x-lg items-center"
            style="width: 100%; margin-left: 0px"
          >
            <div class="col-1">#</div>
            <div v-for="col in lookupColumns" :key="col" class="col">
              <header-column
                :fieldName="col"
                :title="$t(`shared.labels.${col}`)"
                :table-store="tableStore"
              />
            </div>

            <slot name="create">
              <q-btn
                dense
                unelevated
                text-color="white"
                class="primary-gradient primary-shadow absolute-top-right q-py-xs q-px-sm q-mr-sm"
                style="margin-top: 12px"
                rounded
                size="12px"
              >
                <q-icon
                  name="o_add"
                  size="14px"
                  style="margin-left: 2px"
                />
                <span class="text-body3 no-letter-spacing">
                  ایجاد
                </span>
              </q-btn>
            </slot>
          </div>
        </slot>
      </div>
      <div
        class="cursor-pointer q-ma-sm rounded-borders"
        v-for="(row, index) in tableStore.rows.value"
        :key="row.id"
        :class="{ 'row-active': index === selectedRowIndex }"
        @click="onRowClicked(row, index)"
      >
        <slot
          name="td"
          :row="row"
          :index="tableStore.rowIndex(index)"
        >
          <q-item
            class="rounded-borders"
            style="padding: 12px"
            clickable
            v-close-popup
          >
            <div
              class="row items-center q-gutter-x-lg"
              style="width: 100%; margin-left_: 50px"
            >
              <div class="col-1 text-caption no-letter-spacing">
                {{ index + 1 }}
              </div>
              <div
                v-for="col in lookupColumns"
                class="col text-body2 no-letter-spacing"
                :key="col"
              >
                <slot :name="`cell-${col}`" :item="row">
                  {{ row[col] }}
                </slot>
              </div>
            </div>
          </q-item>
        </slot>
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

      <div
        v-if="tableStore.showPagebar.value"
        class="q-pa-md row items-center footer dark-1"
      >
        <page-bar
          :pagination="tableStore.pagination.value"
          @page-changed="tableStore.reloadData"
        >
          <template #reload>
            <q-btn
              class="q-mr-md"
              size="sm"
              round
              dense
              unelevated
              icon="o_refresh"
              @click="tableStore.reloadData"
            />
          </template>
        </page-bar>
      </div>
    </q-menu>
  </q-input>

  <q-dialog
    ref="lookupDialog"
    maximized
    transition-duration="600"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="no-border">
      <q-card-section>
        <div class="row items-center q-gutter-md">
          <div class="col text-body2 no-letter-spacing text-bold">
            <slot name="title">انتخاب</slot>
          </div>
          <div class="flex flex-center">
            <q-btn
              round
              unelevated
              text-color="white"
              class="red-gradient red-shadow col-1"
              padding="5px"
              v-close-popup
            >
              <q-icon size="16px" name="o_close" />
            </q-btn>
          </div>
        </div>

        <q-input
          ref="search"
          v-model="selectedText"
          hide-bottom-space
          outlined
          :required="required"
          :rules="rules"
          color="primary"
          class="q-mt-md first input lookup"
          input-class="text-body2 no-letter-spacing"
          dense
          debounce="1000"
          :placeholder="placeholder"
          @update:model-value="searchInLookup"
          @keydown.enter.prevent.stop="selectRow"
          @keydown="handleKeyDown"
        >
          <template #append>
            <q-icon
              name="o_close"
              v-if="!isSearchEmpty"
              class="cursor-pointer q-field__focusable-action"
              @click="clearSearch"
            />
          </template>
          <template #prepend>
            <q-spinner
              v-if="tableStore.inputInnerLoader.value"
              size="18px"
              color="primary"
            />
          </template>
        </q-input>
      </q-card-section>

      <div
        class="header q-pa-md text-caption text-bold bg-dark z-max"
        style="border-bottom: 1px solid var(--q-primary)"
      >
        <slot name="thead">
          <div
            class="row q-gutter-x-lg items-center"
            style="width: 100%; margin-left: 0px"
          >
            <div class="col-1">#</div>
            <div v-for="col in lookupColumns" :key="col" class="col">
              <header-column
                :fieldName="col"
                :title="$t(`shared.labels.${col}`)"
                :table-store="tableStore"
              />
            </div>

            <slot name="create">
              <q-btn
                dense
                unelevated
                color="primary"
                class="primary-shadow absolute-top-right q-py-xs q-px-sm q-mr-md"
                style="margin-top: 12px"
                rounded
                size="12px"
              >
                <q-icon name="o_add" size="14px" />
                <span class="text-body3 no-letter-spacing">
                  ایجاد
                </span>
              </q-btn>
            </slot>
          </div>
        </slot>
      </div>

      <q-card-section class="q-py-none q-px-sm">
        <div
          class="cursor-pointer q-my-sm"
          v-for="(row, index) in tableStore.rows.value"
          :key="row.id"
          :class="{
            'rounded-borders row-active': index === selectedRowIndex,
          }"
          @click="onRowClicked(row, index)"
        >
          <slot
            name="td"
            :row="row"
            :index="tableStore.rowIndex(index)"
          >
            <q-item
              class="rounded-borders"
              style="padding: 12px"
              clickable
              v-close-popup
            >
              <div
                class="row items-center q-gutter-x-lg"
                style="width: 100%; margin-left: 0px"
              >
                <div class="col-1 text-caption no-letter-spacing">
                  {{ index + 1 }}
                </div>
                <div
                  v-for="col in lookupColumns"
                  class="col text-body2 no-letter-spacing"
                  :key="col"
                >
                  <slot :name="`cell-${col}`" :item="row">
                    {{ row[col] }}
                  </slot>
                </div>
              </div>
            </q-item>
          </slot>
        </div>
      </q-card-section>

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

      <div
        v-if="tableStore.showPagebar.value"
        class="q-pa-md row items-center footer dark-1"
      >
        <page-bar
          :pagination="tableStore.pagination.value"
          @page-changed="tableStore.reloadData"
        >
          <template #reload>
            <q-btn
              class="q-mr-md"
              size="sm"
              round
              dense
              unelevated
              icon="o_refresh"
              @click="tableStore.reloadData"
            />
          </template>
        </page-bar>
      </div>

      <q-inner-loading
        :showing="tableStore.showLoader.value"
        class="inner-loader_ q-mt-xl"
      >
        <q-spinner size="52px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { defaultLookupPageSize, sortOrder } from "src/constants";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";

  import PageBar from "src/components/shared/dataTables/PageBar.vue";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";
  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";

  const props = defineProps({
    dataSource: String,
    textTemplate: String,
    sortColumn: String,
    searchField: String,
    columns: String,
    required: Boolean,
    rules: Array,
    placeholder: String,
    filterExpression: Array,
    width: String,
  });

  const selectedId = defineModel("selectedId");
  const selectedText = defineModel("selectedText");
  const formStore = useInvoiceModel({ baseRoute: "sls/invoice" });
  const $q = useQuasar();

  const store = {
    pagination: ref({
      currentPage: 1,
      pageSize: defaultLookupPageSize,
      columns: props.columns,
      sortColumn: props.sortColumn,
      sortOrder: sortOrder.ascending,
      //searchTerm: selectedText,
    }),
    filterExpression: props.filterExpression,
  };

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: store,
  });

  const emit = defineEmits(["row-selected"]);

  const search = ref(null);
  const selectedRowIndex = ref(0);
  const popup = ref(null);
  const isPopupOpen = ref(false);
  const lookupDialog = ref(null);

  const lookup = document.querySelector(".lookup");

  function handleKeyDown(event) {
    switch (event.key) {
      case "Delete":
        clearSearch();
        break;
      case "ArrowDown":
        selectNext();
        break;
      case "ArrowUp":
        selectPrevious();
        break;
    }
  }

  async function clearSearch() {
    tableStore.setActiveRow(null);
    tableStore.setSearchTerm(null);
    setIdText(null);
    emitSelectRow(null);
    onMenuHide();
  }

  async function onRowClicked(row, index) {
    selectedRowIndex.value = index;
    selectRow(row);
  }

  async function setIdText(row) {
    selectedId.value = row?.id;
    setText(row);
  }

  function setText(row) {
    if (row == null) selectedText.value = null;
    else {
      if (props.textTemplate) {
        selectedText.value = props.textTemplate.replace(
          /{{\s*([\w.]+)\s*}}/g,
          (_, key) => row[key] ?? ""
        );
      } else selectedText.value = row.title;
    }
  }

  function setCustomText(displayText) {
    selectedText.value = displayText;
  }

  async function handlePopup() {
    if ($q.screen.gt.xs) {
      if (isPopupOpen.value) hidePopup();
      else {
        tableStore.setSearchTerm(null);
        showPopup();
      }
    } else {
      tableStore.setSearchTerm(null);
      showDialog();
      await tableStore.reloadData();
    }
  }

  function selectPrevious() {
    if (isPopupOpen.value) {
      if (selectedRowIndex.value === 0)
        selectedRowIndex.value = tableStore.rows.value.length - 1;
      else selectedRowIndex.value--;
    }
  }

  async function selectNext() {
    if (isPopupOpen.value) {
      if (selectedRowIndex.value === tableStore.rows.value.length - 1)
        selectedRowIndex.value = 0;
      else selectedRowIndex.value++;
    } else {
      showPopup();
    }
  }

  function selectRow() {
    const row = tableStore.rows.value[selectedRowIndex.value];
    tableStore.setActiveRow(row);
    setIdText(row);
    hidePopup();
    emitSelectRow(row);
  }

  function emitSelectRow(row) {
    emit("row-selected", row);
  }

  async function searchInLookup() {
    tableStore.setSearchTerm(search.value?.nativeEl?.value);
    if ($q.screen.gt.xs) {
      await showPopup();
    } else {
      await showDialog();
    }
  }

  function onMenuHide() {
    isPopupOpen.value = false;
    search.value?.focus();
  }

  async function showPopup() {
    await tableStore.reloadData();
    popup.value?.show();
  }

  async function showDialog() {
    await tableStore.reloadData();
    lookupDialog.value?.show();
  }

  function onMenuShow() {
    isPopupOpen.value = true;
    if ($q.screen.gt.xs) {
      search.value?.focus();
    }
  }

  function hidePopup() {
    popup.value?.hide();
  }

  const isSearchEmpty = computed(() => !selectedId.value);

  const lookupColumns = computed(() => props.columns.split(","));

  const cardDefaultClass = computed(
    () =>
      " lookup-container q-table__card q-table--bordered_q-table--flat" +
      ($q.dark.isActive === true ? " q-table__card--dark q-dark" : "")
  );

  const __containerClass = computed(
    () =>
      `q-table__container _q-table--horizontal-separator column _no-wrap` +
      cardDefaultClass.value +
      ($q.dark?.isActive === true ? " q-table--dark" : "")
  );

  const containerClass = computed(
    () =>
      __containerClass.value +
      (tableStore.showLoader.value === true
        ? " q-table--loading"
        : "")
  );

  onMounted(() => {
    lookup?.focus();
  });

  defineExpose({
    setIdText,
    setCustomText,
    selectedId,
    selectedText,
    tableStore,
  });
</script>

<style>
  .header {
    position: sticky;
    top: 0;
  }

  .footer {
    position: sticky;
    bottom: 0;
  }
</style>
