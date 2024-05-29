<template>
  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    flat_
    square_
    multiSelect
    numbered
    bordered
    wrapCells
    dense_
    :expandable="expandable"
  >
    <template #cell-quantity="{ item }">
      {{ item.quantity?.toLocaleString() }}
    </template>

    <template #cell-amount="{ item }">
      {{ item.amount?.toLocaleString() }}
    </template>

    <template #cell-vatAmount="{ item }">
      {{ item.vatAmount?.toLocaleString() }}
    </template>

    <template #cell-price="{ item }">
      {{ item.price?.toLocaleString() }}
    </template>

    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td>
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "quantity")
              .toLocaleString()
          }}
        </b>
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
      <td>
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "vatAmount")
              .toLocaleString()
          }}
        </b>
      </td>
    </template>

    <template #footer-total="{ summary }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td>
        <b>{{ summary.quantity?.toLocaleString() }}</b>
      </td>
      <td>
        <b>{{ summary.amount?.toLocaleString() }}</b>
      </td>
      <td>
        <b>{{ summary.vatAmount?.toLocaleString() }}</b>
      </td>
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  const props = defineProps({
    dataSource: String,
    gridStore: Object,
    expandable: Boolean,
  });

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid?.value?.tableStore);

  const colspan = computed(
    () =>
      tableStore?.value?.columns.value.findIndex(
        (column) => column.name === "debit"
      ) +
      1 + //numbered column
      1 //multi check column
  );

  defineExpose({
    tableStore,
  });
</script>
