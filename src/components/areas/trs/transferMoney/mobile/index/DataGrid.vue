<template>
  <data-grid
    :data-table-store="tableStore"
    :create-url="`/${baseRoute}/create`"
    :base-route="baseRoute"
    show-avatar
    avatar-field="fromTitle"
    show-badge_
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
        <div class="col ellipsis text-body3 text-weight-500">
          از: {{ item.fromTitle }}
        </div>
      </div>
      <div class="col ellipsis text-body3 text-weight-500_">
        به: {{ item.toTitle }}
      </div>

      <div class="ellipsis-2-lines text-body1 text-bold">
        {{ helper.formatNumber(item.amount) }}
        <span class="text-caption">
          {{ item.currencyTitle ?? "ریال" }}
        </span>
      </div>

      <div class="row q-gutter-x-xs text-caption">
        <div>{{ item.rowNo }}#</div>
        <div class="row items-center q-gutter-xs">
          <q-icon name="o_schedule" />
          <div>{{ helper.formatPersianDate(item.date) }}</div>
          <div class="ellipsis-2-lines text-caption-sm_">
            / {{ item.subject }} {{ item.summary }}
          </div>
        </div>
      </div>
    </template>

    <template #row-badge="{ item }">
      <contract-badge :title="item.contractTitle" />
    </template>

    <template #row-toolbar="{ item }">
      <mobile-row-toolbar
        :title="`${item.subject}`"
        :menu-items="getItemMenu(item)"
      />
    </template>
  </data-grid>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import { usePreviewMenuContext } from "src/components/areas/_shared/menus/usePreviewMenuContext";
  import { useTransferMoneyPreviewMenu } from "../../../_menus/useTransferMoneyPreviewMenu";

  import MobileRowToolbar from "src/components/shared/toolbars/MobileRowToolbar.vue";
  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import ContractBadge from "src/components/areas/_shared/badges/ContractBadge.vue";
  import RowNoBadge from "src/components/areas/_shared/badges/RowNoBadge.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    title: String,
  });

  function getItemMenu(item) {
    const context = usePreviewMenuContext(item, props.baseRoute, {
      onDeleteSuccess: async () =>
        await props.tableStore?.reloadData(),
    });
    return useTransferMoneyPreviewMenu(context.value);
  }
</script>
