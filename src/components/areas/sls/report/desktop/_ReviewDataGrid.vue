<template>
  <data-grid
    :data-table-store="tableStore"
    separator="horizontal"
    flat
    square_
    multiSelect
    numbered
    bordered_
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
      <td v-if="vatVisible >= 0">
        <b>
          {{
            helper
              .getSubtotal(selectedRows, "vatAmount")
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
      <td v-if="expandable"></td>
    </template>

    <template #footer-total="{ summary }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td>
        <b>{{ summary.quantity?.toLocaleString() }}</b>
      </td>
      <td v-if="vatVisible >= 0">
        <b>{{ summary.vatAmount?.toLocaleString() }}</b>
      </td>
      <td>
        <b>{{ summary.amount?.toLocaleString() }}</b>
      </td>
      <td v-if="expandable"></td>
    </template>
  </data-grid>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

  const props = defineProps({
    tableStore: useDataTable,
    expandable: Boolean,
  });

  const colspan = computed(
    () =>
      props.tableStore.columns.value.findIndex(
        (column) => column.name === "quantity"
      ) +
      1 + //numbered column
      1 //multi check column
  );

  const vatVisible = computed(() =>
    props.tableStore.columns.value.findIndex(
      (column) => column.name === "vatAmount"
    )
  );
</script>
