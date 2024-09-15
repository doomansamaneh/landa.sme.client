<template>
  <advanced-search v-if="advancedSearch" />

  <q-card bordered>
    <card-title :title="title" />
    <q-card-section class="q-px-none">
      <data-grid
        :data-table-store="tableStore"
        flat
        toolbar
        multiSelect
        numbered
        dense
        expandable
        @row-dbl-click="gotoPreview"
      >
        <template #filter-typeId="{ item }">
          <custom-select
            v-model="item.value"
            :options="
              helper.getEnumOptions(voucherType, 'voucherType')
            "
            @update:model-value="reloadData"
          />
        </template>
        <template #filter-systemId="{ item }">
          <custom-select
            v-model="item.value"
            :options="helper.getEnumOptions(subSystem, 'subSystem')"
            @update:model-value="reloadData"
          />
        </template>

        <template #cell-subject="{ item }">
          {{ item.subject }}
          <div>
            <small>{{ item.summary }}</small>
          </div>
        </template>

        <template #cell-date="{ item }">
          {{ item.date?.substring(0, 10) }}
        </template>

        <template #cell-amount="{ item }">
          <span class="text-weight-700">
            {{ helper.formatNumber(item.amount) }}
          </span>
        </template>

        <template #cell-typeId="{ item }">
          {{
            $t(
              `shared.voucherType.${helper.getEnumType(
                item.typeId,
                voucherType
              )}`
            )
          }}
        </template>

        <template #cell-systemId="{ item }">
          {{
            $t(
              `shared.subSystem.${helper.getEnumType(
                item.systemId,
                subSystem
              )}`
            )
          }}
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
          <preview inside :item="item" />
        </template>
      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { subSystem, voucherType } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";
  import AdvancedSearch from "./AdvancedSearch.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    advancedSearch: Boolean,
    title: String,
  });

  const router = useRouter();

  async function reloadData() {
    await props.tableStore.reloadData();
  }

  function gotoPreview(row) {
    router.push(`/acc/voucher/preview/${row.id}`);
  }

  const colspan = computed(
    () =>
      props.tableStore.columns.value.findIndex(
        (column) => column.name === "amount"
      ) +
      1 + //numbered column
      1 //multi check column
  );
</script>
