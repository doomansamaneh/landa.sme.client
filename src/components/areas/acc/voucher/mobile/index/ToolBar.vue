<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    :title="title"
    activation_
    search-btn
  >
    <template #search-btn>
      <q-btn
        round
        class="q-mr-sm"
        unelevated
        dense
        v-if="!tableStore?.activeRow?.value"
        @click="onSortSheetShow"
      >
        <q-icon name="sort" />
      </q-btn>
      <q-btn
        round
        unelevated
        dense
        v-if="!tableStore?.activeRow?.value"
        @click="showSearchModal"
      >
        <q-icon name="o_filter_alt" />
      </q-btn>
    </template>
  </tool-bar>

  <bottom-sheet
    v-if="sortSheetStatus"
    header
    :status="sortSheetStatus"
    @hide="onSortSheetHide"
  >
    <template #header-title>مرتب‌ سازی بر اساس</template>

    <template #body>
      <q-list padding>
        <div v-for="(item, index) in sortOptions" :key="item.name">
          <q-item
            clickable
            @click="showSortOptionsDialog"
            class="text-body2 no-letter-spacing q-pa-md"
          >
            <q-item-section>
              <div class="row">
                <div>
                  {{ item.label }}
                </div>
                <div>
                  <q-icon
                    size="16px"
                    color="primary"
                    name="arrow_drop_down"
                  />
                </div>
              </div>
            </q-item-section>
            <q-item-section avatar>
              <q-icon size="20px" color="primary" name="check" />
            </q-item-section>
          </q-item>
          <q-separator
            v-if="index !== sortOptions.length - 1"
            size="0.5px"
            class="q-mx-sm"
          />
        </div>
      </q-list>
    </template>
  </bottom-sheet>

  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    maximized
    v-model="dialog"
  >
    <advanced-search @apply-search="hideSearchModal" />
  </q-dialog>

  <q-dialog
    transition-show="slide-up"
    transition-hide="slide-down"
    transition-duration="600"
    v-model="sortOptionsDialog"
  >
    <to-sort />
  </q-dialog>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolBar from "components/shared/ToolBarMobile.vue";
  import AdvancedSearch from "./AdvancedSearch.vue";
  import ToSort from "./ToSort.vue";
  import BottomSheet from "src/components/shared/BottomSheet.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "acc/voucher" },
  });

  const emits = defineEmits([
    "downloadPdf",
    "download-batch-pdf",
    "reorder",
  ]);

  const dialog = ref(false);
  const sortOptionsDialog = ref(null);
  const sortSheetStatus = ref(false);

  const sortOptions = computed(() =>
    props.tableStore.columns.value.filter((item) => item.sortable)
  );

  function downloadPdf(id) {
    emits("download-pdf", id);
  }

  function downloadBatchPdf() {
    emits("download-batch-pdf");
  }

  function reorder() {
    emits("reorder");
  }

  const showSearchModal = () => {
    dialog.value = true;
  };

  const hideSearchModal = () => {
    dialog.value = false;
  };

  const onSortSheetShow = () => {
    sortSheetStatus.value = true;
  };

  const onSortSheetHide = () => {
    sortSheetStatus.value = false;
  };

  const showSortOptionsDialog = () => {
    sortOptionsDialog.value = true;
  };

  const hideSortOptionsDialog = () => {
    sortOptionsDialog.value = false;
  };
</script>
