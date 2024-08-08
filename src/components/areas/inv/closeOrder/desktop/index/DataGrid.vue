<template>
  <q-card bordered>
    <q-card-section class="text-center">
      <h6 class="text-weight-700 no-letter-spacing">
        {{ title }}
      </h6>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-px-none">
      <data-grid
        ref="dataGrid"
        :data-source="dataSource"
        :grid-store="gridStore"
        separator="horizontal"
        multiSelect
        numbered
        flat
        bordered_
        wrapCells
        dense
        expandable
      >
        <template #cell-amount="{ item }">
          {{ item.amount?.toLocaleString() }}
        </template>
        <template #cell-date="{ item }">
          {{ item.date?.substring(0, 10) }}
        </template>

        <template #expand="{ item }">
          <preview inside :item="item" />
        </template>

        <template #footer-subtotal="{ selectedRows }">
          <td :colspan="colspan" class="text-right">
            {{ $t("shared.labels.selectedRows") }}
          </td>
          <td>
            <b>
              {{
                helper
                  .getSubtotal(selectedRows, "amount")
                  .toLocaleString()
              }}
            </b>
          </td>
          <td colspan="100%"></td>
        </template>
      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    gridStore: Object,
    crudStore: Object,
    dataSource: String,
    baseRoute: String,
    title: String,
  });

  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  const colspan = computed(
    () =>
      tableStore?.value?.columns.value.findIndex(
        (column) => column.name === "amount"
      ) +
      1 + //numbered column
      1 //multi check column
  );

  defineExpose({
    tableStore,
  });
</script>
