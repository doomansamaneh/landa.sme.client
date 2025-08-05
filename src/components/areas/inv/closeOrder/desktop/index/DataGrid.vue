<template>
  <data-grid
    :data-table-store="tableStore"
    flat
    toolbar
    multiSelect
    numbered
    dense
    expandable
    wrapCells
    @row-dbl-click="gotoPreview"
  >
    <template #cell-amount="{ item }">
      <span class="text-weight-600">
        {{ helper.formatNumber(item.amount) }}
      </span>
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
        <span class="text-weight-600">
          {{
            helper.formatNumber(
              helper.getSubtotal(selectedRows, "amount")
            )
          }}
        </span>
      </td>
      <td colspan="100%"></td>
    </template>
  </data-grid>
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import NotificationBadge from "src/components/areas/_shared/badges/NotificationBadge.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: { type: String, default: "inv/closeOrder" },
  });

  const router = useRouter();

  function gotoPreview(row) {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
  }

  const colspan = computed(
    () =>
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        "amount"
      ) +
      1 + //numbered column
      1 //multi check column
  );
</script>
