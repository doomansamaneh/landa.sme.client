<template>
  <bottom-sheet header :status="status" @hide="hide">
    <template #header-title>مرتب‌ سازی بر اساس</template>

    <template #body>
      <q-list padding>
        <div v-for="(item, index) in sortOptions" :key="item.name">
          <q-item
            clickable
            @click="showSortOptionsDialog(item)"
            class="text-body2 no-letter-spacing q-pa-md"
          >
            <q-item-section>
              <div class="row">
                <div>
                  {{ item.label }}
                </div>
                <template
                  v-if="
                    tableStore.pagination.value.sortColumn ===
                    item.field
                  "
                >
                  <div>
                    <q-icon
                      v-if="
                        tableStore.pagination.value.sortOrder ===
                        sortOrder.ascending
                      "
                      size="16px"
                      color="primary"
                      name="arrow_drop_down"
                    />
                    <q-icon
                      v-else
                      size="16px"
                      color="primary"
                      name="arrow_drop_up"
                    />
                  </div>
                </template>
              </div>
            </q-item-section>
            <q-item-section
              v-if="
                tableStore.pagination.value.sortColumn === item.field
              "
              avatar
            >
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
    v-model="sortOptionsDialog"
  >
    <mobile-sort-order />
  </q-dialog>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useDataTable } from "src/composables/useDataTable";

  import MobileSortOrder from "./MobileSortOrder.vue";
  import BottomSheet from "src/components/shared/BottomSheet.vue";
  import { sortOrder } from "src/constants";

  const props = defineProps({
    tableStore: useDataTable,
    status: Boolean,
  });

  const emits = defineEmits(["hide"]);

  const sortOptionsDialog = ref(false);

  const sortOptions = computed(() =>
    props.tableStore.columns.value.filter((item) => item.sortable)
  );

  const hide = () => {
    emits("hide");
  };

  const showSortOptionsDialog = (col) => {
    props.tableStore.sortColumn(col);
    //todo: how to set sort order
    //sortOptionsDialog.value = true;
  };

  const hideSortOptionsDialog = () => {
    sortOptionsDialog.value = false;
  };
</script>
