<template>
  <q-card bordered>
    <card-title :title="title" icon="o_group" />
    <data-grid
      :data-table-store="tableStore"
      :title="title"
      separator="horizontal"
      numbered
      flat
      toolbar
      expandable
    >
      <template #expand="{ item }">
        <div class="q-mb-sm">
          <preview :item="item" :title="title" inside />
        </div>
      </template>

      <template #footer-subtotal="{ selectedRows }">
        <td colspan="3" class="text-right">
          {{ $t("shared.labels.selectedRows") }}
        </td>
        <td>
          <b>
            {{
              helper.formatNumber(
                helper.getSubtotal(selectedRows, "debit")
              )
            }}
          </b>
        </td>
        <td>
          <b>
            {{
              helper.formatNumber(
                helper.getSubtotal(selectedRows, "credit")
              )
            }}
          </b>
        </td>
        <td v-if="showDebitRemained">
          <b>
            {{
              helper.formatNumber(
                helper.getSubtotal(selectedRows, "debitRemained")
              )
            }}
          </b>
        </td>
        <td v-if="showCreditRemained">
          <b>
            {{
              helper.formatNumber(
                helper.getSubtotal(selectedRows, "creditRemained")
              )
            }}
          </b>
        </td>
        <td colspan="100%"></td>
      </template>

      <template #footer-total="{ summary }">
        <td colspan="3" class="text-right">
          {{ $t("shared.labels.total") }}
        </td>
        <td>
          <b>{{ helper.formatNumber(summary?.debit) }}</b>
        </td>
        <td>
          <b>{{ helper.formatNumber(summary?.credit) }}</b>
        </td>
        <td v-if="showDebitRemained">
          <b>{{ helper.formatNumber(summary?.debitRemained) }}</b>
        </td>
        <td v-if="showCreditRemained">
          <b>{{ helper.formatNumber(summary?.creditRemained) }}</b>
        </td>

        <td colspan="100%"></td>
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { useDataTable } from "src/composables/useDataTable";
  import { helper } from "src/helpers";

  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "./AccountPreview.vue";

  const props = defineProps({
    title: String,
    tableStore: useDataTable,
  });

  const showCreditRemained = computed(
    () =>
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        "creditRemained"
      ) >= 0
  );

  const showDebitRemained = computed(
    () =>
      helper.findIndex(
        props.tableStore.columns.value,
        "name",
        "debitRemained"
      ) >= 0
  );
</script>
