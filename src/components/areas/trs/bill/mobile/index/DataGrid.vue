<template>
  <data-grid
    :data-table-store="tableStore"
    :create-url="`/${baseRoute}/create`"
    :base-route="baseRoute"
    show-avatar
    show-badge
  >
    <template #header>
      <template></template>
    </template>

    <template #row-avatar-title="{ item }">
      {{
        helper.getFirstChar(
          item.customerName ?? item.amount.toString()
        )
      }}
    </template>

    <template #row-body="{ item }">
      <div class="row justify-between">
        <div
          class="col ellipsis text-body3 no-letter-spacing text-weight-500"
        >
          {{ item.subject }}
        </div>
        <menu-item-more @click="showItemSheet(item)" />
      </div>

      <div class="ellipsis-2-lines text-body1 text-bold">
        {{ helper.formatNumber(item.amount) }}
        <span class="text-caption">
          ({{ item.currencyTitle ?? "ریال" }})
        </span>
      </div>

      <div class="text-center_q-my-sm text-caption-sm">
        {{ item.no }} - {{ item.date?.substring(0, 10) }}
      </div>

      <div class="ellipsis-2-lines text-caption-sm">
        {{ item.summary }}
      </div>
    </template>
    <template #row-badge="{ item }">
      <row-no-badge :no="item.rowNo" />
      <contract-badge
        :title="item.contractTitle"
        :id="item.contractId"
      />
    </template>
  </data-grid>

  <item-sheet
    v-if="itemSheetStatus"
    :table-store="tableStore"
    :status="itemSheetStatus"
    :item="item"
    :base-route="baseRoute"
    @hide="hideItemSheet"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import ItemSheet from "./DataGridItemSheet.vue";
  import MenuItemMore from "src/components/shared/buttons/MenuItemMore.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import RowNoBadge from "src/components/areas/_shared/badges/RowNoBadge.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    title: String,
  });

  const item = ref(null);
  const itemSheetStatus = ref(false);

  const showItemSheet = (row) => {
    item.value = row;
    itemSheetStatus.value = true;
  };
  const hideItemSheet = () => {
    itemSheetStatus.value = false;
  };
</script>
