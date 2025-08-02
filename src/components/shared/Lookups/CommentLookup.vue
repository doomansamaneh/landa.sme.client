<template>
  <div>
    <custom-label class="q-mb-sm" :label="label" />
    <q-input
      ref="mainSearch"
      v-model="model"
      hide-bottom-space
      outlined
      color="primary"
      class="first input lookup"
      :input-class="inputClass"
      dense
      debounce="1000"
      :type="type"
      :placeholder="placeholder"
      :rules="rules"
      :error="!!validationMessage"
      @keydown.enter="onInputEnter"
      @update:model-value="searchInLookup"
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
          <q-icon size="16px" name="o_message" />
        </q-btn>
      </template>

      <template #prepend v-if="tableStore.inputInnerLoader.value">
        <q-spinner
          v-if="tableStore.inputInnerLoader.value"
          size="18px"
          color="primary"
        />
      </template>

      <validation-alert
        v-if="validationMessage"
        :message="validationMessage"
      />

      <q-menu
        v-model="isPopupOpen"
        no-parent-event
        transition-show="jump-down"
        transition-hide="jump-up"
        ref="popup"
        :context-menu="false"
        :target="addBtnRef?.value?.$el"
        @before-show="onBeforeShow"
        @show="onMenuShow"
        @hide="onMenuHide"
        :anchor="$q.screen.lt.sm ? 'bottom middle' : ''"
        :self="$q.screen.lt.sm ? 'top middle' : ''"
        no-focus
        no-refocus
        :style="`width: ${menuWidth}`"
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
            class="q-pa-md row items-center footer bg-main"
          >
            <page-bar
              :pagination="tableStore.pagination.value"
              @page-changed="reloadData"
            >
              <template #reload>
                <q-btn
                  no-caps
                  class="q-mr-md"
                  size="sm"
                  round
                  dense
                  unelevated
                  icon="o_refresh"
                  @click="reloadData"
                />
              </template>
            </page-bar>
          </div>
        </div>
      </q-menu>
    </q-input>
  </div>

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
          ref="dialogSearch"
          v-model="searchText"
          hide-bottom-space
          outlined
          color="primary"
          class="q-mt-md first input lookup"
          input-class="text-body2 "
          dense
          debounce="500"
          :placeholder="'جستجو...'"
          @update:model-value="searchInLookup"
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
        <q-inner-loading
          :showing="tableStore.showLoader.value"
          class="inner-loader_ q-mt-xl"
        >
          <q-spinner size="52px" color="primary" />
        </q-inner-loading>
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
  import {
    ref,
    nextTick,
    watch,
    onMounted,
    onBeforeUnmount,
    computed,
  } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";
  import { defaultLookupPageSize, sortOrder } from "src/constants";
  import { useI18n } from "vue-i18n";

  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";
  import PageBar from "src/components/shared/dataTables/PageBar.vue";
  import CustomLabel from "../forms/CustomLabel.vue";
  import ValidationAlert from "src/components/shared/forms/ValidationAlert.vue";

  const props = defineProps({
    modelValue: String, // <-- add for v-model
    type: String,
    placeholder: String,
    label: String,
    required: Boolean,
    inputClass: {
      type: String,
      default: "text-body2 ",
    },
  });

  const emit = defineEmits(["update:modelValue", "row-selected"]); // <-- add update:modelValue

  const { t } = useI18n();
  const $q = useQuasar();
  // Use computed for v-model
  const model = computed({
    get: () => props.modelValue,
    set: (val) => emit("update:modelValue", val),
  });
  const isPopupOpen = ref(false);
  const menuWidth = ref("");
  const isDialogOpen = ref(false);
  const searchText = ref("");
  const selectedRowIndex = ref(0); // default to 0 for first row
  const isAscending = ref(true);
  const addBtnRef = ref(null);
  const popup = ref(null);
  const lookupDialog = ref(null);
  const menuSearch = ref(null);
  const dialogSearch = ref(null);
  const mainSearch = ref(null);
  const validationMessage = ref(""); // <-- add validation message

  const rules = computed(() => {
    return props.required
      ? [
          (val) => {
            const valid =
              val !== null &&
              val !== undefined &&
              val !== "" &&
              model.value !== null;
            validationMessage.value = valid
              ? ""
              : t("shared.labels.required");
            return valid;
          },
        ]
      : [];
  });

  const store = {
    pagination: ref({
      currentPage: 1,
      pageSize: defaultLookupPageSize,
      columns: "title",
      sortColumn: null,
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
      (row) => row.title === model.value
    );
    selectedRowIndex.value = idx >= 0 ? idx : 0;
  }

  function onBeforeShow() {
    if ($q.screen.gt.xs) {
      const inputWidth = mainSearch.value?.$el?.offsetWidth;
      menuWidth.value = inputWidth ? `${inputWidth}px` : "200px";
      popup.value?.updatePosition();
    }
  }

  function onMenuShow() {
    isPopupOpen.value = true;
    syncSelectedRowIndex();
    mainSearch?.value.focus();
  }

  function onMenuHide() {
    isPopupOpen.value = false;
  }

  function onDialogShow() {
    tableStore.reloadData().then(syncSelectedRowIndex);
    nextTick(() => {
      if (
        dialogSearch.value &&
        typeof dialogSearch.value.focus === "function"
      ) {
        dialogSearch.value.focus();
      } else if (dialogSearch.value && dialogSearch.value.$el) {
        const input = dialogSearch.value.$el.querySelector("input");
        if (input) input.focus();
      }
    });
  }

  function onRowClicked(row, index) {
    selectedRowIndex.value = index;
    selectRow(row);
  }

  function selectRow(row) {
    if (!isPopupOpen.value && !isDialogOpen.value) return;
    // Always select the row at selectedRowIndex if no row is passed
    if (!row) {
      if (tableStore.rows.value.length === 0) return;
      row = tableStore.rows.value[selectedRowIndex.value];
    }
    model.value = row.title;
    isPopupOpen.value = false;
    isDialogOpen.value = false;
    emit("row-selected", row);
  }

  function reloadData() {
    tableStore.reloadData().then(syncSelectedRowIndex);
  }

  // function onSearch(val) {
  //   tableStore.setSearchTerm(val);
  //   tableStore.pagination.value.currentPage = 1;
  //   tableStore.reloadData().then(syncSelectedRowIndex);
  // }

  async function searchInLookup() {
    tableStore.setSearchTerm(mainSearch.value?.nativeEl?.value);
    tableStore.pagination.value.currentPage = 1;
    tableStore.reloadData().then(syncSelectedRowIndex);
    if ($q.screen.gt.xs) {
      await onMenuShow();
    } else {
      await onDialogShow();
    }
  }

  function clearSearch() {
    searchText.value = "";
    // onSearch("");
  }

  function sortTitle() {
    isAscending.value = !isAscending.value;
    tableStore.pagination.value.sortOrder = isAscending.value
      ? sortOrder.ascending
      : sortOrder.descending;
    tableStore.pagination.value.sortColumn = "title";
    tableStore.reloadData();
    selectedRowIndex.value = 0;
  }

  function handleKeyDown(event) {
    if (!isPopupOpen.value && !isDialogOpen.value) return;
    switch (event.key) {
      case "ArrowDown":
        if (tableStore.rows.value.length === 0) break;
        if (
          selectedRowIndex.value ===
          tableStore.rows.value.length - 1
        ) {
          selectedRowIndex.value = 0;
        } else {
          selectedRowIndex.value++;
        }
        break;
      case "ArrowUp":
        if (tableStore.rows.value.length === 0) break;
        if (selectedRowIndex.value === 0) {
          selectedRowIndex.value = tableStore.rows.value.length - 1;
        } else {
          selectedRowIndex.value--;
        }
        break;
      case "Enter":
        selectRow();
        break;
    }
  }

  function onInputEnter(event) {
    if (isPopupOpen.value || isDialogOpen.value) {
      event.preventDefault();
      event.stopPropagation();
      selectRow();
    }
    // Otherwise, allow default (new line in textarea)
  }

  // Global keydown handler for navigation
  function globalKeydownHandler(e) {
    // Only handle up/down/enter
    if (["ArrowUp", "ArrowDown", "Enter"].includes(e.key)) {
      // Prevent default scroll/submit
      e.preventDefault();
      handleKeyDown(e);
    }
  }

  // Watch for menu/dialog open/close to add/remove global keydown
  watch([isPopupOpen, isDialogOpen], ([popup, dialog]) => {
    if (popup || dialog) {
      window.addEventListener("keydown", globalKeydownHandler);
    } else {
      window.removeEventListener("keydown", globalKeydownHandler);
    }
  });

  // Clean up on component unmount
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", globalKeydownHandler);
  });
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
