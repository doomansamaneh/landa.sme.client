<template>
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

  import AdvancedSearch from "./AdvancedSearch.vue";
  import ToSort from "./ToSort.vue";
  import BottomSheet from "src/components/shared/BottomSheet.vue";

  const props = defineProps({
    tableStore: useDataTable,
  });

  const dialog = ref(false);
  const sortOptionsDialog = ref(null);
  const sortSheetStatus = ref(false);

  const sortOptions = computed(() =>
    props.tableStore.columns.value.filter((item) => item.sortable)
  );

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
