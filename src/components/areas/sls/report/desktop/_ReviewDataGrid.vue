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
    :title="`${title} / ${subTitle}`"
  >
    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "quantity")
            )
          }}
        </b>
      </td>
      <td v-if="vatVisible >= 0">
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "vatAmount")
            )
          }}
        </b>
      </td>
      <td>
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "amount")
            )
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
        <b>{{ helper.formatNumber(summary.quantity) }}</b>
      </td>
      <td v-if="vatVisible >= 0">
        <b>{{ helper.formatNumber(summary.vatAmount) }}</b>
      </td>
      <td>
        <b>{{ helper.formatNumber(summary.amount) }}</b>
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
    title: String,
    subTitle: String,
  });

  const colspan = computed(
    () =>
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        "quantity"
      ) +
      1 + //numbered column
      1 //multi check column
  );

  const vatVisible = computed(() =>
    helper.findIndex(
      props.tableStore.columns.value,
      "name",
      "vatAmount"
    )
  );
</script>
