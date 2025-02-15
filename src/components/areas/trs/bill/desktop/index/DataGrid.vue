<template>
  <data-grid
    :data-table-store="tableStore"
    :title="title"
    flat
    toolbar
    multiSelect
    numbered
    dense
    expandable
    @row-dbl-click="gotoPreview"
  >
    <template #cell-subject="{ item }">
      {{ item.subject }}
      <div>
        <small>{{ item.summary }}</small>
      </div>
      <contract-badge
        :title="item.contractTitle"
        :id="item.contractId"
      />
    </template>

    <template #footer-subtotal="{ selectedRows }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.selectedRows") }}
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
      <td colspan="100%"></td>
    </template>

    <template #footer-total="{ summary }">
      <td :colspan="colspan" class="text-right">
        {{ $t("shared.labels.total") }}
      </td>
      <td>
        <b>{{ helper.formatNumber(summary?.amount) }}</b>
      </td>
      <td colspan="100%"></td>
    </template>

    <template #expand="{ item }">
      <preview inside :item="item" :base-route="baseRoute" />
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

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
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
