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
    <template #cell-productTitle="{ item }">
      {{ item.productTitle }}
      <small v-if="item.summay || item.itemComment">
        (
        <span class="q-pr-xs">{{ item.summary }} /</span>
        <span v-if="item.itemComment">{{ item.itemComment }}</span>
        )
      </small>
    </template>

    <template
      #footer-subtotal="{ selectedRows, visibleColumns }"
      v-if="shouldShowFooter"
    >
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
      </td>
      <td
        v-if="visibleColumns.find((col) => col.name === 'quantity')"
      >
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "quantity")
            )
          }}
        </b>
      </td>
      <td
        v-if="visibleColumns.find((col) => col.name === 'vatAmount')"
      >
        <b>
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "vatAmount")
            )
          }}
        </b>
      </td>
      <td v-if="visibleColumns.find((col) => col.name === 'amount')">
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

    <template
      #footer-total="{ summary, visibleColumns }"
      v-if="shouldShowFooter"
    >
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td
        v-if="visibleColumns.find((col) => col.name === 'quantity')"
      >
        <b>{{ helper.formatNumber(summary.quantity) }}</b>
      </td>
      <td
        v-if="visibleColumns.find((col) => col.name === 'vatAmount')"
      >
        <b>{{ helper.formatNumber(summary.vatAmount) }}</b>
      </td>
      <td v-if="visibleColumns.find((col) => col.name === 'amount')">
        <b>{{ helper.formatNumber(summary.amount) }}</b>
      </td>
      <td v-if="expandable"></td>
    </template>

    <template #expand="{ item }">
      <slot name="expand" :item="item" />
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

  const shouldShowFooter = computed(() => {
    const footerColumns = ["quantity", "vatAmount", "amount"];
    return footerColumns.some((colName) =>
      props.tableStore.columns.value.find(
        (col) => col.name === colName && !col.hidden
      )
    );
  });
</script>
