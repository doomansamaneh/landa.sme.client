<template>
  <div>
    <custom-label class="q-mb-sm" :label="label" />
    <q-input
      ref="search"
      v-model="selectedText"
      hide-bottom-space
      outlined
      color="primary"
      class="first input lookup"
      :input-class="inputClass"
      dense
      :autogrow="autogrow"
      debounce="1000"
      :placeholder="placeholder"
      :autofocus="autofocus"
      :disable="disable"
      :readonly="readonly"
      :rules="rules"
      @update:model-value="searchInLookup"
      @keydown.enter.prevent.stop="selectRow"
      @keydown="handleKeyDown"
    >
      <template #loading>
        <q-spinner size="18px" color="primary" />
      </template>

      <template #append>
        <template v-if="clearable || !required">
          <q-icon
            name="o_close"
            v-if="!isSearchEmpty"
            class="cursor-pointer q-field__focusable-action"
            @click="clearSearch"
          />
        </template>
        <q-icon
          @click="handlePopup"
          name="o_expand_more"
          id="expand-more-icon"
          class="show-lookup-icon cursor-pointer"
          size="sm"
        />
      </template>

      <template v-if="tableStore.inputInnerLoader.value" #prepend>
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
              class="row q-col-gutter-md items-center"
              style="width: 100%; margin-left: 0px"
            >
              <slot name="thead-index">
                <div class="col-1">#</div>
              </slot>
              <slot name="thead-cols" :tableStore="tableStore">
                <div
                  v-for="col in lookupColumns"
                  :key="col"
                  class="col"
                >
                  <header-column
                    :fieldName="col"
                    :title="$t(`shared.labels.${col}`)"
                    :table-store="tableStore"
                  />
                </div>
              </slot>

              <slot name="create">
                <lookup-add-button
                  v-if="
                    showAdd &&
                    createForm &&
                    tableStore.state.value.isAuthorizeToCreate
                  "
                  @click="handleAdd"
                />
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
                class="row items-center q-col-gutter-md"
                style="width: 100%"
              >
                <slot name="tbody-index" :index="index">
                  <div class="col-1 text-caption no-letter-spacing">
                    {{ index + 1 }}
                  </div>
                </slot>
                <slot name="tbody-cols" :item="row">
                  <div
                    v-for="col in lookupColumns"
                    class="col text-body2 no-letter-spacing"
                    :key="col"
                  >
                    <slot :name="`cell-${col}`" :item="row">
                      {{ row[col] }}
                    </slot>
                  </div>
                </slot>
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
            @page-changed="reloadData"
          >
            <template #reload>
              <q-btn
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
      </q-menu>
    </q-input>
  </div>

  <q-dialog
    ref="lookupDialog"
    maximized
    transition-duration="600"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="no-border">
      <q-card-section>
        <div class="row items-center q-col-gutter-md">
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
          :rules="rules"
          color="primary"
          class="q-mt-md first input lookup"
          input-class="text-body2 no-letter-spacing"
          dense
          debounce="1000"
          :clearable="clearable"
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
            class="row q-col-gutter-md items-center"
            style="width: 100%; margin-left: 0px"
          >
            <slot name="thead-index">
              <div class="col-1">#</div>
            </slot>
            <slot name="thead-cols">
              <div
                v-for="col in lookupColumns"
                :key="col"
                class="col"
              >
                <header-column
                  :fieldName="col"
                  :title="$t(`shared.labels.${col}`)"
                  :table-store="tableStore"
                />
              </div>
            </slot>

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
                class="row items-center q-gutter-lg"
                style="width: 100%; margin-left: 0px"
              >
                <slot name="tbody-index" :index="index">
                  <div class="col-1 text-caption no-letter-spacing">
                    {{ index + 1 }}
                  </div>
                </slot>
                <slot name="tbody-cols" :item="row">
                  <div
                    v-for="col in lookupColumns"
                    class="col text-body2 no-letter-spacing"
                    :key="col"
                  >
                    <slot :name="`cell-${col}`" :item="row">
                      {{ row[col] }}
                    </slot>
                  </div>
                </slot>
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
          @page-changed="reloadData"
        >
          <template #reload>
            <q-btn
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
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useDataTable } from "src/composables/useDataTable";
  import {
    defaultLookupPageSize,
    sortOrder,
    formAction,
  } from "src/constants";
  import { useDialog } from "src/composables/useDialog";

  import PageBar from "src/components/shared/dataTables/PageBar.vue";
  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";
  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";
  import LookupAddButton from "src/components/shared/lookups/LookupAddButton.vue";
  import CustomLabel from "../forms/CustomLabel.vue";
  import ValidationAlert from "src/components/shared/forms/ValidationAlert.vue";

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
    showAdd: Boolean,
    autofocus: Boolean,
    disable: Boolean,
    readonly: Boolean,
    createForm: Object,
    label: String,
    autogrow: Boolean,
    clearable: Boolean,
    inputClass: {
      type: String,
      default: "text-body2 no-letter-spacing",
    },
  });

  const selectedId = defineModel("selectedId");
  const selectedText = defineModel("selectedText");
  const { t } = useI18n();
  const $q = useQuasar();
  const dialogStore = useDialog();

  const store = {
    pagination: ref({
      currentPage: 1,
      pageSize: defaultLookupPageSize,
      columns: props.columns,
      sortColumn: props.sortColumn,
      sortOrder: sortOrder.ascending,
      //searchTerm: selectedText,
    }),
    state: {
      filterExpression: props.filterExpression,
      disableApplySearch: true,
      firstLoad: ref(true),
      rows: ref([]),
      searchField: ref(""),
      allSelectedIds: ref([]),
      activeRow: ref(null),
    },
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
  const validationMessage = ref("");

  function handleAdd(event) {
    hidePopup();
    dialogStore.openDialog({
      title: "shared.labels.create",
      component: props.createForm,
      width: "900px",
      actionBar: true,
      props: { action: formAction.create },
      okCallback: (responseData) => {
        if (responseData.data) setIdText(responseData.data);
      },
    });
  }

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
      reloadData();
      showDialog();
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
    hideDialog();
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
    reloadData();
    popup.value?.show();
  }

  async function showDialog() {
    reloadData();
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

  function hideDialog() {
    lookupDialog.value?.hide();
  }

  const isSearchEmpty = computed(() => !selectedId.value);

  const lookupColumns = computed(() => props.columns.split(","));

  const reloadData = async () => {
    await tableStore.reloadData();
  };

  const rules = computed(() => {
    return props.required
      ? [
          (val) => {
            const valid =
              val !== null && val !== undefined && val !== "";
            validationMessage.value = valid
              ? ""
              : t("shared.labels.required");
            return valid;
          },
        ]
      : [];
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
