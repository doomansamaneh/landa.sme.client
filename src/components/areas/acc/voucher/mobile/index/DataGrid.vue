<template>
  <data-grid
    :data-table-store="tableStore"
    :base-route="baseRoute"
    :create-url="`/${baseRoute}/create`"
    show-avatar
    show-badge
  >
    <template #header>
      <template></template>
    </template>

    <template #row-avatar-title="{ item }">
      {{ item.no }}
    </template>

    <template #row-body="{ item }">
      <div class="row">
        <div
          class="col ellipsis text-body3 no-letter-spacing text-weight-500"
        >
          {{ item.subject }}
        </div>
        <menu-item-more @click="showItemSheet(item)" />
      </div>

      <div class="row">
        <span class="text-caption-sm">
          {{ item.no }} -
          {{ helper.formatPersianDate(item.date) }}
        </span>
      </div>

      <div v-if="item.amount" class="row q-gutter-x-xs">
        <span class="text-body3 text-weight-500">
          {{ helper.formatNumber(item.amount) }}
        </span>
        <span>({{ item.currencyTitle ?? "ریال" }})</span>
      </div>

      <div
        v-if="item.summary"
        class="col ellipsis text-caption-sm caption-on-dark"
      >
        {{ item.summary }}
      </div>
    </template>

    <template #row-badge="{ item }">
      <notification-badge :count="item.notificationCount" />

      <row-no-badge :no="item.rowNo" />

      <type-badge
        :title="
          $t(
            `shared.voucherType.${helper.getEnumType(
              item.typeId,
              voucherType
            )}`
          )
        "
      />

      <system-badge
        :title="
          $t(
            `shared.subSystem.${helper.getEnumType(
              item.systemId,
              subSystem
            )}`
          )
        "
      />

      <contract-badge :title="item.contractTitle" />
    </template>
  </data-grid>

  <item-sheet
    v-if="itemSheetStatus"
    :table-store="tableStore"
    :status="itemSheetStatus"
    :base-route="baseRoute"
    :item="item"
    @hide="hideItemSheet"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { subSystem, voucherType } from "src/constants";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import MenuItemMore from "src/components/shared/buttons/MenuItemMore.vue";
  import ItemSheet from "./DataGridItemSheet.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import TypeBadge from "src/components/areas/_shared/badges/TypeBadge.vue";
  import SystemBadge from "src/components/areas/_shared/badges/SystemBadge.vue";
  import RowNoBadge from "src/components/areas/_shared/badges/RowNoBadge.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    baseRoute: String,
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
