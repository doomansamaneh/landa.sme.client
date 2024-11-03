<template>
  <data-grid
    :data-table-store="tableStore"
    flat
    toolbar_
    multiSelect
    numbered
    dense
    expandable
    @row-dbl-click="gotoPreview"
  >
    <template #cell-no="{ item }">
      <span>{{ item.no }}</span>
      <notification-badge :count="item.notificationCount" />
    </template>

    <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="helper.getEnumOptions(voucherType, 'voucherType')"
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
      <contract-badge
        :title="item.contractTitle"
        :id="item.contractId"
      />
    </template>

    <template #cell-date="{ item }">
      {{ item.date?.substring(0, 10) }}
    </template>

    <template #cell-amount="{ item }">
      <span class="text-weight-600">
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
      <preview inside :item="item" :base-route="baseRoute" />
    </template>
  </data-grid>
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter } from "vue-router";
  import { voucherType, subSystem } from "src/constants";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import Preview from "../../shared/preview/IndexView.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import NotificationBadge from "src/components/areas/_shared/badges/NotificationBadge.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: { type: String, default: "acc/voucher" },
  });

  const router = useRouter();

  async function reloadData() {
    await props.tableStore.reloadData();
  }

  function gotoPreview(row) {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
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
