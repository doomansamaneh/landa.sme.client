<template>
  <data-grid
    :data-table-store="tableStore"
    :base-route="baseRoute"
    :create-url="`/${baseRoute}/create`"
    show-avatar
    show-badge_
  >
    <template #header>
      <template></template>
    </template>

    <template #row-avatar-title="{ item }">
      {{ item.month }}
    </template>

    <template #row-body="{ item }">
      <div class="row">
        <div class="col ellipsis text-body3 text-weight-500">
          {{ item.subject }}
        </div>
      </div>

      <div class="row">
        <span class="text-caption-sm">
          {{ item.year }} - {{ item.month }} -
          {{ helper.formatPersianDate(item.date) }}
        </span>
      </div>

      <div v-if="item.amount" class="row q-gutter-x-xs">
        <span class="text-body3 text-weight-500">
          {{ helper.formatNumber(item.amount) }}
        </span>

        <span>({{ item.currencyTitle ?? "ریال" }})</span>
      </div>

      <div v-if="item.taxAmount" class="row q-gutter-x-xs">
        مالیات:
        <span class="text-body3 text-weight-500">
          {{ helper.formatNumber(item.taxAmount) }}
        </span>
      </div>

      <div v-if="item.insurranceAmount" class="row q-gutter-x-xs">
        بیمه:
        <span class="text-body3 text-weight-500">
          {{ helper.formatNumber(item.insurranceAmount) }}
        </span>
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
        :type-id="item?.typeId"
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

    <template #row-toolbar="{ item }">
      <mobile-row-toolbar
        :title="`${item.year} / ${item.month}`"
        :menu-items="getItemMenu(item)"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useWagePreviewMenu } from "../../../_menus/useWagePreviewMenu";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    baseRoute: String,
  });

  function getItemMenu(item) {
    const context = usePreviewMenuContext(item, "prl/wage", {
      onDeleteSuccess: async () =>
        await props.tableStore?.reloadData(),
    });
    return useWagePreviewMenu(context.value);
  }
</script>
